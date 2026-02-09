import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { UseCaseCards } from '@/components/sections/UseCaseCards'
import { WhyMindzy } from '@/components/sections/WhyMindzy'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { FeaturedPortfolio } from '@/components/sections/FeaturedPortfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const homeMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Création de sites web professionnels pour entrepreneurs',
    description: 'Mindzy crée des sites web premium pour entrepreneurs et professionnels. Réservation en ligne, SEO optimisé, design sur-mesure. Livraison en 2 semaines à partir de 49€/mois.',
  },
  en: {
    title: 'Mindzy | Professional Website Creation for Entrepreneurs',
    description: 'Mindzy creates premium websites for entrepreneurs and professionals. Online booking, optimized SEO, custom design. Delivery in 2 weeks from €49/month.',
  },
  es: {
    title: 'Mindzy | Creación de sitios web profesionales para emprendedores',
    description: 'Mindzy crea sitios web premium para emprendedores y profesionales. Reservas en línea, SEO optimizado, diseño a medida. Entrega en 2 semanas desde 49€/mes.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = homeMeta[locale] || homeMeta.fr
  return buildPageMetadata({ locale: locale as Locale, title: t.title, description: t.description })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      {/* Hero Section - Main value proposition */}
      <Hero locale={locale as Locale} />

      {/* Use Cases - Identify user needs */}
      <UseCaseCards locale={locale as Locale} />

      {/* Why Mindzy - Differentiation */}
      <WhyMindzy locale={locale as Locale} />

      {/* Process Timeline - How it works */}
      <ProcessTimeline locale={locale as Locale} />

      {/* Featured Portfolio - Social proof */}
      <FeaturedPortfolio locale={locale as Locale} />

      {/* Testimonials - Trust building */}
      <Testimonials locale={locale as Locale} />

      {/* CTA Section - Conversion */}
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
