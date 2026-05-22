'use client'

import { FadeIn } from '@/components/animations/FadeIn'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function ManifestoSection() {
  const { ref, isIntersecting } = useIntersectionObserver<SVGSVGElement>({ threshold: 0.3 })

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <style>{`
.orbital-svg .arch__layer { opacity: 0; transform: translateY(12px); transition: opacity .8s ease-out, transform .8s ease-out; }
.orbital-svg.is-built .arch__layer { opacity: 1; transform: translateY(0); }
.orbital-svg .orbital__connectors line { stroke-dasharray: 220; stroke-dashoffset: 220; transition: stroke-dashoffset 1s ease-out; }
.orbital-svg.is-built .orbital__connectors line { stroke-dashoffset: 0; }
.orbital-svg .orbital__node { opacity: 0; transition: opacity 0.5s ease-out; }
.orbital-svg.is-built .orbital__node { opacity: 1; }
.orbital-svg.is-built .orbital__node:nth-child(1) { transition-delay: 0.2s; }
.orbital-svg.is-built .orbital__node:nth-child(2) { transition-delay: 0.35s; }
.orbital-svg.is-built .orbital__node:nth-child(3) { transition-delay: 0.5s; }
.orbital-svg.is-built .orbital__node:nth-child(4) { transition-delay: 0.65s; }
.orbital-svg.is-built .orbital__node:nth-child(5) { transition-delay: 0.8s; }
.orbital-svg.is-built .orbital__node:nth-child(6) { transition-delay: 0.95s; }
`}</style>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '80px', alignItems: 'center' }}
          className="grid-cols-1 md:[grid-template-columns:minmax(0,1.4fr)_minmax(0,1fr)]"
        >
          {/* Left column */}
          <FadeIn>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>What makes us different</div>
            <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(36px,5.2vw,64px)', lineHeight: 1.08, marginTop: '18px' }}>
              <em>Most companies sell AI agents.</em><br />
              We build AI infrastructure.
            </h2>
            <p style={{ marginTop: '28px', fontSize: '19px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '60ch' }}>
              An AI agent solves one task. An AI infrastructure runs your company. Mindzy designs the operating layer that connects every model, every tool, every department, and every workflow into a coherent system you actually control.
            </p>
            <p style={{ marginTop: '28px', fontSize: '19px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '60ch' }}>
              Mindzy operates three proprietary models: <strong>MindFast</strong>, <strong>MindDeep</strong>, and <strong>Mind 3.1</strong>, and gives your teams access to every major model on the market: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen, and more. The right model for the right task, always.
            </p>
          </FadeIn>

          {/* Right column: orbital SVG */}
          <div>
            <svg
              ref={ref}
              className={`orbital-svg w-full aspect-square max-w-[420px] mx-auto${isIntersecting ? ' is-built' : ''}`}
              viewBox="0 0 360 360"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--ai-accent)" stopOpacity="0.16"/>
                  <stop offset="60%" stopColor="var(--ai-accent)" stopOpacity="0.04"/>
                  <stop offset="100%" stopColor="var(--ai-accent)" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="180" cy="180" r="170" fill="url(#orbGlow)"/>
              <circle cx="180" cy="180" r="120" fill="none" stroke="var(--ai-border)" strokeDasharray="2 6"/>
              <g className="orbital__connectors" stroke="var(--ai-accent)" strokeWidth="0.7">
                <line x1="180" y1="180" x2="180" y2="60"/>
                <line x1="180" y1="180" x2="284" y2="120"/>
                <line x1="180" y1="180" x2="284" y2="240"/>
                <line x1="180" y1="180" x2="180" y2="300"/>
                <line x1="180" y1="180" x2="76" y2="240"/>
                <line x1="180" y1="180" x2="76" y2="120"/>
              </g>
              <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--ai-fg)">
                <g className="orbital__node"><circle cx="180" cy="60" r="6" fill="var(--ai-accent)"/><text x="180" y="44" textAnchor="middle">Models</text></g>
                <g className="orbital__node"><circle cx="284" cy="120" r="6" fill="var(--ai-accent)"/><text x="304" y="118" textAnchor="start">Tools</text></g>
                <g className="orbital__node"><circle cx="284" cy="240" r="6" fill="var(--ai-accent)"/><text x="304" y="244" textAnchor="start">Hierarchy</text></g>
                <g className="orbital__node"><circle cx="180" cy="300" r="6" fill="var(--ai-accent)"/><text x="180" y="320" textAnchor="middle">Security</text></g>
                <g className="orbital__node"><circle cx="76" cy="240" r="6" fill="var(--ai-accent)"/><text x="56" y="244" textAnchor="end">Workflows</text></g>
                <g className="orbital__node"><circle cx="76" cy="120" r="6" fill="var(--ai-accent)"/><text x="56" y="118" textAnchor="end">Governance</text></g>
              </g>
              <circle cx="180" cy="180" r="42" fill="var(--ai-surface)" stroke="var(--ai-border-strong)"/>
              <text x="180" y="184" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--ai-accent)">Mindzy</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManifestoSection
