# Funnel Setup — What You Need To Do

End-to-end checklist to take the `/funnel/[slug]` system live.

## 1. Environment variables

Add to `.env.local` (and to your production host):

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...           # or sk_test_... for testing
STRIPE_WEBHOOK_SECRET=whsec_...         # from Stripe dashboard webhook page

# Site URL (used in Stripe success/cancel URLs)
NEXT_PUBLIC_SITE_URL=https://mindzy.me

# Email fulfillment (Resend)
RESEND_API_KEY=re_...
FUNNEL_FROM_EMAIL=Mindzy <hello@mindzy.me>   # optional, this is the default
```

> **Important:** the `FUNNEL_FROM_EMAIL` domain (`mindzy.me`) must be verified in your Resend dashboard (DNS records: SPF, DKIM, DMARC) or emails will be rejected.

## 2. Stripe dashboard configuration

1. **Create webhook endpoint** → https://dashboard.stripe.com/webhooks
   - URL: `https://mindzy.me/api/funnel/webhook`
   - Events to subscribe to:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
   - Copy the **Signing secret** → that's your `STRIPE_WEBHOOK_SECRET`

2. **Enable saved payment methods** (already wired in code via `setup_future_usage: 'off_session'`) — no dashboard config needed.

3. **Test mode first**: use `sk_test_...` and Stripe's test cards (`4242 4242 4242 4242`).

## 3. Fulfillment emails (Resend — already wired)

`src/lib/funnel-email.ts` exports `sendFulfillmentEmail` and `sendUpsellConfirmation`. They're called automatically from `src/app/api/funnel/webhook/route.ts` on:
- `checkout.session.completed` → sends the PDF download link
- `payment_intent.succeeded` (with `metadata.type=upsell`) → sends upsell confirmation

**You only need to:**
1. Sign up at https://resend.com
2. Verify your sending domain (DNS: SPF + DKIM)
3. Set `RESEND_API_KEY` and (optionally) `FUNNEL_FROM_EMAIL` in env

The email templates are minimal inline HTML. To customize, edit `src/lib/funnel-email.ts`.

## 4. Adding a new product (duplicate the funnel)

1. Open `src/lib/funnels.ts`
2. Copy the existing `kit-presence-digitale-premium` entry in the `funnels` array
3. Change the `slug`, `price`, `originalPrice`, `deliveryValue`, and all locale copy (`fr`, `en`, `es`)
4. Drop the PDF in `public/ebooks/your-slug.pdf`
5. Done — routes auto-generate at:
   - `/{locale}/funnel/{slug}`
   - `/{locale}/funnel/{slug}/checkout`
   - `/{locale}/funnel/{slug}/merci`

## 5. Optional config per product

Each entry in `funnels.ts` supports:
- `comparison` — anchor table (DIY vs Agency vs Your kit)
- `bonusStack` — Hormozi-style strikethrough bonuses
- `orderBump` — presumed-yes checkbox on checkout (+price)
- `upsell` — one-click upsell on thank-you page (charges saved card off-session)

If you omit any of these, the corresponding section just won't render.

## 6. CRO levers already live

Hardcoded into `src/app/[locale]/funnel/[slug]/page.tsx`:
- Live countdown timer (resets every Sunday 23:59 local time)
- Animated social proof ticker (starts at 1240, increments live)
- Scarcity bar (12/50 spots)
- Sticky mobile bottom CTA (slides up after 600px scroll)
- Micro-copy under hero CTA (no commitment / 2 min / 30-day guarantee)

If you want to make any of these **per-product configurable**, expose them in the `FunnelProduct` type in `funnels.ts`.

## 7. Test the full flow

1. `npm run dev`
2. Go to `http://localhost:3000/fr/funnel/kit-presence-digitale-premium`
3. Click CTA → checkout page
4. Fill name + email, leave order bump checked → "Continuer"
5. Stripe Checkout opens → use test card `4242 4242 4242 4242`, any future date, any CVC
6. Redirects to `/merci?session_id=cs_test_...`
7. Click the upsell button → one-click off-session charge fires

## 8. Webhook testing locally

```bash
# Install Stripe CLI: brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/funnel/webhook
# Copy the whsec_... it prints into .env.local as STRIPE_WEBHOOK_SECRET
```

## 9. Production deploy checklist

- [ ] `STRIPE_SECRET_KEY` set on host (live key)
- [ ] `STRIPE_WEBHOOK_SECRET` set on host
- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL
- [ ] Webhook endpoint created in Stripe dashboard
- [ ] Email provider integrated in `src/app/api/funnel/webhook/route.ts`
- [ ] PDF files uploaded to `public/ebooks/`
- [ ] Tested full purchase flow with a real card (then refund yourself)
- [ ] Tested one-click upsell
- [ ] Verified fulfillment email arrives

## File map

```
src/lib/funnels.ts                                  → product config
src/lib/stripe.ts                                   → Stripe client singleton
src/app/[locale]/funnel/[slug]/page.tsx             → sales page (9 sections + CRO levers)
src/app/[locale]/funnel/[slug]/checkout/page.tsx    → checkout page
src/app/[locale]/funnel/[slug]/merci/page.tsx       → thank-you + one-click upsell
src/app/api/funnel/checkout/route.ts                → creates Stripe Checkout Session
src/app/api/funnel/upsell/route.ts                  → off-session one-click charge
src/app/api/funnel/webhook/route.ts                 → fulfillment (TODO: email sender)
src/components/features/FunnelCheckoutForm.tsx      → name/email + order bump
src/components/features/FunnelUrgency.tsx           → countdown / ticker / sticky CTA / scarcity
src/components/features/OneClickUpsell.tsx          → one-click upsell button
```
