import Link from 'next/link'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const cardData = [
  {
    key: 'beginner',
    gradient: 'from-violet-500 to-violet-600',
    bgGradient: 'from-violet-50 to-violet-100/50',
    iconBg: 'bg-violet-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    key: 'pro',
    gradient: 'from-sage-500 to-sage-600',
    bgGradient: 'from-sage-50 to-sage-100/50',
    iconBg: 'bg-sage-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    key: 'booking',
    gradient: 'from-gold-dark to-gold',
    bgGradient: 'from-gold-light/30 to-gold-light/10',
    iconBg: 'bg-gold-light/50',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
  {
    key: 'sales',
    gradient: 'from-rose-400 to-rose-500',
    bgGradient: 'from-rose-50 to-rose-100/50',
    iconBg: 'bg-rose-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
]

export function UseCaseCards({ locale }: { locale: Locale }) {
  const t = copy[locale].useCases

  const cards = cardData.map((card) => ({
    ...card,
    ...t.cards[card.key as keyof typeof t.cards],
  }))

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Votre profil</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Link key={card.key} href={`/${locale}/diagnostic?case=${card.key}`} className="block group">
              <Card
                variant="default"
                hover
                className={cn(
                  'h-full relative overflow-hidden',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={cn(
                  'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                  `bg-gradient-to-br ${card.bgGradient}`
                )} />

                <div className="relative">
                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300',
                    card.iconBg,
                    'text-gray-700 group-hover:scale-110'
                  )}>
                    {card.icon}
                  </div>

                  {/* Content */}
                  <CardTitle className="mb-3 group-hover:text-anthracite transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="mb-5">
                    {card.description}
                  </CardDescription>

                  {/* CTA link */}
                  <span className={cn(
                    'inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300',
                    `bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`
                  )}>
                    {copy[locale].common.learnMore}
                    <svg className="w-4 h-4 text-violet group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>

                {/* Corner decoration */}
                <div className={cn(
                  'absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 transition-all duration-500',
                  `bg-gradient-to-br ${card.gradient}`,
                  'group-hover:scale-150 group-hover:opacity-20'
                )} />
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Pas sûr de votre situation ?{' '}
            <Link href={`/${locale}/diagnostic`} className="text-violet font-medium hover:underline">
              Faites le diagnostic complet
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
