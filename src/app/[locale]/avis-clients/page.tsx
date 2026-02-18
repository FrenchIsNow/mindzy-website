import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/Card'
import { getMessages } from '@/lib/getMessages'
import { testimonials } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { buildPageMetadata, jsonLdAggregateRating, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'

const reviewDescriptions: Record<string, string> = {
  fr: 'Découvrez les avis vérifiés de nos clients. Plus de 150 entrepreneurs nous font confiance avec un taux de satisfaction de 98%.',
  en: 'Read verified reviews from our clients. Over 150 entrepreneurs trust us with a 98% satisfaction rate.',
  es: 'Descubre las opiniones verificadas de nuestros clientes. Más de 150 emprendedores confían en nosotros con un 98% de satisfacción.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).reviews
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/avis-clients',
    title: t.title,
    description: reviewDescriptions[locale] || reviewDescriptions.fr,
  })
}

export default async function AvisClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).reviews
  const reviewsJsonLd = jsonLdAggregateRating(
    testimonials.map(r => ({
      name: r.name,
      reviewBody: r.quote[locale as Locale] || r.quote.fr,
      ratingValue: r.rating,
    }))
  )
  const bcLabels: Record<string, { home: string; reviews: string }> = {
    fr: { home: 'Accueil', reviews: 'Avis clients' },
    en: { home: 'Home', reviews: 'Client reviews' },
    es: { home: 'Inicio', reviews: 'Opiniones de clientes' },
  }
  const bc = bcLabels[locale] || bcLabels.fr
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: bc.home, url: `https://mindzy.me/${locale}` },
    { name: bc.reviews, url: `https://mindzy.me/${locale}/avis-clients` },
  ])
  return (
    <div className="pt-32 pb-20">
      <JsonLd data={reviewsJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <Card key={item.id} variant="elevated">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={cn('w-5 h-5', i < item.rating ? 'text-yellow-400' : 'text-gray-200')} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">&ldquo;{item.quote[locale as Locale]}&rdquo;</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet/10 flex items-center justify-center text-violet font-semibold text-sm">{item.name.split(' ').map((n) => n[0]).join('')}</div>
                  <div><div className="font-semibold text-anthracite text-sm">{item.name}</div><div className="text-gray-500 text-xs">{item.profession[locale as Locale]}</div></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
