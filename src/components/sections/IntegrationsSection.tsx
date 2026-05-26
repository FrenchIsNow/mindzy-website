'use client'

import { usePathname } from 'next/navigation'

const TRANSLATIONS = {
  en: {
    h2_plain: 'Connects to every tool',
    h2_em: 'in your stack.',
    desc: 'APIs, webhooks, and custom connectors — Mindzy integrates with the platforms your teams already depend on.',
  },
  fr: {
    h2_plain: 'Se connecte à chaque outil',
    h2_em: 'de votre stack.',
    desc: 'APIs, webhooks et connecteurs personnalisés — Mindzy s\'intègre aux plateformes dont vos équipes dépendent déjà.',
  },
  es: {
    h2_plain: 'Se conecta a cada herramienta',
    h2_em: 'de tu stack.',
    desc: 'APIs, webhooks y conectores personalizados — Mindzy se integra con las plataformas que tus equipos ya utilizan.',
  },
  de: {
    h2_plain: 'Verbindet sich mit jedem Tool',
    h2_em: 'in Ihrem Stack.',
    desc: 'APIs, Webhooks und individuelle Konnektoren — Mindzy integriert sich in die Plattformen, auf die Ihre Teams bereits angewiesen sind.',
  },
  it: {
    h2_plain: 'Si connette a ogni strumento',
    h2_em: 'nel tuo stack.',
    desc: 'API, webhook e connettori personalizzati — Mindzy si integra con le piattaforme su cui i tuoi team già si affidano.',
  },
  pt: {
    h2_plain: 'Conecta-se a cada ferramenta',
    h2_em: 'do seu stack.',
    desc: 'APIs, webhooks e conectores personalizados — Mindzy integra-se com as plataformas que suas equipes já dependem.',
  },
  ar: {
    h2_plain: 'يتصل بكل أداة',
    h2_em: 'في مجموعتك.',
    desc: 'واجهات برمجية وخطافات ويب وموصلات مخصصة — تتكامل Mindzy مع المنصات التي تعتمد عليها فرقك بالفعل.',
  },
  zh: {
    h2_plain: '连接您技术栈中',
    h2_em: '的每一个工具。',
    desc: 'API、Webhook 和自定义连接器——Mindzy 与您团队已在使用的平台无缝集成。',
  },
  ja: {
    h2_plain: 'スタック内のすべてのツールに',
    h2_em: '接続します。',
    desc: 'API、Webhook、カスタムコネクター — Mindzy はチームがすでに使用しているプラットフォームと統合します。',
  },
  ru: {
    h2_plain: 'Подключается к каждому инструменту',
    h2_em: 'в вашем стеке.',
    desc: 'API, веб-хуки и пользовательские коннекторы — Mindzy интегрируется с платформами, которые ваши команды уже используют.',
  },
}

const ROW1 = [
  'anthropic',
  'claude',
  'mistralai',
  'googlegemini',
  'langchain',
  'huggingface',
  'ollama',
  'github',
  'gitlab',
  'docker',
  'kubernetes',
  'vercel',
  'netlify',
  'cloudflare',
  'digitalocean',
  'googlecloud',
  'supabase',
  'firebase',
  'mongodb',
  'postgresql',
  'mysql',
  'redis',
  'figma',
  'notion',
  'n8n',
  'zapier',
]

const ROW2 = [
  'make',
  'ifttt',
  'hubspot',
  'airtable',
  'clickup',
  'asana',
  'jira',
  'linear',
  'trello',
  'intercom',
  'zendesk',
  'typeform',
  'telegram',
  'discord',
  'whatsapp',
  'gmail',
  'googledrive',
  'googledocs',
  'googlesheets',
  'googlecalendar',
  'stripe',
  'paypal',
  'shopify',
  'wordpress',
  'apollographql',
  'calendly',
]

export function IntegrationsSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <section
      className="py-16 md:pt-[100px] md:pb-[96px] text-center"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(128,128,128,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Heading */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginBottom: '52px',
        }}
        className="w-full max-w-[1200px] mx-auto px-5 md:px-8"
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif-ai)',
            fontSize: 'clamp(28px,4vw,52px)',
            lineHeight: 1.22,
            letterSpacing: '-0.015em',
          }}
        >
          {t.h2_plain} <em>{t.h2_em}</em>
        </h2>
        <p
          style={{
            marginTop: '16px',
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'var(--ai-fg-muted)',
            maxWidth: '600px',
            margin: '16px auto 0',
          }}
        >
          {t.desc}
        </p>
      </div>

      {/* Two carousel rows */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          .int-row-left { animation: scrollLeft 40s linear infinite; }
          .int-row-right { animation: scrollRight 40s linear infinite; }
          .int-row-left:hover, .int-row-right:hover { animation-play-state: paused; }
        `}</style>

        {/* Fade edges */}
        <div style={{ position: 'relative' }}>
          <div
            className="w-[60px] md:w-[120px]"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              background: 'linear-gradient(to right, var(--ai-bg,#fefdf9), transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            className="w-[60px] md:w-[120px]"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              background: 'linear-gradient(to left, var(--ai-bg,#fefdf9), transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Row 1: scrolls left */}
          <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <div
              className="int-row-left"
              style={{ display: 'flex', width: 'max-content', gap: '12px' }}
            >
              {[...ROW1, ...ROW1].map((name, i) => (
                <div
                  key={i}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '16px',
                    border: '1px solid var(--ai-border)',
                    background: 'var(--ai-bg-2, #fff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/logo/integrations/${name}.svg`}
                    alt={name}
                    style={{
                      width: '36px',
                      height: '36px',
                      objectFit: 'contain',
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: scrolls right */}
          <div style={{ overflow: 'hidden' }}>
            <div
              className="int-row-right"
              style={{ display: 'flex', width: 'max-content', gap: '12px' }}
            >
              {[...ROW2, ...ROW2].map((name, i) => (
                <div
                  key={i}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '16px',
                    border: '1px solid var(--ai-border)',
                    background: 'var(--ai-bg-2, #fff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/logo/integrations/${name}.svg`}
                    alt={name}
                    style={{
                      width: '36px',
                      height: '36px',
                      objectFit: 'contain',
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationsSection
