'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { getMessages } from '@/lib/getMessages'
import { plans } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { analytics } from '@/lib/analytics'

type BusinessTypeKey = 'therapist' | 'coach' | 'restaurant' | 'boutique' | 'artisan' | 'freelance'

interface BusinessTypeConfig {
  icon: string
  label: Record<Locale, string>
  priceLabel: Record<Locale, string>
  unitLabel: Record<Locale, string>
  defaultPrice: number
  timeSavedHoursPerMonth: number
  estimatedNewClients: number
}

const businessTypes: Record<BusinessTypeKey, BusinessTypeConfig> = {
  therapist: {
    icon: '🧘',
    label: { fr: 'Thérapeute / Psy', en: 'Therapist / Psych', es: 'Terapeuta / Psicó.' },
    priceLabel: { fr: 'Prix moyen d\'une séance (€)', en: 'Average session price (€)', es: 'Precio medio por sesión (€)' },
    unitLabel: { fr: 'clients/mois', en: 'clients/month', es: 'clientes/mes' },
    defaultPrice: 60,
    timeSavedHoursPerMonth: 20,
    estimatedNewClients: 6,
  },
  coach: {
    icon: '💼',
    label: { fr: 'Coach / Consultant', en: 'Coach / Consultant', es: 'Coach / Consultor' },
    priceLabel: { fr: 'Prix moyen d\'une prestation (€)', en: 'Average service price (€)', es: 'Precio medio por servicio (€)' },
    unitLabel: { fr: 'clients/mois', en: 'clients/month', es: 'clientes/mes' },
    defaultPrice: 120,
    timeSavedHoursPerMonth: 16,
    estimatedNewClients: 5,
  },
  restaurant: {
    icon: '🍽️',
    label: { fr: 'Restaurant / Café', en: 'Restaurant / Café', es: 'Restaurante / Café' },
    priceLabel: { fr: 'Ticket moyen (€)', en: 'Average ticket (€)', es: 'Ticket medio (€)' },
    unitLabel: { fr: 'couverts/mois', en: 'covers/month', es: 'cubiertos/mes' },
    defaultPrice: 25,
    timeSavedHoursPerMonth: 32,
    estimatedNewClients: 50,
  },
  boutique: {
    icon: '🛍️',
    label: { fr: 'Boutique / E-com', en: 'Shop / E-com', es: 'Boutique / E-com' },
    priceLabel: { fr: 'Panier moyen (€)', en: 'Average order (€)', es: 'Pedido medio (€)' },
    unitLabel: { fr: 'commandes/mois', en: 'orders/month', es: 'pedidos/mes' },
    defaultPrice: 45,
    timeSavedHoursPerMonth: 24,
    estimatedNewClients: 20,
  },
  artisan: {
    icon: '🛠️',
    label: { fr: 'Artisan / Créateur', en: 'Craftsman / Creator', es: 'Artesano / Creador' },
    priceLabel: { fr: 'Prix moyen d\'un projet (€)', en: 'Average project price (€)', es: 'Precio medio por proyecto (€)' },
    unitLabel: { fr: 'projets/mois', en: 'projects/month', es: 'proyectos/mes' },
    defaultPrice: 500,
    timeSavedHoursPerMonth: 12,
    estimatedNewClients: 2,
  },
  freelance: {
    icon: '💻',
    label: { fr: 'Freelance / Indép.', en: 'Freelance / Indep.', es: 'Freelance / Indep.' },
    priceLabel: { fr: 'Prix moyen par mission (€)', en: 'Average project fee (€)', es: 'Precio medio por misión (€)' },
    unitLabel: { fr: 'missions/mois', en: 'projects/month', es: 'misiones/mes' },
    defaultPrice: 400,
    timeSavedHoursPerMonth: 12,
    estimatedNewClients: 2,
  },
}

const businessTypeKeys: BusinessTypeKey[] = ['therapist', 'coach', 'restaurant', 'boutique', 'artisan', 'freelance']

function formatNumber(n: number): string {
  return n.toLocaleString('fr-FR')
}

export function ROICalculator({ locale }: { locale: Locale }) {
  const [businessType, setBusinessType] = useState<BusinessTypeKey>('therapist')
  const [price, setPrice] = useState(businessTypes.therapist.defaultPrice)
  const [selectedPlan, setSelectedPlan] = useState(plans[1])

  const t = getMessages(locale).pricing.roi
  const bt = businessTypes[businessType]

  const metrics = useMemo(() => {
    const breakeven = price > 0 ? Math.ceil(selectedPlan.price / price) : 0
    const timeSaved = bt.timeSavedHoursPerMonth
    const newClients = bt.estimatedNewClients
    const extraRevenueMonthly = newClients * price
    const annualCost = (selectedPlan.price * 12) + selectedPlan.setup
    const annualExtraRevenue = extraRevenueMonthly * 12
    const roiPercent = annualCost > 0 ? Math.round(((annualExtraRevenue - annualCost) / annualCost) * 100) : 0
    return { breakeven, timeSaved, newClients, extraRevenueMonthly, roiPercent }
  }, [price, selectedPlan, bt])

  const handleBusinessTypeChange = (key: BusinessTypeKey) => {
    setBusinessType(key)
    setPrice(businessTypes[key].defaultPrice)
  }

  return (
    <Card variant="outline" className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-center">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-anthracite mb-2">{t.businessType}</label>
          <div className="grid grid-cols-3 gap-2">
            {businessTypeKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleBusinessTypeChange(key)}
                className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  businessType === key
                    ? 'bg-violet text-white shadow-md shadow-violet/25'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-violet/50'
                }`}
              >
                <span className="block text-base mb-0.5">{businessTypes[key].icon}</span>
                {businessTypes[key].label[locale]}
              </button>
            ))}
          </div>
        </div>

        <Input
          label={bt.priceLabel[locale]}
          type="number"
          min={1}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <div>
          <label className="block text-sm font-medium text-anthracite mb-2">{t.plan}</label>
          <div className="grid grid-cols-2 gap-2">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => { setSelectedPlan(plan); analytics.pricing.selectPlan(plan.id, plan.price) }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPlan.id === plan.id
                    ? 'bg-violet text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-violet'
                }`}
              >
                {getMessages(locale).pricing.plans[plan.id].name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-4 bg-white rounded-xl border border-violet-200">
            <div className="text-3xl font-bold text-violet">{metrics.breakeven}</div>
            <div className="text-xs font-medium text-anthracite mt-1">{bt.unitLabel[locale]}</div>
            <div className="text-[11px] text-gray-500">{t.breakeven}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-sage-200">
            <div className="text-3xl font-bold text-sage-600">{metrics.timeSaved}h</div>
            <div className="text-xs font-medium text-anthracite mt-1">{t.timeSavedLabel}</div>
            <div className="text-[11px] text-gray-500">{t.timeSaved}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-violet-100">
            <div className="text-3xl font-bold text-violet-500">+{metrics.newClients}</div>
            <div className="text-xs font-medium text-anthracite mt-1">{t.newClientsLabel}</div>
            <div className="text-[11px] text-gray-500">{t.newClients}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gold-light">
            <div className="text-3xl font-bold text-gold-dark">+{formatNumber(metrics.extraRevenueMonthly)}€</div>
            <div className="text-xs font-medium text-anthracite mt-1">{t.extraRevenueLabel}</div>
            <div className="text-[11px] text-gray-500">{t.extraRevenue}</div>
          </div>
        </div>

        <div className="text-center p-5 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl border border-violet/20">
          <div className="text-xs font-medium text-gray-600 mb-1">{t.annualROI}</div>
          <div className="text-5xl font-bold text-violet">{metrics.roiPercent > 0 ? '+' : ''}{formatNumber(metrics.roiPercent)}%</div>
        </div>

        <p className="text-[10px] text-gray-400 text-center">{t.disclaimer}</p>
      </CardContent>
    </Card>
  )
}
