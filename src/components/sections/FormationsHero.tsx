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
    <section className="relative min-h-[60vh] flex items-center pt-28 pb-20 overflow-hidden" style={{ backgroundColor: '#0A0A1A' }}>
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Radial gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
      />

      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glass pill badge */}
          <div className="animate-fade-in-down mb-10">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-gray-300 backdrop-blur-sm"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {t.badge}
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-white mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t.titleStart}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 40%, #D4AF37 100%)',
              }}
            >
              {t.titleHighlight}
            </span>
          </h1>

          {/* Animated gradient line */}
          <div
            className="mx-auto mb-8 h-px w-48 animate-fade-in-up"
            style={{
              animationDelay: '0.15s',
              background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(212,175,55,0.4), transparent)',
            }}
          />

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl leading-relaxed font-light max-w-2xl mx-auto text-gray-400 mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Extra text in glass pill */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span
              className="inline-block px-6 py-3 rounded-2xl text-sm text-gray-400 backdrop-blur-sm"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {t.extra}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to top, #0F0F1E, transparent)' }}
      />
    </section>
  )
}
