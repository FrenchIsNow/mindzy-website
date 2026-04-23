import { NextResponse } from 'next/server'
import { getFunnel } from '@/lib/funnels'
import { getStripe, siteUrl } from '@/lib/stripe'
import type { Locale } from '@/lib/i18n'

// POST /api/funnel/checkout
// Creates a Stripe Checkout Session for the funnel product, optionally
// adding the order bump as a second line item. Saves the card off-session
// so the thank-you page can run a one-click upsell charge.

export async function POST(req: Request) {
  try {
    const origin =
      req.headers.get('origin') ||
      (req.headers.get('host') ? `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('host')}` : null) ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000'
    const body = await req.json()
    const { slug, name, email, phone, siteUrl, locale, bump } = body as {
      slug: string
      name: string
      email: string
      phone?: string
      siteUrl?: string
      locale: string
      bump?: boolean
    }

    if (!slug || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const funnel = getFunnel(slug)
    if (!funnel) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const l = (locale as Locale) || 'fr'
    const checkout = funnel.checkout[l] || funnel.checkout.fr
    const orderBump = bump ? funnel.orderBump?.[l] || funnel.orderBump?.fr : undefined

    const stripe = getStripe()

    const line_items = [
      {
        price_data: {
          currency: funnel.currency.toLowerCase(),
          product_data: { name: checkout.summary },
          unit_amount: funnel.price * 100,
        },
        quantity: 1,
      },
    ]

    if (orderBump) {
      line_items.push({
        price_data: {
          currency: funnel.currency.toLowerCase(),
          product_data: { name: orderBump.title },
          unit_amount: orderBump.price * 100,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_email: email,
      metadata: { slug, name, email, phone: phone || '', locale: l, bump: bump ? 'true' : 'false', siteUrl: siteUrl || '' },
      payment_intent_data: {
        setup_future_usage: 'off_session',
        metadata: { slug, name, email, phone: phone || '', locale: l, bump: bump ? 'true' : 'false', siteUrl: siteUrl || '' },
      },
      success_url: `${origin}/${l}/funnel/${slug}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${l}/funnel/${slug}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Funnel Checkout] Error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
