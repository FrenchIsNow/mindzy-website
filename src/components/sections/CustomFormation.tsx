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
      title: 'FORMACION A MEDIDA',
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

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F0ECFF 50%, #F5F0FF 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute -top-10 right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(167,139,250,0.25)' }}
      />
      <div
        className="absolute bottom-10 -left-20 w-[400px] h-[400px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(147,197,253,0.2)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(253,164,175,0.15)', animationDelay: '4s' }}
      />

      <div className="container-narrow relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-violet-500 text-xs font-medium uppercase tracking-widest mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-[#1E1B4B] mb-4">
            {t.title}
          </h2>
          <p className="text-xl font-semibold tracking-tight leading-snug text-[#1E1B4B] mb-4">
            {t.subtitle}
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-500">
            {t.description}
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Examples card */}
          <div
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 p-6 lg:p-8 animate-fade-in-up transition-all duration-300 hover:bg-white/70 hover:shadow-lg"
            style={{ boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)' }}
          >
            <h3 className="font-display text-lg font-semibold text-[#1E1B4B] tracking-tight mb-6">
              {t.examplesTitle}
            </h3>
            <ul className="space-y-4">
              {t.examples.map((example) => (
                <li key={example} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-relaxed">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology card - numbered timeline */}
          <div
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 p-6 lg:p-8 animate-fade-in-up transition-all duration-300 hover:bg-white/70 hover:shadow-lg"
            style={{
              animationDelay: '0.1s',
              boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)',
            }}
          >
            <h3 className="font-display text-lg font-semibold text-[#1E1B4B] tracking-tight mb-6">
              {t.methodTitle}
            </h3>
            <ol className="space-y-5 relative">
              {/* Connecting line */}
              <div className="absolute left-[13px] top-2 bottom-2 w-px bg-violet-200/40" />
              {t.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center z-10 bg-violet-100/80 border border-violet-200/50">
                    <span className="text-xs font-bold text-violet-600">{i + 1}</span>
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
            {t.priceLabel}
          </p>
          <p className="font-display text-4xl font-semibold text-[#D4AF37] mb-8">
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
