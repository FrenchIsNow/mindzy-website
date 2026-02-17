import Link from 'next/link'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Locale } from '@/lib/i18n'

const formations = [
  {
    gradient: 'from-violet-500 to-violet-700',
    title: { fr: 'LinkedIn', en: 'LinkedIn', es: 'LinkedIn' },
    description: {
      fr: 'Système d\'acquisition complet',
      en: 'Complete acquisition system',
      es: 'Sistema de adquisición completo',
    },
    detail: { fr: '3 packs', en: '3 packs', es: '3 packs' },
    price: { fr: 'À partir de 190 €', en: 'From €190', es: 'Desde 190 €' },
  },
  {
    gradient: 'from-rose-400 to-rose-500',
    title: { fr: 'Meta & TikTok', en: 'Meta & TikTok', es: 'Meta y TikTok' },
    description: {
      fr: 'Générer des leads',
      en: 'Generate leads',
      es: 'Generar leads',
    },
    detail: { fr: '4 offres', en: '4 offers', es: '4 ofertas' },
    price: { fr: 'À partir de 190 €', en: 'From €190', es: 'Desde 190 €' },
  },
  {
    gradient: 'from-cyan-500 to-cyan-700',
    title: {
      fr: 'Intelligence Artificielle',
      en: 'Artificial Intelligence',
      es: 'Inteligencia Artificial',
    },
    description: {
      fr: 'Stratégie & transformation',
      en: 'Strategy & transformation',
      es: 'Estrategia y transformación',
    },
    detail: { fr: '8h formation', en: '8h training', es: '8h formación' },
    price: { fr: '690 €', en: '€690', es: '690 €' },
  },
  {
    gradient: 'from-gold to-gold-dark',
    title: { fr: 'Sur Mesure', en: 'Custom', es: 'A Medida' },
    description: {
      fr: 'Programme personnalisé',
      en: 'Personalized program',
      es: 'Programa personalizado',
    },
    detail: { fr: 'Pour équipes', en: 'For teams', es: 'Para equipos' },
    price: { fr: 'Sur devis', en: 'On quote', es: 'Bajo presupuesto' },
  },
]

export function FormationsPreview({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Formations',
      title: 'Formations Mindzy',
      subtitle:
        'Des formations stratégiques conçues pour transformer l\'acquisition et l\'intégration de l\'IA en véritables leviers business.',
      cta: 'Voir toutes les formations',
    },
    en: {
      eyebrow: 'Training',
      title: 'Mindzy Training',
      subtitle:
        'Strategic training programs designed to transform acquisition and AI integration into real business levers.',
      cta: 'View all training programs',
    },
    es: {
      eyebrow: 'Formaciones',
      title: 'Formaciones Mindzy',
      subtitle:
        'Formaciones estratégicas diseñadas para transformar la adquisición y la integración de la IA en verdaderas palancas de negocio.',
      cta: 'Ver todas las formaciones',
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding relative overflow-hidden bg-cream-50/50">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Formation cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {formations.map((formation, i) => (
            <Link key={formation.title.fr} href={`/${locale}/formations`} className="block group">
              <Card
                variant="default"
                hover
                padding="none"
                className="h-full overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Color stripe */}
                <div className={`h-2 bg-gradient-to-r ${formation.gradient}`} />
                <div className="p-6">
                  <CardTitle className="mb-2">{formation.title[locale]}</CardTitle>
                  <CardDescription className="mb-4">{formation.description[locale]}</CardDescription>
                  <div className="flex items-center justify-between mt-auto">
                    <Badge variant="default" size="sm">
                      {formation.detail[locale]}
                    </Badge>
                    <span className="text-sm font-semibold text-violet">{formation.price[locale]}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href={`/${locale}/formations`}>
            <Button variant="primary" size="lg" icon={<ArrowIcon />}>
              {t.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
