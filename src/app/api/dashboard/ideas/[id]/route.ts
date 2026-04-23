import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { updateBlogIdea, deleteBlogIdea, getBlogIdea } from '@/lib/db'

export const runtime = 'nodejs'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const idea = await getBlogIdea(idNum)
  if (!idea) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const allowed: (keyof typeof body)[] = [
    'question', 'category', 'subcategory', 'target', 'content_type', 'seo_priority', 'locale', 'status',
  ]
  const update: Record<string, unknown> = {}
  for (const k of allowed) if (k in body) update[k as string] = body[k]

  await updateBlogIdea(idNum, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  await deleteBlogIdea(idNum)
  return NextResponse.json({ ok: true })
}
