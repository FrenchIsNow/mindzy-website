import type { Metadata } from 'next'
import { PortfolioGrid } from '@/components/features/PortfolioGrid'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const portfolioDescriptions: Record<string, string> = {
  fr: 'Découvrez plus de 40 sites web créés par Mindzy pour des entrepreneurs : restaurants, consultants, coachs, boutiques et plus.',
  en: 'Discover over 40 websites created by Mindzy for entrepreneurs: restaurants, consultants, coaches, shops and more.',
  es: 'Descubre más de 40 sitios web creados por Mindzy para emprendedores: restaurantes, consultores, coaches, tiendas y más.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).portfolio
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/portfolio',
    title: t.title,
    description: portfolioDescriptions[locale] || portfolioDescriptions.fr,
  })
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).portfolio
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <PortfolioGrid locale={locale as Locale} />
      </div>
    </div>
  )
}
