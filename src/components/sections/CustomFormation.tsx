import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'
import { config } from '@/lib/config'

export function CustomFormation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Sur Mesure',
      title: 'FORMATION SUR MESURE',
      subtitle: 'Pour entreprises, équipes et grands comptes.',
      description:
        'Nous concevons un programme adapté à votre secteur, votre maturité digitale, vos process internes, vos objectifs stratégiques.',
      examplesTitle: 'Exemples de missions',
      examples: [
        'Former une équipe commerciale au social selling',
        'Structurer un département marketing interne',
        'Intégrer l\'IA dans les services support',
        'Automatiser les process internes',
        'Former des managers à l\'optimisation digitale',
      ],
      methodTitle: 'Méthodologie',
      steps: [
        'Diagnostic stratégique',
        'Audit des process existants',
        'Conception d\'un programme personnalisé',
        'Formation opérationnelle',
        'Suivi post-formation',
      ],
      priceLabel: 'Investissement',
      price: 'Sur devis',
      cta: 'Demander un devis',
    },
    en: {
      eyebrow: 'Custom',
      title: 'CUSTOM TRAINING',
      subtitle: 'For companies, teams and enterprise clients.',
      description:
        'We design a program tailored to your industry, your digital maturity, your internal processes, and your strategic objectives.',
      examplesTitle: 'Mission examples',
      examples: [
        'Train a sales team in social selling',
        'Structure an internal marketing department',
        'Integrate AI into support services',
        'Automate internal processes',
        'Train managers in digital optimization',
      ],
      methodTitle: 'Methodology',
      steps: [
        'Strategic diagnosis',
        'Existing process audit',
        'Custom program design',
        'Operational training',
        'Post-training follow-up',
      ],
      priceLabel: 'Investment',
      price: 'On quote',
      cta: 'Request a quote',
    },
    es: {
      eyebrow: 'A Medida',
      title: 'FORMACIÓN A MEDIDA',
      subtitle: 'Para empresas, equipos y grandes cuentas.',
      description:
        'Diseñamos un programa adaptado a su sector, su madurez digital, sus procesos internos y sus objetivos estratégicos.',
      examplesTitle: 'Ejemplos de misiones',
      examples: [
        'Formar un equipo comercial en social selling',
        'Estructurar un departamento de marketing interno',
        'Integrar la IA en los servicios de soporte',
        'Automatizar los procesos internos',
        'Formar a gerentes en optimización digital',
      ],
      methodTitle: 'Metodología',
      steps: [
        'Diagnóstico estratégico',
        'Auditoría de procesos existentes',
        'Diseño de un programa personalizado',
        'Formación operacional',
        'Seguimiento post-formación',
      ],
      priceLabel: 'Inversión',
      price: 'Bajo presupuesto',
      cta: 'Solicitar un presupuesto',
    },
  }

  const t = content[locale]

  const watermarkText = locale === 'es' ? 'A MEDIDA' : locale === 'en' ? 'CUSTOM' : 'SUR MESURE'

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F0F1E 0%, #1A1A2E 100%)',
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* OVERSIZED watermark text behind everything */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display text-[8rem] sm:text-[12rem] lg:text-[16rem] font-bold whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.02)' }}
        >
          {watermarkText}
        </span>
      </div>

      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)' }}
      />

      <div className="container-narrow relative">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-violet-400 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-gray-300 mb-4">
            {t.subtitle}
          </p>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-gray-400">
            {t.description}
          </p>
        </div>

        {/* Two columns - glass cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          {/* Examples card */}
          <div
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <h3 className="font-display text-xl font-semibold text-white tracking-tight mb-6">
              {t.examplesTitle}
            </h3>
            <ul className="space-y-4">
              {t.examples.map((example) => (
                <li key={example} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span className="text-gray-400 leading-relaxed">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology card - numbered timeline */}
          <div
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <h3 className="font-display text-xl font-semibold text-white tracking-tight mb-6">
              {t.methodTitle}
            </h3>
            <ol className="space-y-5 relative">
              {/* Connecting line */}
              <div
                className="absolute left-[13px] top-2 bottom-2 w-px"
                style={{
                  background: 'linear-gradient(to bottom, rgba(124,58,237,0.3), rgba(124,58,237,0.1))',
                }}
              />
              {t.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4 relative">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: 'rgba(124,58,237,0.2)',
                      border: '1px solid rgba(124,58,237,0.4)',
                    }}
                  >
                    <span className="text-xs font-bold text-violet-400">{i + 1}</span>
                  </div>
                  <span className="text-gray-400 leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Price & CTA */}
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
            {t.priceLabel}
          </p>
          <p
            className="font-display text-5xl sm:text-6xl font-semibold mb-8 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #D4AF37 0%, #F4E5B0 50%, #D4AF37 100%)',
            }}
          >
            {t.price}
          </p>
          <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="xl" icon={<ArrowIcon />}>
              {t.cta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
