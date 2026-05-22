import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/FadeIn'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'About — Mindzy',
  description: 'Mindzy designs and deploys custom AI infrastructure for companies of all sizes and maturity levels.',
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  await params
  return (
    <div style={{ background: 'var(--ai-bg)' }}>
      {/* Hero */}
      <section style={{ padding: '120px 0 80px', textAlign: 'center', background: 'var(--ai-bg-3, #f5f2eb)' }}>
        <div className="w-full max-w-[680px] mx-auto px-8">
          <FadeIn>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)', marginBottom: '24px' }}>About Mindzy</div>
            <h1 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.22, marginBottom: '24px' }}>
              We build AI infrastructure,<br /><em>not AI tools.</em>
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--ai-fg-muted)', marginBottom: '32px' }}>
              Mindzy designs and deploys custom AI infrastructure for companies of all sizes and maturity levels. We don&apos;t sell pre-packaged solutions — we build systems that run inside your company, around your workflows, governed by your rules.
            </p>
            <a href="https://calendar.app.google/ghE79tSFxmea4Scd9" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '999px', background: 'var(--ai-accent)', color: '#fff', fontSize: '14.5px', fontWeight: 600, textDecoration: 'none' }}>
              Talk to us
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div style={{ marginBottom: '64px' }}>
            <FadeIn>
              <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.2 }}>How we work</h2>
            </FadeIn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }} className="grid-cols-1 md:grid-cols-3">
            {[
              { title: 'Diagnosis first', body: 'Every engagement starts with an executive diagnostic — no technology is proposed before we understand your operations.' },
              { title: 'Custom, always', body: 'No templates. No pre-built stacks. Every infrastructure is designed from scratch around your departments, tools, and governance.' },
              { title: 'Human in the loop', body: 'Validation gates, approval flows, and role-based access are built into every system. AI executes; humans decide.' },
            ].map(v => (
              <FadeIn key={v.title}>
                <div style={{ borderTop: '2px solid var(--ai-accent)', paddingTop: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: '22px', marginBottom: '12px' }}>{v.title}</h3>
                  <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--ai-fg-muted)' }}>{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </div>
  )
}
