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
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="container-narrow">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="w-12 h-px bg-violet-600 mx-auto mb-6" />
          <span className="text-xs font-medium uppercase tracking-widest text-violet-600 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {brandingItems[locale].map((item) => (
            <span
              key={item}
              className="inline-flex px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Closing quote */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-12 h-px bg-violet-600 mx-auto mb-6" />
          <p className="text-xl lg:text-2xl text-gray-900 font-medium leading-relaxed">
            {t.closing}
          </p>
        </div>
      </div>
    </section>
  )
}
