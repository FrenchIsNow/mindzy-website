'use client'

import { useState } from 'react'

interface CheckoutLabels {
  nameLabel: string
  emailLabel: string
  namePlaceholder: string
  emailPlaceholder: string
  paymentTitle: string
  submitBtn: string
  secureNote: string
  guaranteeNote: string
}

interface OrderBump {
  title: string
  desc: string
  price: number
}

interface Props {
  locale: string
  slug: string
  labels: CheckoutLabels
  price: number
  originalPrice?: number
  currency: string
  productSummary: string
  orderBump?: OrderBump
}

export function FunnelCheckoutForm({ locale, slug, labels, price, currency, orderBump }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bump, setBump] = useState(true) // presumed-yes
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const total = price + (bump && orderBump ? orderBump.price : 0)

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = locale === 'fr' ? 'Votre nom est requis' : locale === 'es' ? 'Tu nombre es obligatorio' : 'Your name is required'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = locale === 'fr' ? 'Email invalide' : locale === 'es' ? 'Email inválido' : 'Invalid email'
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) e.phone = locale === 'fr' ? 'Numéro invalide' : locale === 'es' ? 'Número inválido' : 'Invalid phone'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/funnel/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, email, phone, locale, bump }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'error'
      setErrors({ submit: locale === 'fr' ? `Erreur : ${msg}` : locale === 'es' ? `Error: ${msg}` : `Error: ${msg}` })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

      {/* Progress bar — Step 1 of 2 */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
          <span className="text-violet">{locale === 'fr' ? 'Étape 1 sur 2 — Vos informations' : locale === 'es' ? 'Paso 1 de 2 — Tus datos' : 'Step 1 of 2 — Your details'}</span>
          <span>50%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-violet rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-anthracite mb-1.5">{labels.nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-anthracite placeholder-gray-400 outline-none transition-colors duration-200 focus:border-violet focus:ring-2 focus:ring-violet/10 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-anthracite mb-1.5">{labels.emailLabel}</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={labels.emailPlaceholder}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-anthracite placeholder-gray-400 outline-none transition-colors duration-200 focus:border-violet focus:ring-2 focus:ring-violet/10 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-anthracite mb-1.5">
            {locale === 'fr' ? 'Téléphone' : locale === 'es' ? 'Teléfono' : 'Phone'}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder={locale === 'fr' ? '+33 6 12 34 56 78' : locale === 'es' ? '+34 612 345 678' : '+1 555 123 4567'}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-anthracite placeholder-gray-400 outline-none transition-colors duration-200 focus:border-violet focus:ring-2 focus:ring-violet/10 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Order bump — presumed yes */}
      {orderBump && (
        <label className="flex items-start gap-3 bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-4 cursor-pointer hover:bg-amber-100/50 transition-colors">
          <input
            type="checkbox"
            checked={bump}
            onChange={e => setBump(e.target.checked)}
            className="mt-1 w-5 h-5 accent-violet flex-shrink-0"
          />
          <div className="flex-1">
            <p className="text-sm font-bold text-anthracite">{orderBump.title}</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{orderBump.desc}</p>
          </div>
          <span className="text-sm font-bold text-anthracite flex-shrink-0">+{orderBump.price} {currency}</span>
        </label>
      )}

      {/* Payment info note */}
      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>
          {locale === 'fr'
            ? 'Paiement sécurisé via Stripe. Carte bancaire à l\'étape suivante.'
            : locale === 'es'
              ? 'Pago seguro vía Stripe. Tarjeta en el siguiente paso.'
              : 'Secure payment via Stripe. Card on the next step.'}
        </span>
      </div>

      {/* Live total */}
      <div className="flex items-center justify-between bg-violet/5 border border-violet/20 rounded-2xl px-5 py-4">
        <span className="text-sm font-bold text-anthracite uppercase tracking-wider">Total</span>
        <span className="font-display text-2xl font-bold text-violet tabular-nums">
          {total.toFixed(2)} {currency}
        </span>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-violet text-white font-bold rounded-2xl hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-violet/25"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {locale === 'fr' ? 'Redirection…' : locale === 'es' ? 'Redirigiendo…' : 'Redirecting…'}
          </>
        ) : (
          <>
            {labels.submitBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">{labels.secureNote}</p>
      <div className="flex items-center justify-center gap-2 text-xs text-sage-600 bg-sage-50 rounded-xl px-4 py-3">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        {labels.guaranteeNote}
      </div>
    </form>
  )
}
