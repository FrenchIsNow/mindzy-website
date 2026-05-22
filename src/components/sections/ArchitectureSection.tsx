'use client'

import { FadeIn } from '@/components/animations/FadeIn'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const archStyles = `
.arch-diagram .arch__layer { opacity: 0; transform: translateY(12px); transition: opacity .8s ease-out, transform .8s ease-out; }
.arch-diagram.is-built .arch__layer { opacity: 1; transform: translateY(0); }
.arch-diagram.is-built .arch__layer.l1 { transition-delay: 0ms; }
.arch-diagram.is-built .arch__layer.l2 { transition-delay: 120ms; }
.arch-diagram.is-built .arch__layer.l3 { transition-delay: 240ms; }
.arch-diagram.is-built .arch__layer.l4 { transition-delay: 360ms; }
.arch-diagram.is-built .arch__layer.l5 { transition-delay: 480ms; }
.arch-diagram .connector { stroke-dasharray: 220; stroke-dashoffset: 220; transition: stroke-dashoffset 1s ease-out; }
.arch-diagram.is-built .connector { stroke-dashoffset: 0; }
`

export function ArchitectureSection() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.25 })

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <style>{archStyles}</style>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <FadeIn>
          <div style={{ maxWidth: '740px', marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>Architecture</div>
          <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1.08, marginTop: '14px' }}>
            Built progressively. <em>Deployed safely.</em> Adapted entirely.
          </h2>
          <p style={{ marginTop: '24px', fontSize: '18px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '600px' }}>
            The Mindzy infrastructure assembles layer by layer — wrapping your tools, your models, and your governance into a single custom system.
          </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div
            ref={ref}
            className={`arch-diagram${isIntersecting ? ' is-built' : ''}`}
            style={{ borderRadius: '20px', background: 'var(--ai-surface)', border: '1px solid var(--ai-border)', boxShadow: '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)', padding: '56px 40px', minHeight: '560px' }}
          >
            <svg viewBox="0 0 1080 480" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--ai-grid-line, rgba(10,14,26,0.06))" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="1080" height="480" fill="url(#archGrid)"/>

              {/* Layer 5: Mindzy AI Infrastructure wrap */}
              <g className="arch__layer l5">
                <rect x="40" y="30" width="1000" height="420" rx="18" fill="none" stroke="var(--ai-accent)" strokeWidth="1.4" strokeDasharray="6 6"/>
                <rect x="60" y="14" width="240" height="32" rx="16" fill="var(--ai-accent)"/>
                <text x="180" y="35" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="#fff">MINDZY AI INFRASTRUCTURE</text>
              </g>

              {/* Layer 4: Governance */}
              <g className="arch__layer l4">
                <rect x="80" y="70" width="920" height="56" rx="12" fill="var(--ai-bg-3)" stroke="var(--ai-border)"/>
                <text x="100" y="103" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">GOVERNANCE · PERMISSIONS · VALIDATION · AUDIT</text>
                <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--ai-fg)">
                  <rect x="500" y="86" width="120" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="560" y="102" textAnchor="middle">Validation rules</text>
                  <rect x="632" y="86" width="100" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="682" y="102" textAnchor="middle">Audit log</text>
                  <rect x="744" y="86" width="120" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="804" y="102" textAnchor="middle">Role hierarchy</text>
                  <rect x="876" y="86" width="100" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="926" y="102" textAnchor="middle">Approvals</text>
                </g>
              </g>

              {/* Layer 3: Model orchestration */}
              <g className="arch__layer l3">
                <rect x="80" y="140" width="920" height="78" rx="12" fill="var(--ai-bg-3)" stroke="var(--ai-border)"/>
                <text x="100" y="172" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">MODEL ORCHESTRATION</text>
                <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="500">
                  <g><rect x="240" y="180" width="80" height="26" rx="13" fill="var(--ai-accent)"/><text x="280" y="197" textAnchor="middle" fill="#fff">MindFast</text></g>
                  <g><rect x="328" y="180" width="86" height="26" rx="13" fill="var(--ai-accent)"/><text x="371" y="197" textAnchor="middle" fill="#fff">MindDeep</text></g>
                  <g><rect x="422" y="180" width="76" height="26" rx="13" fill="var(--ai-accent)"/><text x="460" y="197" textAnchor="middle" fill="#fff">Mind 3.1</text></g>
                  <g><rect x="514" y="180" width="56" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="542" y="197" textAnchor="middle" fill="var(--ai-fg)">GPT</text></g>
                  <g><rect x="578" y="180" width="64" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="610" y="197" textAnchor="middle" fill="var(--ai-fg)">Claude</text></g>
                  <g><rect x="650" y="180" width="64" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="682" y="197" textAnchor="middle" fill="var(--ai-fg)">Gemini</text></g>
                  <g><rect x="722" y="180" width="64" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="754" y="197" textAnchor="middle" fill="var(--ai-fg)">Mistral</text></g>
                  <g><rect x="794" y="180" width="56" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="822" y="197" textAnchor="middle" fill="var(--ai-fg)">Llama</text></g>
                </g>
              </g>

              {/* Layer 2: Connectors */}
              <g className="arch__layer l2">
                <rect x="80" y="232" width="920" height="56" rx="12" fill="var(--ai-bg-3)" stroke="var(--ai-border)"/>
                <text x="100" y="266" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">MINDZY CONNECTORS</text>
                <g fontFamily="ui-monospace,monospace" fontSize="10.5" fill="var(--ai-fg-muted)">
                  <text x="290" y="266">API</text><text x="330" y="266">Webhook</text><text x="400" y="266">RPA</text><text x="440" y="266">Browser</text><text x="510" y="266">SDK</text><text x="550" y="266">Email-bridge</text><text x="650" y="266">CSV-stream</text><text x="740" y="266">DB-tap</text><text x="810" y="266">Custom</text>
                </g>
              </g>
              <g className="arch__layer l2" fill="none" stroke="var(--ai-accent)" strokeWidth="0.8" opacity="0.45">
                <path className="connector" d="M180 288 L180 318"/>
                <path className="connector" d="M340 288 L340 318"/>
                <path className="connector" d="M500 288 L500 318"/>
                <path className="connector" d="M660 288 L660 318"/>
                <path className="connector" d="M820 288 L820 318"/>
              </g>

              {/* Layer 1: Client tools */}
              <g className="arch__layer l1">
                <rect x="80" y="318" width="920" height="118" rx="12" fill="var(--ai-surface)" stroke="var(--ai-border)"/>
                <text x="100" y="346" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">YOUR COMPANY · TOOLS &amp; SYSTEMS</text>
                <g fontFamily="Instrument Sans, sans-serif" fontSize="11.5" fill="var(--ai-fg)">
                  <g><rect x="120" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="180" y="395" textAnchor="middle">CRM</text></g>
                  <g><rect x="260" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="320" y="395" textAnchor="middle">Email + Calendar</text></g>
                  <g><rect x="400" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="460" y="395" textAnchor="middle">Drive · Notion</text></g>
                  <g><rect x="540" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="600" y="395" textAnchor="middle">ERP · Finance</text></g>
                  <g><rect x="680" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="740" y="395" textAnchor="middle">Slack · Teams</text></g>
                  <g><rect x="820" y="360" width="140" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="890" y="395" textAnchor="middle">Legacy · No-API</text></g>
                </g>
              </g>
            </svg>
            <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--ai-fg-soft)', textAlign: 'center', fontStyle: 'italic' }}>
              Every layer is custom-built for the client. No two Mindzy infrastructures are identical.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default ArchitectureSection
