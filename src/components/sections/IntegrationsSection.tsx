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
  return (
    <section
      style={{
        position: 'relative',
        padding: '100px 0 96px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
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
        className="w-full max-w-[1200px] mx-auto px-8"
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif-ai)',
            fontSize: 'clamp(28px,4vw,52px)',
            lineHeight: 1.22,
            letterSpacing: '-0.015em',
          }}
        >
          Connects to every tool <em>in your stack.</em>
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
          APIs, webhooks, and custom connectors — Mindzy integrates with the platforms your teams already depend on.
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
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '120px',
              background: 'linear-gradient(to right, var(--ai-bg,#fefdf9), transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '120px',
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
