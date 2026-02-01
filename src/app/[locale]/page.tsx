import { Hero } from '@/components/sections/Hero'
import { UseCaseCards } from '@/components/sections/UseCaseCards'
import { WhyMindzy } from '@/components/sections/WhyMindzy'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { FeaturedPortfolio } from '@/components/sections/FeaturedPortfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'

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
