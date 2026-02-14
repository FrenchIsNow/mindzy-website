import type { Metadata } from 'next'
import { DiagnosticQuiz } from '@/components/features/DiagnosticQuiz'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const diagnosticDescriptions: Record<string, string> = {
  fr: 'Évaluez votre projet digital en quelques minutes avec notre diagnostic gratuit. Recevez des recommandations personnalisées.',
  en: 'Evaluate your digital project in a few minutes with our free diagnostic. Receive personalized recommendations.',
  es: 'Evalúa tu proyecto digital en unos minutos con nuestro diagnóstico gratuito. Recibe recomendaciones personalizadas.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].diagnostic
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/diagnostic',
    title: t.title,
    description: diagnosticDescriptions[locale] || diagnosticDescriptions.fr,
  })
}

export default async function DiagnosticPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = copy[locale as Locale].diagnostic

  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-xl mx-auto">{t.subtitle}</p>
        </div>
        <DiagnosticQuiz locale={locale as Locale} />
      </div>
    </div>
  )
}
