import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const reasonsData = [
  {
    key: 'specialized',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    key: 'turnkey',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    color: 'sage',
  },
  {
    key: 'results',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    color: 'gold',
  },
  {
    key: 'support',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    color: 'rose',
  },
]

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

export function WhyMindzy({ locale }: { locale: Locale }) {
  const t = copy[locale].whyMindzy

  const reasons = reasonsData.map((r) => ({
    ...r,
    ...t.reasons[r.key as keyof typeof t.reasons],
    colors: colorClasses[r.color as keyof typeof colorClasses],
  }))

  return (
    <section className="section-padding bg-gradient-to-b from-white to-cream-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/40 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Nos avantages</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.key}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card variant="glass" className="h-full text-center group hover:shadow-elevated transition-all duration-500">
                {/* Icon container */}
                <div className={cn(
                  'w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300',
                  reason.colors.bg,
                  reason.colors.text,
                  'group-hover:scale-110 group-hover:shadow-lg'
                )}>
                  {reason.icon}
                </div>

                {/* Content */}
                <CardTitle className="text-lg mb-3">{reason.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {reason.description}
                </CardDescription>

                {/* Decorative line */}
                <div className={cn(
                  'w-12 h-1 mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300',
                  `bg-gradient-to-r ${reason.colors.gradient}`
                )} />
              </Card>
            </div>
          ))}
        </div>

        {/* Additional trust section */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <TrustItem
              value="2"
              unit="semaines"
              label="Temps de livraison moyen"
            />
            <TrustItem
              value="0"
              unit="euros"
              label="Frais cachés"
            />
            <TrustItem
              value="100%"
              unit=""
              label="Sites responsive"
            />
            <TrustItem
              value="24h"
              unit=""
              label="Réponse support"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustItem({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <span className="font-display text-4xl font-semibold text-anthracite group-hover:text-violet transition-colors">
          {value}
        </span>
        {unit && <span className="text-lg text-gray-500">{unit}</span>}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}
