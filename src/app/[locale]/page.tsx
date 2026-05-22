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

export const metadata: Metadata = {
  title: 'Mindzy — The custom AI infrastructure built around your company',
  description: 'Mindzy designs and builds AI infrastructures from scratch, inside any company that wants to integrate AI into its operations. No template. No pre-built stack.',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  await params
  return (
    <>
      <HomeHero />
      <TrustMarqueeSection />
      <CustomDesignSection />
      <ManifestoSection />
      <DashboardSection />
      <ArchitectureSection />
      <OrchestrationSection />
      <IntegrationsSection />
      <CompoundingSection />
      <UseCasesSection />
      <FinalCTASection />
    </>
  )
}
