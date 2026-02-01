import type { Metadata } from 'next'
import { BeforeAfterSlider } from '@/components/features/BeforeAfterSlider'
import type { Locale } from '@/lib/i18n'

const content: Record<string, { title: string; subtitle: string }> = {
  fr: { title: 'Avant / Après', subtitle: 'Découvrez la transformation de nos clients' },
  en: { title: 'Before / After', subtitle: 'Discover our clients transformations' },
  es: { title: 'Antes / Después', subtitle: 'Descubre la transformación de nuestros clientes' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = content[locale]
  return { title: t.title, description: t.subtitle }
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
