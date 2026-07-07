import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import { upsertCatalogEntry, getAllCatalogEntries, updateCatalogStripeIds, renameEbookSlug } from '@/lib/db'
import { syncStripeProduct } from '@/lib/stripe'
import { getEbook } from '@/lib/ebooks'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const all = await getAllCatalogEntries()
  const entry = all.find(e => e.slug === slug) ?? null
  return NextResponse.json({ entry })
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug: currentSlug } = await params
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  // Slug rename: a single slug per ebook keeps /{locale}/ebooks/{slug} stable across locale switches.
  const requestedSlug = typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : currentSlug
  if (!/^[a-z0-9-]+$/.test(requestedSlug)) {
    return NextResponse.json({ error: 'Slug invalide (a-z, 0-9, -).' }, { status: 400 })
  }
  const slugChanged = requestedSlug !== currentSlug
  if (slugChanged) {
    const collision = await getAllCatalogEntries()
    if (collision.some(e => e.slug === requestedSlug)) {
      return NextResponse.json({ error: 'Ce slug est déjà utilisé.' }, { status: 409 })
    }
  }

  await upsertCatalogEntry({
    slug: requestedSlug,
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
    status: body.status as string | undefined,
    scheduled_at: body.scheduled_at as string | null,
    published_at: body.published_at as string | null,
    author_id: body.author_id as number | null,
    seo_title: body.seo_title as string | null,
    seo_description: body.seo_description as string | null,
    geo_keywords: body.geo_keywords as string[] | null,
    canonical_slug: body.canonical_slug as string | null,
    og_image_url: body.og_image_url as string | null,
    form_fields: body.form_fields as unknown[] | null,
    thank_you_redirect_url: body.thank_you_redirect_url as string | null,
    calendly_url: body.calendly_url as string | null,
    download_count: body.download_count as number | undefined,
    deliverable_types: (body.deliverable_types as Record<string, 'pdf' | 'page' | 'article'>) || null,
  })

  // Apply the slug rename across all related tables (atomic).
  if (slugChanged) {
    await renameEbookSlug(currentSlug, requestedSlug)
  }

  // Sync to Stripe only for paid, active ebooks with a real price.
  if (!body.is_free && body.is_active && typeof body.price_cents === 'number' && body.price_cents > 0) {
    try {
      const all = await getAllCatalogEntries()
      const entry = all.find(e => e.slug === requestedSlug) ?? null
      const ebook = getEbook(requestedSlug)
      const name = ebook?.title.fr || requestedSlug
      const description = ebook?.excerpt.fr

      const ids = await syncStripeProduct({
        stripeProductId: entry?.stripe_product_id ?? null,
        stripePriceId: entry?.stripe_price_id ?? null,
        name,
        description,
        priceCents: body.price_cents,
        currency: (body.currency as string) || 'eur',
        metadata: { type: 'ebook', slug: requestedSlug },
      })
      if (ids) await updateCatalogStripeIds(requestedSlug, ids)
    } catch (err) {
      console.error('Stripe sync failed (ebook catalog):', err)
    }
  }

  return NextResponse.json({ ok: true, slug: requestedSlug })
}
