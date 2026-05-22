'use client'

import { useState, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'

const COUNTERS = [
  { from: 40, to: 60, suffix: '%', label: 'Average reduction in time spent on repetitive workflows after the first deployment phase.' },
  { from: 3, to: 5, suffix: '×', label: 'Increase in CRM and reporting consistency observed across deployed departments.' },
  { from: 30, to: 90, suffix: ' days', label: 'Typical deployment window for the first operational AI workforce.' },
]

function useCounterAnimation(from: number, to: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [lo, setLo] = useState(from)
  const [hi, setHi] = useState(to)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true
        const t0 = performance.now()
        const dur = 1600
        function step(t: number) {
          const p = Math.min(1, (t - t0) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setLo(Math.round(from * eased))
          setHi(Math.round(to * eased))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to])

  return { ref, lo, hi }
}

function Counter({ counter }: { counter: typeof COUNTERS[0] }) {
  const { ref, lo, hi } = useCounterAnimation(counter.from, counter.to)
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(56px,7.4vw,104px)', lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: '18px' }}>
        {lo}
        <span style={{ display: 'inline-block', margin: '0 0.1em', color: 'var(--ai-accent)', fontStyle: 'italic' }}>–</span>
        {hi}
        <span style={{ fontSize: '0.5em', marginLeft: '0.06em', color: 'var(--ai-fg-muted)' }}>{counter.suffix}</span>
      </div>
      <div style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--ai-fg-muted)', maxWidth: '28ch' }}>{counter.label}</div>
    </div>
  )
}

export function CompoundingSection() {
  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <FadeIn>
          <div style={{ maxWidth: '740px', marginBottom: '56px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>Outcomes</div>
            <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1.08, marginTop: '14px' }}>
              <em>Infrastructure</em> that compounds.
            </h2>
            <p style={{ marginTop: '24px', fontSize: '18px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '600px' }}>
              Three ranges defined by Mindzy deployment patterns. Actual outcomes are scoped per project during the diagnosis phase.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '56px', marginTop: '56px' }} className="grid-cols-1 sm:grid-cols-3">
          {COUNTERS.map((c, i) => <Counter key={i} counter={c} />)}
        </div>

        <p style={{ marginTop: '36px', fontSize: '13px', color: 'var(--ai-fg-soft)', fontStyle: 'italic', textAlign: 'center', maxWidth: '720px', margin: '36px auto 0', lineHeight: 1.55 }}>
          Ranges based on Mindzy deployment patterns. Actual outcomes are defined per project during the diagnosis phase.
        </p>
      </div>
    </section>
  )
}

export default CompoundingSection
