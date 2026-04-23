import { NextResponse } from 'next/server'
import { requireAdmin, hashPassword } from '@/lib/dashboard-auth'
import {
  getDashboardClientBySlug,
  updateDashboardClient,
  deleteDashboardClient,
} from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const { password_hash: _ph, ...safe } = client
  return NextResponse.json({ client: safe })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const update: Record<string, unknown> = {}
  const mapping: Record<string, string> = {
    name: 'name',
    email: 'email',
    domain: 'domain',
    personality: 'personality',
    targetAudience: 'target_audience',
    siteUrl: 'site_url',
    locale: 'locale',
    personaPrompt: 'persona_prompt',
    frequency: 'frequency',
    postsPerCycle: 'posts_per_cycle',
    ingestUrl: 'ingest_url',
    ingestToken: 'ingest_token',
    active: 'active',
  }
  for (const [k, v] of Object.entries(mapping)) {
    if (k in body) update[v] = body[k]
  }
  if (typeof body.password === 'string' && body.password.length > 0) {
    update.password_hash = hashPassword(body.password)
  }

  await updateDashboardClient(client.id, update)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteDashboardClient(client.id)
  return NextResponse.json({ ok: true })
}
