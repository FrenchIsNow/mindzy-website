'use client'

import { CheckIcon } from '@/components/ui/Button'
import { plans } from '@/lib/config'
import { formatPrice, cn } from '@/lib/utils'
import { useContactModal } from '@/components/features/ContactFormModal'

interface PlanCopy {
  name: string
  description: string
  features: string[]
}

interface SiteWebPricingCardsProps {
  plansCopy: Record<string, PlanCopy>
  monthly: string
  setup: string
  cta: string
  popular: string
}

export function SiteWebPricingCards({ plansCopy, monthly, setup, cta, popular }: SiteWebPricingCardsProps) {
  const { open: openContactModal } = useContactModal()

  return (
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-start gap-6 sm:mt-20 lg:max-w-5xl lg:grid-cols-3">
      {plans.map((plan) => {
        const isPopular = plan.id === 'pro'
        const planCopy = plansCopy[plan.id]
        if (!planCopy) return null
        return (
          <div
            key={plan.id}
            className={cn(
              'relative rounded-3xl p-8 ring-1 sm:p-10',
              isPopular
                ? 'bg-white shadow-2xl ring-violet-600/20'
                : 'bg-white/60 ring-gray-900/10',
            )}
          >
            {isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold text-white">
                {popular}
              </span>
            )}
            <h3 className="text-base/7 font-semibold text-violet-600">
              {planCopy.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-gray-900">
                {formatPrice(plan.price)}
              </span>
              <span className="text-base text-gray-500">{monthly}</span>
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {setup} : {formatPrice(plan.setup)} HT
            </p>
            <p className="mt-6 text-base/7 text-gray-600">{planCopy.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
              {planCopy.features.map((feature: string) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-violet-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openContactModal(plan.id)}
              className={cn(
                'mt-8 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:mt-10 cursor-pointer',
                isPopular
                  ? 'bg-violet-600 text-white shadow-sm hover:bg-violet-500'
                  : 'text-violet-600 ring-1 ring-inset ring-violet-200 hover:ring-violet-300',
              )}
            >
              {cta}
            </button>
          </div>
        )
      })}
    </div>
  )
}
