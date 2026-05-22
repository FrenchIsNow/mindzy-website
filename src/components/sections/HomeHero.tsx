'use client'

import { FadeIn } from '@/components/animations/FadeIn'
import { GlassButton } from '@/components/ui/GlassButton'
import SphereImageGrid, { ImageData } from '@/components/ui/img-sphere'

// ── Sphere images (60 items — 12 base Unsplash photos repeated) ──────────────
const BASE_IMAGES: Omit<ImageData, 'id'>[] = [
  { src: 'https://images.unsplash.com/photo-1758178309498-036c3d7d73b3?w=400&q=80&auto=format&fit=crop', alt: 'Mountain Landscape', title: 'Mountain Landscape', description: 'A beautiful landscape captured at golden hour.' },
  { src: 'https://images.unsplash.com/photo-1757647016230-d6b42abc6cc9?w=400&q=80&auto=format&fit=crop', alt: 'Portrait Photography', title: 'Portrait Photography', description: 'Natural lighting and composition.' },
  { src: 'https://images.unsplash.com/photo-1757906447358-f2b2cb23d5d8?w=400&q=80&auto=format&fit=crop', alt: 'Urban Architecture', title: 'Urban Architecture', description: 'Clean lines and geometric patterns.' },
  { src: 'https://images.unsplash.com/photo-1742201877377-03d18a323c18?w=400&q=80&auto=format&fit=crop', alt: 'Nature Scene', title: 'Nature Scene', description: 'Vibrant colors and natural beauty.' },
  { src: 'https://images.unsplash.com/photo-1757081791153-3f48cd8c67ac?w=400&q=80&auto=format&fit=crop', alt: 'Abstract Art', title: 'Abstract Art', description: 'Bold colors and unique patterns.' },
  { src: 'https://images.unsplash.com/photo-1757626961383-be254afee9a0?w=400&q=80&auto=format&fit=crop', alt: 'Golden Hour', title: 'Golden Hour', description: 'Warm tones and dramatic light.' },
  { src: 'https://images.unsplash.com/photo-1756748371390-099e4e6683ae?w=400&q=80&auto=format&fit=crop', alt: 'Studio Light', title: 'Studio Light', description: 'Professional studio photography.' },
  { src: 'https://images.unsplash.com/photo-1755884405235-5c0213aa3374?w=400&q=80&auto=format&fit=crop', alt: 'Aerial View', title: 'Aerial View', description: 'Bird\'s eye perspective.' },
  { src: 'https://images.unsplash.com/photo-1757495404191-e94ed7e70046?w=400&q=80&auto=format&fit=crop', alt: 'Coastal Scene', title: 'Coastal Scene', description: 'Ocean and horizon.' },
  { src: 'https://images.unsplash.com/photo-1756197256528-f9e6fcb82b04?w=400&q=80&auto=format&fit=crop', alt: 'City Life', title: 'City Life', description: 'Urban energy and movement.' },
  { src: 'https://images.unsplash.com/photo-1534083220759-4c3c00112ea0?w=400&q=80&auto=format&fit=crop', alt: 'Forest Path', title: 'Forest Path', description: 'Serene woodland environment.' },
  { src: 'https://images.unsplash.com/photo-1755278338891-e8d8481ff087?w=400&q=80&auto=format&fit=crop', alt: 'Creative Work', title: 'Creative Work', description: 'Artistry and craft.' },
]

const IMAGES: ImageData[] = Array.from({ length: 60 }, (_, i) => {
  const base = BASE_IMAGES[i % BASE_IMAGES.length]
  return { id: `img-${i + 1}`, ...base, alt: `${base.alt} ${Math.floor(i / BASE_IMAGES.length) + 1}` }
})

export function HomeHero() {
  return (
    <section
      style={{ minHeight: '100vh', background: 'var(--ai-bg)' }}
      className="flex items-center pt-[120px] pb-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="flex items-center gap-0 w-full" style={{ flexWrap: 'nowrap' }}>

          {/* Left column: text content */}
          <div style={{ flex: '0 0 auto', maxWidth: '560px' }}>
            <FadeIn className="pr-12">
              {/* Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '10.5px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ai-accent)', fontWeight: 500, marginBottom: '24px' }}>
                <span style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: 'var(--ai-accent)', opacity: 0.65, flexShrink: 0 }} />
                AI Infrastructure
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: 'clamp(52px, 7.8vw, 96px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--ai-fg)', fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontWeight: 400, maxWidth: '14ch', margin: '0 0 28px' }}>
                The <em style={{ fontStyle: 'italic' }}>custom</em> AI infrastructure built around your company.
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: '19px', lineHeight: 1.65, color: 'var(--ai-fg-muted)', maxWidth: '500px', margin: '0 0 40px' }}>
                Connected to your tools, governed by your rules, and deployed around your real workflows.
              </p>

              {/* CTAs */}
              <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>Book a Call</GlassButton>
                <GlassButton href="/en/process">
                  Explore our process
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                </GlassButton>
              </div>
            </FadeIn>
          </div>

          {/* Right column: Interactive image sphere */}
          <div className="flex items-center justify-center" style={{ flex: 1, minWidth: 0 }}>
            <SphereImageGrid
              images={IMAGES}
              containerSize={520}
              sphereRadius={190}
              autoRotate
              autoRotateSpeed={0.2}
              dragSensitivity={0.8}
              momentumDecay={0.96}
              maxRotationSpeed={6}
              baseImageScale={0.15}
              hoverScale={1.3}
              perspective={1000}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default HomeHero
