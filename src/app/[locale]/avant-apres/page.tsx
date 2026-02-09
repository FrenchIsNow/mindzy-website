import type { Metadata } from 'next'
import { BeforeAfterSlider } from '@/components/features/BeforeAfterSlider'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const content: Record<string, { title: string; subtitle: string; description: string }> = {
  fr: { title: 'Avant / Après', subtitle: 'Découvrez la transformation de nos clients', description: 'Avant / Après : découvrez la transformation des sites web de nos clients. Des résultats concrets avec +180% de réservations en moyenne.' },
  en: { title: 'Before / After', subtitle: 'Discover our clients transformations', description: 'Before / After: discover the transformation of our clients\' websites. Concrete results with +180% bookings on average.' },
  es: { title: 'Antes / Después', subtitle: 'Descubre la transformación de nuestros clientes', description: 'Antes / Después: descubre la transformación de los sitios web de nuestros clientes. Resultados concretos con +180% de reservas en promedio.' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = content[locale]
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/avant-apres',
    title: t.title,
    description: t.description,
  })
}

export default async function AvantApresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = content[locale]
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <BeforeAfterSlider locale={locale as Locale} />
      </div>
    </div>
  )
}
