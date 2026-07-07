import { NextResponse } from 'next/server'
import { requireApiRole, requireApiAdmin } from '@/lib/auth'
import {
  createBlogArticle,
  createBlogIdea,
  createBlogSite,
  createLead,
  createWaitingList,
  getBlogSiteBySlug,
  getDashboardClientById,
  listWaitingLists,
  upsertCatalogEntry,
  upsertEbookContent,
} from '@/lib/db'

export const runtime = 'nodejs'

const AGENT_TOKEN_HEADER = 'x-agent-token'

function isAuthorized(req: Request) {
  const token = process.env.AGENT_API_TOKEN
  if (!token) return false
  const provided = req.headers.get(AGENT_TOKEN_HEADER) ?? new URL(req.url).searchParams.get('token')
  return provided === token
}

export async function POST(req: Request) {
  // Token-based auth: prefer header/query, fall back to admin session for in-app agents.
  if (!isAuthorized(req)) {
    const unauthorized = await requireApiRole('admin', 'editor')
    if (unauthorized) return unauthorized
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body || typeof body.action !== 'string') {
    return NextResponse.json({ error: 'action is required' }, { status: 400 })
  }

  const input = (body.input ?? {}) as Record<string, unknown>

  try {
    if (body.action === 'create-ebook') {
      return await createEbook(input)
    }
    if (body.action === 'create-blog-post') {
      return await createBlogPost(input)
    }
    if (body.action === 'create-blog-idea') {
      return await createBlogIdeaAction(input)
    }
    if (body.action === 'create-waiting-list') {
      return await createWaitingListAction(input)
    }
    if (body.action === 'create-blog-site') {
      return await createBlogSiteAction(input)
    }
    if (body.action === 'capture-lead') {
      return await captureLeadAction(input)
    }
    return NextResponse.json({ error: `Unknown action: ${body.action}` }, { status: 400 })
  } catch (err) {
    console.error('[agent]', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Agent action failed' }, { status: 500 })
  }
}

async function createEbook(input: Record<string, unknown>) {
  const slug = String(input.slug ?? '').trim()
  if (!slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  const title = String(input.title ?? slug).trim()

  await upsertCatalogEntry({
    slug,
    is_free: input.is_free !== false,
    price_cents: (input.price_cents as number | null) ?? null,
    original_price_cents: (input.original_price_cents as number | null) ?? null,
    currency: (input.currency as string) || 'eur',
    promo_code: (input.promo_code as string | null) ?? null,
    promo_discount_pct: (input.promo_discount_pct as number | null) ?? null,
    promo_expires_at: (input.promo_expires_at as string | null) ?? null,
    is_active: input.is_active !== false,
    has_upsell: Boolean(input.has_upsell),
    upsell_price_cents: (input.upsell_price_cents as number | null) ?? null,
    upsell_slug: (input.upsell_slug as string | null) ?? null,
    status: (input.status as string) || 'draft',
    scheduled_at: (input.scheduled_at as string | null) ?? null,
    published_at: (input.published_at as string | null) ?? null,
    author_id: (input.author_id as number | null) ?? null,
    seo_title: (input.seo_title as string | null) ?? null,
    seo_description: (input.seo_description as string | null) ?? null,
    geo_keywords: (input.geo_keywords as string[] | null) ?? null,
    canonical_slug: (input.canonical_slug as string | null) ?? slug,
    og_image_url: (input.og_image_url as string | null) ?? null,
    form_fields: (input.form_fields as unknown[] | null) ?? null,
    thank_you_redirect_url: (input.thank_you_redirect_url as string | null) ?? null,
    calendly_url: (input.calendly_url as string | null) ?? null,
  })

  if (input.content) {
    const c = input.content as Record<string, unknown>
    await upsertEbookContent({
      slug,
      locale: (c.locale as string) || 'fr',
      title: (c.title as string) || title,
      subtitle: (c.subtitle as string | null) ?? null,
      excerpt: (c.excerpt as string | null) ?? null,
      imageUrl: (c.cover_image_url as string | null) ?? (c.imageUrl as string | null) ?? null,
      pdfUrl: (c.pdf_url as string | null) ?? (c.pdfUrl as string | null) ?? null,
      pages: (c.pages as number | null) ?? null,
      readingTime: (c.reading_time as number | null) ?? null,
      category: (c.category as string | null) ?? null,
      tags: (c.tags as string[] | null) ?? null,
      metaTitle: (c.meta_title as string | null) ?? (c.metaTitle as string | null) ?? null,
      metaDescription: (c.meta_description as string | null) ?? (c.metaDescription as string | null) ?? null,
      isDbOnly: true,
    })
  }

  return NextResponse.json({ ok: true, slug })
}

async function createBlogPost(input: Record<string, unknown>) {
  const clientId = Number(input.clientId)
  if (!Number.isFinite(clientId)) return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
  const client = await getDashboardClientById(clientId)
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  let blogSiteId: number | null = null
  if (typeof input.blogSiteSlug === 'string' && input.blogSiteSlug) {
    const site = await getBlogSiteBySlug(input.blogSiteSlug)
    if (site) blogSiteId = site.id
  }

  const title = String(input.title ?? '').trim()
  if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })
  const slug = String(input.slug ?? '').trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const locale = (input.locale as string) || 'fr'

  const article = await createBlogArticle({
    clientId,
    blogSiteId,
    ideaId: Number.isFinite(input.ideaId) ? Number(input.ideaId) : null,
    title,
    slug,
    canonicalSlug: slug,
    excerpt: (input.excerpt as string | undefined) || undefined,
    contentHtml: (input.contentHtml as string) || '',
    coverImageUrl: (input.coverImageUrl as string | undefined) || undefined,
    coverAlt: (input.coverAlt as string | undefined) || undefined,
    keywords: Array.isArray(input.keywords) ? (input.keywords as string[]) : undefined,
    category: (input.category as string | undefined) || undefined,
    readingTime: Number.isFinite(input.readingTime) ? Number(input.readingTime) : undefined,
    locale,
    status: (input.status as string) || 'pending_review',
  })

  return NextResponse.json({ ok: true, article })
}

async function createBlogIdeaAction(input: Record<string, unknown>) {
  const clientId = Number(input.clientId)
  if (!Number.isFinite(clientId)) return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
  const question = String(input.question ?? '').trim()
  if (!question) return NextResponse.json({ error: 'question is required' }, { status: 400 })

  let blogSiteId: number | null = null
  if (typeof input.blogSiteSlug === 'string' && input.blogSiteSlug) {
    const site = await getBlogSiteBySlug(input.blogSiteSlug)
    if (site) blogSiteId = site.id
  }

  const idea = await createBlogIdea({
    clientId,
    blogSiteId,
    question,
    category: (input.category as string) || undefined,
    subcategory: (input.subcategory as string) || undefined,
    target: (input.target as string) || undefined,
    contentType: (input.contentType as string) || undefined,
    seoPriority: (input.seoPriority as string) || undefined,
    locale: (input.locale as string) || 'fr',
    status: ((input.status as 'waiting' | 'in_progress' | 'done' | 'archived') || 'waiting'),
    source: (input.source as string) || 'agent',
    dueDate: (input.dueDate as string | null) ?? null,
    keyword: (input.keyword as string | null) ?? null,
  })
  return NextResponse.json({ ok: true, idea })
}

async function createWaitingListAction(input: Record<string, unknown>) {
  const slug = String(input.slug ?? '').trim()
  const name = String(input.name ?? '').trim()
  if (!slug || !name) return NextResponse.json({ error: 'slug and name are required' }, { status: 400 })
  const list = await createWaitingList({
    slug,
    name,
    description: (input.description as string | null) ?? null,
    locale: (input.locale as string) || 'fr',
    status: ((input.status as 'active' | 'paused' | 'archived') || 'active'),
    form_fields: (input.form_fields as string[] | null) ?? null,
    hero_title: (input.hero_title as string | null) ?? null,
    hero_subtitle: (input.hero_subtitle as string | null) ?? null,
    benefits: (input.benefits as string[] | null) ?? null,
    thank_you_message: (input.thank_you_message as string | null) ?? null,
    redirect_url: (input.redirect_url as string | null) ?? null,
  })
  return NextResponse.json({ ok: true, list })
}

async function createBlogSiteAction(input: Record<string, unknown>) {
  const slug = String(input.slug ?? '').trim()
  const name = String(input.name ?? '').trim()
  if (!slug || !name) return NextResponse.json({ error: 'slug and name are required' }, { status: 400 })
  const site = await createBlogSite({
    slug,
    name,
    domain: (input.domain as string | null) ?? null,
    is_default: Boolean(input.is_default),
    settings: (input.settings as Record<string, unknown> | undefined) ?? {},
  })
  return NextResponse.json({ ok: true, site })
}

async function captureLeadAction(input: Record<string, unknown>) {
  const email = String(input.email ?? '').trim().toLowerCase()
  if (!email) return NextResponse.json({ error: 'email is required' }, { status: 400 })
  const lead = await createLead({
    email,
    first_name: (input.first_name as string | null) ?? null,
    last_name: (input.last_name as string | null) ?? null,
    company: (input.company as string | null) ?? null,
    role: (input.role as string | null) ?? null,
    phone: (input.phone as string | null) ?? null,
    locale: (input.locale as string) || 'fr',
    source: String(input.source || 'agent'),
    source_detail: (input.source_detail as Record<string, unknown> | undefined) ?? {},
    tags: Array.isArray(input.tags) ? (input.tags as string[]) : null,
    gdpr_consent: input.gdpr_consent !== false,
  })
  return NextResponse.json({ ok: true, lead })
}
