import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'
import { config } from '@/lib/config'

interface AISession {
  number: number
  title: Record<Locale, string>
  items: Record<Locale, string[]>
  result: Record<Locale, string>
}

const sessions: AISession[] = [
  {
    number: 1,
    title: {
      fr: 'Diagnostic & Opportunités Stratégiques',
      en: 'Diagnosis & Strategic Opportunities',
      es: 'Diagnóstico y Oportunidades Estratégicas',
    },
    items: {
      fr: [
        'Analyse rapide des process existants',
        'Identification des tâches automatisables',
        'Priorisation des cas d\'usage à fort ROI',
      ],
      en: [
        'Rapid analysis of existing processes',
        'Identification of automatable tasks',
        'Prioritization of high-ROI use cases',
      ],
      es: [
        'Análisis rápido de los procesos existentes',
        'Identificación de tareas automatizables',
        'Priorización de casos de uso de alto ROI',
      ],
    },
    result: {
      fr: 'Roadmap IA claire et priorisée',
      en: 'Clear and prioritized AI roadmap',
      es: 'Hoja de ruta IA clara y priorizada',
    },
  },
  {
    number: 2,
    title: {
      fr: 'Conception de l\'Architecture IA',
      en: 'AI Architecture Design',
      es: 'Diseño de la Arquitectura IA',
    },
    items: {
      fr: [
        'Choix des outils adaptés',
        'Structuration des workflows',
        'Connexion aux outils existants',
        'Définition des étapes de déploiement',
      ],
      en: [
        'Selection of appropriate tools',
        'Workflow structuring',
        'Connection to existing tools',
        'Deployment stage definition',
      ],
      es: [
        'Selección de herramientas adecuadas',
        'Estructuración de workflows',
        'Conexión con herramientas existentes',
        'Definición de etapas de despliegue',
      ],
    },
    result: {
      fr: 'Blueprint d\'intégration IA prêt à déployer',
      en: 'AI integration blueprint ready to deploy',
      es: 'Blueprint de integración IA listo para desplegar',
    },
  },
  {
    number: 3,
    title: {
      fr: 'Implémentation Opérationnelle',
      en: 'Operational Implementation',
      es: 'Implementación Operacional',
    },
    items: {
      fr: [
        'Automatisation marketing et commerciale',
        'Mise en place d\'assistants internes',
        'Structuration base de connaissance',
        'Workflows multi-outils',
      ],
      en: [
        'Marketing and sales automation',
        'Internal assistant setup',
        'Knowledge base structuring',
        'Multi-tool workflows',
      ],
      es: [
        'Automatización de marketing y ventas',
        'Implementación de asistentes internos',
        'Estructuración de base de conocimiento',
        'Workflows multi-herramientas',
      ],
    },
    result: {
      fr: 'Premier système IA opérationnel',
      en: 'First operational AI system',
      es: 'Primer sistema IA operativo',
    },
  },
  {
    number: 4,
    title: {
      fr: 'Optimisation & Industrialisation',
      en: 'Optimization & Industrialization',
      es: 'Optimización e Industrialización',
    },
    items: {
      fr: [
        'Mesure des gains',
        'Amélioration continue',
        'Plan d\'évolution 30 à 90 jours',
      ],
      en: [
        'Gains measurement',
        'Continuous improvement',
        '30 to 90-day evolution plan',
      ],
      es: [
        'Medición de resultados',
        'Mejora continua',
        'Plan de evolución de 30 a 90 días',
      ],
    },
    result: {
      fr: 'Système IA intégré et évolutif',
      en: 'Integrated and scalable AI system',
      es: 'Sistema IA integrado y escalable',
    },
  },
]

export function AIFormation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Intelligence Artificielle',
      title: 'FORMATION INTELLIGENCE ARTIFICIELLE',
      subtitle:
        'Formation avancée orientée intégration concrète de l\'IA dans les processus métier.',
      duration: '8 heures -- 4 sessions de 2h',
      format: 'Live + ateliers + frameworks + roadmap',
      price: '690',
      sessionLabel: 'Session',
      resultLabel: 'Résultat',
      cta: 'Réserver un appel',
      durationShort: '8h',
      sessionsShort: '4 sessions',
    },
    en: {
      eyebrow: 'Artificial Intelligence',
      title: 'ARTIFICIAL INTELLIGENCE TRAINING',
      subtitle:
        'Advanced training focused on concrete AI integration into business processes.',
      duration: '8 hours -- 4 sessions of 2h',
      format: 'Live + workshops + frameworks + roadmap',
      price: '690',
      sessionLabel: 'Session',
      resultLabel: 'Result',
      cta: 'Book a call',
      durationShort: '8h',
      sessionsShort: '4 sessions',
    },
    es: {
      eyebrow: 'Inteligencia Artificial',
      title: 'FORMACIÓN EN INTELIGENCIA ARTIFICIAL',
      subtitle:
        'Formación avanzada orientada a la integración concreta de la IA en los procesos de negocio.',
      duration: '8 horas -- 4 sesiones de 2h',
      format: 'En vivo + talleres + frameworks + hoja de ruta',
      price: '690',
      sessionLabel: 'Sesión',
      resultLabel: 'Resultado',
      cta: 'Reservar una llamada',
      durationShort: '8h',
      sessionsShort: '4 sesiones',
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-6">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-violet-600 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-anthracite mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-gray-600 mb-8">
            {t.subtitle}
          </p>
        </div>

        {/* Price display - large centered with flanking badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up">
          {/* Duration badge */}
          <span className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-600">
            {t.durationShort}
          </span>

          {/* Price */}
          <span
            className="font-display text-6xl sm:text-7xl font-semibold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #D4AF37 0%, #F4E5B0 50%, #D4AF37 100%)',
            }}
          >
            {t.price} &euro;
          </span>

          {/* Sessions badge */}
          <span className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-600">
            {t.sessionsShort}
          </span>
        </div>

        {/* Mobile duration/sessions display */}
        <div className="flex sm:hidden items-center justify-center gap-3 -mt-10 mb-12">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
            {t.durationShort}
          </span>
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
            {t.sessionsShort}
          </span>
        </div>

        {/* Vertical timeline */}
        <div className="max-w-5xl mx-auto mb-16 relative">
          {/* Connecting line - center on desktop, left on mobile */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-200 via-violet-300 to-violet-200" />

          <div className="space-y-12">
            {sessions.map((session, i) => {
              const isEven = i % 2 === 0
              return (
                <div
                  key={session.number}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10 bg-violet-500"
                    style={{
                      boxShadow: '0 0 12px rgba(124,58,237,0.3)',
                      top: '2rem',
                    }}
                  />

                  <div className={`md:flex items-start gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    {/* Session number side */}
                    <div className={`hidden md:flex md:w-1/2 ${isEven ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                      <span className="font-display text-6xl font-bold select-none text-gray-100">
                        {String(session.number).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Card side */}
                    <div className={`md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} pl-14 md:pl-12`}>
                      <div
                        className="bg-white rounded-2xl p-6 transition-all duration-300"
                        style={{
                          boxShadow: '0 8px 40px -12px rgba(124, 108, 252, 0.12), 0 2px 12px -4px rgba(0,0,0,0.04)',
                        }}
                      >
                        {/* Session header */}
                        <div className="mb-4">
                          <span className="text-xs font-medium text-violet-600 uppercase tracking-wider">
                            {t.sessionLabel} {session.number}
                          </span>
                          <h3 className="font-display text-lg font-semibold text-anthracite tracking-tight mt-1">
                            {session.title[locale]}
                          </h3>
                        </div>

                        {/* Items with violet dots */}
                        <ul className="space-y-2.5 mb-5">
                          {session.items[locale].map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Result */}
                        <div className="p-3 rounded-xl bg-violet-50 border border-violet-200">
                          <p className="text-sm font-medium">
                            <span className="text-violet-600">{t.resultLabel} :</span>{' '}
                            <span className="text-gray-700">{session.result[locale]}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="xl" icon={<ArrowIcon />}>
              {t.cta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
