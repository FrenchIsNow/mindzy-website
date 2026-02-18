import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'

const processDescriptions: Record<string, string> = {
  fr: 'Découvrez comment Mindzy crée votre site web professionnel en 4 étapes simples : diagnostic stratégique, onboarding, design sur mesure et mise en ligne en 2 semaines.',
  en: 'Discover how Mindzy creates your professional website in 4 simple steps: strategic diagnostic, onboarding, custom design and launch — all delivered in just 2 weeks.',
  es: 'Descubre cómo Mindzy crea tu sitio web profesional en 4 pasos simples: diagnóstico estratégico, onboarding, diseño a medida y lanzamiento en solo 2 semanas.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).process
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/process',
    title: t.title,
    description: processDescriptions[locale] || processDescriptions.fr,
  })
}

const stepKeys = ['diagnostic', 'onboarding', 'design', 'launch'] as const

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).process
  const bcLabels: Record<string, { home: string; process: string }> = {
    fr: { home: 'Accueil', process: 'Notre processus' },
    en: { home: 'Home', process: 'Our process' },
    es: { home: 'Inicio', process: 'Nuestro proceso' },
  }
  const bc = bcLabels[locale] || bcLabels.fr
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: bc.home, url: `https://mindzy.me/${locale}` },
    { name: bc.process, url: `https://mindzy.me/${locale}/process` },
  ])
  return (
    <div className="pt-32 pb-20">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container-wide">
        <div className="text-center mb-16">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {stepKeys.map((key, i) => {
            const step = t.steps[key]
            return (
              <div key={key} className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-violet/10 flex items-center justify-center text-violet flex-shrink-0 text-2xl">{i + 1}</div>
                <Card variant="outline" className="flex-1">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2"><Badge variant="primary">Étape {i + 1}</Badge><Badge variant="default">{step.duration}</Badge></div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-12">
          <Link href={`/${locale}/diagnostic`}><Button variant="primary" size="lg">{getMessages(locale as Locale).hero.cta}</Button></Link>
        </div>
      </div>
    </div>
  )
}
