import type { Metadata } from 'next'
import { OnboardingWizard } from '@/components/features/OnboardingWizard'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const onboardingDescriptions: Record<string, string> = {
  fr: 'Répondez à 4 questions simples pour recevoir une recommandation personnalisée de formule adaptée à votre activité.',
  en: 'Answer 4 simple questions to receive a personalized plan recommendation tailored to your business.',
  es: 'Responde 4 preguntas simples para recibir una recomendación personalizada del plan adaptado a tu negocio.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].onboarding
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/onboarding',
    title: t.title,
    description: onboardingDescriptions[locale] || onboardingDescriptions.fr,
  })
}

export default async function OnboardingPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ recommendation?: string }> }) {
  const { locale } = await params
  const { recommendation } = await searchParams
  const t = copy[locale as Locale].onboarding
  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-xl mx-auto">{t.subtitle}</p>
        </div>
        <OnboardingWizard locale={locale as Locale} initialRecommendation={recommendation} />
      </div>
    </div>
  )
}
