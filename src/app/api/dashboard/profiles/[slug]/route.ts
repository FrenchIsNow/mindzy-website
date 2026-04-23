import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { getProfile, updateProfile, deleteProfile } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const profile = await getProfile(slug)
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ profile })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const profile = await getProfile(slug)
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const update: Record<string, unknown> = {}
  const allowed = ['name', 'title', 'subtitle', 'company', 'initials', 'links', 'is_active', 'seo_title', 'seo_desc']
  for (const k of allowed) if (k in body) update[k] = body[k]

  await updateProfile(profile.id, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const profile = await getProfile(slug)
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteProfile(profile.id)
  return NextResponse.json({ ok: true })
}
