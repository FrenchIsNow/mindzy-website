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
    <section className="relative py-24 sm:py-28 lg:py-32 overflow-hidden bg-violet-50/30">
      {/* Animated gradient mesh blobs */}
      <div
        className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full blur-3xl opacity-25 animate-mesh-1"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,108,252,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-3xl opacity-20 animate-mesh-3"
        style={{
          background:
            'radial-gradient(circle at center, rgba(126,236,216,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20 animate-mesh-2"
        style={{
          background:
            'radial-gradient(circle at center, rgba(196,181,253,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-violet-600 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-anthracite mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* AI Agents - Split screen: editorial left, card right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Editorial typography */}
          <div className="animate-fade-in-up">
            <div className="relative">
              <span className="font-display text-7xl sm:text-8xl lg:text-9xl font-semibold text-violet-200 leading-none select-none">
                Agents
              </span>
              <span
                className="block font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent -mt-4 sm:-mt-6"
              >
                IA
              </span>
            </div>
          </div>

          {/* White card with items */}
          <div
            className="rounded-3xl bg-white p-8 lg:p-10 animate-fade-in-up"
            style={{
              animationDelay: '0.15s',
              boxShadow: '0 8px 40px -12px rgba(124, 108, 252, 0.12), 0 2px 12px -4px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-violet-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-anthracite tracking-tight">{t.agentsTitle}</h3>
            </div>
            <ul className="space-y-4">
              {agentsItems[locale].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2.5 flex-shrink-0" />
                  <span className="text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative gradient divider */}
        <div className="flex justify-center mb-16 lg:mb-24">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
        </div>

        {/* Automation - Split screen: card left, editorial right (mirrored) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* White card with items */}
          <div
            className="rounded-3xl bg-white p-8 lg:p-10 animate-fade-in-up order-2 lg:order-1"
            style={{
              boxShadow: '0 8px 40px -12px rgba(124, 108, 252, 0.12), 0 2px 12px -4px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage-50 to-sage-100 flex items-center justify-center text-sage-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-anthracite tracking-tight">{t.automationTitle}</h3>
            </div>
            <ul className="space-y-4">
              {automationItems[locale].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-2.5 flex-shrink-0" />
                  <span className="text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial typography - mirrored */}
          <div className="animate-fade-in-up order-1 lg:order-2 lg:text-right" style={{ animationDelay: '0.15s' }}>
            <div className="relative">
              <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-semibold text-sage-100 leading-none select-none">
                Auto
              </span>
              <span
                className="block font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight bg-gradient-to-r from-sage-600 via-sage-500 to-sage-400 bg-clip-text text-transparent -mt-2 sm:-mt-4"
              >
                mation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
