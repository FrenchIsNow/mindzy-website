import { NextResponse } from 'next/server'
import { requireApiEditor } from '@/lib/auth'
import { createBlogArticle, getDashboardClientById, listBlogArticlesForClient, getBlogSiteBySlug, getBlogIdea } from '@/lib/db'
import { isValidLocale, type Locale } from '@/lib/i18n'

export const runtime = 'nodejs'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80) || `article-${Date.now()}`
}

async function ensureUniqueSlug(clientId: number, baseSlug: string, locale: string): Promise<string> {
  const existing = await listBlogArticlesForClient(clientId)
  const taken = new Set(existing.filter(a => a.locale === locale).map(a => a.slug))
  if (!taken.has(baseSlug)) return baseSlug
  let i = 2
  while (taken.has(`${baseSlug}-${i}`)) i++
  return `${baseSlug}-${i}`
}

export async function POST(req: Request) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized

  const body = (await req.json().catch(() => null)) as
    | { clientId?: number; title?: string; locale?: string; slug?: string; ideaId?: number; blogSiteSlug?: string; category?: string; keyword?: string; excerpt?: string; status?: string }
    | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const title = (body.title ?? '').trim() || 'Untitled article'
  const locale = isValidLocale(body.locale ?? '') ? (body.locale as Locale) : 'fr'

  const clientId = Number(body.clientId)
  if (!Number.isFinite(clientId)) {
    return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
  }
  const client = await getDashboardClientById(clientId)
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  const baseSlug = body.slug?.trim() ? slugify(body.slug) : slugify(title)
  const slug = await ensureUniqueSlug(clientId, baseSlug, locale)

  let blogSiteId: number | null = null
  if (typeof body.blogSiteSlug === 'string' && body.blogSiteSlug) {
    const site = await getBlogSiteBySlug(body.blogSiteSlug)
    if (site) blogSiteId = site.id
  }

  let ideaId: number | null = null
  if (Number.isFinite(body.ideaId) && (body.ideaId as number) > 0) {
    const idea = await getBlogIdea(body.ideaId as number)
    if (idea) ideaId = idea.id
  }

  const keywords = body.keyword ? [body.keyword] : []

  const article = await createBlogArticle({
    clientId,
    blogSiteId,
    ideaId,
    title,
    slug,
    canonicalSlug: slug,
    locale,
    status: body.status ?? 'pending_review',
    contentHtml: '',
    excerpt: body.excerpt ?? undefined,
    category: body.category ?? undefined,
    keywords: keywords.length ? keywords : undefined,
  })

  return NextResponse.json({ ok: true, article })
}
