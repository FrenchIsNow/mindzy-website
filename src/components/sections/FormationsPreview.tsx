import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const formations = [
  {
    title: { fr: 'LinkedIn', en: 'LinkedIn', es: 'LinkedIn' },
    description: {
      fr: 'Syst\u00e8me d\'acquisition complet',
      en: 'Complete acquisition system',
      es: 'Sistema de adquisici\u00f3n completo',
    },
    detail: { fr: '3 packs', en: '3 packs', es: '3 packs' },
    price: { fr: '\u00c0 partir de 190 \u20ac', en: 'From \u20ac190', es: 'Desde 190 \u20ac' },
  },
  {
    title: { fr: 'Meta & TikTok', en: 'Meta & TikTok', es: 'Meta y TikTok' },
    description: {
      fr: 'G\u00e9n\u00e9rer des leads',
      en: 'Generate leads',
      es: 'Generar leads',
    },
    detail: { fr: '4 offres', en: '4 offers', es: '4 ofertas' },
    price: { fr: '\u00c0 partir de 190 \u20ac', en: 'From \u20ac190', es: 'Desde 190 \u20ac' },
  },
  {
    title: {
      fr: 'Intelligence Artificielle',
      en: 'Artificial Intelligence',
      es: 'Inteligencia Artificial',
    },
    description: {
      fr: 'Strat\u00e9gie & transformation',
      en: 'Strategy & transformation',
      es: 'Estrategia y transformaci\u00f3n',
    },
    detail: { fr: '8h formation', en: '8h training', es: '8h formaci\u00f3n' },
    price: { fr: '690 \u20ac', en: '\u20ac690', es: '690 \u20ac' },
  },
  {
    title: { fr: 'Sur Mesure', en: 'Custom', es: 'A Medida' },
    description: {
      fr: 'Programme personnalis\u00e9',
      en: 'Personalized program',
      es: 'Programa personalizado',
    },
    detail: { fr: 'Pour \u00e9quipes', en: 'For teams', es: 'Para equipos' },
    price: { fr: 'Sur devis', en: 'On quote', es: 'Bajo presupuesto' },
  },
]

export function FormationsPreview({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Formations',
      title: 'Formations Mindzy',
      subtitle:
        'Des formations strat\u00e9giques con\u00e7ues pour transformer l\'acquisition et l\'int\u00e9gration de l\'IA en v\u00e9ritables leviers business.',
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
        'Formaciones estrat\u00e9gicas dise\u00f1adas para transformar la adquisici\u00f3n y la integraci\u00f3n de la IA en verdaderas palancas de negocio.',
      cta: 'Ver todas las formaciones',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="w-12 h-px bg-violet-600 mx-auto mb-6" />
          <span className="text-xs font-medium uppercase tracking-widest text-violet-600 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Formation cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {formations.map((formation) => (
            <Link
              key={formation.title.fr}
              href={`/${locale}/formations`}
              className="block group"
            >
              <div className="h-full bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors duration-200">
                  {formation.title[locale]}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {formation.description[locale]}
                </p>

                {/* Detail badge */}
                <span className="inline-flex text-xs text-gray-400 mb-4">
                  {formation.detail[locale]}
                </span>

                {/* Price */}
                <div className="text-lg font-semibold text-gray-900">
                  {formation.price[locale]}
                </div>
              </div>
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
