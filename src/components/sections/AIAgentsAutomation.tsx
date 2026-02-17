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
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F3FF 0%, #EEF2FF 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-10 -right-20 w-[400px] h-[400px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(167,139,250,0.25)' }}
      />
      <div
        className="absolute bottom-20 -left-10 w-[350px] h-[350px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(165,243,252,0.12)', animationDelay: '3s' }}
      />

      <div className="container-wide relative z-10">
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

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Agents card */}
          <div
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 p-6 lg:p-8 transition-all duration-300 hover:bg-white/70 hover:shadow-lg animate-fade-in-up"
            style={{ boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1B4B]">{t.agentsTitle}</h3>
            </div>
            <ul className="space-y-3">
              {agentsItems[locale].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advanced Automation card */}
          <div
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 p-6 lg:p-8 transition-all duration-300 hover:bg-white/70 hover:shadow-lg animate-fade-in-up"
            style={{
              boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)',
              animationDelay: '150ms',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1B4B]">{t.automationTitle}</h3>
            </div>
            <ul className="space-y-3">
              {automationItems[locale].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
