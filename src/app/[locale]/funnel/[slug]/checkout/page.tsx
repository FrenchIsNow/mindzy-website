import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFunnel, getAllFunnelSlugs } from '@/lib/funnels'
import type { Locale } from '@/lib/i18n'
import { FunnelCheckoutClient } from '@/components/features/FunnelCheckoutClient'
import { CountdownTimer } from '@/components/features/FunnelUrgency'

export function generateStaticParams() {
  return getAllFunnelSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const funnel = getFunnel(slug)
  if (!funnel) return { title: 'Commande' }
  const checkout = funnel.checkout[locale as Locale] || funnel.checkout.fr
  return { title: checkout.title, robots: { index: false } }
}

export default async function FunnelCheckoutPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const funnel = getFunnel(slug)
  if (!funnel) notFound()

  const l = locale as Locale
  const checkout = funnel.checkout[l] || funnel.checkout.fr
  const guarantee = funnel.guarantee[l] || funnel.guarantee.fr
  const hero = funnel.hero[l] || funnel.hero.fr

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">

      {/* Minimal header with countdown */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 gap-2">
          <Link href={`/${locale}/funnel/${slug}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-anthracite transition-colors min-w-0">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline truncate">{locale === 'fr' ? 'Retour' : locale === 'es' ? 'Volver' : 'Back'}</span>
          </Link>
          <div className="flex justify-center">
            <CountdownTimer locale={locale} sessionMinutes={15} compact />
          </div>
          <div className="hidden md:flex items-center justify-end gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {locale === 'fr' ? 'Paiement sécurisé' : locale === 'es' ? 'Pago seguro' : 'Secure checkout'}
          </div>
        </div>
      </header>

      <div className="container-narrow">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-anthracite text-center mb-8">
          {checkout.title}
        </h1>

        <FunnelCheckoutClient
          locale={locale}
          slug={slug}
          labels={checkout}
          price={funnel.price}
          originalPrice={funnel.originalPrice}
          currency={funnel.currency}
          orderBump={funnel.orderBump?.[l] || funnel.orderBump?.fr}
          guarantee={guarantee}
          urgency={hero.urgency}
        />
      </div>
    </div>
  )
}
