import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import type { Locale } from '@/lib/i18n'
import { getMessages } from '@/lib/getMessages'
import { cn } from '@/lib/utils'

const icons: Record<string, React.ReactNode> = {
  reality: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2" />
    </svg>
  ),
  bespoke: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
    </svg>
  ),
  support: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  seo: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  durable: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  responsive: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
}

const colorOrder = ['violet', 'sage', 'gold', 'rose', 'cyan', 'violet'] as const
type ColorKey = (typeof colorOrder)[number]

const colorClasses: Record<ColorKey, { bg: string; text: string; gradient: string; border: string }> = {
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
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600',
    border: 'border-cyan-100',
  },
}

export function WhyMindzy({ locale }: { locale: Locale }) {
  const msg = getMessages(locale).whyMindzy

  return (
    <section className="section-padding bg-gradient-to-b from-white to-cream-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/40 rounded-full blur-3xl" />

      <div className="container-wide relative">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{msg.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{msg.title}</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {msg.items.map((item, index) => {
            const color = colorOrder[index % colorOrder.length]
            const colors = colorClasses[color]
            const icon = icons[item.key]
            return (
              <div
                key={item.key}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card variant="glass" className="h-full text-center group hover:shadow-elevated transition-all duration-500">
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300',
                    colors.bg,
                    colors.text,
                    'group-hover:scale-110 group-hover:shadow-lg'
                  )}>
                    {icon}
                  </div>

                  <CardTitle className="text-lg mb-3">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>

                  <div className={cn(
                    'w-12 h-1 mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300',
                    `bg-gradient-to-r ${colors.gradient}`
                  )} />
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
