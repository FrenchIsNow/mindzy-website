import type { Locale } from '@/lib/i18n'

const agentsItems = {
  fr: [
    'Agents conversationnels internes',
    'Agents d\'analyse de donn\u00e9es',
    'Agents commerciaux automatis\u00e9s',
    'IA pour support client',
    'Syst\u00e8mes multi-agents sp\u00e9cialis\u00e9s',
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
    'Agentes de an\u00e1lisis de datos',
    'Agentes comerciales automatizados',
    'IA para soporte al cliente',
    'Sistemas multi-agentes especializados',
  ],
}

const automationItems = {
  fr: [
    'Syst\u00e8mes complexes multi-outils',
    'Architecture no-code / low-code / full-code',
    'Orchestration d\'API',
    'Centralisation et structuration de la data',
    'Automatisation compl\u00e8te des workflows',
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
    'Orquestaci\u00f3n de APIs',
    'Centralizaci\u00f3n y estructuraci\u00f3n de datos',
    'Automatizaci\u00f3n completa de workflows',
  ],
}

export function AIAgentsAutomation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Intelligence Artificielle',
      title: 'Agents IA & Automatisation Avanc\u00e9e',
      subtitle: 'Nous construisons des syst\u00e8mes intelligents int\u00e9gr\u00e9s directement \u00e0 votre activit\u00e9.',
      agentsTitle: 'Agents IA',
      automationTitle: 'Automatisation avanc\u00e9e',
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
      title: 'Agentes IA y Automatizaci\u00f3n Avanzada',
      subtitle: 'Construimos sistemas inteligentes integrados directamente en su actividad.',
      agentsTitle: 'Agentes IA',
      automationTitle: 'Automatizaci\u00f3n avanzada',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-white py-24 lg:py-32">
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

        {/* AI Agents section */}
        <div className="mb-0">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t.agentsTitle}</h3>
          <ul className="space-y-3">
            {agentsItems[locale].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-2 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-12" />

        {/* Advanced Automation section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t.automationTitle}</h3>
          <ul className="space-y-3">
            {automationItems[locale].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-2 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
