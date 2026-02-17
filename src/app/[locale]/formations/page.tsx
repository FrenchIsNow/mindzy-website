import type { Metadata } from 'next'
import { FormationsHero } from '@/components/sections/FormationsHero'
import { LinkedInFormation } from '@/components/sections/LinkedInFormation'
import { MetaTikTokFormation } from '@/components/sections/MetaTikTokFormation'
import { AIFormation } from '@/components/sections/AIFormation'
import { CustomFormation } from '@/components/sections/CustomFormation'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const formationsMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Formations - Réseaux sociaux, IA & Marketing digital',
    description:
      'Formations stratégiques LinkedIn, Meta, TikTok et Intelligence Artificielle. Des programmes concrets pour transformer votre acquisition et votre marketing digital.',
  },
  en: {
    title: 'Mindzy | Training - Social Media, AI & Digital Marketing',
    description:
      'Strategic training in LinkedIn, Meta, TikTok and Artificial Intelligence. Concrete programs to transform your acquisition and digital marketing.',
  },
  es: {
    title: 'Mindzy | Formación - Redes sociales, IA y Marketing digital',
    description:
      'Formaciones estratégicas en LinkedIn, Meta, TikTok e Inteligencia Artificial. Programas concretos para transformar tu adquisición y marketing digital.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = formationsMeta[locale] || formationsMeta.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/formations',
    title: t.title,
    description: t.description,
  })
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <FormationsHero locale={locale as Locale} />
      <LinkedInFormation locale={locale as Locale} />
      <MetaTikTokFormation locale={locale as Locale} />
      <AIFormation locale={locale as Locale} />
      <CustomFormation locale={locale as Locale} />
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
