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
    <section className="bg-white py-24 lg:py-32">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-violet-600 text-xs font-medium uppercase tracking-widest mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl font-semibold tracking-tight leading-snug text-gray-700 mb-4">
            {t.subtitle}
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-500">
            {t.description}
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Examples card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
            <h3 className="font-display text-lg font-semibold text-gray-900 tracking-tight mb-6">
              {t.examplesTitle}
            </h3>
            <ul className="space-y-4">
              {t.examples.map((example) => (
                <li key={example} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-relaxed">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology card - numbered timeline */}
          <div
            className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
            style={{ animationDelay: '0.1s' }}
          >
            <h3 className="font-display text-lg font-semibold text-gray-900 tracking-tight mb-6">
              {t.methodTitle}
            </h3>
            <ol className="space-y-5 relative">
              {/* Connecting line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
              {t.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center z-10 bg-violet-50">
                    <span className="text-xs font-bold text-violet-600">{i + 1}</span>
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
            {t.priceLabel}
          </p>
          <p className="font-display text-4xl font-semibold text-gray-900 mb-8">
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
