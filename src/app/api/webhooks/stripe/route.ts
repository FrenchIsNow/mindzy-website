import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

// POST /api/webhooks/stripe
// Verifies Stripe webhook signature, then:
// - On checkout.session.completed with bump=true → fires GEO audit
//
// Required env vars:
//   STRIPE_WEBHOOK_SECRET  (from Stripe Dashboard → Webhooks → signing secret)
//   ANTHROPIC_API_KEY      (for the audit agent)
//   RESEND_API_KEY         (to email the report)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as {
      metadata?: Record<string, string>
      customer_email?: string
      payment_status?: string
    }

    const meta = session.metadata || {}
    const purchased = session.payment_status === 'paid'
    const hasBump = meta.bump === 'true'
    const siteUrl = meta.siteUrl
    const email = meta.email || session.customer_email || ''

    console.log('[Stripe Webhook] checkout.session.completed', {
      email, hasBump, siteUrl, purchased,
    })

    if (purchased && hasBump && siteUrl && email) {
      // Fire-and-forget: trigger audit async so webhook returns fast
      const origin =
        req.headers.get('origin') ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        'http://localhost:3000'

      fetch(`${origin}/api/funnel/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: meta.name || email.split('@')[0],
          siteUrl,
          locale: meta.locale || 'fr',
          slug: meta.slug || '',
        }),
      }).catch(err => console.error('[GEO Audit] Trigger failed:', err))

      console.log('[GEO Audit] Triggered for', siteUrl)
    }
  }

  return NextResponse.json({ received: true })
}
