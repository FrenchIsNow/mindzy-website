export function FinalCTASection() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', textAlign: 'center' }}>
      {/* Decorative beam lines (SVG positioned absolutely) */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="beamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="var(--ai-accent)" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <linearGradient id="beamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="var(--ai-accent)" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#beamGrad2)" strokeWidth="1"/>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#beamGrad1)" strokeWidth="1"/>
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#beamGrad2)" strokeWidth="1"/>
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#beamGrad2)" strokeWidth="1"/>
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#beamGrad2)" strokeWidth="1"/>
      </svg>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }} className="w-full max-w-[1200px] mx-auto px-8">
        <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.18, maxWidth: '18ch', margin: '0 auto' }}>
          Let&apos;s design the <em>AI infrastructure</em> of your company.
        </h2>
        <p style={{ marginTop: '24px', fontSize: '19px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '520px', margin: '24px auto 0' }}>
          30 minutes. No deck. We listen, we map, we tell you whether AI can move the needle for your operations.
        </p>
        <div style={{ marginTop: '56px' }}>
          <a
            href="https://calendar.app.google/ghE79tSFxmea4Scd9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 32px', borderRadius: '999px',
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(14px) saturate(180%)',
              WebkitBackdropFilter: 'blur(14px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: 'var(--ai-fg)',
              fontSize: '16px', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.55), 0 10px 30px rgba(0,0,0,0.10)',
            }}
            className="hover:-translate-y-0.5 transition-transform"
          >
            Book a 30-minute call
          </a>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
