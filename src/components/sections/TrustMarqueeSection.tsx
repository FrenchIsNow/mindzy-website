const TRANSLATIONS = {
  en: {
    eyebrow: 'Our partners',
    title: 'They trust us',
    subtitle: 'The tools and platforms we connect to, every day, inside our clients.',
  },
  fr: {
    eyebrow: 'Nos partenaires',
    title: 'Ils nous font confiance',
    subtitle: 'Les outils et plateformes auxquels nous nous connectons, chaque jour, chez nos clients.',
  },
  es: {
    eyebrow: 'Nuestros socios',
    title: 'Confían en nosotros',
    subtitle: 'Las herramientas y plataformas a las que nos conectamos, cada día, dentro de nuestros clientes.',
  },
  de: {
    eyebrow: 'Unsere Partner',
    title: 'Sie vertrauen uns',
    subtitle: 'Die Tools und Plattformen, mit denen wir uns täglich bei unseren Kunden verbinden.',
  },
  it: {
    eyebrow: 'I nostri partner',
    title: 'Si fidano di noi',
    subtitle: 'Gli strumenti e le piattaforme a cui ci colleghiamo ogni giorno, all\'interno dei nostri clienti.',
  },
  pt: {
    eyebrow: 'Nossos parceiros',
    title: 'Eles confiam em nós',
    subtitle: 'As ferramentas e plataformas às quais nos conectamos todos os dias, dentro dos nossos clientes.',
  },
  ar: {
    eyebrow: 'شركاؤنا',
    title: 'يثقون بنا',
    subtitle: 'الأدوات والمنصات التي نتصل بها كل يوم داخل شركات عملائنا.',
  },
  zh: {
    eyebrow: '我们的合作伙伴',
    title: '他们信任我们',
    subtitle: '我们每天在客户内部连接的工具和平台。',
  },
  ja: {
    eyebrow: 'パートナー',
    title: '彼らは私たちを信頼しています',
    subtitle: '私たちがクライアントの社内で毎日接続しているツールとプラットフォーム。',
  },
  ru: {
    eyebrow: 'Наши партнёры',
    title: 'Они доверяют нам',
    subtitle: 'Инструменты и платформы, с которыми мы работаем ежедневно внутри компаний наших клиентов.',
  },
}

const PARTNERS = [
  { name: 'OpenAI', src: '/logo/OpenAI_Logo.svg.png' },
  { name: 'Claude AI', src: '/logo/Claude_AI_logo.svg.png' },
  { name: 'n8n', src: '/logo/n8n-logo.png' },
  { name: 'Vercel', src: '/logo/Vercel_logo_2025.svg' },
  { name: 'AWS', src: '/logo/aws-logo.webp' },
  { name: 'Google Cloud', src: '/logo/google-cloud-logo.png' },
  { name: 'Cloudflare', src: '/logo/cloudflare-logo.png' },
  { name: 'Microsoft Azure', src: '/logo/microsoft-azure-logo.png' },
  { name: 'Stripe', src: '/logo/stripe-logo.png' },
  { name: 'Slack', src: '/logo/slack-logo.png' },
  { name: 'Google Analytics', src: '/logo/google-analytics-logo.png' },
  { name: 'HubSpot', src: '/logo/hubspot-logo.png' },
  { name: 'PayPal', src: '/logo/paypal-logo.png' },
]

export function TrustMarqueeSection({ locale = 'en' }: { locale?: string }) {
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <>
      <style suppressHydrationWarning>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } @keyframes marquee-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }`}</style>
      <section className="py-12 md:py-24 border-t border-b border-[var(--ai-border)]">
        {/* Header */}
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 text-center mb-8 md:mb-12">
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>
            {t.eyebrow}
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(38px,5vw,56px)', lineHeight: 1.08, marginTop: '14px', color: 'var(--ai-fg)' }}>
            {t.title}
          </h2>
          <p style={{ marginTop: '14px', color: 'var(--ai-fg-muted)', fontSize: 'clamp(15px,2.5vw,18px)', lineHeight: 1.6 }}>
            {t.subtitle}
          </p>
        </div>

        {/* Desktop: single row marquee */}
        <div
          className="hidden md:block"
          style={{
            position: 'relative',
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 55s linear infinite' }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} style={{ flex: '0 0 auto', minWidth: '200px', height: '88px', borderRadius: '16px', border: '1px solid var(--ai-border)', background: 'var(--ai-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 28px', marginRight: '20px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} style={{ height: '32px', width: 'auto', maxWidth: '130px', objectFit: 'contain' }} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        {/* Mobile: double row, opposite directions */}
        <div
          className="md:hidden"
          style={{
            position: 'relative',
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Row 1: left → right */}
          <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 38s linear infinite' }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} style={{ flex: '0 0 auto', minWidth: '130px', height: '60px', borderRadius: '12px', border: '1px solid var(--ai-border)', background: 'var(--ai-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', marginRight: '10px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} style={{ height: '22px', width: 'auto', maxWidth: '90px', objectFit: 'contain' }} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TrustMarqueeSection
