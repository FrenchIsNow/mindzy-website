'use client'

import { useState, useEffect, useRef } from 'react'
import { GlassButton } from '@/components/ui/GlassButton'

const CSS = `
@keyframes mt-blink { 0%,100%{opacity:1}50%{opacity:0} }

.blog-hero { padding:200px 0 72px; text-align:center; position:relative; }
.blog-hero__title { font-family:var(--font-serif-ai); font-size:clamp(36px,5vw,64px); line-height:1.22; max-width:18ch; margin:18px auto 0; padding-bottom:.08em; font-weight:400; letter-spacing:-0.02em; }
.blog-hero__sub { margin:20px auto 0; color:var(--ai-fg-muted); font-size:18px; max-width:54ch; line-height:1.6; }

.blog-filters { margin-top:48px; display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
.blog-filter { padding:8px 18px; border:1px solid var(--ai-border); border-radius:999px; font-size:13px; color:var(--ai-fg-muted); background:var(--ai-bg-2); cursor:pointer; letter-spacing:-.005em; transition:background 160ms,color 160ms,border-color 160ms; font-family:inherit; }
.blog-filter:hover { border-color:var(--ai-accent); color:var(--ai-accent); }
.blog-filter.is-active { background:var(--ai-fg); color:var(--ai-bg); border-color:var(--ai-fg); }

.blog-section { padding:56px 0 100px; position:relative; }
.blog-section::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 20% 30%,color-mix(in srgb,var(--ai-accent) 4%,transparent),transparent 70%),radial-gradient(ellipse 60% 50% at 80% 70%,color-mix(in srgb,var(--ai-accent) 3%,transparent),transparent 70%); pointer-events:none; }

.blog-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; position:relative; z-index:1; }
@media(max-width:1020px){.blog-cards{grid-template-columns:repeat(2,1fr);}}
@media(max-width:640px){.blog-cards{grid-template-columns:1fr;}}

@keyframes card-in { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }

.blog-card { border-radius:20px; border:1px solid rgba(0,0,0,0.09); background:rgba(255,255,255,0.55); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); overflow:hidden; display:flex; flex-direction:column; text-decoration:none; color:inherit; cursor:pointer; transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease; opacity:0; }
.blog-card.is-visible { animation:card-in .45s ease both; }
.blog-card:hover { transform:translateY(-6px); box-shadow:0 24px 64px -16px rgba(0,0,0,0.14); border-color:color-mix(in srgb,var(--ai-accent) 45%,var(--ai-border)); }

.blog-card__media { position:relative; aspect-ratio:16/9; overflow:hidden; background:var(--ai-bg-3); flex-shrink:0; }
.blog-card__img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s ease; }
.blog-card:hover .blog-card__img { transform:scale(1.08); }
.blog-card__img-gradient { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%); opacity:.65; transition:opacity .3s ease; pointer-events:none; }
.blog-card:hover .blog-card__img-gradient { opacity:.4; }
.blog-card__overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.18); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px); opacity:0; transition:opacity .3s ease; }
.blog-card:hover .blog-card__overlay { opacity:1; }
.blog-card__read-btn { display:flex; align-items:center; gap:7px; background:var(--ai-accent); color:#fff; border:none; border-radius:999px; padding:10px 22px; font-size:13px; font-weight:500; cursor:pointer; box-shadow:0 8px 24px -4px rgba(0,0,0,0.3); pointer-events:none; font-family:inherit; }
.blog-card__badges { position:absolute; bottom:12px; left:12px; display:flex; gap:6px; pointer-events:none; }
.blog-card__badge { font-size:10px; font-weight:500; letter-spacing:.08em; text-transform:uppercase; padding:4px 10px; border-radius:999px; background:rgba(255,255,255,0.18); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); color:#fff; border:1px solid rgba(255,255,255,0.28); }

.blog-card__body { padding:20px 22px 22px; display:flex; flex-direction:column; flex:1; gap:10px; }
.blog-card__title { font-family:var(--font-serif-ai); font-size:19px; line-height:1.32; padding-bottom:.04em; font-weight:400; transition:color 160ms cubic-bezier(.2,.7,.2,1); }
.blog-card:hover .blog-card__title { color:var(--ai-accent); }
.blog-card__excerpt { color:var(--ai-fg-muted); font-size:13.5px; line-height:1.58; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; flex:1; }

.blog-card__footer { display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(128,128,128,0.12); margin-top:14px; padding-top:14px; }
.blog-card__author { display:flex; align-items:center; gap:8px; }
.blog-card__avatar { width:30px; height:30px; border-radius:50%; background:var(--ai-accent); color:#fff; font-size:11px; font-weight:600; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.blog-card__author-name { font-size:12px; font-weight:500; color:var(--ai-fg); display:block; }
.blog-card__author-date { font-size:11px; color:var(--ai-fg-soft); display:block; }
.blog-card__readtime { display:flex; align-items:center; gap:4px; font-size:11.5px; color:var(--ai-fg-soft); }

.blog-close { padding:80px 0; border-top:1px solid var(--ai-border); text-align:center; }
.blog-close h2 { font-family:var(--font-serif-ai); font-size:clamp(32px,5vw,56px); line-height:1.2; max-width:18ch; margin:0 auto; font-weight:400; letter-spacing:-0.02em; }
.blog-close p { margin:20px auto 0; color:var(--ai-fg-muted); font-size:17px; line-height:1.7; max-width:540px; }

.eyebrow-blog { font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); }
`

const POSTS = [
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'May 2026', read: '12 min read', title: 'Why AI agents fail without infrastructure', excerpt: 'The bottleneck for AI inside companies has shifted from model quality to operating layer. A practical look at what an infrastructure actually contains — and what it does not.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop' },
  { cat: 'models', catLabel: 'Models', date: 'May 2026', read: '9 min read', title: 'Routing tasks across MindFast, MindDeep, and Mind 3.1', excerpt: 'How task-level routing decisions are made inside a Mindzy deployment, and why a single best-model strategy almost always underperforms.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Governance', date: 'April 2026', read: '14 min read', title: 'The validation layer is the product', excerpt: 'Most production AI failures are not model failures. They are governance failures. A field guide to validation rules, approval flows, and audit boundaries.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop' },
  { cat: 'operations', catLabel: 'Operations', date: 'April 2026', read: '11 min read', title: 'Deploying department by department — a practical playbook', excerpt: 'Why progressive rollout still wins, how to choose the first department, and what to put behind a human gate before anything goes live.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop' },
  { cat: 'industry', catLabel: 'Industry', date: 'April 2026', read: '10 min read', title: 'What "AI-native" actually means for a traditional company', excerpt: 'AI infrastructure does not require rebuilding the business. It requires designing the operating layer around how the business already runs.', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop' },
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'March 2026', read: '8 min read', title: 'Connectors are the unglamorous half of every deployment', excerpt: "A short essay on the tools without APIs, the legacy systems no one wants to touch, and why the connector layer is where Mindzy projects live or die.", img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Governance', date: 'March 2026', read: '13 min read', title: 'Permissions as a design problem, not a policy problem', excerpt: 'Reframing role hierarchy, approval flows, and audit trails as first-class design surfaces inside an AI operating layer.', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format&fit=crop' },
  { cat: 'models', catLabel: 'Models', date: 'March 2026', read: '7 min read', title: 'Three proprietary models, every external model — why both matter', excerpt: 'On the value of running MindFast, MindDeep, and Mind 3.1 alongside Claude, GPT, Gemini, Mistral, and others — and never locking clients into a single vendor.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop' },
  { cat: 'operations', catLabel: 'Operations', date: 'February 2026', read: '15 min read', title: 'How Mindzy engineers manage agent teams', excerpt: 'A day in the life. Our team no longer writes code line by line — they review, validate, and supervise specialized agents. Here is what that looks like in practice.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop' },
  { cat: 'industry', catLabel: 'Industry', date: 'February 2026', read: '6 min read', title: 'The diagnosis is the deliverable', excerpt: 'Why every Mindzy engagement starts with an executive diagnosis — and what we look for before any technology is proposed.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop' },
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'January 2026', read: '11 min read', title: 'Designing dashboards around hierarchy, not metrics', excerpt: "A custom Mindzy dashboard is not a reporting page. It mirrors the company's decision structure — leadership, managers, teams, validation.", img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Governance', date: 'January 2026', read: '9 min read', title: 'Reversible cutovers and the case against big-bang rollouts', excerpt: 'Every Mindzy deployment is reversible until your team signs off. The case for slowing down before going live.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop' },
]

const FILTERS = ['all', 'infrastructure', 'governance', 'models', 'operations', 'industry']

const WORDS = ['AI infrastructure', 'AI workflows', 'AI governance', 'AI systems', 'AI agents']
const INTERVAL_MS = 3200
const MORPH_DURATION = 700
const MORPH_STEPS = 22

export default function BlogPage() {
  const [displayWord, setDisplayWord] = useState(WORDS[0])
  const [activeFilter, setActiveFilter] = useState('all')
  const idxRef = useRef(0)

  // Morphing text
  useEffect(() => {
    let cancelled = false
    function morph() {
      if (cancelled) return
      const from = WORDS[idxRef.current]
      const to = WORDS[(idxRef.current + 1) % WORDS.length]
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
          idxRef.current = (idxRef.current + 1) % WORDS.length
          setTimeout(morph, INTERVAL_MS)
        }
      }
      tick()
    }
    const t = setTimeout(morph, INTERVAL_MS)
    return () => { cancelled = true; clearTimeout(t) }
  }, [])

  // Card entrance animation
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.06 })
    document.querySelectorAll('.blog-card').forEach((c, i) => {
      ;(c as HTMLElement).style.animationDelay = (i * 60) + 'ms'
      io.observe(c)
    })
    return () => io.disconnect()
  }, [activeFilter])

  const visible = activeFilter === 'all' ? POSTS : POSTS.filter(p => p.cat === activeFilter)

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="blog-hero">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="eyebrow-blog">Notes from the field</div>
          <h1 className="blog-hero__title">
            Essays on building, governing,<br />
            and operating{' '}
            <em style={{ fontStyle: 'italic', display: 'inline' }}>
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}>
                {displayWord}
              </span>
              <span aria-hidden="true" style={{
                display: 'inline-block',
                width: '2px',
                height: '0.78em',
                background: 'linear-gradient(to bottom, #7c3aed, #a78bfa)',
                marginLeft: '3px',
                verticalAlign: 'middle',
                borderRadius: '2px',
                animation: 'mt-blink 1s ease-in-out infinite',
              }} />
            </em>.
          </h1>
          <p className="blog-hero__sub">
            From model orchestration and validation layers to custom dashboards and governance — the operational realities behind every Mindzy build.
          </p>
          <div className="blog-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`blog-filter${activeFilter === f ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="blog-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="blog-cards">
            {visible.map(p => (
              <a key={p.title} className="blog-card" href="#" data-cat={p.cat}>
                <div className="blog-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="blog-card__img" src={p.img} alt={p.title} loading="lazy" />
                  <div className="blog-card__img-gradient" />
                  <div className="blog-card__overlay">
                    <button className="blog-card__read-btn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      Read Article
                    </button>
                  </div>
                  <div className="blog-card__badges">
                    <span className="blog-card__badge">{p.catLabel}</span>
                  </div>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__title">{p.title}</div>
                  <p className="blog-card__excerpt">{p.excerpt}</p>
                  <div className="blog-card__footer">
                    <div className="blog-card__author">
                      <div className="blog-card__avatar">M</div>
                      <div>
                        <span className="blog-card__author-name">Mindzy</span>
                        <span className="blog-card__author-date">{p.date}</span>
                      </div>
                    </div>
                    <div className="blog-card__readtime">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{p.read}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="blog-close">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <h2>Want a Mindzy infrastructure <em style={{ fontStyle: 'italic' }}>inside your company?</em></h2>
          <p>30 minutes. We listen, we map, we tell you whether AI can move the needle for your operations.</p>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>Book a call to discuss your project</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
