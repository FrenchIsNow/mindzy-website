import type { Locale } from '@/lib/i18n'

const solutions = [
  {
    icon: 'code',
    gradient: 'from-violet-500 to-violet-700',
    lightBg: 'from-violet-50 to-violet-100',
    borderColor: 'border-l-violet-400',
    title: { fr: 'Applications web', en: 'Web applications', es: 'Aplicaciones web' },
    description: {
      fr: 'Applications performantes et \u00e9volutives sur mesure',
      en: 'High-performance, scalable custom applications',
      es: 'Aplicaciones de alto rendimiento y escalables a medida',
    },
  },
  {
    icon: 'phone',
    gradient: 'from-sage-500 to-sage-700',
    lightBg: 'from-sage-50 to-sage-100',
    borderColor: 'border-l-sage-400',
    title: { fr: 'Applications mobiles', en: 'Mobile applications', es: 'Aplicaciones m\u00f3viles' },
    description: {
      fr: 'Apps iOS et Android natives ou cross-platform',
      en: 'Native or cross-platform iOS and Android apps',
      es: 'Apps iOS y Android nativas o multiplataforma',
    },
  },
  {
    icon: 'cloud',
    gradient: 'from-gold to-gold-dark',
    lightBg: 'from-amber-50 to-amber-100',
    borderColor: 'border-l-gold',
    title: { fr: 'Plateformes SaaS', en: 'SaaS platforms', es: 'Plataformas SaaS' },
    description: {
      fr: 'Solutions cloud multi-tenant scalables',
      en: 'Scalable multi-tenant cloud solutions',
      es: 'Soluciones cloud multi-tenant escalables',
    },
  },
  {
    icon: 'store',
    gradient: 'from-rose-400 to-rose-500',
    lightBg: 'from-rose-50 to-rose-100',
    borderColor: 'border-l-rose-400',
    title: { fr: 'Marketplaces', en: 'Marketplaces', es: 'Marketplaces' },
    description: {
      fr: 'Plateformes multi-vendeurs et \u00e9cosyst\u00e8mes',
      en: 'Multi-vendor platforms and ecosystems',
      es: 'Plataformas multi-vendedor y ecosistemas',
    },
  },
  {
    icon: 'grid',
    gradient: 'from-cyan-500 to-cyan-700',
    lightBg: 'from-cyan-50 to-cyan-100',
    borderColor: 'border-l-cyan-400',
    title: { fr: 'Dashboards strat\u00e9giques', en: 'Strategic dashboards', es: 'Dashboards estrat\u00e9gicos' },
    description: {
      fr: 'Interfaces priv\u00e9es et outils de pilotage',
      en: 'Private interfaces and management tools',
      es: 'Interfaces privadas y herramientas de gesti\u00f3n',
    },
  },
  {
    icon: 'globe',
    gradient: 'from-amber-500 to-amber-700',
    lightBg: 'from-amber-50 to-orange-100',
    borderColor: 'border-l-amber-400',
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
      pillarsTitle: 'Nos piliers de d\u00e9veloppement',
    },
    en: {
      eyebrow: 'Digital solutions',
      title: 'Digital Solutions Development',
      subtitle: 'We design custom digital infrastructures tailored to your business objectives.',
      pillarsTitle: 'Our development pillars',
    },
    es: {
      eyebrow: 'Soluciones digitales',
      title: 'Desarrollo de Soluciones Digitales',
      subtitle: 'Dise\u00f1amos infraestructuras digitales a medida adaptadas a sus objetivos de negocio.',
      pillarsTitle: 'Nuestros pilares de desarrollo',
    },
  }

  const t = content[locale]

  return (
    <section className="relative py-24 sm:py-28 lg:py-32 overflow-hidden bg-white">
      {/* Subtle gradient mesh blobs */}
      <div
        className="absolute top-[5%] right-[10%] w-[400px] h-[400px] rounded-full blur-3xl opacity-20 animate-mesh-1"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,108,252,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full blur-3xl opacity-15 animate-mesh-2"
        style={{
          background:
            'radial-gradient(circle at center, rgba(78,234,219,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-violet-600 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-anthracite mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Bento grid - white cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map((solution, i) => (
            <div
              key={solution.icon}
              className={`group relative bg-white rounded-3xl border-l-4 ${solution.borderColor} p-8 transition-all duration-500 animate-fade-in-up ${i === 0 ? 'lg:col-span-2 lg:row-span-2 lg:p-10' : ''}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                boxShadow: '0 8px 40px -12px rgba(124, 108, 252, 0.12), 0 2px 12px -4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Icon with light gradient background */}
              <div className="relative mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.lightBg} flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform duration-300 ${i === 0 ? 'w-16 h-16' : ''}`}
                >
                  <SolutionIcon name={solution.icon} large={i === 0} />
                </div>
              </div>

              <h3 className={`font-display font-semibold tracking-tight text-anthracite mb-2 ${i === 0 ? 'text-2xl' : 'text-xl'}`}>
                {solution.title[locale]}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${i === 0 ? 'text-lg' : ''}`}>
                {solution.description[locale]}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars - white/light card */}
        <div
          className="relative rounded-3xl bg-violet-50/50 border border-violet-100 p-8"
          style={{
            boxShadow: '0 4px 24px -8px rgba(124, 108, 252, 0.08)',
          }}
        >
          <h3 className="font-display text-xl font-semibold text-anthracite mb-6 text-center">{t.pillarsTitle}</h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {pillars[locale].map((pillar, i) => (
              <div key={pillar} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">{pillar}</span>
                {i < pillars[locale].length - 1 && (
                  <span className="hidden lg:block text-violet-200 ml-5">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionIcon({ name, large = false }: { name: string; large?: boolean }) {
  const size = large ? 'w-7 h-7' : 'w-6 h-6'
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
