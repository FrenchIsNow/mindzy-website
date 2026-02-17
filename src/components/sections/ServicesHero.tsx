import type { Locale } from '@/lib/i18n'

export function ServicesHero({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      badge: 'Solutions digitales avancées',
      titleStart: 'Développement de ',
      titleHighlight: 'solutions digitales',
      subtitle:
        'Pour les projets ambitieux nécessitant une architecture digitale avancée, scalable et orientée performance.',
      pill: 'Architecture · Performance · Scalabilité',
    },
    en: {
      badge: 'Advanced digital solutions',
      titleStart: 'Development of ',
      titleHighlight: 'digital solutions',
      subtitle:
        'For ambitious projects requiring advanced, scalable, performance-oriented digital architecture.',
      pill: 'Architecture · Performance · Scalability',
    },
    es: {
      badge: 'Soluciones digitales avanzadas',
      titleStart: 'Desarrollo de ',
      titleHighlight: 'soluciones digitales',
      subtitle:
        'Para proyectos ambiciosos que requieren una arquitectura digital avanzada, escalable y orientada al rendimiento.',
      pill: 'Arquitectura · Rendimiento · Escalabilidad',
    },
  }

  const t = content[locale]

  return (
    <section
      className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0ECFF 0%, #E8F0FF 50%, #F5ECFF 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-20 -left-20 w-[450px] h-[450px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(167,139,250,0.25)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(147,197,253,0.2)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(253,164,175,0.15)', animationDelay: '4s' }}
      />

      <div className="container-narrow relative z-10">
        <div className="text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-violet-500">
              {t.badge}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-[#1E1B4B] mb-8">
            {t.titleStart}
            <span className="text-violet-600">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.subtitle}
          </p>

          {/* Frosted glass pill */}
          <div className="inline-flex bg-white/50 backdrop-blur-sm border border-white/60 rounded-full px-5 py-2 text-sm text-gray-500">
            {t.pill}
          </div>
        </div>
      </div>
    </section>
  )
}
