'use client'

import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const LANE_DATA = [
  { name: 'Lead qualification',   width: 0.72, status: 'running',  label: 'in progress' },
  { name: 'Proposal drafting',    width: 0.38, status: 'waiting',  label: 'awaiting validation' },
  { name: 'CRM enrichment',       width: 0.86, status: 'running',  label: 'in progress' },
  { name: 'Meeting summaries',    width: 1.0,  status: 'done',     label: 'completed' },
  { name: 'Follow-up sequences',  width: 0.55, status: 'running',  label: 'in progress' },
]

const STREAM_ITEMS = [
  'Lead qualification batch completed',
  'Meeting summary ready for review',
  'Invoice extraction awaiting validation',
  'CRM update pending manager approval',
  'Follow-up sequence sent to qualified leads',
  'Quarterly briefing draft ready',
  'Support inbox triage completed',
  'Vendor contract comparison synthesized',
]

const PENDING = [
  { kind: 'approval', text: 'Invoice extraction · batch awaiting validation', time: '2m' },
  { kind: 'approval', text: 'CRM update pending manager approval', time: '7m' },
  { kind: 'review',   text: 'Meeting summary ready for review', time: '14m' },
]

export function DashboardSection() {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 })
  const barsRef = useRef<(HTMLElement | null)[]>([])
  const streamRef = useRef<HTMLDivElement>(null)
  const streamIdxRef = useRef(0)

  // Animate lane bars when section enters viewport
  useEffect(() => {
    if (!isIntersecting) return
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      bar.style.transition = 'transform 1.1s cubic-bezier(.2,.7,.2,1)'
      bar.style.transform = `scaleX(${LANE_DATA[i]?.width ?? 0.5})`
    })
  }, [isIntersecting])

  // Stream animation
  useEffect(() => {
    const streamEl = streamRef.current
    if (!streamEl) return

    // Seed 3 initial items
    for (let k = 0; k < 3; k++) {
      const text = STREAM_ITEMS[k % STREAM_ITEMS.length]
      const node = document.createElement('div')
      node.style.cssText = 'display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:start;font-size:13px;'
      node.innerHTML = `<span style="width:8px;height:8px;border-radius:999px;background:var(--ai-accent);margin-top:6px;display:block;"></span><span>${text}</span><span style="color:var(--ai-fg-soft);font-size:11px;">${['2m','7m','14m'][k] || ''}</span>`
      streamEl.appendChild(node)
    }

    const interval = setInterval(() => {
      if (!streamEl.isConnected) { clearInterval(interval); return }
      const text = STREAM_ITEMS[streamIdxRef.current % STREAM_ITEMS.length]
      streamIdxRef.current++
      const node = document.createElement('div')
      node.style.cssText = 'display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:start;font-size:13px;opacity:0;transition:opacity 0.5s;'
      node.innerHTML = `<span style="width:8px;height:8px;border-radius:999px;background:var(--ai-accent);margin-top:6px;display:block;"></span><span>${text}</span><span style="color:var(--ai-fg-soft);font-size:11px;">just now</span>`
      streamEl.prepend(node)
      requestAnimationFrame(() => { node.style.opacity = '1' })
      while (streamEl.children.length > 5) streamEl.lastElementChild?.remove()
    }, 4200)

    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <div ref={sectionRef} className="w-full max-w-[1200px] mx-auto px-8">
        {/* Section head */}
        <FadeIn>
          <div style={{ maxWidth: '740px', marginBottom: '56px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>Command center</div>
            <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1.08, marginTop: '14px' }}>
              <em>Command center</em> built around your hierarchy.
            </h2>
            <p style={{ marginTop: '24px', fontSize: '18px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '600px' }}>
              Every Mindzy dashboard is custom-designed for the client&apos;s departments, roles, and validation rules.
            </p>
          </div>
        </FadeIn>

        {/* Dashboard card */}
        <FadeIn delay={200}>
          <div style={{ borderRadius: '20px', background: 'var(--ai-surface)', border: '1px solid var(--ai-border)', overflow: 'hidden', boxShadow: '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--ai-border)', fontSize: '12.5px', color: 'var(--ai-fg-muted)', background: 'var(--ai-bg-2)' }}>
            <span style={{ display: 'inline-flex', gap: '6px' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: '10px', height: '10px', borderRadius: '999px', background: c, display: 'block' }} />)}
            </span>
            <span style={{ fontFamily: 'ui-monospace,monospace', fontSize: '12px' }}>acme.mindzy.local — workforce</span>
            <span style={{ color: 'var(--ai-fg-soft)' }}>Example view — anonymized client setup</span>
          </div>

          {/* 3-column body */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 280px', minHeight: '480px' }}>
            {/* Sidebar */}
            <div style={{ padding: '22px 20px', borderRight: '1px solid var(--ai-border)', background: 'var(--ai-bg-2)' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '12px' }}>Departments</div>
              <ul style={{ display: 'grid', gap: '4px', fontSize: '13.5px' }}>
                {['Sales','Operations','Support','Administration','Management'].map((d, i) => (
                  <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', borderRadius: '8px', color: i === 0 ? 'var(--ai-accent)' : 'var(--ai-fg-muted)', background: i === 0 ? 'color-mix(in srgb, var(--ai-accent) 12%, transparent)' : 'transparent', fontWeight: i === 0 ? 500 : 400, cursor: 'pointer' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: 'currentColor', opacity: .6, display: 'block', flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '8px', marginTop: '24px' }}>Today</div>
              <div style={{ fontSize: '12.5px', color: 'var(--ai-fg-muted)', lineHeight: 1.4 }}>~40–60 workflows in progress</div>
              <div style={{ fontSize: '12.5px', color: 'var(--ai-fg-muted)', marginTop: '6px' }}>8 awaiting validation</div>
            </div>

            {/* Main lanes */}
            <div style={{ padding: '24px', borderRight: '1px solid var(--ai-border)' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '14px' }}>Workflows — Sales</div>
              <div style={{ display: 'grid', gap: '10px' }}>
                {LANE_DATA.map((lane, i) => (
                  <div key={lane.name} style={{ display: 'grid', gridTemplateColumns: '130px 1fr auto', alignItems: 'center', gap: '14px', padding: '12px 14px', border: '1px solid var(--ai-border)', borderRadius: '12px', background: 'var(--ai-bg-2)', fontSize: '13px' }}>
                    <span style={{ fontWeight: 500 }}>{lane.name}</span>
                    <div style={{ height: '6px', borderRadius: '999px', background: 'var(--ai-bg-3)', position: 'relative', overflow: 'hidden' }}>
                      <i ref={el => { barsRef.current[i] = el }} style={{ position: 'absolute', inset: 0, right: 'auto', background: 'var(--ai-accent)', borderRadius: '999px', transformOrigin: 'left center', transform: 'scaleX(0)' }} />
                    </div>
                    <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '999px', background: lane.status === 'running' ? 'color-mix(in srgb,var(--ai-accent) 14%,transparent)' : lane.status === 'waiting' ? 'color-mix(in srgb,var(--mindzy-gold) 18%,transparent)' : 'var(--ai-bg-3)', color: lane.status === 'running' ? 'var(--ai-accent)' : lane.status === 'waiting' ? '#8a6d12' : 'var(--ai-fg-muted)' }}>
                      {lane.label}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '8px', marginTop: '24px' }}>Pending validation</div>
              <ul style={{ display: 'grid', gap: '8px' }}>
                {PENDING.map((p, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '12px', padding: '10px 12px', border: '1px solid var(--ai-border)', borderRadius: '10px', background: 'var(--ai-bg-2)', fontSize: '13px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '999px', fontWeight: 500, background: p.kind === 'approval' ? 'color-mix(in srgb,var(--mindzy-gold) 18%,transparent)' : 'color-mix(in srgb,var(--ai-accent) 14%,transparent)', color: p.kind === 'approval' ? '#8a6d12' : 'var(--ai-accent)' }}>{p.kind}</span>
                    <span>{p.text}</span>
                    <span style={{ color: 'var(--ai-fg-soft)', fontSize: '11.5px' }}>{p.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activity stream */}
            <div style={{ padding: '22px', background: 'var(--ai-bg-2)' }}>
              <h4 style={{ fontSize: '12px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '16px' }}>Activity</h4>
              <div ref={streamRef} style={{ display: 'grid', gap: '14px' }} />
            </div>
          </div>

          {/* Note */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--ai-border)', background: 'var(--ai-bg-2)', fontSize: '12px', color: 'var(--ai-fg-soft)', letterSpacing: '.01em' }}>
            Each Mindzy dashboard is custom-designed for the client. This is a representative example.
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default DashboardSection
