import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import { getBlogSiteBySlug, updateBlogSite, deleteBlogSite } from '@/lib/db'

export const runtime = 'nodejs'

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const site = await getBlogSiteBySlug(slug)
  if (!site) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  const update: Record<string, unknown> = {}
  for (const k of ['name', 'domain', 'is_default', 'settings']) if (k in body) update[k] = body[k]
  await updateBlogSite(site.id, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const site = await getBlogSiteBySlug(slug)
  if (!site) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteBlogSite(site.id)
  return NextResponse.json({ ok: true })
}
