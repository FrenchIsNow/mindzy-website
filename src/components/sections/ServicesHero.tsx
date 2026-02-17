import type { Locale } from '@/lib/i18n'

export function ServicesHero({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      badge: 'Solutions digitales avanc\u00e9es',
      titleStart: 'D\u00e9veloppement de ',
      titleHighlight: 'solutions digitales',
      subtitle:
        'Pour les projets ambitieux n\u00e9cessitant une architecture digitale avanc\u00e9e, scalable et orient\u00e9e performance.',
    },
    en: {
      badge: 'Advanced digital solutions',
      titleStart: 'Development of ',
      titleHighlight: 'digital solutions',
      subtitle:
        'For ambitious projects requiring advanced, scalable, performance-oriented digital architecture.',
    },
    es: {
      badge: 'Soluciones digitales avanzadas',
      titleStart: 'Desarrollo de ',
      titleHighlight: 'soluciones digitales',
      subtitle:
        'Para proyectos ambiciosos que requieren una arquitectura digital avanzada, escalable y orientada al rendimiento.',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-white min-h-[70vh] flex items-center pt-32 pb-20">
      <div className="container-narrow">
        <div className="text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
            <span className="text-xs font-medium uppercase tracking-widest text-violet-600">
              {t.badge}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-gray-900 mb-8">
            {t.titleStart}
            <span className="text-violet-600">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Thin decorative line */}
          <div className="w-16 h-px bg-gray-200 mx-auto mt-10" />
        </div>
      </div>
    </section>
  )
}
