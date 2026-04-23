'use client'

import { useEffect, useState } from 'react'

// ─── Live countdown timer ─────────────────────────────────────────────────────
// Counts down to next Sunday 23:59:59 in the user's local timezone.
// Resets automatically each week — perfect for evergreen "launch offer" urgency.

export function CountdownTimer({ locale = 'fr', deadline, compact = false, sessionMinutes }: { locale?: string; deadline?: string; compact?: boolean; sessionMinutes?: number }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    // Session-based timer: starts at sessionMinutes, stored in sessionStorage so it
    // survives navigation within the tab but resets on new sessions.
    let sessionTarget: number | null = null
    if (sessionMinutes) {
      const key = `funnel-timer-${sessionMinutes}`
      const stored = sessionStorage.getItem(key)
      if (stored) {
        sessionTarget = Number(stored)
      } else {
        sessionTarget = Date.now() + sessionMinutes * 60 * 1000
        sessionStorage.setItem(key, String(sessionTarget))
      }
    }

    const tick = () => {
      const now = new Date()
      let target: Date

      if (sessionTarget) {
        target = new Date(sessionTarget)
      } else if (deadline) {
        target = new Date(deadline)
      } else {
        target = new Date(now)
        const dayOfWeek = now.getDay()
        const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek
        target.setDate(now.getDate() + daysUntilSunday)
        target.setHours(23, 59, 59, 999)
      }

      const diff = target.getTime() - now.getTime()
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline, sessionMinutes])

  const labels = locale === 'en'
    ? { d: 'days', h: 'hrs', m: 'min', s: 'sec' }
    : locale === 'es'
      ? { d: 'días', h: 'hrs', m: 'min', s: 'seg' }
      : { d: 'jours', h: 'h', m: 'min', s: 'sec' }

  const sizes = compact
    ? { wrap: 'gap-1.5 px-3 py-1 rounded-lg', num: 'text-xs', label: 'text-[7px] mt-0.5', sep: 'text-xs' }
    : { wrap: 'gap-3 px-5 py-3 rounded-2xl', num: 'text-2xl md:text-3xl', label: 'text-[10px] mt-1', sep: 'text-2xl' }

  return (
    <div className={`inline-flex items-center bg-anthracite ${sizes.wrap}`}>
      {(['d', 'h', 'm', 's'] as const).map((k, i) => (
        <div key={k} className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
          <div className="text-center">
            <div className={`font-display font-bold text-white tabular-nums leading-none ${sizes.num}`}>
              {String(time[k]).padStart(2, '0')}
            </div>
            <div className={`uppercase tracking-widest text-violet-300 font-bold ${sizes.label}`}>{labels[k]}</div>
          </div>
          {i < 3 && <span className={`text-violet-300/40 font-bold ${sizes.sep}`}>:</span>}
        </div>
      ))}
    </div>
  )
}

// ─── Animated social proof ticker ─────────────────────────────────────────────
// Increments every 7-12 seconds to feel "live". Starts at the real number.

export function SocialProofTicker({ start = 1240, locale = 'fr' }: { start?: number; locale?: string }) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 2) + 1)
    }, 8000 + Math.random() * 4000)
    return () => clearInterval(id)
  }, [])

  const label = locale === 'en'
    ? 'clients already trust us'
    : locale === 'es'
      ? 'clientes ya confían en nosotros'
      : 'clients nous font déjà confiance'

  return (
    <div className="inline-flex items-center gap-2.5 bg-sage-50 border border-sage-200 px-4 py-2 rounded-full">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage-500" />
      </span>
      <span className="text-sm font-semibold text-sage-700 tabular-nums">
        {count.toLocaleString()}+ {label}
      </span>
    </div>
  )
}

// ─── Mobile sticky bottom CTA ─────────────────────────────────────────────────
// Slides up after the user scrolls past the hero. Mobile-only.

export function StickyMobileCTA({
  href,
  label,
  price,
  originalPrice,
  currency = 'EUR',
}: {
  href: string
  label: string
  price: number
  originalPrice?: number
  currency?: string
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-2xl transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="flex-shrink-0">
          {originalPrice && (
            <div className="text-[10px] text-gray-400 line-through leading-none">
              {originalPrice} {currency}
            </div>
          )}
          <div className="text-lg font-display font-bold text-anthracite leading-tight">
            {price} {currency}
          </div>
        </div>
        <a
          href={href}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-violet text-white text-sm font-bold rounded-full hover:bg-violet-600 transition-colors"
        >
          {label}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

// ─── Inventory scarcity bar ───────────────────────────────────────────────────
// Honest scarcity: shows remaining spots with a visual progress bar.

export function ScarcityBar({
  total = 50,
  remaining = 12,
  locale = 'fr',
}: {
  total?: number
  remaining?: number
  locale?: string
}) {
  const sold = total - remaining
  const pct = (sold / total) * 100

  const label = locale === 'en'
    ? `Only ${remaining} of ${total} spots left at this price`
    : locale === 'es'
      ? `Solo quedan ${remaining} de ${total} plazas a este precio`
      : `Plus que ${remaining} places sur ${total} à ce prix`

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">{label}</span>
        <span className="text-xs font-bold text-amber-700 tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
