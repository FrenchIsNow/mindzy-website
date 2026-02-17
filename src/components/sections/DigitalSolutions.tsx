import type { Locale } from '@/lib/i18n'

const solutions = [
  {
    icon: 'code',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    title: { fr: 'Applications web', en: 'Web applications', es: 'Aplicaciones web' },
    description: {
      fr: 'Applications performantes et \u00e9volutives sur mesure',
      en: 'High-performance, scalable custom applications',
      es: 'Aplicaciones de alto rendimiento y escalables a medida',
    },
  },
  {
    icon: 'phone',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    title: { fr: 'Applications mobiles', en: 'Mobile applications', es: 'Aplicaciones m\u00f3viles' },
    description: {
      fr: 'Apps iOS et Android natives ou cross-platform',
      en: 'Native or cross-platform iOS and Android apps',
      es: 'Apps iOS y Android nativas o multiplataforma',
    },
  },
  {
    icon: 'cloud',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: { fr: 'Plateformes SaaS', en: 'SaaS platforms', es: 'Plataformas SaaS' },
    description: {
      fr: 'Solutions cloud multi-tenant scalables',
      en: 'Scalable multi-tenant cloud solutions',
      es: 'Soluciones cloud multi-tenant escalables',
    },
  },
  {
    icon: 'store',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    title: { fr: 'Marketplaces', en: 'Marketplaces', es: 'Marketplaces' },
    description: {
      fr: 'Plateformes multi-vendeurs et \u00e9cosyst\u00e8mes',
      en: 'Multi-vendor platforms and ecosystems',
      es: 'Plataformas multi-vendedor y ecosistemas',
    },
  },
  {
    icon: 'grid',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    title: { fr: 'Dashboards strat\u00e9giques', en: 'Strategic dashboards', es: 'Dashboards estrat\u00e9gicos' },
    description: {
      fr: 'Interfaces priv\u00e9es et outils de pilotage',
      en: 'Private interfaces and management tools',
      es: 'Interfaces privadas y herramientas de gesti\u00f3n',
    },
  },
  {
    icon: 'globe',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: { fr: 'Sites web sur mesure', en: 'Custom websites', es: 'Sitios web a medida' },
    description: {
      fr: 'Corporate, premium, orient\u00e9s conversion',
      en: 'Corporate, premium, conversion-oriented',
      es: 'Corporativos, premium, orientados a conversi\u00f3n',
    },
  },
]

const pillars = {
  fr: [
    'Maximiser l\'exp\u00e9rience utilisateur',
    'Optimiser la conversion',
    'Assurer la scalabilit\u00e9',
    'Garantir une architecture technique robuste',
  ],
  en: [
    'Maximize user experience',
    'Optimize conversion',
    'Ensure scalability',
    'Guarantee a robust technical architecture',
  ],
  es: [
    'Maximizar la experiencia del usuario',
    'Optimizar la conversi\u00f3n',
    'Asegurar la escalabilidad',
    'Garantizar una arquitectura t\u00e9cnica robusta',
  ],
}

export function DigitalSolutions({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Solutions digitales',
      title: 'D\u00e9veloppement de Solutions Digitales',
      subtitle: 'Nous concevons des infrastructures digitales sur mesure adapt\u00e9es \u00e0 vos objectifs business.',
    },
    en: {
      eyebrow: 'Digital solutions',
      title: 'Digital Solutions Development',
      subtitle: 'We design custom digital infrastructures tailored to your business objectives.',
    },
    es: {
      eyebrow: 'Soluciones digitales',
      title: 'Desarrollo de Soluciones Digitales',
      subtitle: 'Dise\u00f1amos infraestructuras digitales a medida adaptadas a sus objetivos de negocio.',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="container-wide">
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

        {/* Solution cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map((solution) => (
            <div
              key={solution.icon}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg ${solution.iconBg} flex items-center justify-center ${solution.iconColor} mb-4`}>
                <SolutionIcon name={solution.icon} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {solution.title[locale]}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {solution.description[locale]}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-sm text-gray-500">
          {pillars[locale].map((pillar, i) => (
            <span key={pillar} className="flex items-center gap-2">
              {pillar}
              {i < pillars[locale].length - 1 && (
                <span className="text-gray-300 select-none">&middot;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionIcon({ name }: { name: string }) {
  const size = 'w-5 h-5'
  switch (name) {
    case 'code':
      return (
        <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    case 'phone':
      return (
        <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )
    case 'cloud':
      return (
        <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      )
    case 'store':
      return (
        <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      )
    case 'grid':
      return (
        <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      )
    case 'globe':
      return (
        <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      )
    default:
      return null
  }
}
