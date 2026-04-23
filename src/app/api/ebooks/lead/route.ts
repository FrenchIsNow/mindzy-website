import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { saveEbookLead, getCatalogEntry } from '@/lib/db'
import { getEbook } from '@/lib/ebooks'

// POST /api/ebooks/lead
// Called by EbookDownloadForm when a user submits the free ebook download form.
// Saves the lead to the database and sends a branded download email via Resend.

interface LeadPayload {
  name: string
  email: string
  phone?: string
  company?: string
  ebookSlug: string
  locale: string
}

const FROM = process.env.FUNNEL_FROM_EMAIL || 'Mindzy <hello@mindzy.me>'

function downloadEmail(opts: {
  name: string
  ebookTitle: string
  downloadUrl: string
  ctaLink: string
  locale: string
}): { subject: string; html: string } {
  const { name, ebookTitle, downloadUrl, ctaLink, locale } = opts
  const isFr = locale !== 'en' && locale !== 'es'
  const isEs = locale === 'es'

  const subject = isFr
    ? `Votre guide : ${ebookTitle}`
    : isEs
      ? `Tu guía: ${ebookTitle}`
      : `Your guide: ${ebookTitle}`

  const heading = isFr
    ? `Votre guide est prêt 🎉`
    : isEs
      ? `¡Tu guía está lista!`
      : `Your guide is ready!`

  const body = isFr
    ? `Bonjour <strong>${name}</strong>,<br/><br/>Merci pour votre intérêt ! Votre guide <strong>${ebookTitle}</strong> est disponible en téléchargement ci-dessous.`
    : isEs
      ? `Hola <strong>${name}</strong>,<br/><br/>¡Gracias por tu interés! Tu guía <strong>${ebookTitle}</strong> está disponible para descargar.`
      : `Hi <strong>${name}</strong>,<br/><br/>Thanks for your interest! Your guide <strong>${ebookTitle}</strong> is ready to download below.`

  const downloadBtn = isFr ? 'Télécharger le guide →' : isEs ? 'Descargar la guía →' : 'Download the guide →'
  const ctaText = isFr
    ? 'Vous voulez aller plus loin ? Prenez un RDV gratuit avec notre équipe.'
    : isEs
      ? '¿Quieres ir más lejos? Reserva una cita gratuita con nuestro equipo.'
      : 'Want to go further? Book a free call with our team.'
  const ctaBtn = isFr ? 'Prendre un RDV gratuit →' : isEs ? 'Reservar una cita gratis →' : 'Book a free call →'

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:0;background:#f9fafb">
      <div style="background:linear-gradient(135deg,#7c3aed,#1a1a2e);padding:36px 32px;text-align:center">
        <p style="color:#c4b5fd;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px">Mindzy</p>
        <h1 style="color:#fff;font-size:22px;margin:0">${heading}</h1>
      </div>

      <div style="background:#fff;padding:40px 32px">
        <p style="color:#374151;line-height:1.7;margin:0 0 28px">${body}</p>

        <p style="text-align:center;margin:0 0 32px">
          <a href="${downloadUrl}"
             style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:700;font-size:15px">
            ${downloadBtn}
          </a>
        </p>

        <div style="border-top:1px solid #f3f4f6;padding-top:28px;text-align:center">
          <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0 0 16px">${ctaText}</p>
          <a href="${ctaLink}"
             style="display:inline-block;border:2px solid #7c3aed;color:#7c3aed;text-decoration:none;padding:10px 24px;border-radius:999px;font-weight:600;font-size:13px">
            ${ctaBtn}
          </a>
        </div>
      </div>

      <div style="padding:20px 32px;text-align:center">
        <p style="color:#9ca3af;font-size:11px;margin:0">© 2026 Mindzy · mindzy.me</p>
      </div>
    </body>
    </html>
  `

  return { subject, html }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as LeadPayload
    const { name, email, phone, company, ebookSlug, locale } = body

    if (!email || !ebookSlug) {
      return NextResponse.json({ error: 'Missing email or ebookSlug' }, { status: 400 })
    }

    const ebook = getEbook(ebookSlug)
    if (!ebook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 })
    }

    // Check catalog — only allow lead capture for free ebooks
    const catalog = await getCatalogEntry(ebookSlug)
    const isFree = catalog ? catalog.is_free : ebook.free
    if (!isFree) {
      return NextResponse.json({ error: 'This ebook requires payment' }, { status: 403 })
    }

    // 1. Save lead to DB
    const leadId = await saveEbookLead({ email, name, phone, company, ebookSlug, locale })
    console.log('[Ebook Lead] Saved lead #', leadId, 'for', ebookSlug)

    // 2. Build PDF URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mindzy.me'
    const pdfFilename = ebook.pdfByLocale?.[locale as 'fr' | 'en' | 'es']
      ?? ebook.pdfByLocale?.fr
      ?? `${ebookSlug}.pdf`
    const downloadUrl = `${siteUrl}/ebooks/${pdfFilename}`
    const ctaLink = ebook.ctaLink || 'https://cal.com/mindzy'
    const ebookTitle = ebook.title[locale as 'fr' | 'en' | 'es'] || ebook.title.fr

    // 3. Send download email via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const { subject, html } = downloadEmail({ name, ebookTitle, downloadUrl, ctaLink, locale })
      await resend.emails.send({ from: FROM, to: email, subject, html })
      console.log('[Ebook Lead] Download email sent to', email)
    } else {
      console.warn('[Ebook Lead] RESEND_API_KEY not set — email not sent')
    }

    return NextResponse.json({ ok: true, leadId, downloadUrl })
  } catch (err) {
    console.error('[Ebook Lead] Error:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
