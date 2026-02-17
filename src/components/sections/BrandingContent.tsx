import type { Locale } from '@/lib/i18n'

const brandingItems = {
  fr: [
    'Positionnement stratégique & différenciation',
    'Identité visuelle complète',
    'Direction artistique',
    'Stratégie éditoriale',
    'Création de contenu digital (LinkedIn, Meta, TikTok…)',
    'Structuration d\'un personal branding puissant',
    'Contenu orienté autorité & conversion',
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
    'Posicionamiento estratégico y diferenciación',
    'Identidad visual completa',
    'Dirección artística',
    'Estrategia editorial',
    'Creación de contenido digital (LinkedIn, Meta, TikTok…)',
    'Estructuración de un personal branding potente',
    'Contenido orientado a autoridad y conversión',
  ],
}

export function BrandingContent({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Branding & Contenu',
      title: 'Branding & Création de Contenu',
      subtitle:
        'Nous développons des identités fortes et des stratégies de contenu orientées impact et acquisition.',
      closing:
        'Nous ne créons pas du contenu pour « poster ». Nous construisons des actifs stratégiques qui génèrent visibilité et opportunités.',
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
      title: 'Branding y Creación de Contenido',
      subtitle:
        'Desarrollamos identidades fuertes y estrategias de contenido orientadas al impacto y la adquisición.',
      closing:
        'No creamos contenido para «publicar». Construimos activos estratégicos que generan visibilidad y oportunidades.',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-narrow">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-violet-500 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-[#1E1B4B] mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {brandingItems[locale].map((item) => (
            <span
              key={item}
              className="inline-flex bg-white/60 backdrop-blur-sm border border-violet-100/50 rounded-full px-4 py-2 text-sm text-[#1E1B4B]"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Closing quote */}
        <div
          className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 p-8 lg:p-10 text-center max-w-3xl mx-auto"
          style={{ boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)' }}
        >
          <div className="w-12 h-0.5 bg-violet-400 mx-auto mb-6" />
          <p className="text-xl lg:text-2xl text-[#1E1B4B] font-medium leading-relaxed">
            {t.closing}
          </p>
        </div>
      </div>
    </section>
  )
}
