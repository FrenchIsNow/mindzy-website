import { Resend } from 'resend'
import type { FunnelProduct } from './funnels'
import type { Locale } from './i18n'
import { siteUrl } from './stripe'

// Email fulfillment for funnel orders. Requires RESEND_API_KEY in env.
// FROM_EMAIL defaults to "Mindzy <hello@mindzy.me>" — change via FUNNEL_FROM_EMAIL.

let _resend: Resend | null = null
function getResend(): Resend {
  if (_resend) return _resend
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  _resend = new Resend(key)
  return _resend
}

const FROM = process.env.FUNNEL_FROM_EMAIL || 'Mindzy <hello@mindzy.me>'

interface FulfillmentArgs {
  to: string
  funnel: FunnelProduct
  locale: Locale
}

export async function sendFulfillmentEmail({ to, funnel, locale }: FulfillmentArgs) {
  const ty = funnel.thankyou[locale] || funnel.thankyou.fr
  const checkout = funnel.checkout[locale] || funnel.checkout.fr
  const downloadUrl = funnel.deliveryValue.startsWith('http')
    ? funnel.deliveryValue
    : `${siteUrl()}${funnel.deliveryValue}`

  const subject = locale === 'fr'
    ? `Votre accès : ${checkout.summary}`
    : locale === 'es'
      ? `Tu acceso: ${checkout.summary}`
      : `Your access: ${checkout.summary}`

  const intro = locale === 'fr'
    ? 'Merci pour votre commande ! Voici votre accès :'
    : locale === 'es'
      ? '¡Gracias por tu pedido! Aquí está tu acceso:'
      : 'Thanks for your order! Here is your access:'

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a2e">
      <h1 style="font-size:22px;margin:0 0 16px">${ty.title}</h1>
      <p style="color:#6b7280;line-height:1.6;margin:0 0 24px">${intro}</p>
      <p style="margin:0 0 32px">
        <a href="${downloadUrl}"
           style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:700">
          ${ty.downloadBtn}
        </a>
      </p>
      <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0">${ty.body}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
      <p style="color:#9ca3af;font-size:12px;margin:0">Mindzy · mindzy.me</p>
    </div>
  `

  await getResend().emails.send({ from: FROM, to, subject, html })
}

interface UpsellEmailArgs {
  to: string
  funnel: FunnelProduct
  locale: Locale
}

export async function sendUpsellConfirmation({ to, funnel, locale }: UpsellEmailArgs) {
  const upsell = funnel.upsell?.[locale] || funnel.upsell?.fr
  if (!upsell) return

  const subject = locale === 'fr'
    ? `Confirmation : ${upsell.title}`
    : locale === 'es'
      ? `Confirmación: ${upsell.title}`
      : `Confirmation: ${upsell.title}`

  const intro = locale === 'fr'
    ? 'Votre upgrade a bien été ajouté à votre commande.'
    : locale === 'es'
      ? 'Tu mejora ha sido añadida a tu pedido.'
      : 'Your upgrade has been added to your order.'

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a2e">
      <h1 style="font-size:22px;margin:0 0 16px">${upsell.title}</h1>
      <p style="color:#6b7280;line-height:1.6;margin:0 0 16px">${intro}</p>
      <p style="color:#6b7280;line-height:1.6;margin:0">${upsell.desc}</p>
    </div>
  `

  await getResend().emails.send({ from: FROM, to, subject, html })
}
