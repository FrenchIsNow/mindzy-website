'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { copy } from '@/lib/copy'
import { onboardingSteps, plans, config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import type { Plan } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

function recommendPlan(answers: Record<string, string>): Plan['id'] {
  if (answers.payments === 'yes' && answers.objective === 'sales') return 'ecommerce'
  if (answers.payments === 'yes') return 'business'
  if (answers.booking === 'yes' || answers.objective === 'booking') return 'pro'
  return 'basic'
}

export function OnboardingWizard({ locale, initialRecommendation }: { locale: Locale; initialRecommendation?: string }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const t = copy[locale].onboarding
  const current = onboardingSteps[step]
  const progress = ((step + 1) / onboardingSteps.length) * 100

  const handleAnswer = (id: string, value: string) => {
    if (step === 0 && Object.keys(answers).length === 0) analytics.onboarding.start(initialRecommendation)
    analytics.onboarding.stepComplete(step + 1, id)
    const next = { ...answers, [id]: value }
    setAnswers(next)
    if (step < onboardingSteps.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300)
    } else {
      const planId = (initialRecommendation as Plan['id']) || recommendPlan(next)
      analytics.onboarding.complete(planId)
      setShowResult(true)
    }
  }

  if (showResult) {
    const planId = (initialRecommendation as Plan['id']) || recommendPlan(answers)
    const plan = plans.find((p) => p.id === planId) ?? plans[1]
    const planCopy = copy[locale].pricing.plans[plan.id]
    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="border-2 border-violet">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8"><Badge variant="primary" className="mb-4">{t.result.recommended}</Badge><h2 className="heading-2 text-anthracite mb-2">{planCopy.name}</h2><p className="body-regular">{planCopy.description}</p></div>
            <div className="text-center mb-8 p-6 bg-gray-50 rounded-2xl"><div className="text-4xl font-bold text-anthracite mb-1">{formatPrice(plan.price)}<span className="text-lg font-normal text-gray-500">/mois HT</span></div><div className="text-sm text-gray-500">+ {formatPrice(plan.setup)} HT setup</div></div>
            <div className="space-y-3 mb-8">
              {plan.pages > 0 && <div className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{plan.pages} pages</div>}
              {plan.articles > 0 && <div className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{plan.articles} articles SEO/mois</div>}
              {plan.booking && <div className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Réservation en ligne</div>}
              {plan.payments && <div className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Paiements en ligne</div>}
              <div className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Google Business</div>
            </div>
            <div className="space-y-3">
              <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block" onClick={() => { analytics.calendly.click('onboarding_result'); analytics.lead.generate('onboarding', plan.id) }}><Button variant="primary" size="lg" className="w-full">{t.result.meetingCta}</Button></a>
              <Link href={`/${locale}/legal/cgv?plan=${plan.id}`} onClick={() => analytics.cta.click('contract_cta', 'onboarding_result')}><Button variant="secondary" size="lg" className="w-full">{t.result.contractCta}</Button></Link>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => { setShowResult(false); setStep(0); setAnswers({}); }}>{copy[locale].chatbot.buttons.restart}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-500">{t.step} {step + 1}/{onboardingSteps.length}</span><span className="text-sm font-medium text-violet">{Math.round(progress)}%</span></div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-violet transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} /></div>
      </div>
      <Card variant="elevated">
        <CardContent className="p-8">
          <h2 className="heading-3 text-anthracite mb-8 text-center">{current.question[locale]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt) => (
              <button key={opt.value} type="button" onClick={() => handleAnswer(current.id, opt.value)} className={cn('p-4 rounded-xl border-2 text-center transition-all', answers[current.id] === opt.value ? 'border-violet bg-violet/5' : 'border-gray-200 hover:border-violet/50 hover:bg-gray-50')}>{opt.icon && <span className="text-3xl mb-2 block">{opt.icon}</span>}<span className="font-medium text-anthracite block">{opt.label[locale]}</span></button>
            ))}
          </div>
          {step > 0 && <div className="mt-8 text-center"><Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>← {t.back}</Button></div>}
        </CardContent>
      </Card>
    </div>
  )
}
