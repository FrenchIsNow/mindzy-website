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
    <section className="relative min-h-[70vh] flex items-center pt-28 pb-20 overflow-hidden gradient-mesh-bg">
      {/* Animated gradient mesh blobs - background layer */}
      <div
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-3xl opacity-30 animate-mesh-1"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,108,252,0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-3xl opacity-25 animate-mesh-2"
        style={{
          background:
            'radial-gradient(circle at center, rgba(78,234,219,0.25) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[5%] left-[30%] w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-mesh-3"
        style={{
          background:
            'radial-gradient(circle at center, rgba(196,181,253,0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[15%] right-[20%] w-[350px] h-[350px] rounded-full blur-3xl opacity-25 animate-mesh-1"
        style={{
          background:
            'radial-gradient(circle at center, rgba(107,159,255,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* White inner card container - STAN-style */}
        <div
          className="relative max-w-4xl mx-auto bg-white rounded-4xl p-10 sm:p-14 lg:p-16 overflow-hidden"
          style={{
            boxShadow:
              '0 8px 60px -12px rgba(124, 108, 252, 0.15), 0 2px 20px -4px rgba(0,0,0,0.04)',
          }}
        >
          {/* Animated mesh blobs INSIDE the card */}
          <div
            className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full blur-3xl opacity-30 animate-mesh-2"
            style={{
              background:
                'radial-gradient(circle at center, rgba(124,108,252,0.25) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-[-15%] left-[-5%] w-[250px] h-[250px] rounded-full blur-3xl opacity-25 animate-mesh-3"
            style={{
              background:
                'radial-gradient(circle at center, rgba(78,234,219,0.2) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-[30%] left-[50%] w-[200px] h-[200px] rounded-full blur-3xl opacity-20 animate-mesh-1"
            style={{
              background:
                'radial-gradient(circle at center, rgba(196,181,253,0.25) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 text-center">
            {/* Badge pill */}
            <div className="animate-fade-in-down mb-10">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-violet-200 text-sm font-medium text-violet-600 shadow-soft">
                <svg
                  className="w-4 h-4 text-violet-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {t.badge}
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-anthracite mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {t.titleStart}
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </h1>

            {/* Decorative gradient line */}
            <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
            </div>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl max-w-2xl mx-auto text-gray-600 leading-relaxed font-light animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
