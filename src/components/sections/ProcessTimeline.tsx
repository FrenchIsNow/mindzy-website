import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: {
      fr: 'Compréhension & cadrage',
      en: 'Understanding & scoping',
      es: 'Comprensión & alcance',
    },
    description: {
      fr: 'Nous prenons le temps de comprendre votre activité, vos objectifs et vos contraintes afin de définir un cadre clair et pertinent.',
      en: 'We take the time to understand your business, goals and constraints to define a clear and relevant framework.',
      es: 'Nos tomamos el tiempo de entender su actividad, objetivos y limitaciones para definir un marco claro y pertinente.',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    number: '02',
    title: {
      fr: 'Conception sur mesure',
      en: 'Custom design',
      es: 'Diseño a medida',
    },
    description: {
      fr: 'Nous concevons une approche adaptée à votre besoin : structure, fonctionnalités et orientations techniques, validées avec vous.',
      en: 'We design an approach tailored to your needs: structure, features and technical directions, validated with you.',
      es: 'Diseñamos un enfoque adaptado a su necesidad: estructura, funcionalidades y orientaciones técnicas, validadas con usted.',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
    color: 'sage',
  },
  {
    number: '03',
    title: {
      fr: 'Réalisation & ajustements',
      en: 'Development & adjustments',
      es: 'Realización & ajustes',
    },
    description: {
      fr: 'Nous développons le projet de manière progressive, avec des échanges réguliers et des ajustements en fonction de vos retours.',
      en: 'We develop the project progressively, with regular exchanges and adjustments based on your feedback.',
      es: 'Desarrollamos el proyecto de manera progresiva, con intercambios regulares y ajustes según sus comentarios.',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
      </svg>
    ),
    color: 'gold',
  },
  {
    number: '04',
    title: {
      fr: 'Mise en ligne & accompagnement',
      en: 'Launch & support',
      es: 'Puesta en línea & acompañamiento',
    },
    description: {
      fr: 'Le projet est déployé et nous restons disponibles pour vous accompagner dans la prise en main et les évolutions futures.',
      en: 'The project is deployed and we remain available to support you in getting started and future developments.',
      es: 'El proyecto se despliega y seguimos disponibles para acompañarle en la puesta en marcha y las evoluciones futuras.',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    color: 'rose',
  },
]

const colorClasses = {
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', gradient: 'from-violet-500 to-violet-600' },
  sage: { bg: 'bg-sage-50', text: 'text-sage-600', border: 'border-sage-200', gradient: 'from-sage-500 to-sage-600' },
  gold: { bg: 'bg-gold-light/30', text: 'text-gold-dark', border: 'border-gold-light', gradient: 'from-gold-dark to-gold' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500', border: 'border-rose-200', gradient: 'from-rose-400 to-rose-500' },
}

const sectionTitle: Record<string, string> = {
  fr: 'Comment ça marche',
  en: 'How it works',
  es: 'Cómo funciona',
}

export function ProcessTimeline({ locale }: { locale: Locale }) {
  const processSteps = steps.map((step) => ({
    ...step,
    colors: colorClasses[step.color as keyof typeof colorClasses],
  }))

  return (
    <section className="section-padding bg-cream-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Notre processus</span>
          <h2 className="heading-2 text-anthracite mb-4">{sectionTitle[locale]}</h2>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector line (hidden on last item and mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent" />
                )}

                {/* Step card */}
                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-300 group">
                  {/* Step number badge */}
                  <div className={cn(
                    'absolute -top-4 -left-2 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg',
                    `bg-gradient-to-br ${step.colors.gradient}`
                  )}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 mt-2',
                    step.colors.bg,
                    step.colors.text,
                    'group-hover:scale-110'
                  )}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-semibold text-anthracite mb-2">
                    {step.title[locale]}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
