import { Badge } from '@/components/ui/Badge'
import type { Locale } from '@/lib/i18n'

export function ServicesHero({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      badge: 'Solutions digitales avancées',
      titleStart: 'Développement de ',
      titleHighlight: 'solutions digitales',
      subtitle:
        'Pour les projets ambitieux nécessitant une architecture digitale avancée, scalable et orientée performance.',
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
    <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
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
            className="body-xl max-w-2xl mx-auto text-gray-600 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
