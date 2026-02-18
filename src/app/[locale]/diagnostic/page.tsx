import type { Metadata } from 'next'
import { DiagnosticQuiz } from '@/components/features/DiagnosticQuiz'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'

const diagnosticDescriptions: Record<string, string> = {
  fr: 'Évaluez votre projet digital en quelques minutes avec notre diagnostic gratuit. Recevez des recommandations personnalisées et un plan d\'action concret pour votre site.',
  en: 'Evaluate your digital project in a few minutes with our free diagnostic. Receive personalized recommendations and a concrete action plan for your website.',
  es: 'Evalúa tu proyecto digital en unos minutos con nuestro diagnóstico gratuito. Recibe recomendaciones personalizadas y un plan de acción concreto para tu sitio web.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).diagnostic
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/diagnostic',
    title: t.title,
    description: diagnosticDescriptions[locale] || diagnosticDescriptions.fr,
  })
}

export default async function DiagnosticPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).diagnostic
  const bcLabels: Record<string, { home: string; diagnostic: string }> = {
    fr: { home: 'Accueil', diagnostic: 'Diagnostic gratuit' },
    en: { home: 'Home', diagnostic: 'Free diagnostic' },
    es: { home: 'Inicio', diagnostic: 'Diagnóstico gratuito' },
  }
  const bc = bcLabels[locale] || bcLabels.fr
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: bc.home, url: `https://mindzy.me/${locale}` },
    { name: bc.diagnostic, url: `https://mindzy.me/${locale}/diagnostic` },
  ])

  return (
    <div className="pt-32 pb-20">
      <JsonLd data={breadcrumbJsonLd} />
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
