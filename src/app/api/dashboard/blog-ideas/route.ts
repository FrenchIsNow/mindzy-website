import { NextResponse } from 'next/server'
import { requireApiEditor } from '@/lib/auth'
import { createBlogIdea, listAllBlogIdeas, getDashboardClientById, getBlogSiteBySlug } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const url = new URL(req.url)
  const clientId = url.searchParams.get('clientId')
  if (clientId) {
    const num = Number(clientId)
    if (Number.isFinite(num)) {
      const { listBlogIdeas } = await import('@/lib/db')
      const ideas = await listBlogIdeas(num)
      return NextResponse.json({ ideas })
    }
  }
  const ideas = await listAllBlogIdeas()
  return NextResponse.json({ ideas })
}

export async function POST(req: Request) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  const clientId = Number(body.clientId)
  if (!Number.isFinite(clientId)) {
    return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
  }
  const client = await getDashboardClientById(clientId)
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  const question = String(body.question ?? '').trim()
  if (!question) return NextResponse.json({ error: 'question is required' }, { status: 400 })

  let blogSiteId: number | null = null
  if (typeof body.blogSiteSlug === 'string' && body.blogSiteSlug) {
    const site = await getBlogSiteBySlug(body.blogSiteSlug)
    if (site) blogSiteId = site.id
  }

  const idea = await createBlogIdea({
    clientId,
    blogSiteId,
    question,
    category: (body.category as string) ?? undefined,
    subcategory: (body.subcategory as string) ?? undefined,
    target: (body.target as string) ?? undefined,
    contentType: (body.contentType as string) ?? undefined,
    seoPriority: (body.seoPriority as string) ?? undefined,
    locale: (body.locale as string) ?? 'fr',
    status: ((body.status as 'waiting' | 'in_progress' | 'done' | 'archived') ?? 'waiting'),
    source: (body.source as string) ?? 'manual',
    dueDate: (body.dueDate as string | null) ?? null,
    keyword: (body.keyword as string | null) ?? null,
  })
  return NextResponse.json({ ok: true, idea })
}
