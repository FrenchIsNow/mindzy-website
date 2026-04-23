import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { upsertCatalogEntry, getAllCatalogEntries, updateCatalogStripeIds } from '@/lib/db'
import { syncStripeProduct } from '@/lib/stripe'
import { getEbook } from '@/lib/ebooks'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const all = await getAllCatalogEntries()
  const entry = all.find(e => e.slug === slug) ?? null
  return NextResponse.json({ entry })
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  await upsertCatalogEntry({
    slug,
    is_free: body.is_free as boolean,
    price_cents: body.price_cents as number | null,
    original_price_cents: body.original_price_cents as number | null,
    currency: (body.currency as string) || 'eur',
    promo_code: body.promo_code as string | null,
    promo_discount_pct: body.promo_discount_pct as number | null,
    promo_expires_at: body.promo_expires_at as string | null,
    is_active: body.is_active as boolean,
    has_upsell: body.has_upsell as boolean,
    upsell_price_cents: body.upsell_price_cents as number | null,
    upsell_slug: body.upsell_slug as string | null,
  })

  // Sync to Stripe only for paid, active ebooks with a real price.
  if (!body.is_free && body.is_active && typeof body.price_cents === 'number' && body.price_cents > 0) {
    try {
      const all = await getAllCatalogEntries()
      const entry = all.find(e => e.slug === slug) ?? null
      const ebook = getEbook(slug)
      const name = ebook?.title.fr || slug
      const description = ebook?.excerpt.fr

      const ids = await syncStripeProduct({
        stripeProductId: entry?.stripe_product_id ?? null,
        stripePriceId: entry?.stripe_price_id ?? null,
        name,
        description,
        priceCents: body.price_cents,
        currency: (body.currency as string) || 'eur',
        metadata: { type: 'ebook', slug },
      })
      if (ids) await updateCatalogStripeIds(slug, ids)
    } catch (err) {
      console.error('Stripe sync failed (ebook catalog):', err)
    }
  }

  return NextResponse.json({ ok: true })
}
