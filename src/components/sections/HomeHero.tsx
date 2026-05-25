'use client'

import { usePathname } from 'next/navigation'
import { FadeIn } from '@/components/animations/FadeIn'
import { GlassButton } from '@/components/ui/GlassButton'
import SphereImageGrid, { ImageData } from '@/components/ui/img-sphere'

// ── Translations ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    eyebrow: 'AI Infrastructure',
    headline1: 'The ',
    headlineItalic: 'custom',
    headline2: ' AI infrastructure built around your company.',
    subtitle: 'Connected to your tools, governed by your rules, and deployed around your real workflows.',
    cta1: 'Book a Call',
    cta2: 'Explore our process',
  },
  fr: {
    eyebrow: 'Infrastructure IA',
    headline1: 'L\'',
    headlineItalic: 'infrastructure IA sur mesure',
    headline2: ' construite autour de votre entreprise.',
    subtitle: 'Connectée à vos outils, gouvernée par vos règles, et déployée autour de vos vrais flux de travail.',
    cta1: 'Réserver un appel',
    cta2: 'Explorer notre processus',
  },
  es: {
    eyebrow: 'Infraestructura IA',
    headline1: 'La ',
    headlineItalic: 'infraestructura IA personalizada',
    headline2: ' construida alrededor de tu empresa.',
    subtitle: 'Conectada a tus herramientas, gobernada por tus reglas, y desplegada alrededor de tus flujos de trabajo reales.',
    cta1: 'Reservar una llamada',
    cta2: 'Explorar nuestro proceso',
  },
  de: {
    eyebrow: 'KI-Infrastruktur',
    headline1: 'Die ',
    headlineItalic: 'maßgeschneiderte KI-Infrastruktur',
    headline2: ' für Ihr Unternehmen.',
    subtitle: 'Verbunden mit Ihren Tools, geregelt durch Ihre Regeln, und eingesetzt rund um Ihre realen Arbeitsabläufe.',
    cta1: 'Anruf buchen',
    cta2: 'Unseren Prozess erkunden',
  },
  it: {
    eyebrow: 'Infrastruttura IA',
    headline1: 'L\'',
    headlineItalic: 'infrastruttura IA personalizzata',
    headline2: ' costruita intorno alla tua azienda.',
    subtitle: 'Connessa ai tuoi strumenti, governata dalle tue regole, e distribuita intorno ai tuoi veri flussi di lavoro.',
    cta1: 'Prenota una chiamata',
    cta2: 'Esplora il nostro processo',
  },
  pt: {
    eyebrow: 'Infraestrutura IA',
    headline1: 'A ',
    headlineItalic: 'infraestrutura IA personalizada',
    headline2: ' construída em torno da sua empresa.',
    subtitle: 'Conectada às suas ferramentas, governada pelas suas regras, e implantada em torno dos seus fluxos de trabalho reais.',
    cta1: 'Agendar uma chamada',
    cta2: 'Explorar nosso processo',
  },
  ar: {
    eyebrow: 'البنية التحتية للذكاء الاصطناعي',
    headline1: 'البنية التحتية للذكاء الاصطناعي ',
    headlineItalic: 'المخصصة',
    headline2: ' المبنية حول شركتك.',
    subtitle: 'متصلة بأدواتك، تحكمها قواعدك، ومنتشرة حول سير عملك الحقيقي.',
    cta1: 'احجز مكالمة',
    cta2: 'استكشف عمليتنا',
  },
  zh: {
    eyebrow: 'AI 基础设施',
    headline1: '为您的企业量身打造的',
    headlineItalic: '定制化',
    headline2: ' AI 基础设施。',
    subtitle: '与您的工具无缝连接，遵循您的规则，围绕您的真实工作流程部署。',
    cta1: '预约通话',
    cta2: '探索我们的流程',
  },
  ja: {
    eyebrow: 'AIインフラストラクチャ',
    headline1: 'あなたの企業に合わせた',
    headlineItalic: 'カスタム',
    headline2: 'AIインフラストラクチャ。',
    subtitle: 'あなたのツールに接続し、あなたのルールに従い、実際のワークフローに合わせて展開されます。',
    cta1: '通話を予約する',
    cta2: 'プロセスを探る',
  },
  ru: {
    eyebrow: 'ИИ-инфраструктура',
    headline1: '',
    headlineItalic: 'Индивидуальная',
    headline2: ' ИИ-инфраструктура, построенная вокруг вашей компании.',
    subtitle: 'Подключена к вашим инструментам, управляется вашими правилами и развёрнута вокруг ваших реальных рабочих процессов.',
    cta1: 'Записаться на звонок',
    cta2: 'Изучить наш процесс',
  },
}

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
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <section
      style={{ minHeight: '100vh', background: 'var(--ai-bg)' }}
      className="flex items-center pt-[120px] pb-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="flex items-center gap-0 w-full" style={{ flexWrap: 'nowrap' }}>

          {/* Left column: text content */}
          <div style={{ flex: '0 0 auto', maxWidth: '620px' }}>
            <FadeIn className="pr-12">
              {/* Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '10.5px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ai-accent)', fontWeight: 500, marginBottom: '24px' }}>
                <span style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: 'var(--ai-accent)', opacity: 0.65, flexShrink: 0 }} />
                {t.eyebrow}
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: 'clamp(52px, 7.8vw, 96px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--ai-fg)', fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontWeight: 400, maxWidth: '16ch', margin: '0 0 28px' }}>
                {t.headline1}<em style={{ fontStyle: 'italic' }}>{t.headlineItalic}</em>{t.headline2}
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: '19px', lineHeight: 1.65, color: 'var(--ai-fg-muted)', maxWidth: '560px', margin: '0 0 40px' }}>
                {t.subtitle}
              </p>

              {/* CTAs */}
              <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>{t.cta1}</GlassButton>
                <GlassButton href={`/${locale}/process`}>
                  {t.cta2}
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
