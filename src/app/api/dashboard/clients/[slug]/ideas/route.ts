import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import {
  getDashboardClientBySlug,
  listBlogIdeas,
  createBlogIdea,
  bulkInsertBlogIdeas,
} from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const ideas = await listBlogIdeas(client.id)
  return NextResponse.json({ ideas })
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as
    | { question?: string; category?: string; subcategory?: string; target?: string; contentType?: string; seoPriority?: string; locale?: string; source?: string; dueDate?: string | null; keyword?: string | null; status?: 'waiting' | 'in_progress' | 'done' | 'archived' }
    | { ideas: Array<{ question: string; category?: string; subcategory?: string; target?: string; contentType?: string; seoPriority?: string; locale?: string }> }
    | null

  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  if ('ideas' in body && Array.isArray(body.ideas)) {
    const filtered = body.ideas.filter(i => i.question && i.question.trim().length > 0)
    const count = await bulkInsertBlogIdeas(client.id, filtered)
    return NextResponse.json({ ok: true, inserted: count })
  }

  const single = body as { question?: string; category?: string; subcategory?: string; target?: string; contentType?: string; seoPriority?: string; locale?: string; source?: string; dueDate?: string | null; keyword?: string | null; status?: 'waiting' | 'in_progress' | 'done' | 'archived' }
  if (!single.question) {
    return NextResponse.json({ error: 'question required' }, { status: 400 })
  }
  const idea = await createBlogIdea({
    clientId: client.id,
    question: single.question,
    category: single.category,
    subcategory: single.subcategory,
    target: single.target,
    contentType: single.contentType,
    seoPriority: single.seoPriority,
    locale: single.locale,
    source: single.source,
    dueDate: single.dueDate ?? undefined,
    keyword: single.keyword ?? undefined,
    status: single.status,
  })
  return NextResponse.json({ idea })
}
