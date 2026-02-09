import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const processDescriptions: Record<string, string> = {
  fr: 'Découvrez comment Mindzy crée votre site en 4 étapes simples : diagnostic, onboarding, design et mise en ligne en 2 semaines.',
  en: 'Discover how Mindzy creates your website in 4 simple steps: diagnostic, onboarding, design and launch in 2 weeks.',
  es: 'Descubre cómo Mindzy crea tu sitio en 4 pasos simples: diagnóstico, onboarding, diseño y lanzamiento en 2 semanas.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].process
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
  const t = copy[locale as Locale].process
  return (
    <div className="pt-32 pb-20">
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
          <Link href={`/${locale}/diagnostic`}><Button variant="primary" size="lg">{copy[locale as Locale].hero.cta}</Button></Link>
        </div>
      </div>
    </div>
  )
}
