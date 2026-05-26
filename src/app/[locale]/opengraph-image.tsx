import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mindzy — The custom AI infrastructure built around your company'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TAGLINES: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  fr: {
    eyebrow: 'INFRASTRUCTURE IA',
    title: "L'infrastructure IA sur mesure construite autour de votre entreprise.",
    subtitle: 'Connectée à vos outils. Gouvernée par vos règles. Déployée autour de vos vrais workflows.',
  },
  en: {
    eyebrow: 'AI INFRASTRUCTURE',
    title: 'The custom AI infrastructure built around your company.',
    subtitle: 'Connected to your tools. Governed by your rules. Deployed around your real workflows.',
  },
  es: {
    eyebrow: 'INFRAESTRUCTURA IA',
    title: 'La infraestructura IA personalizada construida alrededor de tu empresa.',
    subtitle: 'Conectada a tus herramientas. Gobernada por tus reglas. Desplegada alrededor de tus flujos de trabajo reales.',
  },
  de: {
    eyebrow: 'KI-INFRASTRUKTUR',
    title: 'Die maßgeschneiderte KI-Infrastruktur für Ihr Unternehmen.',
    subtitle: 'Verbunden mit Ihren Tools. Geregelt durch Ihre Regeln. Eingesetzt rund um Ihre realen Workflows.',
  },
  it: {
    eyebrow: 'INFRASTRUTTURA IA',
    title: "L'infrastruttura IA personalizzata costruita intorno alla tua azienda.",
    subtitle: 'Connessa ai tuoi strumenti. Governata dalle tue regole. Distribuita intorno ai tuoi veri workflow.',
  },
  pt: {
    eyebrow: 'INFRAESTRUTURA IA',
    title: 'A infraestrutura IA personalizada construída em torno da sua empresa.',
    subtitle: 'Conectada às suas ferramentas. Governada pelas suas regras. Implantada em torno dos seus workflows reais.',
  },
  ar: {
    eyebrow: 'البنية التحتية للذكاء الاصطناعي',
    title: 'البنية التحتية للذكاء الاصطناعي المخصصة المبنية حول شركتك.',
    subtitle: 'متصلة بأدواتك. تحكمها قواعدك. منتشرة حول سير عملك الحقيقي.',
  },
  zh: {
    eyebrow: 'AI 基础设施',
    title: '为您的企业量身打造的定制化 AI 基础设施。',
    subtitle: '与您的工具无缝连接，遵循您的规则，围绕您的真实工作流程部署。',
  },
  ja: {
    eyebrow: 'AIインフラストラクチャ',
    title: 'あなたの企業に合わせたカスタムAIインフラストラクチャ。',
    subtitle: 'あなたのツールに接続し、あなたのルールに従い、実際のワークフローに合わせて展開されます。',
  },
  ru: {
    eyebrow: 'ИИ-ИНФРАСТРУКТУРА',
    title: 'Индивидуальная ИИ-инфраструктура, построенная вокруг вашей компании.',
    subtitle: 'Подключена к вашим инструментам. Управляется вашими правилами. Развёрнута вокруг ваших реальных рабочих процессов.',
  },
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = TAGLINES[locale] ?? TAGLINES.en

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 55%, #2b0f4d 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(167,139,250,1) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Top: brand + eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            M
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>Mindzy</div>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', color: '#a78bfa', fontWeight: 500 }}>
              {t.eyebrow}
            </div>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif',
            }}
          >
            {t.title}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.45, color: '#cbd5e1', maxWidth: 880 }}>
            {t.subtitle}
          </div>
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            color: '#94a3b8',
            fontSize: 18,
            letterSpacing: '0.02em',
          }}
        >
          <span>mindzy.me</span>
          <span style={{ color: '#a78bfa' }}>{(locale || 'en').toUpperCase()}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
