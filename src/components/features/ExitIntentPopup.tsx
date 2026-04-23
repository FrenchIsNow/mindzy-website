'use client'

import { useEffect, useState } from 'react'

// Exit-intent popup that fires once per visit when the cursor leaves the top of the
// viewport (desktop) or after 30s of scroll without conversion (mobile fallback).
// Suppressed via sessionStorage so it never re-fires in the same session.

interface ExitIntentPopupProps {
  slug: string
  title: string
  body: string
  cta: string
  declineText: string
}

export function ExitIntentPopup({ slug, title, body, cta, declineText }: ExitIntentPopupProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const storageKey = `funnel-exit-${slug}`

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(storageKey)) return

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem(storageKey)) {
        setOpen(true)
        sessionStorage.setItem(storageKey, '1')
      }
    }
    document.addEventListener('mouseout', onMouseOut)

    // Mobile fallback — show after 45s if user hasn't acted
    const timeout = window.setTimeout(() => {
      if (!sessionStorage.getItem(storageKey)) {
        setOpen(true)
        sessionStorage.setItem(storageKey, '1')
      }
    }, 45000)

    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      window.clearTimeout(timeout)
    }
  }, [storageKey])

  const close = () => setOpen(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Lead capture endpoint can be wired later — for now we just show success.
    setDone(true)
    fetch('/api/funnel/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, slug, source: 'exit-intent' }),
    }).catch(() => {})
    setTimeout(close, 2500)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-anthracite/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-14 h-14 rounded-2xl bg-violet/10 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h3 className="font-display text-2xl font-bold text-anthracite mb-2 text-balance">{title}</h3>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">{body}</p>

        {done ? (
          <div className="bg-sage-50 border border-sage-200 rounded-2xl p-4 text-sm text-sage-700 font-semibold text-center">
            ✓ {cta} — Check your inbox!
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@cabinet.fr"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 text-sm"
            />
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-violet text-white font-bold rounded-full hover:bg-violet-600 transition-colors text-sm"
            >
              {cta}
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full text-xs text-gray-400 hover:text-gray-600 underline"
            >
              {declineText}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
