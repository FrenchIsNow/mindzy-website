import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/FadeIn'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'FAQ — Mindzy',
  description: 'Frequently asked questions about Mindzy AI infrastructure services.',
}

const FAQ_ITEMS = [
  { q: 'What exactly is AI infrastructure?', a: 'AI infrastructure is the operating layer that connects AI models, your business tools, your workflows, and your governance into a coherent system. Unlike a single AI agent that performs one task, AI infrastructure runs multiple workflows across departments with validation, oversight, and human control built in.' },
  { q: 'How is Mindzy different from off-the-shelf AI tools?', a: 'Off-the-shelf tools are built for generic use cases. Mindzy builds around your specific company: your tools, your hierarchy, your approval flows. Nothing is templated. Every integration, every validation rule, every model routing decision is designed for your operations.' },
  { q: 'What size of company works with Mindzy?', a: 'We work with companies ranging from 10-person startups to enterprise organizations. The key requirement is that you have real operational workflows — repetitive processes, approval loops, data flows — that AI can structurally improve.' },
  { q: 'How long does a deployment take?', a: 'The first operational AI workforce typically deploys in 30–90 days. This includes diagnosis, blueprint, pilot deployment, validation, and rollout to the first department. Subsequent departments roll out faster as the infrastructure is already in place.' },
  { q: 'What AI models do you use?', a: 'Mindzy operates three proprietary models — MindFast, MindDeep, and Mind 3.1 — and routes tasks to the right model based on complexity, latency, and context. We also connect to all major external models (OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek) when client requirements call for it.' },
  { q: 'Do we need a technical team to work with Mindzy?', a: 'No. Mindzy handles the full technical implementation. Your team interacts with the dashboard and validates outputs — no engineering work is required on your side. We train your operational teams, not your engineers.' },
  { q: 'How do you handle security and data governance?', a: 'Governance is built into every deployment: role-based access controls, validation gates, audit logs, and escalation paths. Your data stays within your defined perimeter. We design compliance into the infrastructure, not as an afterthought.' },
  { q: 'What does the ongoing relationship look like?', a: 'After deployment, we deliver a 90-day optimization roadmap and offer quarterly review cadences to tune model routing, expand to new workflows, and refine governance as your company evolves.' },
]

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  await params
  return (
    <div style={{ background: 'var(--ai-bg)' }}>
      <section style={{ padding: '120px 0 80px', textAlign: 'center' }}>
        <div className="w-full max-w-[680px] mx-auto px-8">
          <FadeIn>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)', marginBottom: '24px' }}>FAQ</div>
            <h1 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(36px,4.5vw,56px)', lineHeight: 1.22 }}>
              Frequently asked questions
            </h1>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: '0 0 120px' }}>
        <div className="w-full max-w-[760px] mx-auto px-8">
          {FAQ_ITEMS.map((item, i) => (
            <FadeIn key={i} delay={i * 40}>
              <div style={{ borderTop: '1px solid var(--ai-border)', padding: '40px 0' }}>
                <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.3, marginBottom: '16px' }}>{item.q}</h2>
                <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--ai-fg-muted)' }}>{item.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FinalCTASection />
    </div>
  )
}
