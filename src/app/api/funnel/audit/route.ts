import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { saveAuditRequest } from '@/lib/db'

// POST /api/funnel/audit
// Triggered after Stripe payment when the GEO audit order bump was purchased.
// Saves the request to the database and sends a 72h confirmation email.
// The Mindzy team then delivers the audit manually within 72 hours.

interface AuditPayload {
  email: string
  name: string
  siteUrl: string
  locale: string
  slug: string
}

const FROM = process.env.FUNNEL_FROM_EMAIL || 'Mindzy <hello@mindzy.me>'

function confirmationEmail(name: string, siteUrl: string, locale: string): { subject: string; html: string } {
  const isFr = locale !== 'en' && locale !== 'es'
  const isEs = locale === 'es'

  const subject = isFr
    ? `Votre audit GEO est confirmé — nous revenons vers vous sous 72h`
    : isEs
      ? `Tu auditoría GEO está confirmada — te contactaremos en 72h`
      : `Your GEO audit is confirmed — we'll get back to you within 72h`

  const headline = isFr
    ? `Votre audit GEO est en cours de préparation`
    : isEs
      ? `Tu auditoría GEO está en preparación`
      : `Your GEO audit is being prepared`

  const body = isFr
    ? `Merci <strong>${name}</strong> — nous avons bien reçu votre demande d'audit pour <strong>${siteUrl}</strong>.<br/><br/>
       Notre équipe d'experts GEO va analyser votre site en profondeur et vous remettra un rapport complet et personnalisé <strong>dans les 72 heures ouvrées</strong>.<br/><br/>
       Le rapport couvrira : score GEO global, audit technique SEO, analyse CITE et CORE-EEAT, citabilité par ChatGPT/Perplexity/Google AIO, et un plan d'action priorisé 30-60-90 jours.`
    : isEs
      ? `Gracias <strong>${name}</strong> — hemos recibido tu solicitud de auditoría para <strong>${siteUrl}</strong>.<br/><br/>
         Nuestro equipo de expertos GEO analizará tu sitio en profundidad y te entregará un informe completo y personalizado <strong>en las próximas 72 horas hábiles</strong>.`
      : `Thank you <strong>${name}</strong> — we've received your audit request for <strong>${siteUrl}</strong>.<br/><br/>
         Our GEO expert team will analyze your website in depth and deliver a complete, personalized report <strong>within 72 business hours</strong>.<br/><br/>
         The report will cover: overall GEO score, technical SEO audit, CITE & CORE-EEAT analysis, AI citability (ChatGPT/Perplexity/Google AIO), and a prioritized 30-60-90 day action plan.`

  const cta = isFr
    ? 'Des questions ? Répondez à cet email ou prenez un RDV →'
    : isEs
      ? '¿Preguntas? Responde a este email o reserva una cita →'
      : 'Questions? Reply to this email or book a call →'

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:580px;margin:0 auto;padding:0;background:#f9fafb">
      <div style="background:linear-gradient(135deg,#5b21b6,#1a1a2e);padding:40px 32px;text-align:center">
        <p style="color:#c4b5fd;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px">Mindzy · Audit GEO Premium</p>
        <h1 style="color:#fff;font-size:22px;margin:0;line-height:1.3">${headline}</h1>
      </div>

      <div style="background:#fff;padding:40px 32px">
        <p style="color:#374151;line-height:1.8;margin:0 0 24px">${body}</p>

        <div style="background:#f5f3ff;border-left:4px solid #7c3aed;border-radius:8px;padding:20px 24px;margin:0 0 32px">
          <p style="color:#5b21b6;font-weight:700;margin:0 0 4px;font-size:15px">
            ${isFr ? '⏱ Livraison sous 72h ouvrées' : isEs ? '⏱ Entrega en 72 horas hábiles' : '⏱ Delivery within 72 business hours'}
          </p>
          <p style="color:#6b7280;font-size:13px;margin:0">
            ${isFr ? `Site analysé : ${siteUrl}` : isEs ? `Sitio analizado: ${siteUrl}` : `Site analyzed: ${siteUrl}`}
          </p>
        </div>

        <a href="https://cal.com/mindzy"
           style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:700;font-size:14px">
          ${cta}
        </a>
      </div>

      <div style="padding:24px 32px;text-align:center">
        <p style="color:#9ca3af;font-size:12px;margin:0">© 2026 Mindzy · mindzy.me</p>
      </div>
    </body>
    </html>
  `

  return { subject, html }
}

// Internal Slack/email notification to the Mindzy team
async function notifyTeam(resend: Resend, payload: AuditPayload, auditId: number) {
  const teamEmail = process.env.TEAM_AUDIT_EMAIL || 'team@mindzy.me'
  await resend.emails.send({
    from: FROM,
    to: teamEmail,
    subject: `[AUDIT GEO #${auditId}] ${payload.name} — ${payload.siteUrl}`,
    html: `
      <p><strong>Nouvel audit GEO à préparer</strong></p>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">ID</td><td><strong>#${auditId}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Nom</td><td>${payload.name}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Email</td><td>${payload.email}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Site</td><td><a href="${payload.siteUrl}">${payload.siteUrl}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Locale</td><td>${payload.locale}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Funnel</td><td>${payload.slug}</td></tr>
      </table>
      <p style="margin-top:16px">Délai de livraison : <strong>72h ouvrées</strong></p>
    `,
  })
}

export async function POST(req: Request) {
  try {
    const payload = await req.json() as AuditPayload

    if (!payload.email || !payload.siteUrl) {
      return NextResponse.json({ error: 'Missing email or siteUrl' }, { status: 400 })
    }

    // 1. Save to database
    const auditId = await saveAuditRequest({
      email: payload.email,
      name: payload.name,
      siteUrl: payload.siteUrl,
      locale: payload.locale,
      funnelSlug: payload.slug,
    })

    console.log('[GEO Audit] Saved audit request #', auditId, 'for', payload.siteUrl)

    // 2. Send confirmation email to client + internal notification
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const { subject, html } = confirmationEmail(payload.name, payload.siteUrl, payload.locale)

      await Promise.all([
        resend.emails.send({ from: FROM, to: payload.email, subject, html }),
        notifyTeam(resend, payload, auditId),
      ])

      console.log('[GEO Audit] Confirmation sent to', payload.email)
    } else {
      console.warn('[GEO Audit] RESEND_API_KEY not set — emails not sent')
    }

    return NextResponse.json({ ok: true, auditId })
  } catch (err) {
    console.error('[GEO Audit] Error:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
