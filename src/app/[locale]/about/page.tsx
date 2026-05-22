'use client'

import { useEffect } from 'react'
import { GlassButton } from '@/components/ui/GlassButton'

const CSS = `
/* Hero */
.ab-hero { position:relative; padding:78px 0 0; background:var(--ai-bg-3); overflow:hidden; }
.ab-hero__grid-bg { position:absolute; inset:0; background-image:linear-gradient(to right,rgba(163,163,163,0.22) 1px,transparent 1px),linear-gradient(to bottom,rgba(163,163,163,0.22) 1px,transparent 1px); background-size:70px 70px; -webkit-mask-image:radial-gradient(ellipse 80% 50% at 50% 100%,#000 70%,transparent 110%); mask-image:radial-gradient(ellipse 80% 50% at 50% 100%,#000 70%,transparent 110%); z-index:0; opacity:0; transition:opacity 0.8s ease 0.6s; }
.ab-hero.is-loaded .ab-hero__grid-bg { opacity:1; }
.ab-hero__inner { position:relative; z-index:10; max-width:680px; margin:0 auto; text-align:center; padding:0 24px 56px; }
.ab-hero__eyebrow { color:var(--ai-accent); font-size:13px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:28px; display:flex; align-items:center; justify-content:center; gap:8px; opacity:0; transform:translateY(16px); transition:opacity 0.5s ease 0.1s,transform 0.5s ease 0.1s; }
.ab-hero.is-loaded .ab-hero__eyebrow { opacity:1; transform:translateY(0); }
.ab-hero__headline { font-family:var(--font-serif-ai); font-size:clamp(30px,5vw,56px); font-weight:400; line-height:1.22; letter-spacing:-0.02em; color:var(--ai-fg); margin:0 0 28px; }
.wr { display:inline-block; overflow:hidden; vertical-align:bottom; line-height:1.25; margin-right:0.28em; }
.wr__inner { display:inline-block; transform:translateY(108%); transition:transform 0.72s cubic-bezier(0.22,1,0.36,1); transition-delay:var(--d,0s); }
.ab-hero.is-loaded .wr__inner { transform:translateY(0); }
.ab-hero__desc { font-size:17px; line-height:1.7; color:var(--ai-fg-muted); margin:0 0 36px; opacity:0; transform:translateY(40px); filter:blur(8px); transition:opacity 0.7s ease var(--d,0s),transform 0.7s ease var(--d,0s),filter 0.7s ease var(--d,0s); }
.ab-hero.is-loaded .ab-hero__desc { opacity:1; transform:translateY(0); filter:blur(0); }
.ab-hero__cta-wrap { opacity:0; transition:opacity 0.6s ease var(--d,0s); }
.ab-hero.is-loaded .ab-hero__cta-wrap { opacity:1; }

/* Content sections */
.ab-section { padding:88px 0; border-top:1px solid var(--ai-border); }
.ab-section__grid { display:grid; grid-template-columns:1fr; gap:28px; }
@media(min-width:900px){.ab-section__grid{grid-template-columns:220px minmax(0,1fr);gap:64px;}}
.ab-section__label { font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--ai-fg-soft); }
@media(min-width:900px){.ab-section__label{position:sticky;top:100px;}}
.ab-section__content h2 { font-family:var(--font-serif-ai); font-size:clamp(28px,3.6vw,48px); font-weight:400; line-height:1.32; padding-bottom:0.1em; margin-bottom:22px; letter-spacing:-0.02em; }
.ab-section__content p { font-size:18px; line-height:1.65; color:var(--ai-fg-muted); max-width:64ch; }
.ab-section__content p+p { margin-top:16px; }
.pullquote { font-family:var(--font-serif-ai); font-size:25px; line-height:1.45; color:var(--ai-fg); border-left:1px solid var(--ai-accent); padding:4px 0 4px 22px; margin:28px 0; max-width:58ch; }
.method-list { list-style:none; padding:0; margin:20px 0 0; display:grid; gap:10px; }
.method-list li { display:flex; align-items:flex-start; gap:12px; font-size:18px; line-height:1.6; color:var(--ai-fg-muted); max-width:64ch; }
.method-list li::before { content:'—'; color:var(--ai-accent); flex-shrink:0; }

/* Scroll reveal */
.sr-item { opacity:0; transform:translateY(28px); transition:opacity 0.65s ease,transform 0.65s ease; transition-delay:var(--sd,0s); }
.sr-item.sr-visible { opacity:1; transform:translateY(0); }

/* Founders */
.founders-grid { display:grid; grid-template-columns:repeat(2,300px); gap:28px; margin-top:20px; }
@media(max-width:720px){.founders-grid{grid-template-columns:1fr;max-width:300px;}}
.founder-card { position:relative; background:var(--ai-bg); border-radius:28px; padding:36px 28px 28px; box-shadow:12px 12px 28px rgba(0,0,0,0.10),-12px -12px 28px rgba(255,255,255,0.88); transition:transform 480ms cubic-bezier(.2,.7,.2,1),box-shadow 480ms cubic-bezier(.2,.7,.2,1); cursor:default; overflow:hidden; }
html[data-ai-theme="black"] .founder-card { box-shadow:12px 12px 28px rgba(0,0,0,0.42),-12px -12px 28px rgba(255,255,255,0.04); }
.founder-card:hover { transform:scale(1.04) translateY(-6px); box-shadow:20px 20px 44px rgba(0,0,0,0.15),-20px -20px 44px rgba(255,255,255,0.96); }
html[data-ai-theme="black"] .founder-card:hover { box-shadow:20px 20px 44px rgba(0,0,0,0.58),-20px -20px 44px rgba(255,255,255,0.06); }
.founder-card::after { content:''; position:absolute; inset:0; border-radius:28px; border:1.5px solid color-mix(in srgb,var(--ai-accent) 45%,transparent); opacity:0; transition:opacity 480ms; pointer-events:none; }
.founder-card:hover::after { opacity:1; }
.founder-card__status { position:absolute; top:22px; right:22px; }
.status-dot { width:11px; height:11px; background:#22c55e; border-radius:50%; border:2px solid var(--ai-bg); position:relative; }
.status-dot::after { content:''; position:absolute; inset:-2px; border-radius:50%; background:#22c55e; animation:fc-ping 1.6s ease-out infinite; opacity:0.4; }
@keyframes fc-ping { 0%{transform:scale(1);opacity:0.4}75%,100%{transform:scale(2.4);opacity:0} }
.founder-card__badge { position:absolute; top:38px; right:20px; width:20px; height:20px; background:var(--ai-accent); border-radius:50%; display:flex; align-items:center; justify-content:center; transition:transform 0.35s,box-shadow 0.35s; }
.founder-card:hover .founder-card__badge { transform:scale(1.12) rotate(12deg); box-shadow:0 0 14px color-mix(in srgb,var(--ai-accent) 55%,transparent); }
.founder-card__badge svg { width:10px; height:10px; fill:white; display:block; }
.founder-card__avatar-wrap { display:flex; justify-content:center; margin-bottom:18px; }
.founder-card__avatar { width:88px; height:88px; border-radius:50%; background:var(--ai-bg); box-shadow:inset 6px 6px 14px rgba(0,0,0,0.09),inset -6px -6px 14px rgba(255,255,255,0.88); display:flex; align-items:center; justify-content:center; font-family:var(--font-serif-ai); font-size:28px; color:var(--ai-accent); position:relative; transition:transform 0.4s cubic-bezier(.2,.7,.2,1); }
html[data-ai-theme="black"] .founder-card__avatar { box-shadow:inset 6px 6px 14px rgba(0,0,0,0.38),inset -6px -6px 14px rgba(255,255,255,0.04); }
.founder-card:hover .founder-card__avatar { transform:scale(1.1); }
.founder-card__avatar::after { content:''; position:absolute; inset:-4px; border-radius:50%; border:2px solid var(--ai-accent); opacity:0; transition:opacity 0.4s; }
.founder-card:hover .founder-card__avatar::after { opacity:1; }
.founder-card__name { text-align:center; font-family:var(--font-serif-ai); font-size:21px; line-height:1.28; color:var(--ai-fg); transition:color 0.3s; }
.founder-card:hover .founder-card__name { color:var(--ai-accent); }
.founder-card__role { text-align:center; font-size:12px; color:var(--ai-fg-soft); margin-top:5px; letter-spacing:0.06em; text-transform:uppercase; }
.founder-card__linkedin { display:flex; justify-content:center; margin-top:20px; }
.founder-card__linkedin a { display:inline-flex; align-items:center; gap:7px; padding:9px 20px; border-radius:100px; background:var(--ai-bg); box-shadow:6px 6px 14px rgba(0,0,0,0.09),-6px -6px 14px rgba(255,255,255,0.85); font-size:12.5px; font-weight:500; color:var(--ai-accent); letter-spacing:0.02em; transition:box-shadow 0.3s,transform 0.3s; text-decoration:none; }
html[data-ai-theme="black"] .founder-card__linkedin a { box-shadow:6px 6px 14px rgba(0,0,0,0.35),-6px -6px 14px rgba(255,255,255,0.04); }
.founder-card__linkedin a:hover { box-shadow:2px 2px 6px rgba(0,0,0,0.07),-2px -2px 6px rgba(255,255,255,0.7); transform:scale(0.97); }
.founder-card__linkedin svg { width:13px; height:13px; flex-shrink:0; }

/* Final CTA */
.ab-close { padding:100px 0 80px; text-align:center; border-top:1px solid var(--ai-border); }
.ab-close h2 { font-family:var(--font-serif-ai); font-size:clamp(48px,6vw,80px); line-height:1.1; font-weight:400; letter-spacing:-0.02em; }
.ab-close p { margin:20px auto 0; color:var(--ai-fg-muted); font-size:18px; line-height:1.65; max-width:480px; }
`

const LINKEDIN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

function FounderCard({
  initials,
  name,
  role,
  linkedin,
}: {
  initials: string
  name: string
  role: string
  linkedin: string
}) {
  return (
    <div className="founder-card sr-item">
      <div className="founder-card__status">
        <div className="status-dot" />
      </div>
      <div className="founder-card__badge" title="Verified">
        <svg viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="founder-card__avatar-wrap">
        <div className="founder-card__avatar">{initials}</div>
      </div>
      <div className="founder-card__name">{name}</div>
      <div className="founder-card__role">{role}</div>
      <div className="founder-card__linkedin">
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          {LINKEDIN_SVG}
          LinkedIn
        </a>
      </div>
    </div>
  )
}

export default function AboutPage() {
  useEffect(() => {
    // 1. Word-by-word vertical cut reveal
    const headline = document.getElementById('ab-headline')
    if (headline) {
      const text = headline.textContent?.trim() || ''
      const words = text.split(' ')
      headline.innerHTML = ''
      words.forEach((word, i) => {
        const wrap = document.createElement('span')
        wrap.className = 'wr'
        const inner = document.createElement('span')
        inner.className = 'wr__inner'
        inner.style.setProperty('--d', 0.3 + i * 0.2 + 's')
        inner.textContent = word
        wrap.appendChild(inner)
        headline.appendChild(wrap)
        if (i < words.length - 1) headline.appendChild(document.createTextNode(' '))
      })
    }

    // 2. Trigger hero is-loaded after 2 rAFs
    const hero = document.getElementById('ab-hero')
    if (hero) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hero.classList.add('is-loaded')
        })
      })
    }

    // 3. Scroll-reveal for .sr-item elements
    const srObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
            srObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.sr-item').forEach((el, i) => {
      const siblings = el.parentElement?.querySelectorAll('.sr-item')
      const idx = siblings ? Array.from(siblings).indexOf(el as Element) : i
      ;(el as HTMLElement).style.setProperty('--sd', idx * 0.09 + 's')
      srObs.observe(el)
    })

    return () => srObs.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="ab-hero" id="ab-hero">
        <div className="ab-hero__grid-bg" aria-hidden="true" />
        <div className="ab-hero__inner">
          <div className="ab-hero__eyebrow">About</div>
          <h1 className="ab-hero__headline" id="ab-headline">
            AI infrastructure, built around your business.
          </h1>
          <p
            className="ab-hero__desc"
            style={{ '--d': '1.6s' } as React.CSSProperties}
          >
            Mindzy designs and deploys custom AI infrastructure for companies of all sizes and
            maturity levels. We adapt the technology to how each company actually works — with
            structure, validation, and human control at every step.
          </p>
          <div
            className="ab-hero__cta-wrap"
            style={{ '--d': '1.9s' } as React.CSSProperties}
          >
            <GlassButton href="/en/portfolio">
              Explore Our Services
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* 01 — Origin */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid">
            <div className="ab-section__label sr-item">01 — Origin</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                From digital execution to{' '}
                <em style={{ fontStyle: 'italic' }}>operational infrastructure.</em>
              </h2>
              <p className="sr-item">
                Mindzy started by building websites, platforms, software, and automation systems
                for ambitious companies.
              </p>
              <p className="sr-item">
                Over time, we saw the same problem everywhere: companies were not missing tools —
                they were missing structure.
              </p>
              <p className="sr-item">
                Too many manual tasks. Too many disconnected systems. Too much operational
                friction.
              </p>
              <p className="sr-item">So we evolved from digital delivery to AI infrastructure.</p>
              <div className="pullquote sr-item">
                Today, we build the systems that help companies work faster, smarter, and with more
                control.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Method */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid">
            <div className="ab-section__label sr-item">02 — Method</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                Diagnose first. <em style={{ fontStyle: 'italic' }}>Deploy second.</em>
              </h2>
              <p className="sr-item">
                Every project starts with a clear audit of your company: tools, workflows, teams,
                bottlenecks, and priorities.
              </p>
              <p className="sr-item">
                Then we build a custom infrastructure adapted to your real operations.
              </p>
              <p className="sr-item" style={{ marginTop: '24px' }}>
                We deploy progressively:
              </p>
              <ul className="method-list">
                {[
                  'workflow by workflow;',
                  'department by department;',
                  'with validation rules;',
                  'with human control;',
                  'with measurable outcomes.',
                ].map(item => (
                  <li key={item} className="sr-item">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="sr-item" style={{ marginTop: '28px' }}>
                No generic agents. No useless complexity. No disruptive rollout.
              </p>
              <p className="sr-item">
                Only practical infrastructure your team can understand, trust, and use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Vision */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid">
            <div className="ab-section__label sr-item">03 — Vision</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                AI should create <em style={{ fontStyle: 'italic' }}>leverage, not chaos.</em>
              </h2>
              <p className="sr-item">
                Most companies do not need to become AI-native overnight. They need to integrate AI
                intelligently into the way they already work.
              </p>
              <p className="sr-item">
                The companies that win will be the ones using AI with structure: clear roles,
                permissions, integrations, dashboards, audit trails, and human validation.
              </p>
              <div className="pullquote sr-item">
                Without structure, AI adds noise. With the right infrastructure, AI becomes
                operational leverage.
              </div>
              <p className="sr-item">That is what Mindzy builds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Founders */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid" style={{ alignItems: 'start' }}>
            <div className="ab-section__label sr-item">04 — Founders</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                The people <em style={{ fontStyle: 'italic' }}>behind the infrastructure.</em>
              </h2>
              <div className="founders-grid">
                <FounderCard
                  initials="WM"
                  name="William Martel"
                  role="Founder — CFO"
                  linkedin="https://www.linkedin.com/in/williamartel/"
                />
                <FounderCard
                  initials="RC"
                  name="Romuald Cocotier"
                  role="Founder — CEO"
                  linkedin="https://www.linkedin.com/in/r-cocotier/"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ab-close">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <h2>
            Talk <em style={{ fontStyle: 'italic' }}>to us</em>.
          </h2>
          <p>30 minutes. We listen first, we recommend second.</p>
          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>
              Book a call
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
