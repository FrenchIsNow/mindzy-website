import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { listProfiles, createProfile, getProfile, type ProfileLink } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const profiles = await listProfiles()
  return NextResponse.json({ profiles })
}

export async function POST(req: Request) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const body = (await req.json().catch(() => null)) as {
    slug?: string
    name?: string
    title?: string
    subtitle?: string
    company?: string
    initials?: string
    links?: ProfileLink[]
    seoTitle?: string
    seoDesc?: string
  } | null
  if (!body?.slug || !body.name) {
    return NextResponse.json({ error: 'slug and name required' }, { status: 400 })
  }
  if (!/^[a-z0-9-]+$/.test(body.slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }
  const existing = await getProfile(body.slug)
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })

  const profile = await createProfile(body as Parameters<typeof createProfile>[0])
  return NextResponse.json({ profile })
}
