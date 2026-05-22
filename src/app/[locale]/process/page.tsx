'use client'

import { useEffect } from 'react'
import { GlassButton } from '@/components/ui/GlassButton'

// ── All process-page CSS injected as a style tag ──
const CSS = `
  .process-hero { padding: 180px 0 64px; text-align: center; display: flex; flex-direction: column; align-items: center; }
  .process-hero .eyebrow { text-align: center; }
  .process-hero h1 { font-family: var(--font-serif-ai); font-size: clamp(36px,4.2vw,58px); line-height: 1.24; padding-bottom: 0.1em; max-width: 100%; white-space: nowrap; margin-top: 16px; text-align: center; font-weight: 400; letter-spacing: -0.02em; }
  @media (max-width: 700px) { .process-hero h1 { white-space: normal; font-size: clamp(32px,7vw,46px); } }
  .process-hero__lines { margin-top: 28px; display: grid; gap: 5px; text-align: center; list-style: none; padding: 0; margin-left: auto; margin-right: auto; }
  .process-hero__lines li { font-size: 16px; color: var(--ai-fg-muted); line-height: 1.5; }
  .process-hero__explore { display: inline-flex; align-items: center; gap: 8px; margin-top: 44px; font-size: 14px; font-weight: 500; color: var(--ai-accent); letter-spacing: 0.01em; text-decoration: none; transition: gap 160ms cubic-bezier(.2,.7,.2,1); }
  .process-hero__explore:hover { gap: 12px; }
  .process-hero__explore svg { transition: transform 160ms cubic-bezier(.2,.7,.2,1); }
  .process-hero__explore:hover svg { transform: translateY(3px); }

  .process-shell { display: grid; grid-template-columns: 260px minmax(0,1fr) 64px; gap: 40px; padding: 32px 0 96px; }
  @media (max-width: 1000px) { .process-shell { grid-template-columns: 1fr; gap: 0; padding-bottom: 64px; } }

  .process-rail { position: sticky; top: 100px; align-self: start; padding: 20px 0; font-size: 13px; }
  @media (max-width: 1000px) { .process-rail { display: none; } }
  .process-rail__title { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--ai-fg-soft); margin-bottom: 16px; }
  .process-rail__list { display: grid; gap: 2px; }
  .process-rail__item { display: grid; grid-template-columns: 14px 1fr; gap: 10px; align-items: center; padding: 7px 0; color: var(--ai-fg-muted); opacity: 0.4; transition: opacity 280ms cubic-bezier(.2,.7,.2,1), color 280ms cubic-bezier(.2,.7,.2,1); cursor: pointer; background: transparent; border: 0; text-align: left; font: inherit; width: 100%; }
  .process-rail__item:hover { opacity: 0.75; }
  .process-rail__item .dot { width: 5px; height: 5px; border-radius: 999px; background: var(--ai-fg-soft); margin-left: 5px; transition: background 280ms, width 280ms, height 280ms; }
  .process-rail__item.is-active { opacity: 1; color: var(--ai-accent); font-weight: 500; }
  .process-rail__item.is-active .dot { background: var(--ai-accent); width: 8px; height: 8px; margin-left: 3px; box-shadow: 0 0 0 3px color-mix(in srgb,var(--ai-accent) 16%,transparent); }
  .process-rail__num { font-family: var(--font-serif-ai); font-size: 11px; color: var(--ai-fg-soft); margin-right: 2px; }

  .process-progress { position: sticky; top: 100px; align-self: start; width: 2px; height: calc(100vh - 180px); background: var(--ai-border); border-radius: 999px; margin-left: auto; overflow: hidden; }
  @media (max-width: 1000px) { .process-progress { display: none; } }
  .process-progress__fill { width: 100%; background: var(--ai-accent); height: 0%; transition: height .12s linear; }

  .process-steps { display: grid; gap: 0; }
  .process-step { position: relative; min-height: 62vh; padding: 56px 0; display: grid; grid-template-columns: minmax(0,1fr) 260px; gap: 48px; align-items: center; }
  @media (max-width: 900px) { .process-step { grid-template-columns: 1fr; gap: 28px; min-height: auto; padding: 48px 0; } }
  .process-step + .process-step { border-top: 1px solid var(--ai-border); }
  .process-step__bg-num { position: absolute; top: 32px; left: -12px; font-family: var(--font-serif-ai); font-size: clamp(100px,12vw,160px); line-height: 1; color: var(--ai-fg); opacity: 0.05; pointer-events: none; user-select: none; z-index: 0; }
  .process-step__left { position: relative; z-index: 1; will-change: transform, opacity; }
  .process-step__body { max-width: 520px; }
  .process-step__eyebrow { font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ai-accent); font-weight: 500; margin-bottom: 14px; }
  .process-step__title { font-family: var(--font-serif-ai); font-size: clamp(34px,3.8vw,46px); line-height: 1.28; padding-bottom: 0.06em; letter-spacing: -0.015em; font-weight: 400; }
  .process-step__essence { font-family: var(--font-serif-ai); font-style: italic; font-size: 21px; line-height: 1.4; color: var(--ai-fg); opacity: 0.68; margin-top: 14px; padding-bottom: 0.04em; }
  .process-step__copy { margin-top: 20px; font-size: 16px; line-height: 1.68; color: var(--ai-fg-muted); max-width: 480px; }

  .process-anchor { position: relative; z-index: 1; border: 1px solid var(--ai-border); border-radius: 16px; background: var(--ai-surface); padding: 24px; aspect-ratio: 4/5; overflow: hidden; will-change: transform, opacity; }
  @media (max-width: 900px) { .process-anchor { aspect-ratio: 16/9; } }

  .anchor-org { display: grid; gap: 14px; padding-top: 8px; align-content: start; }
  .anchor-org__root { align-self: center; justify-self: center; padding: 10px 18px; border-radius: 10px; background: var(--ai-accent); color: #fff; font-size: 12px; font-weight: 500; }
  html[data-ai-theme="black"] .anchor-org__root { color: #0a0e1a; }
  .anchor-org__line { display: block; height: 18px; width: 1px; background: var(--ai-border-strong); margin: 0 auto; }
  .anchor-org__row { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
  .anchor-org__cell { text-align: center; padding: 10px 8px; border: 1px solid var(--ai-border); border-radius: 10px; font-size: 11.5px; color: var(--ai-fg-muted); background: var(--ai-bg-2); }

  .anchor-blueprint { background: repeating-linear-gradient(to right,transparent 0 39px,var(--ai-border) 39px 40px),repeating-linear-gradient(to bottom,transparent 0 39px,var(--ai-border) 39px 40px); border-radius: 12px; padding: 16px; display: grid; gap: 8px; }
  .anchor-blueprint__row { display: flex; align-items: center; gap: 8px; font-size: 10.5px; color: var(--ai-fg-muted); }
  .anchor-blueprint__row .tag { font-family: ui-monospace,monospace; background: var(--ai-surface); border: 1px solid var(--ai-border); border-radius: 4px; padding: 1px 6px; color: var(--ai-accent); }
  .anchor-blueprint__row .line { flex: 1; height: 1px; background: var(--ai-accent); opacity: 0.4; }

  .anchor-depts { display: grid; gap: 8px; align-content: start; }
  .anchor-dept { border: 1px solid var(--ai-border); border-radius: 10px; padding: 10px 12px; background: var(--ai-bg-2); font-size: 12px; display: grid; gap: 4px; }
  .anchor-dept__name { color: var(--ai-fg); font-weight: 500; font-size: 12.5px; }
  .anchor-dept__hint { color: var(--ai-fg-soft); font-size: 11px; }
  .anchor-dept:hover { border-color: var(--ai-accent); background: color-mix(in srgb,var(--ai-accent) 4%,var(--ai-bg-2)); }

  .anchor-arch { display: grid; gap: 6px; align-content: center; padding-top: 16px; }
  .anchor-arch__layer { padding: 10px 12px; border-radius: 8px; border: 1px solid var(--ai-border); background: var(--ai-bg-2); font-size: 11px; color: var(--ai-fg-muted); display: flex; justify-content: space-between; align-items: center; }
  .anchor-arch__layer.is-accent { border-color: color-mix(in srgb,var(--ai-accent) 50%,transparent); background: color-mix(in srgb,var(--ai-accent) 8%,var(--ai-bg-2)); color: var(--ai-accent); }
  .anchor-arch__layer .tag { font-family: ui-monospace,monospace; font-size: 10px; opacity: .65; }

  .anchor-dash { display: grid; grid-template-rows: auto auto 1fr; gap: 10px; padding: 12px; background: var(--ai-bg-2); border: 1px solid var(--ai-border); border-radius: 12px; height: 100%; }
  .anchor-dash__title { font-family: var(--font-serif-ai); font-size: 14px; }
  .anchor-dash__kpi-row { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .anchor-dash__kpi { background: var(--ai-surface); border: 1px solid var(--ai-border); border-radius: 6px; padding: 8px 10px; font-size: 10.5px; }
  .anchor-dash__kpi b { font-family: var(--font-serif-ai); font-size: 16px; display: block; color: var(--ai-fg); }
  .anchor-dash__rows { display: grid; gap: 4px; }
  .anchor-dash__lane { display: grid; grid-template-columns: 60px 1fr 12px; gap: 8px; align-items: center; font-size: 10.5px; padding: 5px 6px; background: var(--ai-surface); border: 1px solid var(--ai-border); border-radius: 6px; }
  .anchor-dash__bar { background: var(--ai-bg-3); height: 4px; border-radius: 999px; overflow: hidden; position: relative; }
  .anchor-dash__bar i { position: absolute; inset: 0; right: auto; background: var(--ai-accent); border-radius: 999px; }
  .anchor-dash__tick { width: 8px; height: 8px; border-radius: 999px; background: color-mix(in srgb,var(--ai-accent) 30%,transparent); }

  .anchor-tools { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; align-content: start; padding-top: 8px; }
  .anchor-tools__cell { padding: 14px 6px; text-align: center; border: 1px solid var(--ai-border); border-radius: 8px; background: var(--ai-bg-2); font-size: 11px; color: var(--ai-fg-muted); position: relative; }
  .anchor-tools__cell::after { content: ""; position: absolute; left: 50%; bottom: -7px; width: 1px; height: 7px; background: var(--ai-accent); opacity: 0.5; }
  .anchor-tools__hub { grid-column: 1/-1; margin-top: 4px; padding: 12px; text-align: center; background: var(--ai-accent); color: #fff; border-radius: 8px; font-size: 11.5px; font-weight: 500; }
  html[data-ai-theme="black"] .anchor-tools__hub { color: #0a0e1a; }

  .anchor-rollout { display: grid; gap: 10px; align-content: center; padding-top: 8px; }
  .anchor-rollout__row { display: grid; grid-template-columns: 80px 1fr; gap: 12px; font-size: 11.5px; align-items: center; }
  .anchor-rollout__row .dept { color: var(--ai-fg); }
  .anchor-rollout__row .bar { height: 6px; border-radius: 999px; background: var(--ai-bg-3); position: relative; overflow: hidden; }
  .anchor-rollout__row .bar::after { content: ""; position: absolute; inset: 0; right: auto; background: var(--ai-accent); border-radius: 999px; width: var(--w,0%); transition: width 1s cubic-bezier(.2,.7,.2,1); }

  .anchor-matrix { padding-top: 8px; }
  .anchor-matrix__row { display: grid; grid-template-columns: 1fr 60px 60px 60px; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--ai-border); font-size: 11.5px; }
  .anchor-matrix__row:last-child { border-bottom: 0; }
  .anchor-matrix__row.head { color: var(--ai-fg-soft); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
  .anchor-matrix__cell { text-align: center; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 4px; margin: 0 auto; }
  .anchor-matrix__cell.auto { background: color-mix(in srgb,var(--ai-accent) 14%,transparent); color: var(--ai-accent); }
  .anchor-matrix__cell.gate { background: color-mix(in srgb,var(--mindzy-gold) 24%,transparent); color: #8a6d12; }
  html[data-ai-theme="black"] .anchor-matrix__cell.gate { color: #e6c768; }
  .anchor-matrix__cell.human { background: var(--ai-bg-3); color: var(--ai-fg); }

  .anchor-roles { display: grid; gap: 10px; padding-top: 8px; }
  .anchor-role { display: grid; grid-template-columns: 36px 1fr auto; gap: 12px; align-items: center; padding: 10px 12px; border: 1px solid var(--ai-border); border-radius: 10px; background: var(--ai-bg-2); font-size: 12px; }
  .anchor-role__ico { width: 32px; height: 32px; border-radius: 999px; background: color-mix(in srgb,var(--ai-accent) 14%,transparent); color: var(--ai-accent); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-serif-ai); font-size: 14px; }
  .anchor-role__name { color: var(--ai-fg); }
  .anchor-role__access { color: var(--ai-fg-soft); font-size: 10.5px; letter-spacing: .04em; text-transform: uppercase; }

  .anchor-future { padding-top: 8px; display: grid; gap: 10px; }
  .anchor-future__row { display: grid; grid-template-columns: 64px 1fr; gap: 10px; align-items: center; font-size: 11.5px; }
  .anchor-future__row .when { font-family: var(--font-serif-ai); color: var(--ai-accent); font-size: 13px; }
  .anchor-future__row .what { border-left: 1px solid var(--ai-border); padding-left: 10px; color: var(--ai-fg-muted); }
  .anchor-future__row.is-now .what { border-color: var(--ai-accent); color: var(--ai-fg); }

  .process-close { padding: 100px 0 80px; border-top: 1px solid var(--ai-border); text-align: center; }
  .process-close h2 { font-family: var(--font-serif-ai); font-size: clamp(38px,5vw,62px); line-height: 1.26; max-width: 16ch; margin: 0 auto; padding-bottom: 0.1em; font-weight: 400; letter-spacing: -0.02em; }
  .process-close__body { margin: 32px auto 0; color: var(--ai-fg-muted); font-size: 17px; line-height: 1.7; max-width: 540px; }
  .process-close .btn-wrap { margin-top: 40px; display: flex; justify-content: center; }

  .eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ai-accent); }
`

const STEPS = [
  {
    id: 'step-1', num: '01', eyebrow: 'Step 01 — Diagnosis',
    title: 'Executive Diagnosis.',
    essence: 'We listen before we build.',
    copy: 'We meet your leadership, map your departments, and understand how work actually gets done — before any technology is proposed.',
    anchor: (
      <div className="process-anchor anchor-org">
        <div className="anchor-org__root">Leadership</div>
        <span className="anchor-org__line" />
        <div className="anchor-org__row">
          <div className="anchor-org__cell">Sales</div>
          <div className="anchor-org__cell">Operations</div>
          <div className="anchor-org__cell">Support</div>
        </div>
        <div className="anchor-org__row">
          <div className="anchor-org__cell">Finance</div>
          <div className="anchor-org__cell">HR</div>
          <div className="anchor-org__cell">Admin</div>
        </div>
      </div>
    ),
  },
  {
    id: 'step-2', num: '02', eyebrow: 'Step 02 — Blueprint',
    title: 'AI Transformation Blueprint.',
    essence: 'A plan built around your priorities.',
    copy: 'We define what to build, what to connect, and in what order — based on where AI creates the fastest, most measurable impact for your business.',
    anchor: (
      <div className="process-anchor anchor-blueprint">
        {[['workflow','Lead qualification'],['tool','HubSpot · Gmail'],['model','MindFast'],['gate','Manager approval'],['kpi','Response time'],['phase','Pilot · 30 days']].map(([tag,label]) => (
          <div key={tag} className="anchor-blueprint__row"><span className="tag">{tag}</span><span className="line" /><span>{label}</span></div>
        ))}
      </div>
    ),
  },
  {
    id: 'step-3', num: '03', eyebrow: 'Step 03 — Mapping',
    title: 'Department Mapping.',
    essence: 'Every team is different.',
    copy: 'Sales, operations, support, finance — each department has its own workflows, bottlenecks, and needs. We map them individually before designing anything.',
    anchor: (
      <div className="process-anchor anchor-depts">
        {[['Sales','Lead qualification · CRM enrichment · follow-ups'],['Operations','Dispatch · exception handling · SLA tracking'],['Administration','Invoice extraction · form automation · audit prep'],['Support','Triage · summarization · escalation routing'],['Management','Quarterly briefings · cross-team reporting']].map(([name,hint]) => (
          <div key={name} className="anchor-dept"><span className="anchor-dept__name">{name}</span><span className="anchor-dept__hint">{hint}</span></div>
        ))}
      </div>
    ),
  },
  {
    id: 'step-4', num: '04', eyebrow: 'Step 04 — Architecture',
    title: 'System Architecture.',
    essence: 'Structure before execution.',
    copy: 'We define the role of each assistant, the tools they connect to, the data they can access, and the validation rules that govern every action.',
    anchor: (
      <div className="process-anchor anchor-arch">
        <div className="anchor-arch__layer is-accent"><span>Mindzy AI Infrastructure</span><span className="tag">L5</span></div>
        <div className="anchor-arch__layer"><span>Governance · Validation · Audit</span><span className="tag">L4</span></div>
        <div className="anchor-arch__layer"><span>Model Orchestration</span><span className="tag">L3</span></div>
        <div className="anchor-arch__layer"><span>Mindzy Connectors</span><span className="tag">L2</span></div>
        <div className="anchor-arch__layer"><span>Your Tools &amp; Systems</span><span className="tag">L1</span></div>
      </div>
    ),
  },
  {
    id: 'step-5', num: '05', eyebrow: 'Step 05 — Command Center',
    title: 'Custom Dashboard & Hierarchy.',
    essence: 'Your company. Your command center.',
    copy: 'We build a dashboard designed around your hierarchy — not a generic interface. Leadership sees the global picture. Managers own their department. Teams execute.',
    anchor: (
      <div className="process-anchor anchor-dash">
        <div className="anchor-dash__title">acme.mindzy.local</div>
        <div className="anchor-dash__kpi-row">
          <div className="anchor-dash__kpi"><b>~50</b>workflows live</div>
          <div className="anchor-dash__kpi"><b>8</b>awaiting validation</div>
        </div>
        <div className="anchor-dash__rows">
          {[['Sales','30%'],['Ops','58%'],['Support','8%'],['Admin','42%']].map(([name,right]) => (
            <div key={name} className="anchor-dash__lane">
              <span>{name}</span>
              <span className="anchor-dash__bar"><i style={{right}} /></span>
              <span className="anchor-dash__tick" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'step-6', num: '06', eyebrow: 'Step 06 — Build',
    title: 'Build & Integration.',
    essence: 'We connect to your world.',
    copy: 'We build the system inside your existing environment — CRM, email, ERP, internal tools. When a connector doesn\'t exist, we build it.',
    anchor: (
      <div className="process-anchor anchor-tools">
        {['CRM','Gmail','Drive','ERP','Notion','Slack','Sheets','Calendar','Legacy'].map(t => <div key={t} className="anchor-tools__cell">{t}</div>)}
        <div className="anchor-tools__hub">Mindzy Connectors</div>
      </div>
    ),
  },
  {
    id: 'step-7', num: '07', eyebrow: 'Step 07 — Deployment',
    title: 'Deployment by Department.',
    essence: 'One department at a time.',
    copy: 'We deploy progressively — validate in real conditions, collect feedback, adjust, then expand. Confidence before scale.',
    anchor: (
      <div className="process-anchor anchor-rollout">
        {[['Sales','100%'],['Operations','70%'],['Support','45%'],['Admin','15%'],['Finance','0%']].map(([dept,w]) => (
          <div key={dept} className="anchor-rollout__row">
            <span className="dept">{dept}</span>
            <span className="bar" style={{'--w': w} as React.CSSProperties} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'step-8', num: '08', eyebrow: 'Step 08 — Governance',
    title: 'Governance & Control.',
    essence: 'Humans stay in control.',
    copy: 'We define what the system can do alone, what it can suggest, and what always requires a human decision. Powerful, but supervised.',
    anchor: (
      <div className="process-anchor anchor-matrix">
        <div className="anchor-matrix__row head"><span>Action</span><span>Team</span><span>Manager</span><span>Lead</span></div>
        {[['Read CRM','auto','auto','auto'],['Draft email','auto','auto','auto'],['Send email','gate','auto','auto'],['Update CRM','gate','auto','auto'],['Approve invoice','human','gate','auto'],['Wire transfer','human','human','gate']].map(([action,...cells]) => (
          <div key={action} className="anchor-matrix__row">
            <span>{action}</span>
            {cells.map((c,i) => <span key={i} className={`anchor-matrix__cell ${c}`}>{c==='auto'?'✓':c==='gate'?'!':'·'}</span>)}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'step-9', num: '09', eyebrow: 'Step 09 — Training',
    title: 'Training & Adoption.',
    essence: 'Technology only works if people use it.',
    copy: 'We train your teams on daily usage — not on documentation. The AI workforce is positioned as support, not disruption.',
    anchor: (
      <div className="process-anchor anchor-roles">
        {[['E','Executive','Global view'],['M','Manager','Department'],['T','Team member','Operational']].map(([ico,name,access]) => (
          <div key={name} className="anchor-role">
            <span className="anchor-role__ico">{ico}</span>
            <span className="anchor-role__name">{name}</span>
            <span className="anchor-role__access">{access}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'step-10', num: '10', eyebrow: 'Step 10 — Roadmap',
    title: 'Optimization Roadmap.',
    essence: 'Deployment is the beginning.',
    copy: 'We deliver a roadmap for what comes next — new workflows, expanded departments, deeper integrations. The infrastructure grows as your company learns to use it.',
    anchor: (
      <div className="process-anchor anchor-future">
        <div className="anchor-future__row is-now"><span className="when">Q1</span><span className="what">Sales workforce live · 3 workflows in production</span></div>
        <div className="anchor-future__row"><span className="when">Q2</span><span className="what">Operations rollout · CRM connector expansion</span></div>
        <div className="anchor-future__row"><span className="when">Q3</span><span className="what">Finance &amp; reconciliation workflows</span></div>
        <div className="anchor-future__row"><span className="when">Q4</span><span className="what">Cross-department orchestration · executive layer</span></div>
        <div className="anchor-future__row"><span className="when">Y2</span><span className="what">New workflows surfaced from quarterly reviews</span></div>
      </div>
    ),
  },
]

export default function ProcessPage() {
  useEffect(() => {
    // Ported directly from process.html script
    const rail  = document.getElementById('processRail')
    const items = rail ? Array.from(rail.querySelectorAll<HTMLElement>('.process-rail__item')) : []
    const steps = Array.from(document.querySelectorAll<HTMLElement>('.process-step'))
    const fill  = document.getElementById('processProgressFill') as HTMLElement | null

    items.forEach(it => {
      it.addEventListener('click', () => {
        const target = it.dataset.target
        if (target) {
          const el = document.getElementById(target)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id
            items.forEach(i => i.classList.toggle('is-active', i.dataset.target === id))
          }
        })
      }, { rootMargin: '-30% 0px -30% 0px', threshold: 0.01 })
      steps.forEach(s => io.observe(s))
    }

    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

    const pairs = steps.map(step => ({
      left:  step.querySelector<HTMLElement>('.process-step__left'),
      right: step.querySelector<HTMLElement>('.process-anchor'),
      bgNum: step.querySelector<HTMLElement>('.process-step__bg-num'),
    }))

    // Set initial hidden state
    pairs.forEach(({ left, right }) => {
      if (left)  { left.style.transform  = 'translateX(-52px)'; left.style.opacity  = '0' }
      if (right) { right.style.transform = 'translateX(52px)';  right.style.opacity = '0' }
    })

    function updateProgress() {
      if (!fill || !steps.length) return
      const first = steps[0].getBoundingClientRect().top + window.scrollY
      const last  = steps[steps.length - 1].getBoundingClientRect().bottom + window.scrollY
      const total = last - first
      const here  = Math.min(Math.max(window.scrollY + window.innerHeight * 0.5 - first, 0), total)
      fill.style.height = ((here / total) * 100).toFixed(1) + '%'
    }

    function updateAnimations() {
      const vh = window.innerHeight
      pairs.forEach(({ left, right, bgNum }, i) => {
        const rect = steps[i].getBoundingClientRect()
        const raw = (vh - rect.top) / (vh * 0.72)
        const p   = easeOutCubic(Math.max(0, Math.min(1, raw)))
        if (left) {
          left.style.transform = `translateX(${(1 - p) * -52}px)`
          left.style.opacity   = (p < 0.01 ? 0 : Math.min(1, p * 1.5)).toFixed(3)
        }
        if (right) {
          right.style.transform = `translateX(${(1 - p) * 52}px)`
          right.style.opacity   = (p < 0.01 ? 0 : Math.min(1, p * 1.5)).toFixed(3)
        }
        if (bgNum) bgNum.style.transform = `translateY(${(1 - p) * 16}px)`
      })
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateAnimations(); updateProgress(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateAnimations()
    updateProgress()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="process-hero">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="eyebrow">Our method</div>
          <h1>
            <em style={{ fontStyle: 'italic' }}>We build your AI infrastructure.</em><br />
            In 10 Steps.
          </h1>
          <ul className="process-hero__lines">
            <li>Every engagement starts with a diagnosis.</li>
            <li>Every architecture is built around your company.</li>
            <li>No template. No shortcuts.</li>
          </ul>
          <a href="#step-1" className="process-hero__explore">
            Explore the process
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v10M3 8l4 4 4-4"/></svg>
          </a>
        </div>
      </section>

      {/* Steps shell */}
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="process-shell">
          {/* Left rail */}
          <aside className="process-rail" aria-label="Process steps">
            <div className="process-rail__title">10 steps</div>
            <div className="process-rail__list" id="processRail">
              {STEPS.map((s, i) => (
                <button key={s.id} className={`process-rail__item${i === 0 ? ' is-active' : ''}`} data-target={s.id}>
                  <span className="dot" />
                  <span><span className="process-rail__num">{s.num}</span>{s.title.replace('.','')}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Steps */}
          <div className="process-steps">
            {STEPS.map(s => (
              <section key={s.id} className="process-step" id={s.id}>
                <div className="process-step__left">
                  <span className="process-step__bg-num" aria-hidden="true">{s.num}</span>
                  <div className="process-step__body">
                    <div className="process-step__eyebrow">{s.eyebrow}</div>
                    <h2 className="process-step__title">{s.title}</h2>
                    <p className="process-step__essence">{s.essence}</p>
                    <div className="process-step__copy"><p>{s.copy}</p></div>
                  </div>
                </div>
                {s.anchor}
              </section>
            ))}
          </div>

          {/* Right progress bar */}
          <div className="process-progress" aria-hidden="true">
            <div className="process-progress__fill" id="processProgressFill" />
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <section className="process-close">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <h2>
            No template.<br />
            No pre-built stack.<br />
            <em style={{ fontStyle: 'italic' }}>No generic playbook.</em>
          </h2>
          <p className="process-close__body">
            Every Mindzy infrastructure is designed from scratch.<br />
            The diagnosis defines the architecture.<br />
            The architecture defines the build.
          </p>
          <div className="process-close .btn-wrap" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>
              Start with a diagnosis call →
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
