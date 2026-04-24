import { NextResponse } from 'next/server'
import { requireAdmin, getSession } from '@/lib/dashboard-auth'
import { listServices, createService, getServiceBySlug, updateServiceStripeIds } from '@/lib/db'
import { syncStripeProduct } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const services = await listServices()
  return NextResponse.json({ services })
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
    description?: string
    priceCents?: number
    currency?: string
  } | null

  if (!body?.slug || !body.name || typeof body.priceCents !== 'number') {
    return NextResponse.json({ error: 'slug, name, priceCents required' }, { status: 400 })
  }
  if (!/^[a-z0-9-]+$/.test(body.slug)) {
    return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
  }
  const existing = await getServiceBySlug(body.slug)
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })

  const service = await createService({
    slug: body.slug,
    name: body.name,
    description: body.description,
    priceCents: body.priceCents,
    currency: body.currency,
  })

  try {
    const ids = await syncStripeProduct({
      stripeProductId: null,
      stripePriceId: null,
      name: service.name,
      description: service.description,
      priceCents: service.price_cents,
      currency: service.currency,
      metadata: { type: 'service', slug: service.slug },
    })
    if (ids) {
      await updateServiceStripeIds(service.id, ids)
      service.stripe_product_id = ids.productId
      service.stripe_price_id = ids.priceId
    }
  } catch (err) {
    console.error('Stripe sync failed (service create):', err)
  }

  return NextResponse.json({ service })
}
