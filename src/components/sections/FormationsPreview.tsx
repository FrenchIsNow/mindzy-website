import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const formations = [
  {
    gradient: 'from-violet-500 to-violet-700',
    title: { fr: 'LinkedIn', en: 'LinkedIn', es: 'LinkedIn' },
    description: {
      fr: 'Syst\u00e8me d\'acquisition complet',
      en: 'Complete acquisition system',
      es: 'Sistema de adquisici\u00f3n completo',
    },
    detail: { fr: '3 packs', en: '3 packs', es: '3 packs' },
    price: { fr: '\u00c0 partir de 190 \u20ac', en: 'From \u20ac190', es: 'Desde 190 \u20ac' },
    number: '01',
  },
  {
    gradient: 'from-rose-400 to-rose-500',
    title: { fr: 'Meta & TikTok', en: 'Meta & TikTok', es: 'Meta y TikTok' },
    description: {
      fr: 'G\u00e9n\u00e9rer des leads',
      en: 'Generate leads',
      es: 'Generar leads',
    },
    detail: { fr: '4 offres', en: '4 offers', es: '4 ofertas' },
    price: { fr: '\u00c0 partir de 190 \u20ac', en: 'From \u20ac190', es: 'Desde 190 \u20ac' },
    number: '02',
  },
  {
    gradient: 'from-cyan-500 to-cyan-700',
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
    number: '03',
  },
  {
    gradient: 'from-gold to-gold-dark',
    title: { fr: 'Sur Mesure', en: 'Custom', es: 'A Medida' },
    description: {
      fr: 'Programme personnalis\u00e9',
      en: 'Personalized program',
      es: 'Programa personalizado',
    },
    detail: { fr: 'Pour \u00e9quipes', en: 'For teams', es: 'Para equipos' },
    price: { fr: 'Sur devis', en: 'On quote', es: 'Bajo presupuesto' },
    number: '04',
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
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-[#0A0A1A]">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-[20%] right-[10%] w-[400px] h-[400px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 60%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Formation cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {formations.map((formation, i) => (
            <Link key={formation.title.fr} href={`/${locale}/formations`} className="block group">
              <div
                className="relative h-full rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] overflow-hidden transition-all duration-500 hover:border-violet-500/30 hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.2)] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Large background number */}
                <span className="absolute top-4 right-4 font-display text-7xl font-semibold text-white/[0.04] leading-none select-none pointer-events-none">
                  {formation.number}
                </span>

                {/* Animated gradient top line */}
                <div
                  className={`h-px w-full bg-gradient-to-r ${formation.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-6 pt-8">
                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-white tracking-tight mb-2 group-hover:text-violet-300 transition-colors duration-300">
                    {formation.title[locale]}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {formation.description[locale]}
                  </p>

                  {/* Detail badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-gray-400">
                      {formation.detail[locale]}
                    </span>
                  </div>

                  {/* Price in gold */}
                  <div className="text-[#D4AF37] font-semibold text-lg tracking-tight">
                    {formation.price[locale]}
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href={`/${locale}/formations`}>
            <Button variant="gold" size="lg" icon={<ArrowIcon />} className="shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)]">
              {t.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
