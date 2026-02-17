import type { Locale } from '@/lib/i18n'

const brandingItems = {
  fr: [
    'Positionnement strat\u00e9gique & diff\u00e9renciation',
    'Identit\u00e9 visuelle compl\u00e8te',
    'Direction artistique',
    'Strat\u00e9gie \u00e9ditoriale',
    'Cr\u00e9ation de contenu digital (LinkedIn, Meta, TikTok\u2026)',
    'Structuration d\'un personal branding puissant',
    'Contenu orient\u00e9 autorit\u00e9 & conversion',
  ],
  en: [
    'Strategic positioning & differentiation',
    'Complete visual identity',
    'Art direction',
    'Editorial strategy',
    'Digital content creation (LinkedIn, Meta, TikTok...)',
    'Building a powerful personal brand',
    'Authority & conversion-oriented content',
  ],
  es: [
    'Posicionamiento estrat\u00e9gico y diferenciaci\u00f3n',
    'Identidad visual completa',
    'Direcci\u00f3n art\u00edstica',
    'Estrategia editorial',
    'Creaci\u00f3n de contenido digital (LinkedIn, Meta, TikTok\u2026)',
    'Estructuraci\u00f3n de un personal branding potente',
    'Contenido orientado a autoridad y conversi\u00f3n',
  ],
}

export function BrandingContent({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Branding & Contenu',
      title: 'Branding & Cr\u00e9ation de Contenu',
      subtitle:
        'Nous d\u00e9veloppons des identit\u00e9s fortes et des strat\u00e9gies de contenu orient\u00e9es impact et acquisition.',
      closing:
        'Nous ne cr\u00e9ons pas du contenu pour \u00ab poster \u00bb. Nous construisons des actifs strat\u00e9giques qui g\u00e9n\u00e8rent visibilit\u00e9 et opportunit\u00e9s.',
    },
    en: {
      eyebrow: 'Branding & Content',
      title: 'Branding & Content Creation',
      subtitle:
        'We develop strong identities and content strategies focused on impact and acquisition.',
      closing:
        'We don\'t create content just to "post." We build strategic assets that generate visibility and opportunities.',
    },
    es: {
      eyebrow: 'Branding y Contenido',
      title: 'Branding y Creaci\u00f3n de Contenido',
      subtitle:
        'Desarrollamos identidades fuertes y estrategias de contenido orientadas al impacto y la adquisici\u00f3n.',
      closing:
        'No creamos contenido para \u00abpublicar\u00bb. Construimos activos estrat\u00e9gicos que generan visibilidad y oportunidades.',
    },
  }

  const t = content[locale]

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-anthracite">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glow accents */}
      <div
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(253,164,175,0.3) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 60%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-violet-400 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Items in horizontal strip with pipe separators - editorial feel */}
        <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-3 mb-16 max-w-5xl mx-auto">
          {brandingItems[locale].map((item, i) => (
            <div key={item} className="flex items-center gap-1 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="text-gray-400 text-sm sm:text-base whitespace-nowrap">{item}</span>
              {i < brandingItems[locale].length - 1 && (
                <span className="text-violet-500/40 mx-2 sm:mx-3 select-none">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Closing statement - glass card with violet glow */}
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-8 sm:p-10 lg:p-12 text-center shadow-[0_0_100px_-30px_rgba(124,58,237,0.2)]">
            {/* Decorative quote marks */}
            <span className="absolute top-4 left-6 font-display text-6xl text-violet-500/10 leading-none select-none">&ldquo;</span>
            <span className="absolute bottom-4 right-6 font-display text-6xl text-violet-500/10 leading-none select-none">&rdquo;</span>

            <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed tracking-tight relative z-10">
              {t.closing}
            </p>

            {/* Glow line at bottom */}
            <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
