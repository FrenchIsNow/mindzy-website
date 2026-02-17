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
    <section className="relative min-h-[70vh] flex items-center pt-28 pb-20 overflow-hidden bg-[#0A0A1A]">
      {/* Animated gradient mesh - radial orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 animate-pulse-slow"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[20%] right-[15%] w-[400px] h-[400px] opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 60%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Subtle grid on dark */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
        }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glass pill badge */}
          <div className="animate-fade-in-down mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] text-sm font-medium text-violet-300 shadow-[0_0_30px_-10px_rgba(124,58,237,0.3)]">
              <svg
                className="w-4 h-4 text-violet-400"
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

          {/* Main heading - MASSIVE */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-white mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t.titleStart}
            <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-[#D4AF37] bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>

          {/* Animated glow line */}
          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse-slow" />
          </div>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl max-w-2xl mx-auto text-gray-400 leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F1E] to-transparent" />
    </section>
  )
}
