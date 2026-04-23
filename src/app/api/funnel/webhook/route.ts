import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getFunnel } from '@/lib/funnels'
import { sendFulfillmentEmail, sendUpsellConfirmation } from '@/lib/funnel-email'
import { saveEbookOrder, markOrderPaid, markUpsellAccepted } from '@/lib/db'
import type { Locale } from '@/lib/i18n'

// POST /api/funnel/webhook
// Stripe webhook for funnel fulfillment. Configure in Stripe dashboard:
//   Endpoint: https://your-domain/api/funnel/webhook
//   Events:   checkout.session.completed, payment_intent.succeeded
//   Set STRIPE_WEBHOOK_SECRET in .env.local

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  const body = await req.text()
  const stripe = getStripe()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid signature'
    console.error('[Funnel Webhook] Signature verification failed:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const slug = session.metadata?.slug
        const locale = (session.metadata?.locale as Locale) || 'fr'
        const email = session.customer_details?.email || session.customer_email
        const name = session.metadata?.name || session.customer_details?.name || ''
        const hasOrderBump = session.metadata?.bump === 'true'
        const promoCode = session.metadata?.promoCode || undefined

        if (!slug || !email) break

        // Persist order to DB
        try {
          await saveEbookOrder({
            stripeSessionId: session.id,
            email,
            name,
            ebookSlug: slug,
            locale,
            amountCents: session.amount_total ?? 0,
            currency: session.currency ?? 'eur',
            hasOrderBump,
            promoCode,
          })
          await markOrderPaid(session.id)
        } catch (dbErr) {
          // Non-fatal — log but continue with email fulfillment
          console.error('[Funnel Webhook] DB save failed:', dbErr)
        }

        // Fulfill the order (email with PDF link or access)
        const funnel = getFunnel(slug)
        if (funnel) {
          await sendFulfillmentEmail({ to: email, funnel, locale })
        }

        // If order bump (GEO audit) was purchased, trigger audit request
        if (hasOrderBump) {
          const siteUrl = session.metadata?.siteUrl
          if (siteUrl) {
            const auditPayload = { email, name, siteUrl, locale, slug }
            try {
              const auditUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mindzy.me'}/api/funnel/audit`
              await fetch(auditUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(auditPayload),
              })
            } catch (auditErr) {
              console.error('[Funnel Webhook] Audit trigger failed:', auditErr)
            }
          }
        }

        console.log('[Funnel Webhook] Fulfilled order', { slug, email, hasOrderBump })
        break
      }

      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent
        if (pi.metadata?.type !== 'upsell') break

        const slug = pi.metadata.slug
        const locale = (pi.metadata.locale as Locale) || 'fr'
        const funnel = slug ? getFunnel(slug) : undefined
        const email = pi.receipt_email

        // Track upsell acceptance in DB (best effort — no session_id on PI upsell)
        if (pi.metadata?.sessionId) {
          try {
            await markUpsellAccepted(pi.metadata.sessionId, pi.amount)
          } catch (dbErr) {
            console.error('[Funnel Webhook] Upsell DB update failed:', dbErr)
          }
        }

        if (funnel && email) {
          await sendUpsellConfirmation({ to: email, funnel, locale })
        }

        console.log('[Funnel Webhook] Upsell fulfilled', { slug, amount: pi.amount })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[Funnel Webhook] Handler error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }
}
