import { NextResponse } from 'next/server'
import { requireApiEditor, requireApiAdmin } from '@/lib/auth'
import { getBlogArticle, updateBlogArticle, deleteBlogArticle } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const article = await getBlogArticle(idNum)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ article })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const article = await getBlogArticle(idNum)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const allowed: string[] = [
    'title', 'slug', 'excerpt', 'content_html', 'blocks', 'cover_image_url', 'cover_alt',
    'keywords', 'category', 'reading_time', 'locale', 'client_notes',
    'seo_title', 'seo_description', 'geo_keywords', 'og_image_url',
  ]
  const update: Record<string, unknown> = {}
  for (const k of allowed) if (k in body) update[k] = body[k]

  await updateBlogArticle(idNum, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const article = await getBlogArticle(idNum)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteBlogArticle(idNum)
  return NextResponse.json({ ok: true })
}
