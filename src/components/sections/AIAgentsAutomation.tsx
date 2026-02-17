import { Card, CardTitle } from '@/components/ui/Card'
import { CheckIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const agentsItems = {
  fr: [
    'Agents conversationnels internes',
    'Agents d\'analyse de données',
    'Agents commerciaux automatisés',
    'IA pour support client',
    'Systèmes multi-agents spécialisés',
  ],
  en: [
    'Internal conversational agents',
    'Data analysis agents',
    'Automated sales agents',
    'AI for customer support',
    'Specialized multi-agent systems',
  ],
  es: [
    'Agentes conversacionales internos',
    'Agentes de análisis de datos',
    'Agentes comerciales automatizados',
    'IA para soporte al cliente',
    'Sistemas multi-agentes especializados',
  ],
}

const automationItems = {
  fr: [
    'Systèmes complexes multi-outils',
    'Architecture no-code / low-code / full-code',
    'Orchestration d\'API',
    'Centralisation et structuration de la data',
    'Automatisation complète des workflows',
  ],
  en: [
    'Complex multi-tool systems',
    'No-code / low-code / full-code architecture',
    'API orchestration',
    'Data centralization and structuring',
    'Complete workflow automation',
  ],
  es: [
    'Sistemas complejos multi-herramientas',
    'Arquitectura no-code / low-code / full-code',
    'Orquestación de APIs',
    'Centralización y estructuración de datos',
    'Automatización completa de workflows',
  ],
}

export function AIAgentsAutomation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Intelligence Artificielle',
      title: 'Agents IA & Automatisation Avancée',
      subtitle: 'Nous construisons des systèmes intelligents intégrés directement à votre activité.',
      agentsTitle: 'Agents IA',
      automationTitle: 'Automatisation avancée',
    },
    en: {
      eyebrow: 'Artificial Intelligence',
      title: 'AI Agents & Advanced Automation',
      subtitle: 'We build intelligent systems integrated directly into your business.',
      agentsTitle: 'AI Agents',
      automationTitle: 'Advanced automation',
    },
    es: {
      eyebrow: 'Inteligencia Artificial',
      title: 'Agentes IA y Automatización Avanzada',
      subtitle: 'Construimos sistemas inteligentes integrados directamente en su actividad.',
      agentsTitle: 'Agentes IA',
      automationTitle: 'Automatización avanzada',
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding relative overflow-hidden bg-cream-50/50">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage-100/30 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Agents card */}
          <Card variant="default" padding="none" className="overflow-hidden animate-fade-in-up">
            <div className="h-2 bg-gradient-to-r from-violet-500 to-violet-700" />
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <CardTitle as="h3">{t.agentsTitle}</CardTitle>
              </div>
              <ul className="space-y-4">
                {agentsItems[locale].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckIcon className="text-violet" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Automation card */}
          <Card
            variant="default"
            padding="none"
            className="overflow-hidden animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="h-2 bg-gradient-to-r from-sage-500 to-sage-700" />
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center text-sage-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <CardTitle as="h3">{t.automationTitle}</CardTitle>
              </div>
              <ul className="space-y-4">
                {automationItems[locale].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckIcon className="text-sage-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
