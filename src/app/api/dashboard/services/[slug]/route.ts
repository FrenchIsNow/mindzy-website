import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { getServiceBySlug, updateService, deleteService, updateServiceStripeIds } from '@/lib/db'
import { syncStripeProduct } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ service })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const update: Record<string, unknown> = {}
  const allowed = ['name', 'description', 'price_cents', 'currency', 'is_active']
  for (const k of allowed) if (k in body) update[k] = body[k]

  await updateService(service.id, update)
  const updated = await getServiceBySlug(slug)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    const ids = await syncStripeProduct({
      stripeProductId: updated.stripe_product_id,
      stripePriceId: updated.stripe_price_id,
      name: updated.name,
      description: updated.description,
      priceCents: updated.price_cents,
      currency: updated.currency,
      metadata: { type: 'service', slug: updated.slug },
    })
    if (ids && (ids.productId !== updated.stripe_product_id || ids.priceId !== updated.stripe_price_id)) {
      await updateServiceStripeIds(updated.id, ids)
    }
  } catch (err) {
    console.error('Stripe sync failed (service update):', err)
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteService(service.id)
  return NextResponse.json({ ok: true })
}
