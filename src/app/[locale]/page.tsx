import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { UseCaseCards } from '@/components/sections/UseCaseCards'
import { WhyMindzy } from '@/components/sections/WhyMindzy'
import { PourquoiNous } from '@/components/sections/PourquoiNous'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { Engagements } from '@/components/sections/Engagements'
import { FeaturedPortfolio } from '@/components/sections/FeaturedPortfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

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

  return (
    <>
      {/* Hero Section - Main value proposition */}
      <Hero locale={locale as Locale} />

      {/* Service Cards - 6 use cases */}
      <UseCaseCards locale={locale as Locale} />

      {/* Value Propositions - 5 key differentiators */}
       {/*  <WhyMindzy locale={locale as Locale} />*/}

      {/* Featured Portfolio - Social proof */}
      <FeaturedPortfolio locale={locale as Locale} />

      {/* Testimonials - Trust building */}
      <Testimonials locale={locale as Locale} />

      {/* CTA Section - Conversion */}
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
