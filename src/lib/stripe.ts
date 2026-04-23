import Stripe from 'stripe'

// Singleton Stripe client. Set STRIPE_SECRET_KEY in .env.local
// Using a non-throwing getter so build doesn't fail when key is absent.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  _stripe = new Stripe(key)
  return _stripe
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

/**
 * Creates or updates a Stripe Product + Price for a catalog item.
 * - If no product exists: creates product + price.
 * - If product exists: updates name/description; creates a new price when
 *   unit_amount or currency changes (and archives the old one, since prices
 *   are immutable in Stripe).
 * Silently no-ops when STRIPE_SECRET_KEY is not configured.
 */
export async function syncStripeProduct(args: {
  stripeProductId: string | null
  stripePriceId: string | null
  name: string
  description?: string | null
  priceCents: number
  currency: string
  metadata?: Record<string, string>
}): Promise<{ productId: string; priceId: string } | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null
  if (args.priceCents <= 0) return null

  const stripe = getStripe()
  const desc = args.description?.trim() || undefined

  let productId = args.stripeProductId
  if (!productId) {
    const product = await stripe.products.create({
      name: args.name,
      description: desc,
      metadata: args.metadata ?? {},
    })
    productId = product.id
  } else {
    await stripe.products.update(productId, {
      name: args.name,
      description: desc,
      metadata: args.metadata ?? {},
      active: true,
    })
  }

  // Decide whether to reuse or recreate the price.
  let priceId = args.stripePriceId
  let needsNew = true
  if (priceId) {
    try {
      const existing = await stripe.prices.retrieve(priceId)
      if (
        existing.active &&
        existing.unit_amount === args.priceCents &&
        existing.currency === args.currency.toLowerCase() &&
        existing.product === productId
      ) {
        needsNew = false
      }
    } catch {
      // Price retrieval failed; create a fresh one.
    }
  }

  if (needsNew) {
    const newPrice = await stripe.prices.create({
      product: productId,
      unit_amount: args.priceCents,
      currency: args.currency.toLowerCase(),
    })
    if (priceId && priceId !== newPrice.id) {
      // Archive the old price so it doesn't show up alongside the new one.
      await stripe.prices.update(priceId, { active: false }).catch(() => {})
    }
    priceId = newPrice.id
  }

  return { productId, priceId: priceId as string }
}
