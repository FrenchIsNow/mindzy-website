import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFunnel, getAllFunnelSlugs } from '@/lib/funnels'
import type { Locale } from '@/lib/i18n'
import { OneClickUpsellButton } from '@/components/features/OneClickUpsell'
import { getStripe } from '@/lib/stripe'

export function generateStaticParams() {
  return getAllFunnelSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const funnel = getFunnel(slug)
  if (!funnel) return { title: 'Merci' }
  const ty = funnel.thankyou[locale as Locale] || funnel.thankyou.fr
  return { title: ty.title, robots: { index: false } }
}

export default async function FunnelThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ email?: string; session_id?: string }>
}) {
  const { locale, slug } = await params
  const { email: emailParam, session_id: sessionId } = await searchParams
  const funnel = getFunnel(slug)
  if (!funnel) notFound()

  // If we came back from Stripe, fetch the session to get the customer email
  let email = emailParam
  if (sessionId && !email) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId)
      email = session.customer_details?.email || session.customer_email || undefined
    } catch {
      // ignore — fall through with no email
    }
  }

  const l = locale as Locale
  const ty = funnel.thankyou[l] || funnel.thankyou.fr
  const upsell = funnel.upsell?.[l] || funnel.upsell?.fr

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/30 to-white pt-20 pb-24">
      <div className="container-narrow max-w-2xl">

        {/* ── Confirmation ─────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-anthracite mb-4">
            {ty.title}
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto">
            {ty.body}
            {email && (
              <> <strong className="text-anthracite">{email}</strong></>
            )}
          </p>
        </div>

        {/* ── Download CTA ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8 text-center">
          <a
            href={funnel.deliveryValue}
            download
            className="inline-flex items-center gap-2.5 px-10 py-5 bg-violet text-white text-base font-bold rounded-full hover:bg-violet-600 transition-all duration-200 hover:shadow-lg hover:shadow-violet/30 hover:-translate-y-0.5 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {ty.downloadBtn}
          </a>
          <p className="text-xs text-gray-400">
            {locale === 'fr' ? 'Vous recevrez également un email avec vos accès.' : locale === 'es' ? 'También recibirás un email con tus accesos.' : 'You will also receive an email with your access.'}
          </p>
        </div>

        {/* ── Next Steps ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-anthracite mb-6">{ty.nextStepsTitle}</h2>
          <ol className="space-y-4">
            {ty.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Upsell ───────────────────────────────────────────────────────── */}
        {upsell && (
          <div className="bg-gradient-to-br from-violet-50 to-cream-50/40 rounded-3xl border border-violet/10 p-8 mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-violet/70 mb-4">
              {ty.upsellTitle}
            </p>
            <h3 className="font-display text-xl font-bold text-anthracite mb-3">{upsell.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{upsell.desc}</p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-display font-bold text-anthracite">{upsell.price} {funnel.currency}</span>
                <span className="text-xs text-gray-400 ml-1">/mois</span>
              </div>
              {sessionId ? (
                <OneClickUpsellButton sessionId={sessionId} slug={slug} locale={locale} cta={upsell.cta} />
              ) : (
                <Link
                  href={upsell.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white text-sm font-bold rounded-full hover:bg-violet-600 transition-colors duration-200"
                >
                  {upsell.cta}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── Share ────────────────────────────────────────────────────────── */}
        <div className="text-center">
          <h3 className="font-semibold text-anthracite mb-2">{ty.shareTitle}</h3>
          <p className="text-sm text-gray-400 mb-6">{ty.shareBody}</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mindzy.me/${locale}/funnel/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://mindzy.me/${locale}/funnel/${slug}`)}&text=${encodeURIComponent(locale === 'fr' ? 'Je viens de découvrir ce kit super utile pour les praticiens bien-être' : 'Just found this amazing kit for wellness practitioners')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
