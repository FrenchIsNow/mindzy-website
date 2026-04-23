import { NextResponse } from 'next/server'
import { requireAdmin, getSession } from '@/lib/dashboard-auth'
import {
  getDashboardClientBySlug,
  listBlogIdeas,
  createBlogIdea,
  bulkInsertBlogIdeas,
} from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (session.role === 'client' && session.clientId !== client.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ideas = await listBlogIdeas(client.id)
  return NextResponse.json({ ideas })
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as
    | { question?: string; category?: string; subcategory?: string; target?: string; contentType?: string; seoPriority?: string; locale?: string }
    | { ideas: Array<{ question: string; category?: string; subcategory?: string; target?: string; contentType?: string; seoPriority?: string; locale?: string }> }
    | null

  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  if ('ideas' in body && Array.isArray(body.ideas)) {
    const filtered = body.ideas.filter(i => i.question && i.question.trim().length > 0)
    const count = await bulkInsertBlogIdeas(client.id, filtered)
    return NextResponse.json({ ok: true, inserted: count })
  }

  const single = body as { question?: string; category?: string; subcategory?: string; target?: string; contentType?: string; seoPriority?: string; locale?: string }
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
  })
  return NextResponse.json({ idea })
}
