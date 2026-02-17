import type { Locale } from '@/lib/i18n'

export function FormationsHero({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      badge: 'Formations Mindzy',
      titleStart: 'Formations ',
      titleHighlight: 'stratégiques',
      subtitle:
        'Des formations stratégiques conçues pour transformer l\'acquisition, la performance marketing et l\'intégration de l\'intelligence artificielle en véritables leviers business.',
      extra:
        'Chaque module peut être suivi indépendamment ou combiné dans un programme complet.',
    },
    en: {
      badge: 'Mindzy Training',
      titleStart: 'Strategic ',
      titleHighlight: 'training programs',
      subtitle:
        'Strategic training programs designed to transform acquisition, marketing performance and AI integration into real business levers.',
      extra:
        'Each module can be taken independently or combined into a complete program.',
    },
    es: {
      badge: 'Formaciones Mindzy',
      titleStart: 'Formaciones ',
      titleHighlight: 'estratégicas',
      subtitle:
        'Formaciones estratégicas diseñadas para transformar la adquisición, el rendimiento del marketing y la integración de la inteligencia artificial en verdaderas palancas de negocio.',
      extra:
        'Cada módulo puede seguirse de forma independiente o combinarse en un programa completo.',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-white min-h-[60vh] flex items-center pt-32 pb-20">
      <div className="container-narrow">
        <div className="text-center">
          {/* Eyebrow */}
          <span className="text-violet-600 text-xs font-medium uppercase tracking-widest mb-4 block">
            {t.badge}
          </span>

          {/* Main heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-gray-900 mb-6">
            {t.titleStart}
            <span className="text-violet-600">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-gray-500 mb-6">
            {t.subtitle}
          </p>

          {/* Extra info */}
          <p className="text-sm text-gray-400 mt-6">
            {t.extra}
          </p>

          {/* Thin decorative line */}
          <div className="w-16 h-px bg-gray-200 mx-auto mt-8" />
        </div>
      </div>
    </section>
  )
}
