import type { Metadata } from 'next'
import { HomeHero } from '@/components/sections/HomeHero'
import { TrustMarqueeSection } from '@/components/sections/TrustMarqueeSection'
import { CustomDesignSection } from '@/components/sections/CustomDesignSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { DashboardSection } from '@/components/sections/DashboardSection'
import { ArchitectureSection } from '@/components/sections/ArchitectureSection'
import { OrchestrationSection } from '@/components/sections/OrchestrationSection'
import { IntegrationsSection } from '@/components/sections/IntegrationsSection'
import { CompoundingSection } from '@/components/sections/CompoundingSection'
import { UseCasesSection } from '@/components/sections/UseCasesSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import type { Locale } from '@/lib/i18n'
import { JsonLd, jsonLdBreadcrumb, jsonLdSpeakablePage, buildPageMetadata } from '@/lib/seo'

const HOME_META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Mindzy — The custom AI infrastructure built around your company',
    description: 'Mindzy designs and builds custom AI infrastructure inside companies — connected to your tools, governed by your rules, deployed around your real workflows. No template, no pre-built stack.',
  },
  fr: {
    title: 'Mindzy — Infrastructure IA sur mesure pour votre entreprise',
    description: "Mindzy conçoit et déploie une infrastructure IA sur mesure dans les entreprises — connectée à vos outils, gouvernée par vos règles, déployée autour de vos workflows réels.",
  },
  es: {
    title: 'Mindzy — Infraestructura IA personalizada para tu empresa',
    description: 'Mindzy diseña y construye infraestructura IA personalizada dentro de las empresas — conectada a tus herramientas, gobernada por tus reglas, desplegada alrededor de tus workflows reales.',
  },
  de: {
    title: 'Mindzy — Maßgeschneiderte KI-Infrastruktur für Ihr Unternehmen',
    description: 'Mindzy entwirft und baut maßgeschneiderte KI-Infrastruktur in Unternehmen — verbunden mit Ihren Tools, geregelt durch Ihre Regeln, eingesetzt rund um Ihre realen Workflows.',
  },
  it: {
    title: 'Mindzy — Infrastruttura IA personalizzata per la tua azienda',
    description: "Mindzy progetta e implementa infrastrutture IA personalizzate all'interno delle aziende — connesse ai tuoi strumenti, governate dalle tue regole, distribuite intorno ai tuoi workflow reali.",
  },
  pt: {
    title: 'Mindzy — Infraestrutura IA personalizada para a sua empresa',
    description: 'A Mindzy projeta e implementa infraestrutura IA personalizada dentro das empresas — conectada às suas ferramentas, governada pelas suas regras, implantada em torno dos seus workflows reais.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = HOME_META[locale as Locale] ?? HOME_META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '', title: t.title, description: t.description })
}

const homeServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mindzy — Custom AI Infrastructure',
  serviceType: 'AI Infrastructure',
  description:
    'Mindzy designs and builds custom AI infrastructure inside companies — connected to your tools, governed by your rules, and deployed around your real workflows. No template, no pre-built stack.',
  provider: {
    '@type': 'Organization',
    name: 'Mindzy',
    url: 'https://mindzy.me',
  },
  areaServed: 'Worldwide',
  audience: { '@type': 'BusinessAudience', audienceType: 'Mid-market and enterprise companies' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Infrastructure Engagements',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Executive AI diagnosis' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom AI architecture & integration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Model routing & orchestration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI governance & command center' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom AI workforce (AI Employee)' } },
    ],
  },
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <JsonLd data={homeServiceSchema} />
      <JsonLd
        data={jsonLdBreadcrumb([
          { name: 'Mindzy', url: `https://mindzy.me/${locale}` },
        ])}
      />
      <JsonLd
        data={jsonLdSpeakablePage(`https://mindzy.me/${locale}`, ['h1', '.home-hero p', 'h2'])}
      />
      <HomeHero />
      <TrustMarqueeSection locale={locale} />
      <CustomDesignSection locale={locale} />
      <ManifestoSection />
      <DashboardSection />
      <ArchitectureSection />
      <OrchestrationSection />
      <IntegrationsSection />
      <CompoundingSection />
      <UseCasesSection locale={locale} />
      <FinalCTASection locale={locale} />
    </>
  )
}
