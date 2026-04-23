import { NextResponse } from 'next/server'
import { requireAdmin, hashPassword } from '@/lib/dashboard-auth'
import { createDashboardClient, listDashboardClients, getDashboardClientBySlug, getDashboardClientByEmail } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const clients = await listDashboardClients()
  // Strip password_hash from response
  const safe = clients.map(({ password_hash: _ph, ...rest }) => rest)
  return NextResponse.json({ clients: safe })
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
    email?: string
    domain?: string
    personality?: string
    targetAudience?: string
    siteUrl?: string
    locale?: string
    personaPrompt?: string
    frequency?: string
    postsPerCycle?: number
    ingestUrl?: string
    ingestToken?: string
    password?: string
  } | null

  if (!body?.slug || !body.name || !body.password || !body.email) {
    return NextResponse.json({ error: 'slug, name, email, and password required' }, { status: 400 })
  }

  const slugRegex = /^[a-z0-9-]+$/
  if (!slugRegex.test(body.slug)) {
    return NextResponse.json(
      { error: 'Slug must be lowercase letters, numbers, and dashes only' },
      { status: 400 },
    )
  }

  const existing = await getDashboardClientBySlug(body.slug)
  if (existing) {
    return NextResponse.json({ error: 'A client with that slug already exists' }, { status: 409 })
  }

  const emailTaken = await getDashboardClientByEmail(body.email)
  if (emailTaken) {
    return NextResponse.json({ error: 'A client with that email already exists' }, { status: 409 })
  }

  const client = await createDashboardClient({
    slug: body.slug,
    name: body.name,
    email: body.email,
    domain: body.domain,
    personality: body.personality,
    targetAudience: body.targetAudience,
    siteUrl: body.siteUrl,
    locale: body.locale,
    personaPrompt: body.personaPrompt,
    frequency: body.frequency,
    postsPerCycle: body.postsPerCycle,
    ingestUrl: body.ingestUrl,
    ingestToken: body.ingestToken,
    passwordHash: hashPassword(body.password),
  })

  const { password_hash: _ph, ...safe } = client
  return NextResponse.json({ client: safe })
}
