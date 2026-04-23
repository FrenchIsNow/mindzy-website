import { NextResponse } from 'next/server'
import { getSession } from '@/lib/dashboard-auth'
import { getBlogArticle, updateBlogArticle, deleteBlogArticle } from '@/lib/db'

export const runtime = 'nodejs'

async function canAccess(articleId: number) {
  const session = await getSession()
  if (!session) return { ok: false as const, status: 401, error: 'Unauthorized' }
  const article = await getBlogArticle(articleId)
  if (!article) return { ok: false as const, status: 404, error: 'Not found' }
  if (session.role === 'client' && session.clientId !== article.client_id) {
    return { ok: false as const, status: 403, error: 'Forbidden' }
  }
  return { ok: true as const, session, article }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const res = await canAccess(idNum)
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: res.status })
  return NextResponse.json({ article: res.article })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const res = await canAccess(idNum)
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: res.status })

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const allowed: string[] = [
    'title', 'slug', 'excerpt', 'content_html', 'cover_image_url', 'cover_alt',
    'keywords', 'category', 'reading_time', 'locale', 'client_notes',
  ]
  // Admins may also set status directly via PATCH endpoint; for PUT we only allow content edits.
  // Clients can add client_notes but not change status (use /status endpoint).
  const update: Record<string, unknown> = {}
  for (const k of allowed) if (k in body) update[k] = body[k]

  await updateBlogArticle(idNum, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const res = await canAccess(idNum)
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: res.status })
  if (res.session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  await deleteBlogArticle(idNum)
  return NextResponse.json({ ok: true })
}
