import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/FadeIn'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'Our Process — Mindzy',
  description: 'Every Mindzy engagement follows the same structured method — from executive diagnosis to long-term optimization roadmap. No template. No pre-built stack.',
}

const STEPS = [
  { n: '01', title: 'Executive Diagnosis', essence: 'We listen before we build.', desc: 'A structured 2-3 hour executive session maps your departments, tools, workflows, bottlenecks, and priorities.', deliverable: 'Diagnostic report + priority map' },
  { n: '02', title: 'Infrastructure Blueprint', essence: 'Architecture before code.', desc: 'We design the AI infrastructure layer: model selection, connector map, governance rules, and validation logic.', deliverable: 'Technical blueprint + governance spec' },
  { n: '03', title: 'Pilot Selection', essence: 'One workflow. Real results.', desc: 'We identify the highest-impact workflow to automate first — fast enough to prove value, scoped enough to control risk.', deliverable: 'Pilot scope document' },
  { n: '04', title: 'Core Build', essence: 'Infrastructure, not a chatbot.', desc: 'We build the first operational layer: models connected, connectors deployed, validation gates wired.', deliverable: 'Live pilot workflow in your environment' },
  { n: '05', title: 'Validation & Tuning', essence: 'Your team approves. We tune.', desc: 'The pilot runs in shadow mode. Your team validates outputs. We tune model routing, prompts, and edge cases.', deliverable: 'Calibrated pilot + approval log' },
  { n: '06', title: 'Governance Setup', essence: 'Rules that protect your company.', desc: 'Role-based access, audit logs, escalation paths, and validation rules are codified into the infrastructure.', deliverable: 'Governance framework + role matrix' },
  { n: '07', title: 'Department Rollout', essence: 'One department at a time.', desc: 'The infrastructure expands to the next department. Connectors, models, and dashboards are scoped per team.', deliverable: 'Deployed department module' },
  { n: '08', title: 'Dashboard & Visibility', essence: 'See everything. Control everything.', desc: 'A custom dashboard is built per client — showing active workflows, pending validations, team activity, and model usage.', deliverable: 'Custom command center dashboard' },
  { n: '09', title: 'Training & Handover', essence: 'Your team owns it.', desc: 'We train your teams on the dashboard, validation flows, and override procedures. Internal documentation is written.', deliverable: 'Training sessions + internal docs' },
  { n: '10', title: 'Optimization Roadmap', essence: 'Infrastructure that compounds.', desc: 'We deliver a 90-day optimization roadmap: new workflows to automate, models to upgrade, governance to refine.', deliverable: 'Roadmap + quarterly review cadence' },
]

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  await params
  return (
    <div style={{ background: 'var(--ai-bg)' }}>
      {/* Hero */}
      <section style={{ padding: '120px 0 80px', textAlign: 'center' }}>
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <FadeIn>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)', marginBottom: '24px' }}>Our process</div>
            <h1 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(36px,4.2vw,58px)', lineHeight: 1.24, marginBottom: '24px' }}>
              Diagnosis. Blueprint. Deploy.
            </h1>
            <p style={{ fontSize: '19px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '560px', margin: '0 auto' }}>
              Every Mindzy engagement follows the same structured method — from executive diagnosis to long-term optimization roadmap. No template. No pre-built stack.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="w-full max-w-[900px] mx-auto px-8">
          {STEPS.map((step, i) => (
            <FadeIn key={step.n} delay={i * 50}>
              <div style={{ borderTop: '1px solid var(--ai-border)', padding: '64px 0', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '40px', alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-serif-ai)', fontSize: '48px', lineHeight: 1, color: 'var(--ai-fg-soft)', paddingTop: '8px' }}>{step.n}</div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(28px,3.2vw,40px)', lineHeight: 1.2, marginBottom: '8px' }}>{step.title}</h2>
                  <p style={{ fontFamily: 'var(--font-serif-ai)', fontStyle: 'italic', fontSize: '19px', color: 'var(--ai-fg-muted)', marginBottom: '16px', lineHeight: 1.4 }}>{step.essence}</p>
                  <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--ai-fg-muted)', marginBottom: '16px' }}>{step.desc}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ai-accent)', background: 'color-mix(in srgb, var(--ai-accent) 10%, transparent)', padding: '6px 14px', borderRadius: '999px' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
                    {step.deliverable}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FinalCTASection />
    </div>
  )
}
