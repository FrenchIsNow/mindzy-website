import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getFunnel } from '@/lib/funnels'
import { getStripe } from '@/lib/stripe'
import type { Locale } from '@/lib/i18n'

// POST /api/funnel/upsell
// One-click upsell: charges the customer's saved card off-session, using the
// payment method captured during the original Checkout Session.

export async function POST(req: Request) {
  try {
    const { sessionId, slug, locale } = await req.json() as {
      sessionId: string
      slug: string
      locale: string
    }

    if (!sessionId || !slug) {
      return NextResponse.json({ error: 'Missing sessionId or slug' }, { status: 400 })
    }

    const funnel = getFunnel(slug)
    if (!funnel?.upsell) return NextResponse.json({ error: 'No upsell configured' }, { status: 404 })

    const l = (locale as Locale) || 'fr'
    const upsell = funnel.upsell[l] || funnel.upsell.fr

    const stripe = getStripe()

    // Retrieve the original Checkout Session to get the customer + payment method
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'payment_intent.payment_method', 'customer'],
    })

    const pi = session.payment_intent as Stripe.PaymentIntent | null
    const paymentMethodId = typeof pi?.payment_method === 'string' ? pi.payment_method : pi?.payment_method?.id
    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id

    if (!paymentMethodId) {
      return NextResponse.json({ error: 'No saved payment method' }, { status: 400 })
    }

    // Off-session charge — one click, no card re-entry
    const charge = await stripe.paymentIntents.create({
      amount: upsell.price * 100,
      currency: funnel.currency.toLowerCase(),
      customer: customerId || undefined,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      description: upsell.title,
      metadata: { slug, type: 'upsell', locale: l },
    })

    return NextResponse.json({ success: true, status: charge.status })
  } catch (err) {
    // Stripe may require authentication (3DS) — return a redirect URL in that case
    if (err && typeof err === 'object' && 'code' in err && err.code === 'authentication_required') {
      return NextResponse.json({ error: 'authentication_required' }, { status: 402 })
    }
    console.error('[Funnel Upsell] Error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
