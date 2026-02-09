import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { copy } from '@/lib/copy'
import { professions, portfolioItems } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const professionLabels: Record<string, Record<string, string>> = {
  consultant: { fr: 'Consultant', en: 'Consultant', es: 'Consultor' },
  restaurant: { fr: 'Restaurant', en: 'Restaurant', es: 'Restaurante' },
  artisan: { fr: 'Artisan', en: 'Craftsman', es: 'Artesano' },
  coach: { fr: 'Coach Business', en: 'Business Coach', es: 'Coach Empresarial' },
  boutique: { fr: 'Boutique', en: 'Shop', es: 'Tienda' },
  freelance: { fr: 'Freelance', en: 'Freelancer', es: 'Freelance' },
  therapeute: { fr: 'Thérapeute', en: 'Therapist', es: 'Terapeuta' },
  psychologue: { fr: 'Psychologue', en: 'Psychologist', es: 'Psicólogo' },
  'coach-sportif': { fr: 'Coach Sportif', en: 'Sports Coach', es: 'Coach Deportivo' },
}

const examplesDescriptions: Record<string, string> = {
  fr: 'Exemples de sites web créés par Mindzy par profession : thérapeutes, psychologues, coachs sportifs, consultants, restaurants, artisans et plus.',
  en: 'Examples of websites created by Mindzy by profession: therapists, psychologists, sports coaches, consultants, restaurants, craftsmen and more.',
  es: 'Ejemplos de sitios web creados por Mindzy por profesión: terapeutas, psicólogos, coaches deportivos, consultores, restaurantes, artesanos y más.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = { fr: 'Exemples par profession', en: 'Examples by profession', es: 'Ejemplos por profesión' }
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/examples-by-profession',
    title: titles[locale] || titles.fr,
    description: examplesDescriptions[locale] || examplesDescriptions.fr,
  })
}

export default async function ExamplesByProfessionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const titles: Record<string, string> = { fr: 'Sites web par profession', en: 'Websites by profession', es: 'Sitios por profesión' }
  const subtitles: Record<string, string> = { fr: 'Trouvez l\'inspiration par métier', en: 'Find inspiration by profession', es: 'Encuentra inspiración por profesión' }
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{titles[locale]}</h1>
          <p className="body-large max-w-2xl mx-auto">{subtitles[locale]}</p>
        </div>
        <div className="space-y-16">
          {professions.map((prof) => {
            const items = portfolioItems.filter((i) => i.profession === prof).slice(0, 3)
            if (items.length === 0) return null
            const label = professionLabels[prof]?.[locale] ?? prof
            return (
              <section key={prof} id={prof}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-3 text-anthracite">{label}</h2>
                  <Link href={`/${locale}/portfolio?profession=${prof}`} className="text-violet font-medium hover:underline">{copy[locale as Locale].common.learnMore} →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} variant="outline" hover>
                      <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center text-gray-400"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                      <CardHeader><CardTitle className="text-lg">{item.title[locale as Locale]}</CardTitle><CardDescription>{item.description[locale as Locale]}</CardDescription></CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
