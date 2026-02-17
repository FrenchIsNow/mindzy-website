import { Badge } from '@/components/ui/Badge'
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
    <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-white" />

      {/* Animated gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl animate-blob" />
      <div
        className="absolute top-40 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: '4s' }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Decorative floating dots */}
      <div
        className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-violet animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute top-1/3 left-[10%] w-2 h-2 rounded-full bg-gold animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-1/3 right-[20%] w-4 h-4 rounded-full bg-sage-400 animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in-down mb-8">
            <Badge variant="gold" className="shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {t.badge}
            </Badge>
          </div>

          {/* Main heading */}
          <h1
            className="heading-display text-anthracite mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t.titleStart}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="body-xl max-w-2xl mx-auto text-gray-600 mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Extra line */}
          <p
            className="body-large max-w-xl mx-auto text-gray-500 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {t.extra}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
