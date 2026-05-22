const USE_CASES = [
  {
    cat: 'Sales', title: 'Sales acceleration',
    desc: 'Qualify leads, enrich CRM data, prepare follow-ups, summarize calls, and automate pipeline updates without losing human control.',
    tags: ['Lead qualification','CRM enrichment','Follow-up automation','Meeting summaries'],
    cta: 'Build this workflow',
  },
  {
    cat: 'Operations', title: 'Operations automation',
    desc: 'Turn repetitive internal processes into structured workflows with clear validation, task routing, alerts, and execution tracking.',
    tags: ['Task routing','Process automation','Internal alerts','Workflow tracking'],
    cta: 'Automate operations',
  },
  {
    cat: 'Finance', title: 'Finance & reporting',
    desc: 'Automate reporting, invoice extraction, financial document review, data consolidation, and recurring management dashboards.',
    tags: ['Invoice extraction','Financial reporting','Data consolidation','Dashboard generation'],
    cta: 'Improve reporting',
  },
  {
    cat: 'Support', title: 'Customer support layer',
    desc: 'Connect support channels, classify requests, draft replies, route tickets, and escalate sensitive cases to the right human.',
    tags: ['Ticket classification','Reply drafting','Knowledge matching','Human escalation'],
    cta: 'Upgrade support',
  },
  {
    cat: 'Management', title: 'Executive command center',
    desc: 'Give leadership a real-time view of workflows, bottlenecks, pending validations, team activity, and operational performance.',
    tags: ['Workflow visibility','Pending approvals','Team activity','Performance insights'],
    cta: 'Create visibility',
  },
  {
    cat: 'Company-wide', title: 'Custom AI workforce',
    desc: 'Deploy AI assistants by department, connected to your tools, governed by your rules, and adapted to your internal hierarchy.',
    tags: ['Department assistants','Role-based access','Tool integrations','Human validation'],
    cta: 'Design your system',
  },
]

const BOOK_URL = 'https://calendar.app.google/ghE79tSFxmea4Scd9'

export function UseCasesSection() {
  return (
    <section style={{ padding: '120px 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div style={{ maxWidth: '740px', marginBottom: '60px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>Use cases</div>
          <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.22, margin: '12px 0 18px', letterSpacing: '-0.015em' }}>
            Built around real business operations.
          </h2>
          <p style={{ color: 'var(--ai-fg-muted)', fontSize: '17px', lineHeight: 1.68, maxWidth: '620px' }}>
            From sales to finance, support, operations, and management, Mindzy builds AI infrastructure around the workflows that actually move your company forward.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map(card => (
            <div key={card.title} style={{
              background: 'var(--ai-surface)', border: '1px solid var(--ai-border)', borderRadius: '20px',
              padding: '28px 28px 26px', display: 'flex', flexDirection: 'column', gap: '14px',
              transition: 'border-color 160ms cubic-bezier(.2,.7,.2,1), box-shadow 280ms cubic-bezier(.2,.7,.2,1), transform 280ms cubic-bezier(.2,.7,.2,1)',
            }}
              className="hover:border-[rgba(124,58,237,0.22)] hover:shadow-[0_10px_40px_rgba(124,58,237,0.08)] hover:-translate-y-[3px]">

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '10.5px', letterSpacing: '.10em', textTransform: 'uppercase', color: 'var(--ai-accent)', fontWeight: 500 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--ai-accent)', opacity: .65, flexShrink: 0, display: 'block' }} />
                {card.cat}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: '20px', lineHeight: 1.25, letterSpacing: '-0.01em', margin: 0 }}>{card.title}</h3>

              <p style={{ color: 'var(--ai-fg-muted)', fontSize: '13.5px', lineHeight: 1.68, flex: 1, margin: 0 }}>{card.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {card.tags.map(tag => (
                  <span key={tag} style={{ padding: '3px 10px', border: '1px solid var(--ai-border)', borderRadius: '999px', fontSize: '10.5px', color: 'var(--ai-fg-soft)', background: 'var(--ai-bg-3)', letterSpacing: '0.01em' }}>{tag}</span>
                ))}
              </div>

              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--ai-accent)', fontSize: '13px', fontWeight: 500, marginTop: '6px', textDecoration: 'none' }}
                className="hover:gap-[9px] transition-all">
                {card.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '56px', textAlign: 'center' }}>
          <a
            href={BOOK_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '999px', background: 'var(--ai-accent)', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px color-mix(in srgb,var(--ai-accent) 38%,transparent)' }}
            className="hover:bg-[var(--ai-accent-hover)] hover:-translate-y-0.5 transition-all"
          >
            Book an infrastructure audit
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection
