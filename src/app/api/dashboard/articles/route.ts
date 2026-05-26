import { NextResponse } from 'next/server'
import { getSession } from '@/lib/dashboard-auth'
import { createBlogArticle, getDashboardClientById, listBlogArticlesForClient } from '@/lib/db'
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
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await req.json().catch(() => null)) as
    | { clientId?: number; title?: string; locale?: string; slug?: string }
    | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const title = (body.title ?? '').trim() || 'Untitled article'
  const locale = isValidLocale(body.locale ?? '') ? (body.locale as Locale) : 'fr'

  // Determine clientId: admins must pass clientId; clients are scoped to their own.
  let clientId: number | undefined
  if (session.role === 'admin') {
    clientId = Number(body.clientId)
    if (!Number.isFinite(clientId)) {
      return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
    }
    const client = await getDashboardClientById(clientId)
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  } else {
    clientId = session.clientId
  }

  const baseSlug = body.slug?.trim() ? slugify(body.slug) : slugify(title)
  const slug = await ensureUniqueSlug(clientId, baseSlug, locale)

  const article = await createBlogArticle({
    clientId,
    title,
    slug,
    canonicalSlug: slug,
    locale,
    status: 'pending_review',
    contentHtml: '',
  })

  return NextResponse.json({ ok: true, article })
}
