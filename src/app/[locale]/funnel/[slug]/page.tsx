import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFunnel, getAllFunnelSlugs } from '@/lib/funnels'
import type { FunnelBenefit } from '@/lib/funnels'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { CountdownTimer, SocialProofTicker, StickyMobileCTA, ScarcityBar } from '@/components/features/FunnelUrgency'
import { ExitIntentPopup } from '@/components/features/ExitIntentPopup'

export function generateStaticParams() {
  return getAllFunnelSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const funnel = getFunnel(slug)
  if (!funnel) return { title: 'Produit' }
  const hero = funnel.hero[locale as Locale] || funnel.hero.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/funnel/${slug}`,
    title: hero.headline,
    description: hero.subheadline,
  })
}

const benefitIcons: Record<FunnelBenefit['icon'], React.ReactNode> = {
  bolt: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  target: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
}

export default async function FunnelSalesPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const funnel = getFunnel(slug)
  if (!funnel) notFound()

  const l = locale as Locale
  const hero = funnel.hero[l] || funnel.hero.fr
  const problem = funnel.problem[l] || funnel.problem.fr
  const solution = funnel.solution[l] || funnel.solution.fr
  const benefits = funnel.benefits[l] || funnel.benefits.fr
  const testimonials = funnel.testimonials[l] || funnel.testimonials.fr
  const valueStack = funnel.valueStack[l] || funnel.valueStack.fr
  const faq = funnel.faq[l] || funnel.faq.fr
  const finalCta = funnel.finalCta[l] || funnel.finalCta.fr
  const comparison = funnel.comparison?.[l] || funnel.comparison?.fr
  const bonusStack = funnel.bonusStack?.[l] || funnel.bonusStack?.fr
  const author = funnel.author?.[l] || funnel.author?.fr
  const chapters = funnel.chapters?.[l] || funnel.chapters?.fr
  const whoFor = funnel.whoFor?.[l] || funnel.whoFor?.fr
  const exitIntent = funnel.exitIntent?.[l] || funnel.exitIntent?.fr

  // JSON-LD structured data — Product + FAQPage for SEO + GEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: hero.headline,
        description: hero.subheadline,
        brand: { '@type': 'Brand', name: 'Mindzy' },
        offers: {
          '@type': 'Offer',
          price: funnel.price,
          priceCurrency: funnel.currency,
          availability: 'https://schema.org/InStock',
          url: `https://mindzy.me/${locale}/funnel/${funnel.slug}`,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: testimonials.length * 80,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  const checkoutHref = `/${locale}/funnel/${slug}/checkout`

  const savings = funnel.originalPrice ? funnel.originalPrice - funnel.price : 0

  return (
    <div className="bg-white">
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Exit-intent popup */}
      {exitIntent && (
        <ExitIntentPopup
          slug={funnel.slug}
          title={exitIntent.title}
          body={exitIntent.body}
          cta={exitIntent.cta}
          declineText={exitIntent.declineText}
        />
      )}

      {/* Sticky mobile bottom CTA */}
      <StickyMobileCTA
        href={checkoutHref}
        label={hero.cta}
        price={funnel.price}
        originalPrice={funnel.originalPrice}
        currency={funnel.currency}
      />

      {/* ── Sticky Header CTA ───────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 gap-2">
          <Link href={`/${locale}`} className="flex items-center gap-2 min-w-0">
            <img src="/logo_mindzy_violet.svg" alt="" width={24} height={20} className="flex-shrink-0" aria-hidden="true" />
            <span className="font-display text-base font-semibold text-anthracite tracking-tight hidden sm:inline truncate">Mindzy</span>
          </Link>
          <div className="flex justify-center">
            <CountdownTimer locale={locale} sessionMinutes={15} compact />
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="text-right hidden sm:block">
              {funnel.originalPrice && (
                <span className="text-xs text-gray-400 line-through mr-1">{funnel.originalPrice} {funnel.currency}</span>
              )}
              <span className="text-base font-bold text-anthracite">{funnel.price} {funnel.currency}</span>
            </div>
            <Link
              href={checkoutHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet text-white text-sm font-bold rounded-full hover:bg-violet-600 transition-colors duration-200 whitespace-nowrap"
            >
              {hero.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* ── SECTION 1 — HERO ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-violet-50/40 to-white">
        <div className="container-narrow text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet/10 text-violet text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            {hero.badge}
          </div>

          {/* Hero product image */}
          <div className="flex justify-center mb-8">
            <div className="relative max-w-xl w-full">
              <img
                src="/images/funnels/geo-expert-guide-2026.webp"
                alt="Guide Expert SEO + GEO 2026"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Visible price tag — Nomad Copy 2026 transparency */}
          {funnel.originalPrice && (
            <div className="inline-flex items-baseline gap-3 mb-6">
              <span className="text-sm text-gray-400 line-through">{funnel.originalPrice} {funnel.currency}</span>
              <span className="font-display text-3xl font-bold text-anthracite">{funnel.price} {funnel.currency}</span>
              <span className="text-xs font-bold text-white bg-violet px-2 py-1 rounded-full">
                -{Math.round((1 - funnel.price / funnel.originalPrice) * 100)}%
              </span>
            </div>
          )}

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite tracking-tight leading-[1.1] mb-6 text-balance">
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto text-pretty">
            {hero.subheadline}
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href={checkoutHref}
              className="inline-flex items-center gap-2.5 px-10 py-5 bg-violet text-white text-base font-bold rounded-full hover:bg-violet-600 transition-all duration-200 hover:shadow-lg hover:shadow-violet/30 hover:-translate-y-0.5"
            >
              {hero.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Micro-copy under CTA */}
          <p className="text-xs text-gray-400 mb-8">
            {locale === 'fr'
              ? 'Téléchargement instantané · Accès en 2 min · Sans engagement'
              : locale === 'es'
                ? 'Descarga instantánea · Acceso en 2 min · Sin compromiso'
                : 'Instant download · Access in 2 min · No commitment'}
          </p>

          {/* Live countdown — real urgency */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <p className="text-xs uppercase tracking-widest font-bold text-violet/70">
              {locale === 'fr' ? 'Offre de lancement — se termine dans' : locale === 'es' ? 'Oferta de lanzamiento — termina en' : 'Launch offer — ends in'}
            </p>
            <CountdownTimer locale={locale} deadline={funnel.launchDeadline} />
          </div>

          {/* Scarcity bar */}
          <div className="max-w-md mx-auto mb-8">
            <ScarcityBar total={50} remaining={12} locale={locale} />
          </div>

          {/* Live social proof ticker */}
          <div className="mb-6">
            <SocialProofTicker start={1240} locale={locale} />
          </div>

          {/* Star rating */}
          {hero.socialProof && (
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              {hero.socialProof}
            </p>
          )}
        </div>
      </section>

      {/* ── SECTION 2 — PROBLEM / AGITATION ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-4 text-balance">
            {problem.title}
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12 text-pretty">{problem.intro}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {problem.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50/50 border border-red-100/80 rounded-2xl p-5">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>

          {/* Agitation */}
          <div className="bg-anthracite rounded-2xl p-8 md:p-10 text-center">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {problem.agitation}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — SOLUTION ────────────────────────────────────────────── */}
      <section className="py-20 bg-violet-50/30">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-4 text-balance">
            {solution.title}
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-16 text-pretty">{solution.body}</p>

          <div className="relative">
            {/* Vertical line connecting steps */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-violet/20 hidden md:block" />

            <div className="space-y-6">
              {solution.steps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-2xl bg-violet text-white flex items-center justify-center font-bold text-sm z-10">
                    {step.num}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-violet/20 transition-all duration-200">
                    <h3 className="font-display text-lg font-bold text-anthracite mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href={checkoutHref}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet text-white font-bold rounded-full hover:bg-violet-600 transition-colors duration-200"
            >
              {hero.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3b — AUTHOR / CREDIBILITY ─────────────────────────────── */}
      {author && (
        <section className="py-16 bg-white">
          <div className="container-narrow">
            <div className="bg-gradient-to-br from-cream-50 to-violet-50/30 border border-violet/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white font-display text-3xl font-bold">
                M
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs uppercase tracking-widest text-violet font-bold mb-2">
                  {locale === 'fr' ? 'Qui est derrière ce guide' : locale === 'es' ? 'Quién está detrás de esta guía' : 'Who\'s behind this guide'}
                </p>
                <h3 className="font-display text-2xl font-bold text-anthracite mb-1">{author.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{author.title}</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-5">{author.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {author.credentials.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-white border border-violet/20 text-violet text-xs font-semibold px-3 py-1.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 4 — BENEFITS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-4 text-balance">
            {benefits.title}
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-16">{benefits.intro}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.items.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-violet/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center mb-4 text-violet group-hover:bg-violet group-hover:text-white transition-colors duration-200">
                  {benefitIcons[item.icon]}
                </div>
                <h3 className="font-display text-base font-bold text-anthracite mb-2 group-hover:text-violet transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4b — CHAPTERS / TOC PREVIEW ────────────────────────────── */}
      {chapters && (
        <section className="py-20 bg-gray-50/50">
          <div className="container-narrow">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-3 text-balance">
              {chapters.title}
            </h2>
            <p className="text-gray-500 text-center max-w-xl mx-auto mb-12 text-pretty">{chapters.intro}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {chapters.items.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-violet/30 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center text-violet font-display font-bold text-sm">
                      {c.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-anthracite text-base mb-1">{c.name}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">→ {c.takeaway}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5 — TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-violet-50/30 to-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-16 text-balance">
            {locale === 'fr' ? 'Ce qu\'ils ont accompli' : locale === 'es' ? 'Lo que lograron' : 'What they achieved'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                {/* Result badge */}
                <div className="inline-flex items-center gap-1.5 bg-sage-50 border border-sage-100 text-sage-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.result}
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 text-sm leading-relaxed italic mb-6">"{t.quote}"</blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-anthracite">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5a — WHO FOR / NOT FOR (qualifier) ──────────────────────── */}
      {whoFor && (
        <section className="py-20 bg-white">
          <div className="container-narrow">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-12 text-balance">
              {whoFor.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sage-50/50 border border-sage-200 rounded-3xl p-8">
                <h3 className="font-display font-bold text-sage-700 text-lg mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {whoFor.forTitle}
                </h3>
                <ul className="space-y-3">
                  {whoFor.forItems.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-sage-500 mt-1">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8">
                <h3 className="font-display font-bold text-red-700 text-lg mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {whoFor.notForTitle}
                </h3>
                <ul className="space-y-3">
                  {whoFor.notForItems.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="text-red-400 mt-1">✕</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5b — COMPARISON TABLE (anchor) ─────────────────────────── */}
      {comparison && (
        <section className="py-20 bg-white">
          <div className="container-narrow">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-12 text-balance">
              {comparison.title}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4"></th>
                    {comparison.columns.map((col, i) => (
                      <th
                        key={i}
                        className={`p-4 text-center ${col.highlight ? 'bg-violet text-white rounded-t-2xl' : 'text-gray-400'}`}
                      >
                        <div className="font-display font-bold text-base">{col.name}</div>
                        <div className={`text-2xl font-display font-bold mt-1 ${col.highlight ? 'text-white' : 'text-anthracite'}`}>{col.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rowLabels.map((label, ri) => (
                    <tr key={ri} className="border-t border-gray-100">
                      <td className="p-4 text-sm text-gray-600">{label}</td>
                      {comparison.columns.map((col, ci) => {
                        const cell = col.rows[ri]
                        return (
                          <td
                            key={ci}
                            className={`p-4 text-center text-sm ${col.highlight ? 'bg-violet/5 font-semibold text-anthracite' : 'text-gray-500'}`}
                          >
                            {cell === false ? (
                              <span className="text-gray-300">—</span>
                            ) : cell === true ? (
                              <svg className={`w-5 h-5 mx-auto ${col.highlight ? 'text-violet' : 'text-sage-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              cell
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5c — BONUS STACK ───────────────────────────────────────── */}
      {bonusStack && (
        <section className="py-20 bg-gradient-to-b from-amber-50/40 to-white">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-4">
                {locale === 'fr' ? '🎁 Bonus exclusifs' : locale === 'es' ? '🎁 Bonos exclusivos' : '🎁 Exclusive bonuses'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite mb-3 text-balance">
                {bonusStack.title}
              </h2>
              <p className="text-gray-500 text-sm">{bonusStack.intro}</p>
            </div>
            <div className="space-y-4">
              {bonusStack.items.map((b, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-amber-100 rounded-2xl p-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-display font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-anthracite">{b.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-gray-400 line-through">{b.value} €</div>
                    <div className="text-sm font-bold text-sage-600 uppercase">
                      {locale === 'fr' ? 'Offert' : locale === 'es' ? 'Gratis' : 'Free'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 6 — VALUE STACK ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-anthracite text-center mb-12 text-balance">
            {valueStack.title}
          </h2>

          <div className="bg-gradient-to-br from-violet-50 to-cream-50/40 rounded-3xl border border-violet/10 p-8 md:p-12">
            <div className="space-y-4 mb-8">
              {valueStack.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-violet/10 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">{item.value} €</span>
                </div>
              ))}
            </div>

            {/* Total vs your price */}
            <div className="bg-white rounded-2xl p-6 text-center border border-violet/10">
              <p className="text-sm text-gray-400 mb-1">
                {locale === 'fr' ? 'Valeur totale' : locale === 'es' ? 'Valor total' : 'Total value'}
                {' '}<span className="line-through">{valueStack.totalValue} €</span>
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-4xl font-display font-bold text-anthracite">{valueStack.yourPrice}</span>
                <span className="text-lg font-semibold text-anthracite">{funnel.currency}</span>
                {savings > 0 && (
                  <span className="text-sm font-bold text-violet bg-violet/10 px-2 py-0.5 rounded-full">
                    -{savings} {funnel.currency}
                  </span>
                )}
              </div>
              <Link
                href={checkoutHref}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet text-white font-bold rounded-full hover:bg-violet-600 transition-colors duration-200 w-full justify-center"
              >
                {valueStack.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <h2 className="font-display text-3xl font-bold text-anthracite text-center mb-12">
            {locale === 'fr' ? 'Questions fréquentes' : locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
          </h2>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <span className="font-semibold text-anthracite text-sm md:text-base">{item.q}</span>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet/10 flex items-center justify-center group-open:rotate-45 transition-transform duration-200">
                    <svg className="w-3.5 h-3.5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9 — FINAL CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-anthracite via-anthracite to-violet/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-300 blur-3xl" />
        </div>

        <div className="container-narrow text-center relative">
          <p className="text-violet-300 text-sm font-bold tracking-widest uppercase mb-4">Mindzy</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            {finalCta.title}
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-xl mx-auto">
            {finalCta.body}
          </p>

          <Link
            href={checkoutHref}
            className="inline-flex items-center gap-2.5 px-10 py-5 bg-white text-anthracite text-base font-bold rounded-full hover:bg-violet-50 transition-colors duration-200 mb-6"
          >
            {finalCta.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {finalCta.urgency && (
            <p className="text-amber-400 text-sm font-semibold">{finalCta.urgency}</p>
          )}

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              SSL
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {locale === 'fr' ? 'Accès immédiat' : locale === 'es' ? 'Acceso inmediato' : 'Instant access'}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
