import type { Metadata } from 'next'
import { DiagnosticQuiz } from '@/components/features/DiagnosticQuiz'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const diagnosticDescriptions: Record<string, string> = {
  fr: 'Évaluez votre présence digitale en 60 secondes avec notre diagnostic express gratuit. Recevez des recommandations personnalisées.',
  en: 'Evaluate your digital presence in 60 seconds with our free express diagnostic. Receive personalized recommendations.',
  es: 'Evalúa tu presencia digital en 60 segundos con nuestro diagnóstico express gratuito. Recibe recomendaciones personalizadas.',
}

const customDiagnosticMeta: Record<string, { title: string; subtitle: string; description: string }> = {
  fr: { title: 'Diagnostic projet sur-mesure', subtitle: 'Évaluez la maturité de votre projet web, mobile ou cross-plateforme en 60 secondes', description: 'Évaluez votre projet d\'application web, mobile ou cross-plateforme. Diagnostic gratuit en 60 secondes avec recommandations personnalisées.' },
  en: { title: 'Custom project diagnostic', subtitle: 'Evaluate your web, mobile, or cross-platform project maturity in 60 seconds', description: 'Evaluate your web, mobile, or cross-platform app project. Free 60-second diagnostic with personalized recommendations.' },
  es: { title: 'Diagnóstico de proyecto personalizado', subtitle: 'Evalúe la madurez de su proyecto web, móvil o multiplataforma en 60 segundos', description: 'Evalúe su proyecto de aplicación web, móvil o multiplataforma. Diagnóstico gratuito en 60 segundos con recomendaciones personalizadas.' },
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | undefined>> }): Promise<Metadata> {
  const { locale } = await params
  const { profile } = await searchParams
  const isCustom = profile === 'custom'
  const t = copy[locale as Locale].diagnostic
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/diagnostic',
    title: isCustom ? customDiagnosticMeta[locale]?.title ?? t.title : t.title,
    description: isCustom ? customDiagnosticMeta[locale]?.description ?? diagnosticDescriptions[locale] : diagnosticDescriptions[locale] || diagnosticDescriptions.fr,
  })
}

export default async function DiagnosticPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const { locale } = await params
  const { profile } = await searchParams
  const isCustom = profile === 'custom'
  const t = copy[locale as Locale].diagnostic

  const title = isCustom ? customDiagnosticMeta[locale]?.title ?? t.title : t.title
  const subtitle = isCustom ? customDiagnosticMeta[locale]?.subtitle ?? t.subtitle : t.subtitle

  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          {isCustom && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              {locale === 'fr' ? 'Projet sur-mesure' : locale === 'en' ? 'Custom project' : 'Proyecto personalizado'}
            </span>
          )}
          <h1 className="heading-2 text-anthracite mb-4">{title}</h1>
          <p className="body-large max-w-xl mx-auto">{subtitle}</p>
        </div>
        <DiagnosticQuiz locale={locale as Locale} profile={profile} />
      </div>
    </div>
  )
}
