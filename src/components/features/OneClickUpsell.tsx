'use client'

import { useState } from 'react'

interface Props {
  sessionId: string
  slug: string
  locale: string
  cta: string
}

export function OneClickUpsellButton({ sessionId, slug, locale, cta }: Props) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/funnel/upsell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, slug, locale }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'failed')
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'error')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-sage-100 text-sage-800 text-sm font-bold rounded-full">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
        {locale === 'fr' ? 'Ajouté à votre commande !' : locale === 'es' ? '¡Añadido a tu pedido!' : 'Added to your order!'}
      </div>
    )
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white text-sm font-bold rounded-full hover:bg-violet-600 disabled:opacity-60 transition-colors duration-200"
      >
        {loading
          ? (locale === 'fr' ? 'Traitement…' : locale === 'es' ? 'Procesando…' : 'Processing…')
          : cta}
        {!loading && (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </>
  )
}
