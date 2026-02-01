import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { copy } from '@/lib/copy'
import { professions, portfolioItems } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

const professionLabels: Record<string, Record<string, string>> = {
  psychologue: { fr: 'Psychologue', en: 'Psychologist', es: 'Psicólogo' },
  osteopathe: { fr: 'Ostéopathe', en: 'Osteopath', es: 'Osteópata' },
  naturopathe: { fr: 'Naturopathe', en: 'Naturopath', es: 'Naturópata' },
  coach: { fr: 'Coach', en: 'Coach', es: 'Coach' },
  hypnotherapeute: { fr: 'Hypnothérapeute', en: 'Hypnotherapist', es: 'Hipnoterapeuta' },
  kinesitherapeute: { fr: 'Kinésithérapeute', en: 'Physiotherapist', es: 'Fisioterapeuta' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = { fr: 'Exemples par profession', en: 'Examples by profession', es: 'Ejemplos por profesión' }
  return { title: titles[locale], description: 'Sites web par métier' }
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
          {professions.slice(0, 5).map((prof) => {
            const items = portfolioItems.filter((i) => i.profession === prof).slice(0, 3)
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
