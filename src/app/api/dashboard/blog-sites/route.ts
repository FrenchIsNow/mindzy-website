import { NextResponse } from 'next/server'
import { requireApiEditor } from '@/lib/auth'
import { createBlogSite, listBlogSites } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const sites = await listBlogSites()
  return NextResponse.json({ sites })
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

  const site = await createBlogSite({
    slug,
    name: body.name,
    domain: (body.domain as string | null) ?? null,
    is_default: Boolean(body.is_default),
    settings: (body.settings as Record<string, unknown> | undefined) ?? {},
  })
  return NextResponse.json({ ok: true, site })
}
