'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { FadeIn } from '@/components/animations/FadeIn'
import { GlassButton } from '@/components/ui/GlassButton'

const GALLERY_ITEMS = [
  { title: 'Choose the Worker',      sub: 'Mindzy', img: '/portfolio/carousel-choose-worker.png' },
  { title: 'AI Infrastructure',      sub: 'Mindzy', img: '/portfolio/carousel-ai-infrastructure.png' },
  { title: 'AI Operating Layer',     sub: 'Mindzy', img: '/portfolio/carousel-ai-operating.png' },
  { title: 'Workflow Orchestration', sub: 'Mindzy', img: '/portfolio/carousel-workflow.png' },
  { title: 'Connect your Stack',     sub: 'Mindzy', img: '/portfolio/carousel-connect-stack.png' },
  { title: 'Governance & Control',   sub: 'Mindzy', img: '/portfolio/carousel-governance.png' },
  { title: 'Deploy by Department',   sub: 'Mindzy', img: '/portfolio/carousel-deploy-dept.png' },
  { title: 'Measure the Impact',     sub: 'Mindzy', img: '/portfolio/carousel-measure-impact.png' },
  { title: 'Built Around You',       sub: 'Mindzy', img: '/portfolio/carousel-built-around.png' },
]

const RADIUS = 360
const AUTO_SPEED = 0.04

function updateCards(ring: HTMLElement, rotation: number) {
  const cards = ring.querySelectorAll<HTMLElement>('[data-base-angle]')
  cards.forEach((card) => {
    const base = parseFloat(card.dataset.baseAngle!)
    const rel = ((base + rotation) % 360 + 360) % 360
    const norm = rel > 180 ? 360 - rel : rel
    card.style.opacity = String(Math.max(0.25, 1 - norm / 180))
    card.style.transform = `rotateY(${base + rotation}deg) translateZ(${RADIUS}px)`
  })
}

export function HomeHero() {
  const ringRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const rafRef = useRef<number>(0)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight

    function handleScroll() {
      isScrollingRef.current = true
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 150)

      const scrollY = window.scrollY
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0
      rotationRef.current = progress * 360
    }

    function tick() {
      const ring = ringRef.current
      if (!ring) return
      if (!isScrollingRef.current) {
        rotationRef.current += AUTO_SPEED
      }
      updateCards(ring, rotationRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    // Seed initial card positions
    updateCards(ring, rotationRef.current)

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  return (
    <section
      style={{ minHeight: '100vh', background: 'var(--ai-bg)' }}
      className="flex items-center pt-[120px] pb-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div
          className="flex items-center gap-0 w-full"
          style={{ flexWrap: 'nowrap' }}
        >
          {/* ── Left column: text content ── */}
          <div style={{ flex: '0 0 auto', maxWidth: '560px' }}>
          <FadeIn
            className="pr-12"
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '10.5px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--ai-accent)',
                fontWeight: 500,
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--ai-accent)',
                  opacity: 0.65,
                  flexShrink: 0,
                }}
              />
              AI Infrastructure
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(52px, 7.8vw, 96px)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'var(--ai-fg)',
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontWeight: 400,
                maxWidth: '14ch',
                margin: '0 0 28px',
              }}
            >
              The{' '}
              <em style={{ fontStyle: 'italic' }}>custom</em>{' '}
              AI infrastructure built around your company.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '19px',
                lineHeight: 1.65,
                color: 'var(--ai-fg-muted)',
                maxWidth: '500px',
                margin: '0 0 40px',
              }}
            >
              Connected to your tools, governed by your rules, and deployed
              around your real workflows.
            </p>

            {/* CTA buttons */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>
                Book a Call
              </GlassButton>
              <GlassButton href="/en/process">
                Explore our process
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </GlassButton>
            </div>
          </FadeIn>
          </div>

          {/* ── Right column: 3D gallery ── */}
          <div
            className="flex items-center justify-center"
            style={{ flex: 1, minWidth: 0 }}
          >
            {/* Gallery scene */}
            <div
              aria-label="Portfolio carousel"
              style={{
                position: 'relative',
                width: '480px',
                height: '560px',
                perspective: '1300px',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
                flexShrink: 0,
              }}
            >
              {/* Gallery ring */}
              <div
                ref={ringRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                }}
              >
                {GALLERY_ITEMS.map((item, i) => {
                  const angle = (i * 360) / GALLERY_ITEMS.length
                  return (
                    <div
                      key={item.title}
                      data-base-angle={angle}
                      style={{
                        position: 'absolute',
                        width: '210px',
                        height: '280px',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-105px',
                        marginTop: '-140px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
                        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                        transition: 'opacity 0.25s linear',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="210px"
                      />
                      {/* Card caption overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '14px 14px 16px',
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)',
                          color: '#fff',
                        }}
                      >
                        <div
                          style={{
                            fontFamily:
                              'var(--font-instrument-serif), Georgia, serif',
                            fontSize: '15px',
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.09em',
                            textTransform: 'uppercase',
                            opacity: 0.6,
                            marginTop: '3px',
                          }}
                        >
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
