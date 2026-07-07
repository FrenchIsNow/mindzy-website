import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import { getWaitingListBySlug, updateWaitingList, deleteWaitingList } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const list = await getWaitingListBySlug(slug)
  if (!list) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ list })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const list = await getWaitingListBySlug(slug)
  if (!list) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const update: Record<string, unknown> = {}
  const allowed = ['name', 'description', 'status', 'form_fields', 'hero_title', 'hero_subtitle', 'benefits', 'thank_you_message', 'redirect_url', 'locale']
  for (const k of allowed) if (k in body) update[k] = body[k]
  await updateWaitingList(list.id, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const list = await getWaitingListBySlug(slug)
  if (!list) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteWaitingList(list.id)
  return NextResponse.json({ ok: true })
}
