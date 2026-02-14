import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

const content = {
  eyebrow: {
    fr: 'Nos engagements',
    en: 'Our commitments',
    es: 'Nuestros compromisos',
  },
  title: {
    fr: 'Nos engagements',
    en: 'Our commitments',
    es: 'Nuestros compromisos',
  },
  blocks: [
    {
      key: 'transparency',
      title: {
        fr: 'Une relation claire et transparente',
        en: 'A clear and transparent relationship',
        es: 'Una relación clara y transparente',
      },
      description: {
        fr: 'Nous travaillons avec des échanges clairs, des décisions partagées et une vision commune du projet dès le départ.',
        en: 'We work with clear communication, shared decisions, and a common vision for the project from the very start.',
        es: 'Trabajamos con intercambios claros, decisiones compartidas y una visión común del proyecto desde el principio.',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      color: 'violet' as const,
    },
    {
      key: 'collaboration',
      title: {
        fr: 'Un projet pensé avec vous',
        en: 'A project designed with you',
        es: 'Un proyecto pensado con usted',
      },
      description: {
        fr: 'Chaque projet est construit en collaboration. Vos retours et votre compréhension font partie intégrante du processus.',
        en: 'Every project is built collaboratively. Your feedback and understanding are an integral part of the process.',
        es: 'Cada proyecto se construye en colaboración. Sus comentarios y su comprensión son parte integral del proceso.',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      color: 'sage' as const,
    },
    {
      key: 'durability',
      title: {
        fr: 'Une base solide et durable',
        en: 'A solid and lasting foundation',
        es: 'Una base sólida y duradera',
      },
      description: {
        fr: 'Nous concevons des projets stables, maintenables et pensés pour évoluer, sans dépendance inutile ni complexité superflue.',
        en: 'We design stable, maintainable projects built to evolve, without unnecessary dependencies or superfluous complexity.',
        es: 'Diseñamos proyectos estables, mantenibles y pensados para evolucionar, sin dependencias innecesarias ni complejidad superflua.',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
        </svg>
      ),
      color: 'gold' as const,
    },
    {
      key: 'responsibility',
      title: {
        fr: 'Une approche responsable',
        en: 'A responsible approach',
        es: 'Un enfoque responsable',
      },
      description: {
        fr: 'Nous appliquons les bonnes pratiques en matière de sécurité, de confidentialité et de fiabilité, adaptées à la nature de votre projet.',
        en: 'We apply best practices in security, privacy, and reliability, tailored to the nature of your project.',
        es: 'Aplicamos las buenas prácticas en materia de seguridad, confidencialidad y fiabilidad, adaptadas a la naturaleza de su proyecto.',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      color: 'rose' as const,
    },
  ],
}

const colorClasses = {
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    gradient: 'from-violet-500 to-violet-600',
    border: 'border-violet-100',
  },
  sage: {
    bg: 'bg-sage-50',
    text: 'text-sage-600',
    gradient: 'from-sage-500 to-sage-600',
    border: 'border-sage-100',
  },
  gold: {
    bg: 'bg-gold-light/30',
    text: 'text-gold-dark',
    gradient: 'from-gold-dark to-gold',
    border: 'border-gold-light',
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-500',
    gradient: 'from-rose-400 to-rose-500',
    border: 'border-rose-100',
  },
}

export function Engagements({ locale }: { locale: Locale }) {
  return (
    <section className="py-16 bg-cream-50 relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="heading-2 text-anthracite mb-4">{content.title[locale]}</h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.blocks.map((block, index) => {
            const colors = colorClasses[block.color]

            return (
              <div
                key={block.key}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-500 group">
                  {/* Icon in colored circle */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300',
                      colors.bg,
                      colors.text,
                      'group-hover:scale-110 group-hover:shadow-lg'
                    )}
                  >
                    {block.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-anthracite tracking-tight mb-3">
                    {block.title[locale]}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {block.description[locale]}
                  </p>

                  {/* Decorative line on hover */}
                  <div
                    className={cn(
                      'w-12 h-1 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300',
                      `bg-gradient-to-r ${colors.gradient}`
                    )}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
