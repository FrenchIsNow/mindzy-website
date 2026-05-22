'use client'

import { useState, useEffect } from 'react'
import { GlassButton } from '@/components/ui/GlassButton'

const CSS = `
.pf-hero { position:relative; min-height:calc(100vh - 72px); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; overflow:hidden; padding:48px 0 80px; }
.pf-hero__grid { position:absolute; inset:0; background-image:linear-gradient(to right,rgba(128,128,128,0.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(128,128,128,0.08) 1px,transparent 1px); background-size:24px 24px; pointer-events:none; }

@keyframes pf-fadein { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
@keyframes pf-bounce { 0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)} }

.pf-hero__eyebrow { animation:pf-fadein .6s ease both; animation-delay:.1s; }
.pf-hero__title   { animation:pf-fadein .6s ease both; animation-delay:.3s; font-family:var(--font-serif-ai); font-size:clamp(44px,6.5vw,84px); line-height:1.18; padding-bottom:.08em; max-width:14ch; margin:18px auto 0; font-weight:400; letter-spacing:-0.02em; }
.pf-hero__sub     { animation:pf-fadein .6s ease both; animation-delay:.45s; color:var(--ai-fg-muted); font-size:18px; line-height:1.6; max-width:520px; margin:22px auto 0; }
.pf-hero__stats   { animation:pf-fadein .6s ease both; animation-delay:.6s; display:flex; justify-content:center; gap:40px; margin-top:36px; flex-wrap:wrap; }
.pf-hero__ctas    { animation:pf-fadein .6s ease both; animation-delay:.55s; display:flex; justify-content:center; gap:12px; margin-top:36px; flex-wrap:wrap; }
.pf-hero__scroll  { animation:pf-fadein .6s ease both,pf-bounce 1.6s ease-in-out 1.6s infinite; position:absolute; bottom:32px; left:50%; transform:translateX(-50%); color:var(--ai-fg-soft); display:flex; flex-direction:column; align-items:center; gap:6px; font-size:11px; letter-spacing:.08em; text-transform:uppercase; }
.pf-hero__scroll svg { opacity:.5; }
.pf-hero__stat-val { font-family:var(--font-serif-ai); font-size:36px; line-height:1; }
.pf-hero__stat-lbl { font-size:12px; letter-spacing:.07em; text-transform:uppercase; color:var(--ai-fg-soft); margin-top:4px; }

.pf-featured { padding:80px 0 40px; }
.pf-featured__label { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); font-weight:500; margin-bottom:22px; }
.pf-featured__grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
@media(max-width:720px){.pf-featured__grid{grid-template-columns:1fr;}}

.pf-card { position:relative; border:1px solid var(--ai-border); border-radius:20px; background:var(--ai-surface); overflow:hidden; display:flex; flex-direction:column; cursor:pointer; text-decoration:none; color:inherit; transition:transform 500ms ease,box-shadow 500ms ease,border-color 280ms cubic-bezier(.2,.7,.2,1); box-shadow:0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12); }
.pf-card:hover { transform:translateY(-8px); box-shadow:0 24px 64px -16px rgba(0,0,0,0.14); border-color:color-mix(in srgb,var(--ai-accent) 30%,var(--ai-border)); }
.pf-card__img-wrap { aspect-ratio:16/10; overflow:hidden; background:var(--ai-bg-3); position:relative; }
.pf-card--featured .pf-card__img-wrap { aspect-ratio:16/9; }
.pf-card__img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 700ms ease; }
.pf-card:hover .pf-card__img { transform:scale(1.08); }
.pf-card__cat-badge { position:absolute; top:14px; left:14px; font-size:10px; letter-spacing:.1em; text-transform:uppercase; font-weight:500; padding:5px 10px; border-radius:999px; background:var(--ai-surface); color:var(--ai-accent); border:1px solid var(--ai-border); backdrop-filter:blur(8px); }
.pf-card__body { padding:22px 24px 26px; flex:1; display:flex; flex-direction:column; }
.pf-card__cat { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--ai-fg-soft); margin-bottom:6px; }
.pf-card__title { font-family:var(--font-serif-ai); font-size:22px; line-height:1.28; font-weight:400; transition:color 160ms cubic-bezier(.2,.7,.2,1); }
.pf-card--featured .pf-card__title { font-size:28px; }
.pf-card:hover .pf-card__title { color:var(--ai-accent); }
.pf-card__desc { color:var(--ai-fg-muted); font-size:14px; line-height:1.58; margin-top:8px; flex:1; }
.pf-card__link { display:inline-flex; align-items:center; gap:6px; margin-top:18px; font-size:13px; font-weight:500; color:var(--ai-accent); text-decoration:none; transition:gap 160ms cubic-bezier(.2,.7,.2,1); }
.pf-card__link:hover { gap:10px; }
.pf-card__link svg { transition:transform 300ms ease; flex-shrink:0; }
.pf-card:hover .pf-card__link svg { transform:translateX(4px); }

.pf-section { padding:40px 0 80px; }
.pf-filters { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; }
.pf-filter { padding:8px 16px; border:1px solid var(--ai-border); border-radius:999px; font-size:13px; color:var(--ai-fg-muted); background:var(--ai-bg-2); cursor:pointer; transition:background 160ms,color 160ms,border-color 160ms; font-family:inherit; }
.pf-filter:hover { border-color:var(--ai-accent); color:var(--ai-accent); }
.pf-filter.is-active { background:var(--ai-fg); color:var(--ai-bg); border-color:var(--ai-fg); }
.pf-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
@media(max-width:1000px){.pf-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.pf-grid{grid-template-columns:1fr;}}
@keyframes pf-card-in { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
.pf-card.is-visible { animation:pf-card-in .5s ease both; }

.pf-close { padding:80px 0; border-top:1px solid var(--ai-border); text-align:center; }
.pf-close h2 { font-family:var(--font-serif-ai); font-size:clamp(32px,5vw,56px); line-height:1.2; max-width:16ch; margin:0 auto; font-weight:400; letter-spacing:-0.02em; }
.pf-close p { margin:20px auto 0; color:var(--ai-fg-muted); font-size:17px; line-height:1.7; max-width:500px; }

.eyebrow-pf { font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); }
`

const FEATURED = [
  { title: 'Overlord Fund', cat: 'investment', catLabel: 'Investment', desc: 'Investment vehicle management platform. Creation and management of Holdings, Club deals and Funds. Legal, tax and accounting management.', href: 'https://www.overlord.fund/fr', img: '/portfolio/overlord-fund.jpg' },
  { title: 'Le Revenu', cat: 'media', catLabel: 'Media', desc: 'French financial magazine specialized in financial investment advice, life insurance, stock market, taxation, real estate.', href: 'https://www.lerevenu.com/', img: '/portfolio/le-revenu.jpg' },
]

const PROJECTS = [
  { title: 'Isla Wedding', desc: 'Wedding photography and planning service.', cat: 'creative', catLabel: 'Photography', href: 'https://isla-wedding.mindzy.me/', img: '/portfolio/isla-wedding.jpg' },
  { title: 'B2B Consulting', desc: 'Business consulting firm in French Guiana. Accounting support, business creation, strategic management.', cat: 'investment', catLabel: 'Consulting', href: 'https://b2bconsulting.pro/', img: '/portfolio/b2b-consulting.jpg' },
  { title: 'Equityz', desc: 'Investment club for Antillean-Guyanese entrepreneurs.', cat: 'investment', catLabel: 'Investment', href: 'https://equityz.fr/', img: '/portfolio/equityz.jpg' },
  { title: 'Ory Avocats', desc: 'Law firm specialized in criminal law, business criminal law and fundamental freedoms.', cat: 'legal', catLabel: 'Legal', href: 'https://www.ory-avocats.com/', img: '/portfolio/ory-avocats.jpg' },
  { title: 'Ligny Avocat', desc: 'Law office specialized in criminal law and litigation.', cat: 'legal', catLabel: 'Legal', href: 'https://www.ligny-avocat.com/', img: '/portfolio/ligny-avocat.jpg' },
  { title: 'Pharaonique Official', desc: 'Streetwear clothing brand. Sweatshirts, T-shirts, Sets, Caps. Over 50,000 customers worldwide.', cat: 'commerce', catLabel: 'Commerce', href: 'https://pharaoniqueofficial.com/', img: '/portfolio/pharaonique-official.jpg' },
  { title: 'Ligaphone Paris', desc: 'Specialized audio and music e-commerce store in Paris.', cat: 'commerce', catLabel: 'Commerce', href: 'https://ligaphone-paris.myshopify.com/fr', img: '/portfolio/ligaphone-paris.jpg' },
  { title: 'French Is Now', desc: 'Web developer portfolio and Mindzy site creator.', cat: 'creative', catLabel: 'Freelance', href: 'https://www.frenchisnow.com/', img: '/portfolio/french-is-now.jpg' },
  { title: 'Joplin Designer', desc: 'Graphic designer and art director.', cat: 'creative', catLabel: 'Design', href: 'https://joplin-designer.mindzy.me/', img: '/portfolio/joplin-designer.jpg' },
  { title: 'Byur Surfing', desc: 'Surf school and surfing lessons by the sea.', cat: 'sport', catLabel: 'Sport', href: 'https://byur-surfing.mindzy.me/', img: '/portfolio/byur-surfing.jpg' },
  { title: 'Bangla Boxing Stadium', desc: 'Thai boxing and martial arts gym.', cat: 'sport', catLabel: 'Sport', href: 'http://banglaboxingstadium.com/', img: '/portfolio/banglaboxingstadium.jpg' },
  { title: 'Coach Marchand', desc: 'Sports coach and physical trainer. Personalized programs, individual and group coaching.', cat: 'sport', catLabel: 'Sport', href: 'https://coach-marchand.mindzy.me/', img: '/portfolio/coach-marchand.jpg' },
  { title: 'Acupuncture Mei', desc: 'Traditional Chinese acupuncture practice. Personalized care and alternative medicine.', cat: 'wellness', catLabel: 'Wellness', href: 'https://acupuncture-mei.mindzy.me/', img: '/portfolio/acupuncture-mei.jpg' },
  { title: 'Aromatherapist Hélène', desc: 'Certified aromatherapist. Aromatherapy and essential oils consultations.', cat: 'wellness', catLabel: 'Wellness', href: 'https://aromatherapeute-helene.mindzy.me/', img: '/portfolio/aromatherapie-helene.jpg' },
  { title: 'Art Therapy Camille', desc: 'Art therapist specialized in support through creativity.', cat: 'wellness', catLabel: 'Wellness', href: 'https://arttherapie-camille.mindzy.me/', img: '/portfolio/art-therapie-camille.jpg' },
  { title: 'Ayurveda Priya', desc: 'Ayurveda practitioner. Consultations, ayurvedic massages and personalized wellness programs.', cat: 'wellness', catLabel: 'Wellness', href: 'https://ayurveda-priya.mindzy.me/', img: '/portfolio/ayurveda-priya.jpg' },
  { title: 'Chiropractor Thomas', desc: 'Chiropractic office. Back and joint care through spinal adjustments.', cat: 'wellness', catLabel: 'Wellness', href: 'https://chiropracteur-thomas.mindzy.me/', img: '/portfolio/chiropracteur-thomas.jpg' },
  { title: 'Dietitian Aurélie', desc: 'Registered dietitian-nutritionist. Personalized consultations and nutritional follow-up.', cat: 'wellness', catLabel: 'Wellness', href: 'https://dieteticienne-aurelie.mindzy.me/', img: '/portfolio/dieteticienne-aurelie.jpg' },
  { title: 'Energy Healer Bresom', desc: 'Energy healing practitioner. Chakra rebalancing and energetic harmonization.', cat: 'wellness', catLabel: 'Wellness', href: 'https://energeticien-bresom.mindzy.me/', img: '/portfolio/energeticien-bresom.jpg' },
  { title: 'Hypnotherapist Duverne', desc: 'Certified hypnotherapist. Hypnosis for phobias, addictions and self-confidence.', cat: 'wellness', catLabel: 'Wellness', href: 'https://hypno-duverne.mindzy.me/', img: '/portfolio/hypno-duverne.jpg' },
  { title: 'Hypnosis Nathalie', desc: 'Therapeutic hypnosis practitioner. Specialized in stress management, sleep and well-being.', cat: 'wellness', catLabel: 'Wellness', href: 'https://hypno-nathalie.mindzy.me/', img: '/portfolio/hypno-nathalie.jpg' },
  { title: 'Kinesiologist Sophie', desc: 'Certified kinesiologist. Body rebalancing, emotional management and holistic support.', cat: 'wellness', catLabel: 'Wellness', href: 'https://kinesiologue-sophie.mindzy.me/', img: '/portfolio/kine-sophie.jpg' },
  { title: 'Lithotherapist Duval', desc: 'Lithotherapist and crystal specialist. Crystal healing, workshops and training.', cat: 'wellness', catLabel: 'Wellness', href: 'https://lithotherapeute-duval.mindzy.me/', img: '/portfolio/lithotherapeute-duval.jpg' },
  { title: 'Magnetizer Delacroix', desc: 'Healing magnetizer. Energy healing through magnetism for pain and blockage relief.', cat: 'wellness', catLabel: 'Wellness', href: 'https://magnetiseur-delacroix.mindzy.me/', img: '/portfolio/magnetiseur-delacroix.jpg' },
  { title: 'Medium Moreau', desc: 'Medium and clairvoyant. Mediumship consultations, spiritual guidance and life coaching.', cat: 'wellness', catLabel: 'Wellness', href: 'https://medium-moreau.mindzy.me/', img: '/portfolio/medium-moreau.jpg' },
  { title: 'Osteopath Lefebvre', desc: 'Licensed osteopath D.O. Consultations for adults, athletes and infants.', cat: 'wellness', catLabel: 'Wellness', href: 'https://osteo-lefebvre.mindzy.me/', img: '/portfolio/osteo-lefebvre.jpg' },
  { title: 'Reflexology Manie', desc: 'Certified reflexologist. Foot and hand reflexology for relaxation and tension relief.', cat: 'wellness', catLabel: 'Wellness', href: 'https://reflexo-manie.mindzy.me/', img: '/portfolio/reflexo-manie.jpg' },
  { title: 'Shiatsu Kenji', desc: 'Traditional Japanese shiatsu practitioner. Digital pressure on meridians.', cat: 'wellness', catLabel: 'Wellness', href: 'https://shiatsu-kenji.mindzy.me/', img: '/portfolio/shiatsu-kenji.jpg' },
  { title: 'Sophrology Rabiovic', desc: 'Certified sophrologist. Sessions for stress management, mental preparation and relaxation.', cat: 'wellness', catLabel: 'Wellness', href: 'https://sophro-rabiovic.mindzy.me/', img: '/portfolio/sophro-rabiovic.jpg' },
]

const FILTERS = ['all', 'investment', 'legal', 'wellness', 'media', 'commerce', 'sport', 'creative']

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visible = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter)

  // IntersectionObserver for card entrance animations
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).style.animationDelay = (i * 0.06) + 's'
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.pf-card').forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [visible]) // re-run when filter changes

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="pf-hero">
        <div className="pf-hero__grid" aria-hidden="true" />
        <div className="w-full max-w-[1200px] mx-auto px-8" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow-pf pf-hero__eyebrow">Our work</div>
          <h1 className="pf-hero__title">Created by Mindzy.</h1>
          <p className="pf-hero__sub">Every project below was scoped, designed, and delivered by our team with one objective: building digital experiences that are clear, elegant, and built for performance.</p>
          <div className="pf-hero__stats">
            <div>
              <div className="pf-hero__stat-val">34</div>
              <div className="pf-hero__stat-lbl">Projects delivered</div>
            </div>
            <div style={{ width: '1px', background: 'var(--ai-border)', flexShrink: 0 }} />
            <div>
              <div className="pf-hero__stat-val">12</div>
              <div className="pf-hero__stat-lbl">Industries</div>
            </div>
          </div>
          <div className="pf-hero__ctas">
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>Book a Call</GlassButton>
            <GlassButton href="#projects">
              Explore work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
            </GlassButton>
          </div>
        </div>
        <div className="pf-hero__scroll" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* Featured */}
      <section className="pf-featured" id="projects">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="pf-featured__label">Featured projects</div>
          <div className="pf-featured__grid">
            {FEATURED.map(p => (
              <a key={p.title} className="pf-card pf-card--featured is-visible" href={p.href} target="_blank" rel="noopener" data-cat={p.cat}>
                <div className="pf-card__img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="pf-card__img" src={p.img} alt={p.title} loading="eager" />
                  <span className="pf-card__cat-badge">{p.catLabel}</span>
                </div>
                <div className="pf-card__body">
                  <div className="pf-card__cat">{p.catLabel}</div>
                  <div className="pf-card__title">{p.title}</div>
                  <p className="pf-card__desc">{p.desc}</p>
                  <span className="pf-card__link">
                    Visit site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All projects */}
      <section className="pf-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="pf-filters">
            {FILTERS.map(f => (
              <button key={f} className={`pf-filter${activeFilter === f ? ' is-active' : ''}`} onClick={() => setActiveFilter(f)}>
                {f === 'all' ? 'All' : f === 'sport' ? 'Sport & Coaching' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="pf-grid">
            {visible.map(p => (
              <a key={p.title} className="pf-card" href={p.href} target="_blank" rel="noopener" data-cat={p.cat}>
                <div className="pf-card__img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="pf-card__img" src={p.img} alt={p.title} loading="lazy" />
                  <span className="pf-card__cat-badge">{p.catLabel}</span>
                </div>
                <div className="pf-card__body">
                  <div className="pf-card__cat">{p.catLabel}</div>
                  <div className="pf-card__title">{p.title}</div>
                  <p className="pf-card__desc">{p.desc}</p>
                  <span className="pf-card__link">
                    Visit site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pf-close">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <h2>Want this <em style={{ fontStyle: 'italic' }}>infrastructure</em> inside your company?</h2>
          <p>30 minutes. We listen, we map, we tell you whether AI can move the needle for your operations.</p>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>Book a call</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
