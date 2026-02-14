'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button, ArrowIcon, CheckIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getMessages } from '@/lib/getMessages'
import { plans } from '@/lib/config'
import { formatPrice } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

export function PricingTable({ locale }: { locale: Locale }) {
  const t = getMessages(locale).pricing

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cream-50/50 to-white" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/30 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Tarification</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {plans.map((plan, index) => {
            const isPopular = plan.id === 'pro'
            const planCopy = t.plans[plan.id as keyof typeof t.plans]

            return (
              <div
                key={plan.id}
                className={cn(
                  'animate-fade-in-up',
                  isPopular && 'lg:-mt-4 lg:mb-4'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card
                  variant={isPopular ? 'featured' : 'default'}
                  padding="none"
                  className={cn(
                    'h-full relative overflow-hidden flex flex-col',
                    isPopular ? 'shadow-glow' : 'hover:shadow-card-hover',
                    'transition-all duration-300'
                  )}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-violet-500 text-white text-center py-2 text-sm font-medium">
                      {t.popular}
                    </div>
                  )}

                  <div className={cn('p-6 flex-1 flex flex-col', isPopular && 'pt-12')}>
                    <CardHeader className="text-center pb-6 mb-0">
                      <CardTitle className="text-xl mb-2">{planCopy.name}</CardTitle>
                      <CardDescription className="text-sm">{planCopy.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      {/* Price */}
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className={cn(
                            'font-display text-5xl font-semibold',
                            isPopular ? 'text-violet' : 'text-anthracite'
                          )}>
                            {formatPrice(plan.price)}
                          </span>
                          <span className="text-gray-500">{t.monthly}</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-2">
                          {t.setup}: {formatPrice(plan.setup)} HT
                        </div>
                        <p className="text-[10px] text-violet-400 font-normal mt-1.5">
                          {locale === 'fr' ? 'Options adaptables pour chaque besoin' : locale === 'en' ? 'Adaptable options for every need' : 'Opciones adaptables para cada necesidad'}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

                      {/* Features */}
                      <ul className="space-y-3">
                        <FeatureItem included label={`${plan.pages} ${t.features.pages}`} highlight={isPopular} />
                        {plan.articles > 0 && (
                          <FeatureItem included label={`${plan.articles} ${t.features.articles}`} highlight={isPopular} />
                        )}
                        <FeatureItem included={plan.booking} label={t.features.booking} highlight={isPopular} />
                        <FeatureItem included={plan.payments} label={t.features.payments} highlight={isPopular} />
                        <FeatureItem included label={t.features.gmb} highlight={isPopular} />
                        <FeatureItem included label={t.features.hosting} highlight={isPopular} />
                        <FeatureItem included label="SSL" highlight={isPopular} />
                      </ul>
                    </CardContent>

                    <CardFooter className="border-0 pt-6">
                      <Link href={`/${locale}/onboarding?plan=${plan.id}`} className="w-full" onClick={() => { analytics.pricing.selectPlan(plan.id, plan.price); analytics.pricing.beginCheckout(plan.id, plan.price) }}>
                        <Button
                          variant={isPopular ? 'primary' : 'secondary'}
                          size="lg"
                          className="w-full"
                          icon={<ArrowIcon />}
                        >
                          {t.cta}
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Custom quote section */}
        <div className="mt-16">
          <Card variant="gradient" className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                  <div className="icon-circle bg-gold-light/50 text-gold-dark">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <h3 className="heading-4 text-anthracite">{t.customQuote.title}</h3>
                </div>
                <p className="text-gray-600 max-w-lg">{t.customQuote.description}</p>
              </div>
              <Link href={`/${locale}/profil/custom`} className="flex-shrink-0">
                <Button variant="gold" size="lg" icon={<ArrowIcon />}>
                  {t.customQuote.cta}
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Guarantees */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <GuaranteeItem icon="shield" label="Paiement sécurisé" />
          <GuaranteeItem icon="support" label="Support inclus" />
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ included, label, highlight }: { included: boolean; label: string; highlight?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      {included ? (
        <CheckIcon className={cn('w-5 h-5 flex-shrink-0', highlight ? 'text-violet' : 'text-sage-500')} />
      ) : (
        <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span className={cn('text-sm', included ? 'text-gray-700' : 'text-gray-400')}>
        {label}
      </span>
    </li>
  )
}

function GuaranteeItem({ icon, label }: { icon: 'shield' | 'refresh' | 'support'; label: string }) {
  const icons = {
    shield: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    refresh: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    support: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  }

  return (
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      <div className="icon-circle-sm bg-sage-50 text-sage-600">
        {icons[icon]}
      </div>
      {label}
    </div>
  )
}
