import { FadeIn } from '@/components/animations/FadeIn'

export function CustomDesignSection() {
  return (
    <section style={{ padding: '120px 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <FadeIn className="max-w-[920px] mx-auto text-center">
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>
            Our approach
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif-ai)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.32,
            margin: '18px auto 0',
            maxWidth: '18ch',
          }}>
            <em style={{ fontStyle: 'italic', fontSize: '0.93em' }}>We don&apos;t ship infrastructure.</em>
            <br />
            We build it around your company.
          </h2>
          <div style={{ margin: '48px auto 0', maxWidth: '720px', textAlign: 'left' }}>
            <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'var(--ai-fg-muted)' }}>
              Every Mindzy engagement starts with a structured executive diagnosis of your business. We map your departments, your tools, your workflows, your bottlenecks, and your priorities, before any technology is proposed.
            </p>
          </div>
          <a
            href="/en/process"
            style={{
              marginTop: '48px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '15px', color: 'var(--ai-fg)',
              borderBottom: '1px solid var(--ai-border-strong)', paddingBottom: '4px',
            }}
            className="hover:text-[var(--ai-accent)] hover:border-[var(--ai-accent)] transition-colors group"
          >
            See our 10-step process
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

export default CustomDesignSection
