import { NextResponse } from 'next/server'
import { requireApiEditor } from '@/lib/auth'
import { createWaitingList, listWaitingLists } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const lists = await listWaitingLists()
  return NextResponse.json({ lists })
}

export async function POST(req: Request) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body || typeof body.slug !== 'string' || typeof body.name !== 'string') {
    return NextResponse.json({ error: 'slug and name are required' }, { status: 400 })
  }
  const slug = body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })

  const list = await createWaitingList({
    slug,
    name: body.name,
    description: (body.description as string | null) ?? null,
    locale: (body.locale as string) ?? 'fr',
    status: ((body.status as 'active' | 'paused' | 'archived') ?? 'active'),
    form_fields: (body.form_fields as string[] | null) ?? null,
    hero_title: (body.hero_title as string | null) ?? null,
    hero_subtitle: (body.hero_subtitle as string | null) ?? null,
    benefits: (body.benefits as string[] | null) ?? null,
    thank_you_message: (body.thank_you_message as string | null) ?? null,
    redirect_url: (body.redirect_url as string | null) ?? null,
  })
  return NextResponse.json({ ok: true, list })
}
