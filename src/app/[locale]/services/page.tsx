import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/ServicesHero'
import { DigitalSolutions } from '@/components/sections/DigitalSolutions'
import { AIAgentsAutomation } from '@/components/sections/AIAgentsAutomation'
import { PricingTable } from '@/components/sections/PricingTable'
import { BrandingContent } from '@/components/sections/BrandingContent'
import { FormationsPreview } from '@/components/sections/FormationsPreview'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const servicesMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Services - Solutions digitales, IA & Formations',
    description:
      'Découvrez nos services : développement de solutions digitales, agents IA, automatisation avancée, branding et formations stratégiques.',
  },
  en: {
    title: 'Mindzy | Services - Digital Solutions, AI & Training',
    description:
      'Discover our services: digital solutions development, AI agents, advanced automation, branding and strategic training.',
  },
  es: {
    title: 'Mindzy | Servicios - Soluciones digitales, IA y Formación',
    description:
      'Descubra nuestros servicios: desarrollo de soluciones digitales, agentes IA, automatización avanzada, branding y formaciones estratégicas.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = servicesMeta[locale] || servicesMeta.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/services',
    title: t.title,
    description: t.description,
  })
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <ServicesHero locale={locale as Locale} />
      <DigitalSolutions locale={locale as Locale} />
      <AIAgentsAutomation locale={locale as Locale} />
      <PricingTable locale={locale as Locale} />
      <BrandingContent locale={locale as Locale} />
      <FormationsPreview locale={locale as Locale} />
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
