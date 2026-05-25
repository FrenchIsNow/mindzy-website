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
import { JsonLd, jsonLdBreadcrumb, jsonLdSpeakablePage } from '@/lib/seo'

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

export const metadata: Metadata = {
  title: 'Mindzy — The custom AI infrastructure built around your company',
  description: 'Mindzy designs and builds AI infrastructures from scratch, inside any company that wants to integrate AI into its operations. No template. No pre-built stack.',
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
