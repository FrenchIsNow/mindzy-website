'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const CSS = `
@keyframes mt-blink { 0%,100%{opacity:1}50%{opacity:0} }

.faq-hero { padding:128px 0 56px; text-align:center; }
.faq-hero h1 { font-family:var(--font-serif-ai); font-size:clamp(36px,5vw,64px); line-height:1.22; padding-bottom:0.1em; max-width:22ch; margin:18px auto 0; font-weight:400; letter-spacing:-0.02em; }
.faq-hero p { margin:24px auto 0; color:var(--ai-fg-muted); font-size:19px; max-width:560px; line-height:1.6; }

.faq-search { margin:40px auto 0; display:flex; align-items:center; gap:12px; padding:14px 20px; border:1px solid var(--ai-border); background:var(--ai-surface); border-radius:999px; max-width:520px; }
.faq-search svg { width:16px; height:16px; color:var(--ai-fg-soft); flex-shrink:0; }
.faq-search input { flex:1; border:0; background:transparent; font:inherit; font-size:15px; color:var(--ai-fg); outline:none; }
.faq-search input::placeholder { color:var(--ai-fg-soft); }

.faq-shell { display:grid; grid-template-columns:200px minmax(0,1fr); gap:56px; padding:64px 0 96px; }
@media(max-width:900px){.faq-shell{grid-template-columns:1fr;gap:24px;}}

.faq-nav { position:sticky; top:110px; align-self:start; font-size:14px; }
@media(max-width:900px){.faq-nav{display:none;}}
.faq-nav__title { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--ai-fg-soft); margin-bottom:14px; }
.faq-nav__list { display:grid; gap:4px; }
.faq-nav__list a { padding:6px 0; color:var(--ai-fg-muted); text-decoration:none; display:block; transition:color 160ms; }
.faq-nav__list a:hover { color:var(--ai-fg); }

.faq-category { padding:32px 0; border-top:1px solid var(--ai-border); }
.faq-category:first-of-type { border-top:0; padding-top:0; }
.faq-category h2 { font-family:var(--font-serif-ai); font-size:clamp(28px,3.2vw,36px); margin-bottom:18px; padding-bottom:0.04em; font-weight:400; letter-spacing:-0.02em; }

.faq-item { border-bottom:1px solid var(--ai-border); }
.faq-item__q { width:100%; text-align:left; padding:22px 8px 22px 0; display:grid; grid-template-columns:1fr 24px; align-items:center; gap:16px; font-size:17px; color:var(--ai-fg); background:transparent; border:0; cursor:pointer; transition:color 160ms; letter-spacing:-.005em; font-family:inherit; }
.faq-item__q:hover,.faq-item.is-open .faq-item__q { color:var(--ai-accent); }
.faq-item__q .chev { width:16px; height:16px; color:var(--ai-fg-soft); transition:transform 280ms cubic-bezier(.2,.7,.2,1),color 160ms; flex-shrink:0; }
.faq-item.is-open .faq-item__q .chev { transform:rotate(180deg); color:var(--ai-accent); }

.faq-item__a { overflow:hidden; height:0; transition:height 280ms ease-out; color:var(--ai-fg-muted); font-size:16px; line-height:1.65; }
.faq-item__inner { padding:0 8px 24px 0; max-width:72ch; }
.faq-item__inner p+p { margin-top:14px; }
.faq-item__inner .micro-cta { margin-top:18px; display:inline-flex; align-items:center; gap:6px; color:var(--ai-accent); font-weight:500; border-bottom:1px solid var(--ai-accent); padding-bottom:2px; font-size:14px; text-decoration:none; }

.faq-empty { padding:56px 0; text-align:center; color:var(--ai-fg-soft); font-size:15px; }

.eyebrow-faq { font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); }
`

const MORPH_WORDS = ['building AI infrastructure', 'governing AI agents', 'deploying AI systems', 'operating AI workflows', 'scaling AI teams']
const MORPH_INTERVAL = 3200
const MORPH_DURATION = 700
const MORPH_STEPS = 22

interface FaqItemData {
  id: string
  q: string
  a: React.ReactNode
}

interface FaqCategory {
  id: string
  title: string
  items: FaqItemData[]
}

const FAQS: FaqCategory[] = [
  {
    id: 'about', title: 'About Mindzy',
    items: [
      {
        id: 'a1', q: 'What does Mindzy actually do?',
        a: <p>Mindzy designs and builds custom AI infrastructure inside companies that want to integrate AI into their operations. Each deployment is built from scratch, around the client&apos;s hierarchy, tools, and workflows. We do not ship a pre-packaged product.</p>
      },
      {
        id: 'a2', q: 'Who is Mindzy for?',
        a: <p>Any company that wants to integrate AI into its operations — from traditional industrial companies, service firms, and financial institutions to retailers, logistics operators, and digital-first organizations. The same method applies across industries.</p>
      },
      {
        id: 'a3', q: 'Are you an agency or a software company?',
        a: <p>Neither. We are an infrastructure team. Our engineers no longer write code line by line — they manage agent teams that build, deploy, and operate the infrastructure under human supervision. Every project we deliver, including this website, goes through that same process.</p>
      },
    ]
  },
  {
    id: 'scope', title: 'Scope & method',
    items: [
      {
        id: 's1', q: 'Do you have a standard product?',
        a: <><p>No. Every Mindzy infrastructure is 100% custom. No template. No pre-built stack. No generic playbook. The architecture is defined by your business, not by ours.</p><a className="micro-cta" href="/en/process">See our 10-step process →</a></>
      },
      {
        id: 's2', q: 'What is the executive diagnosis?',
        a: <p>Every engagement starts with a structured diagnosis. We meet leadership and key stakeholders, study your departments, tools, workflows, bottlenecks, decision structure, and business priorities — and answer one question: where can AI create the highest business impact with the lowest unnecessary disruption?</p>
      },
      {
        id: 's3', q: 'How long does a typical engagement take?',
        a: <p>Most first operational AI workforces go live within 30 to 90 days from kickoff. Cross-department rollouts and the full optimization roadmap unfold over the following quarters. Every timeline is scoped per project during diagnosis.</p>
      },
    ]
  },
  {
    id: 'models', title: 'Models & data',
    items: [
      {
        id: 'm1', q: 'Which models does Mindzy use?',
        a: <><p>Mindzy operates three proprietary models — <strong>MindFast</strong> (fast, lightweight, high-volume tasks), <strong>MindDeep</strong> (deep reasoning, long-context synthesis), and <strong>Mind 3.1</strong> (balanced general-purpose execution).</p><p>Alongside these, we provide access to every major LLM on the market — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen, and others. The right model for the right task, decided in real time.</p></>
      },
      {
        id: 'm2', q: 'Will we be locked into your models?',
        a: <p>No. Clients are never locked in. The model orchestration layer routes tasks based on fit, cost, latency, and your routing preferences. You can pin specific tasks to specific external providers if your team prefers it.</p>
      },
      {
        id: 'm3', q: 'Where does our data go?',
        a: <p>Data residency, retention, and provider boundaries are defined during the architecture step. We support EU residency, customer-owned infrastructure, and SSO/IAM integrations. We do not train models on your data without explicit, scoped consent.</p>
      },
    ]
  },
  {
    id: 'governance', title: 'Governance',
    items: [
      {
        id: 'g1', q: 'How do humans stay in control?',
        a: <p>Every action in the system falls into one of three categories: fully automated, suggested for human review, or gated behind a human approval. The governance step defines which is which, per workflow, per role, per data scope.</p>
      },
      {
        id: 'g2', q: 'Is everything auditable?',
        a: <p>Yes. Every agent action, model call, validation decision, and approval is recorded in an audit log surfaced in the dashboard. Sensitive workflows (finance, client data, contracts) carry stricter gates by default.</p>
      },
    ]
  },
  {
    id: 'deployment', title: 'Deployment',
    items: [
      {
        id: 'd1', q: 'Will you connect to our existing tools?',
        a: <p>Yes. CRM, email, calendars, Drive, Microsoft 365, Notion, Slack, spreadsheets, project management tools, ERPs, custom internal software. When a tool does not expose a public API, we build the connector. The system adapts to your environment, never the opposite.</p>
      },
      {
        id: 'd2', q: 'Big-bang or progressive rollout?',
        a: <p>Always progressive. We deploy department by department, workflow by workflow. Every cutover is reversible until your team signs off. We have never delivered a big-bang rollout — and we never will.</p>
      },
      {
        id: 'd3', q: 'Do you train our teams?',
        a: <p>Yes. Training is the ninth step of the method. Executives, managers, and team members each receive practical training adapted to their level of access and how they will interact with the system day-to-day.</p>
      },
    ]
  },
  {
    id: 'pricing', title: 'Pricing',
    items: [
      {
        id: 'p1', q: 'How much does a Mindzy engagement cost?',
        a: <><p>Scoped after diagnosis. Because every infrastructure is custom-built around the client&apos;s specific workflows, hierarchy, tools, and validation rules, pricing is defined during the diagnosis phase rather than published as a list price.</p><a className="micro-cta" href="https://calendar.app.google/ghE79tSFxmea4Scd9" target="_blank" rel="noopener noreferrer">Book a diagnosis call →</a></>
      },
      {
        id: 'p2', q: 'What does the diagnosis itself cost?',
        a: <p>The first 30-minute exploratory call is free. The structured executive diagnosis itself is scoped against the size and complexity of the company. We will tell you the exact figure on the first call.</p>
      },
    ]
  },
  {
    id: 'after', title: 'After launch',
    items: [
      {
        id: 'af1', q: 'What happens after the system goes live?',
        a: <p>We deliver an optimization roadmap that identifies what has been implemented, what is working well, what to improve, and which workflows or departments to expand next. AI transformation is not a one-time installation — it is a capability your company keeps getting better at using.</p>
      },
      {
        id: 'af2', q: "Who owns the infrastructure once it's built?",
        a: <><p>You do. The custom dashboard, connectors, workflows, and governance configuration are yours. The proprietary Mindzy models remain under license, alongside whichever external models you choose to route to.</p><a className="micro-cta" href="https://calendar.app.google/ghE79tSFxmea4Scd9" target="_blank" rel="noopener noreferrer">Still have a question? Talk to us →</a></>
      },
    ]
  },
]

function FaqItem({ id, q, children, openId, setOpenId }: {
  id: string
  q: string
  children: React.ReactNode
  openId: string | null
  setOpenId: (v: string | null) => void
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLDivElement>(null)
  const isOpen = openId === id

  useEffect(() => {
    const a = aRef.current
    const inner = innerRef.current
    if (!a || !inner) return
    if (isOpen) {
      a.style.height = inner.offsetHeight + 'px'
    } else {
      a.style.height = '0'
    }
  }, [isOpen])

  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpenId(isOpen ? null : id)}>
        {q}
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div ref={aRef} className="faq-item__a">
        <div ref={innerRef} className="faq-item__inner">{children}</div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [displayWord, setDisplayWord] = useState(MORPH_WORDS[0])
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const idxRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    function morph() {
      if (cancelled) return
      const from = MORPH_WORDS[idxRef.current]
      const to = MORPH_WORDS[(idxRef.current + 1) % MORPH_WORDS.length]
      let step = 0
      function tick() {
        if (cancelled) return
        step++
        const p = step / MORPH_STEPS
        if (p < 0.5) {
          const n = Math.round(from.length * (1 - p * 2))
          setDisplayWord(from.slice(0, n) || ' ')
        } else {
          const n = Math.round(to.length * ((p - 0.5) * 2))
          setDisplayWord(to.slice(0, n) || ' ')
        }
        if (step < MORPH_STEPS) {
          setTimeout(tick, MORPH_DURATION / MORPH_STEPS)
        } else {
          setDisplayWord(to)
          idxRef.current = (idxRef.current + 1) % MORPH_WORDS.length
          setTimeout(morph, MORPH_INTERVAL)
        }
      }
      tick()
    }
    const t = setTimeout(morph, MORPH_INTERVAL)
    return () => { cancelled = true; clearTimeout(t) }
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const q = search.trim().toLowerCase()

  const allHidden = q !== '' && FAQS.every(cat => cat.items.every(item => !item.q.toLowerCase().includes(q)))

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="faq-hero">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="eyebrow-faq">Frequently asked</div>
          <h1>
            Questions about{' '}
            <em style={{ fontStyle: 'italic', display: 'inline' }}>
              <span style={{ background: 'linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
                {displayWord}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '0.78em',
                  background: 'linear-gradient(to bottom,#7c3aed,#a78bfa)',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  borderRadius: '2px',
                  animation: 'mt-blink 1s ease-in-out infinite',
                }}
              />
            </em>.
          </h1>
          <p>The questions we hear most often during the diagnosis call. If yours is not here, the calendar is the fastest way to reach us.</p>
          <div className="faq-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              type="search"
              placeholder="Search the FAQ…"
              aria-label="Search the FAQ"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="faq-shell">
            <aside className="faq-nav">
              <div className="faq-nav__title">Categories</div>
              <div className="faq-nav__list">
                {FAQS.map(cat => (
                  <a key={cat.id} href={`#${cat.id}`} onClick={e => handleNavClick(e, cat.id)}>
                    {cat.title}
                  </a>
                ))}
              </div>
            </aside>

            <div>
              {FAQS.map(cat => {
                const visibleItems = cat.items.filter(item => {
                  if (!q) return true
                  return item.q.toLowerCase().includes(q)
                })
                if (visibleItems.length === 0) return null
                return (
                  <section key={cat.id} className="faq-category" id={cat.id}>
                    <h2>{cat.title}</h2>
                    {visibleItems.map(item => (
                      <FaqItem key={item.id} id={item.id} q={item.q} openId={openId} setOpenId={setOpenId}>
                        {item.a}
                      </FaqItem>
                    ))}
                  </section>
                )
              })}
              {allHidden && (
                <div className="faq-empty">
                  No questions matched. Try a different keyword, or{' '}
                  <a
                    href="https://calendar.app.google/ghE79tSFxmea4Scd9"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--ai-accent)', borderBottom: '1px solid var(--ai-accent)' }}
                  >
                    ask us directly
                  </a>.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
