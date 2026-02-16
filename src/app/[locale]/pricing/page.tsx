import type { Metadata } from 'next'
import { PricingTable } from '@/components/sections/PricingTable'
import { ROICalculator } from '@/components/features/ROICalculator'
import { getMessages } from '@/lib/getMessages'
import { plans } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdService, JsonLd } from '@/lib/seo'

const pricingDescriptions: Record<string, string> = {
  fr: 'Tarifs transparents pour la création de votre site web professionnel. À partir de 49€/mois, hébergement et support inclus. Sans engagement.',
  en: 'Transparent pricing for your professional website creation. Starting at €49/month, hosting and support included. No commitment.',
  es: 'Precios transparentes para la creación de tu sitio web profesional. Desde 49€/mes, alojamiento y soporte incluido. Sin compromiso.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).pricing
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/pricing',
    title: t.title,
    description: pricingDescriptions[locale] || pricingDescriptions.fr,
  })
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).pricing
  const serviceJsonLd = jsonLdService(
    plans.map(plan => ({
      name: t.plans[plan.id]?.name || plan.id,
      description: t.plans[plan.id]?.description || '',
      price: plan.price,
    }))
  )
  return (
    <div className="pt-24">
      <JsonLd data={serviceJsonLd} />
      <PricingTable locale={locale as Locale} />
      {/** <section className="section-padding bg-gray-50">
        <div className="container-narrow">
          <ROICalculator locale={locale as Locale} />
        </div>
      </section>
      **/}
    </div>
  )
}
