import { Card } from '@/components/ui/Card'
import { CheckIcon } from '@/components/ui/Button'
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
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cream-50/30 to-white" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
          {brandingItems[locale].map((item, i) => (
            <div
              key={item}
              className="flex items-start gap-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckIcon className="text-violet" />
              </div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <Card variant="gradient" padding="lg" className="max-w-3xl mx-auto text-center">
          <p className="body-large text-anthracite font-medium leading-relaxed">{t.closing}</p>
        </Card>
      </div>
    </section>
  )
}
