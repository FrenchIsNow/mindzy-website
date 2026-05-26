const TRANSLATIONS = {
  en: {
    h2: "Let's design the AI infrastructure of your company.",
    p: '30 minutes. No deck. We listen, we map, we tell you whether AI can move the needle for your operations.',
    button: 'Book a 30-minute call',
  },
  fr: {
    h2: "Concevons ensemble l'infrastructure IA de votre entreprise.",
    p: '30 minutes. Pas de présentation. Nous écoutons, nous cartographions, nous vous disons si l\'IA peut faire bouger les choses pour vos opérations.',
    button: 'Réserver un appel de 30 minutes',
  },
  es: {
    h2: 'Diseñemos la infraestructura de IA de tu empresa.',
    p: '30 minutos. Sin presentación. Escuchamos, mapeamos y te decimos si la IA puede marcar la diferencia en tus operaciones.',
    button: 'Reservar una llamada de 30 minutos',
  },
  de: {
    h2: 'Gestalten wir gemeinsam die KI-Infrastruktur Ihres Unternehmens.',
    p: '30 Minuten. Keine Präsentation. Wir hören zu, kartieren und sagen Ihnen, ob KI Ihre Abläufe voranbringen kann.',
    button: 'Einen 30-Minuten-Anruf buchen',
  },
  it: {
    h2: "Progettiamo insieme l'infrastruttura IA della tua azienda.",
    p: '30 minuti. Nessuna presentazione. Ascoltiamo, mappiamo e ti diciamo se l\'IA può fare la differenza per le tue operazioni.',
    button: 'Prenota una chiamata di 30 minuti',
  },
  pt: {
    h2: 'Vamos projetar a infraestrutura de IA da sua empresa.',
    p: '30 minutos. Sem apresentação. Ouvimos, mapeamos e dizemos se a IA pode fazer a diferença para suas operações.',
    button: 'Agendar uma chamada de 30 minutos',
  },
  ar: {
    h2: 'لنصمم معاً البنية التحتية للذكاء الاصطناعي لشركتك.',
    p: '30 دقيقة. بدون عرض تقديمي. نستمع، نرسم الخريطة، ونخبرك إن كان الذكاء الاصطناعي يمكنه إحداث فارق في عملياتك.',
    button: 'احجز مكالمة لمدة 30 دقيقة',
  },
  zh: {
    h2: '让我们一起设计您公司的 AI 基础设施。',
    p: '30 分钟。无需幻灯片。我们倾听、绘图，告诉您 AI 是否能为您的运营带来改变。',
    button: '预约 30 分钟通话',
  },
  ja: {
    h2: 'あなたの会社のAIインフラを一緒に設計しましょう。',
    p: '30分。資料なし。私たちは耳を傾け、マッピングし、AIがあなたの業務に変化をもたらせるかどうかをお伝えします。',
    button: '30分間の通話を予約する',
  },
  ru: {
    h2: 'Давайте спроектируем ИИ-инфраструктуру вашей компании.',
    p: '30 минут. Без презентаций. Мы слушаем, составляем карту и говорим вам, может ли ИИ изменить ситуацию в ваших операциях.',
    button: 'Записаться на 30-минутный звонок',
  },
}

export function FinalCTASection({ locale = 'en' }: { locale?: string }) {
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <section className="py-16 md:py-[120px]" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
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
      <div style={{ position: 'relative', zIndex: 1 }} className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
        <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.18, maxWidth: '18ch', margin: '0 auto' }}>
          {t.h2}
        </h2>
        <p style={{ marginTop: '24px', fontSize: 'clamp(16px,2.5vw,19px)', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '520px', margin: '24px auto 0' }}>
          {t.p}
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
            {t.button}
          </a>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
