import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { UseCaseCards } from '@/components/sections/UseCaseCards'
import { WhyMindzy } from '@/components/sections/WhyMindzy'
import { PourquoiNous } from '@/components/sections/PourquoiNous'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { Engagements } from '@/components/sections/Engagements'
import { FeaturedPortfolio } from '@/components/sections/FeaturedPortfolio'
import { SolutionPricing } from '@/components/sections/SolutionPricing'
import { PersonalizedAdviceBanner } from '@/components/sections/PersonalizedAdviceBanner'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import { TechnologiesPartners } from '@/components/sections/TechnologiesPartners'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdAggregateRating, JsonLd } from '@/lib/seo'
import { testimonials } from '@/lib/config'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

const homeMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Solutions digitales sur mesure pour entrepreneurs',
    description: 'Mindzy accompagne la création de projets digitaux sur mesure : sites web, applications, systèmes internes. Approche personnalisée, SEO intégré, accompagnement humain.',
  },
  en: {
    title: 'Mindzy | Custom Digital Solutions for Entrepreneurs',
    description: 'Mindzy supports the creation of custom digital projects: websites, applications, internal systems. Personalized approach, integrated SEO, human support.',
  },
  es: {
    title: 'Mindzy | Soluciones digitales a medida para emprendedores',
    description: 'Mindzy acompaña la creación de proyectos digitales a medida: sitios web, aplicaciones, sistemas internos. Enfoque personalizado, SEO integrado, acompañamiento humano.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = homeMeta[locale] || homeMeta.fr
  return buildPageMetadata({ locale: locale as Locale, title: t.title, description: t.description })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const reviewsJsonLd = jsonLdAggregateRating(
    testimonials.map(t => ({
      name: t.name,
      reviewBody: t.quote[locale as Locale] || t.quote.fr,
      ratingValue: t.rating,
    }))
  )

  return (
    <>
      <JsonLd data={reviewsJsonLd} />
      {/* Hero Section - Main value proposition */}
      <Hero locale={locale as Locale} />
     {/* Technologies & Partners - Scrolling logos */}
     <TechnologiesPartners locale={locale as Locale} />
      {/* Pain Points - Why small businesses struggle online */}
      <PainPoints locale={locale as Locale} />

      {/* Use Case Cards */}
      <UseCaseCards locale={locale as Locale} />

      {/* Featured Portfolio - Social proof */}
      <FeaturedPortfolio locale={locale as Locale} />

 

      {/* Solution Pricing Cards */}
      <SolutionPricing locale={locale as Locale} />

      {/* Personalized Advice Banner */}
      <PersonalizedAdviceBanner locale={locale as Locale} />

      {/* Testimonials - Trust building */}
      <TestimonialsSection locale={locale as Locale} />

      {/* CTA Section - Conversion */}
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
