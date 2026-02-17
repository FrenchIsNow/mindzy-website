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
    <section className="gradient-mesh-bg relative min-h-[60vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Animated gradient mesh blobs - outer background */}
      <div
        className="absolute top-10 left-[10%] w-[400px] h-[400px] rounded-full blur-3xl opacity-30 animate-mesh-1"
        style={{ background: 'radial-gradient(circle, rgba(124,108,252,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-[15%] w-[350px] h-[350px] rounded-full blur-3xl opacity-25 animate-mesh-2"
        style={{ background: 'radial-gradient(circle, rgba(78,234,219,0.25) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20 animate-mesh-3"
        style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.3) 0%, transparent 70%)' }}
      />

      <div className="container-wide relative">
        {/* White card container */}
        <div
          className="relative max-w-4xl mx-auto rounded-4xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 8px 40px -12px rgba(124, 108, 252, 0.12), 0 2px 12px -4px rgba(0,0,0,0.04)',
          }}
        >
          {/* Animated gradient mesh blobs inside card */}
          <div
            className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full blur-3xl opacity-25 animate-mesh-1 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,108,252,0.3) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-[250px] h-[250px] rounded-full blur-3xl opacity-20 animate-mesh-2 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(78,234,219,0.25) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-3xl opacity-15 animate-mesh-3 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(126,236,216,0.2) 0%, transparent 70%)' }}
          />

          <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div className="text-center">
              {/* Glass pill badge */}
              <div className="animate-fade-in-down mb-10">
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-violet-600 bg-white border border-violet-200"
                  style={{
                    boxShadow: '0 2px 8px -2px rgba(124, 58, 237, 0.1)',
                  }}
                >
                  <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-anthracite mb-6 animate-fade-in-up"
                style={{ animationDelay: '0.1s' }}
              >
                {t.titleStart}
                <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  {t.titleHighlight}
                </span>
              </h1>

              {/* Animated gradient line */}
              <div
                className="mx-auto mb-8 h-px w-48 animate-fade-in-up"
                style={{
                  animationDelay: '0.15s',
                  background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(78,234,219,0.3), transparent)',
                }}
              />

              {/* Subtitle */}
              <p
                className="text-xl sm:text-2xl leading-relaxed font-light max-w-2xl mx-auto text-gray-600 mb-6 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                {t.subtitle}
              </p>

              {/* Extra text in light pill */}
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <span className="inline-block px-6 py-3 rounded-2xl text-sm text-gray-500 bg-violet-50/60 border border-violet-100">
                  {t.extra}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
