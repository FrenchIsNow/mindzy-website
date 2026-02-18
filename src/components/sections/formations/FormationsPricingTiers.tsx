import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface Tier {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  featured: boolean
}

interface FormationsPricingTiersProps {
  locale: Locale
  badge: string
  title: string
  subtitle: string
  ctaLabel: string
  tiers: Tier[]
  variant?: 'white' | 'gray'
}

const CheckIcon = () => (
  <svg className="h-6 w-5 flex-none text-violet-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
)

export function FormationsPricingTiers({ locale, badge, title, subtitle, ctaLabel, tiers, variant = 'white' }: FormationsPricingTiersProps) {
  const bgClass = variant === 'gray' ? 'bg-[#FAFAFF]' : 'relative isolate bg-white'

  return (
    <section className={`${bgClass} px-6 py-24 sm:py-32 lg:px-8`}>
      {variant === 'white' && (
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#c084fc] to-[#7c3aed] opacity-30"
          />
        </div>
      )}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-violet-600">{badge}</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-[#1E1B4B] sm:text-6xl">
          {title}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        {subtitle}
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-8 sm:mt-20 lg:max-w-5xl lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={[
              tier.featured ? 'relative bg-white shadow-2xl' : 'bg-white/60',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            ].filter(Boolean).join(' ')}
          >
            <h3 className="text-base/7 font-semibold text-violet-600">{tier.name}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-[#1E1B4B]">{tier.price}</span>
            </p>
            <p className="mt-1 text-xs text-gray-400">{tier.duration}</p>
            <p className="mt-6 text-base/7 text-gray-600">{tier.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/diagnostic`}
              className={[
                tier.featured
                  ? 'bg-violet-600 text-white shadow-sm hover:bg-violet-500'
                  : 'text-violet-600 ring-1 ring-violet-200 hover:ring-violet-300',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:mt-10',
              ].join(' ')}
            >
              {ctaLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
