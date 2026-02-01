import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    duration: '10 min',
    color: 'violet',
  },
  {
    number: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    duration: '30 min',
    color: 'sage',
  },
  {
    number: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    duration: '2 sem',
    color: 'gold',
  },
  {
    number: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    duration: '1 jour',
    color: 'rose',
  },
]

const colorClasses = {
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', gradient: 'from-violet-500 to-violet-600' },
  sage: { bg: 'bg-sage-50', text: 'text-sage-600', border: 'border-sage-200', gradient: 'from-sage-500 to-sage-600' },
  gold: { bg: 'bg-gold-light/30', text: 'text-gold-dark', border: 'border-gold-light', gradient: 'from-gold-dark to-gold' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500', border: 'border-rose-200', gradient: 'from-rose-400 to-rose-500' },
}

export function ProcessTimeline({ locale }: { locale: Locale }) {
  const t = copy[locale].process

  const processSteps = steps.map((step, i) => {
    const keys = ['diagnostic', 'onboarding', 'design', 'launch'] as const
    return {
      ...step,
      ...t.steps[keys[i]],
      colors: colorClasses[step.color as keyof typeof colorClasses],
    }
  })

  return (
    <section className="section-padding bg-cream-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Comment ça marche</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
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
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Duration badge */}
                  <div className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                    step.colors.bg,
                    step.colors.text
                  )}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-soft">
            <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">
              De la première discussion à la mise en ligne :{' '}
              <span className="font-semibold text-anthracite">2 semaines en moyenne</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
