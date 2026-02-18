import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface FormationsPricingIAProps {
  locale: Locale
  badge: string
  title: string
  description: string
  price: string
  duration: string
  priceLabel: string
  ctaLabel: string
  includedLabel: string
  features: string[]
}

const CheckIcon = () => (
  <svg className="h-6 w-5 flex-none text-violet-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
)

export function FormationsPricingIA({
  locale,
  badge,
  title,
  description,
  price,
  duration,
  priceLabel,
  ctaLabel,
  includedLabel,
  features,
}: FormationsPricingIAProps) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-violet-600">{badge}</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-[#1E1B4B] sm:text-6xl sm:text-balance">
            {title}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-semibold tracking-tight text-[#1E1B4B]">{badge}</h3>
            <p className="mt-6 text-base/7 text-gray-600">{description}</p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm/6 font-semibold text-violet-600">{includedLabel}</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">{priceLabel}</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-[#1E1B4B]">{price}</span>
                </p>
                <p className="mt-1 text-xs text-gray-400">{duration}</p>
                <Link
                  href={`/${locale}/diagnostic`}
                  className="mt-10 block w-full rounded-md bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
