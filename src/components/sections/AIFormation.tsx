import { Card, CardTitle } from '@/components/ui/Card'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto mb-6">{t.subtitle}</p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <Badge variant="primary">{t.duration}</Badge>
            <Badge variant="default">{t.format}</Badge>
          </div>
          <div>
            <span className="font-display text-4xl font-semibold text-anthracite">{t.price} &euro;</span>
          </div>
        </div>

        {/* Sessions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {sessions.map((session, i) => (
            <Card
              key={session.number}
              variant="default"
              padding="none"
              className="overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-cyan-700" />
              <div className="p-6 lg:p-8">
                {/* Session number */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-cyan-700">{session.number}</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-cyan-600 uppercase tracking-wider">{t.sessionLabel} {session.number}</span>
                    <CardTitle as="h3" className="text-lg">{session.title[locale]}</CardTitle>
                  </div>
                </div>

                {/* Items */}
                <ul className="space-y-3 mb-5">
                  {session.items[locale].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 mt-0.5 text-cyan-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Result */}
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <p className="text-sm font-medium text-anthracite">
                    <span className="text-cyan-700">{t.resultLabel} :</span> {session.result[locale]}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="xl" icon={<ArrowIcon />}>
              {t.cta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
