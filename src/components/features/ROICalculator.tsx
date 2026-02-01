'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { copy } from '@/lib/copy'
import { plans } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export function ROICalculator({ locale }: { locale: Locale }) {
  const [sessionPrice, setSessionPrice] = useState(60)
  const [selectedPlan, setSelectedPlan] = useState(plans[1])
  const t = copy[locale].pricing.roi
  const patientsNeeded = sessionPrice > 0 ? Math.ceil(selectedPlan.price / sessionPrice) : 0
  return (
    <Card variant="outline" className="bg-gray-50">
      <CardHeader><CardTitle className="text-center">{t.title}</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <Input label={t.sessionPrice} type="number" min={1} value={sessionPrice} onChange={(e) => setSessionPrice(Number(e.target.value))} />
        <div>
          <label className="block text-sm font-medium text-anthracite mb-2">Plan</label>
          <div className="grid grid-cols-2 gap-2">
            {plans.map((plan) => (
              <button key={plan.id} type="button" onClick={() => setSelectedPlan(plan)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPlan.id === plan.id ? 'bg-violet text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-violet'}`}>{copy[locale].pricing.plans[plan.id].name}</button>
            ))}
          </div>
        </div>
        <div className="text-center p-6 bg-white rounded-xl border border-violet/20">
          <div className="text-5xl font-bold text-violet mb-2">{patientsNeeded}</div>
          <div className="text-lg font-medium text-anthracite mb-1">{t.result}</div>
          <div className="text-sm text-gray-600">{t.resultText}</div>
        </div>
      </CardContent>
    </Card>
  )
}
