import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const formations = [
  {
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
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F0ECFF 50%, #F5F0FF 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-16 -right-16 w-[400px] h-[400px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(167,139,250,0.25)' }}
      />
      <div
        className="absolute bottom-10 -left-10 w-[350px] h-[350px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(147,197,253,0.2)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(253,164,175,0.15)', animationDelay: '4s' }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-violet-500 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-[#1E1B4B] mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Formation cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {formations.map((formation, i) => (
            <Link
              key={formation.title.fr}
              href={`/${locale}/formations`}
              className="block group"
            >
              <div
                className="h-full bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 p-6 transition-all duration-300 hover:bg-white/70 hover:shadow-lg animate-fade-in-up"
                style={{
                  boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-[#1E1B4B] mb-2 group-hover:text-violet-600 transition-colors duration-200">
                  {formation.title[locale]}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {formation.description[locale]}
                </p>

                {/* Detail badge */}
                <span className="inline-flex bg-violet-50/50 text-violet-600 text-xs rounded-full px-3 py-1 mb-4">
                  {formation.detail[locale]}
                </span>

                {/* Price */}
                <div className="text-lg font-semibold text-[#D4AF37]">
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
