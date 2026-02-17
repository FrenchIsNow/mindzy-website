import { Card } from '@/components/ui/Card'
import { Button, ArrowIcon, CheckIcon } from '@/components/ui/Button'
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

  return (
    <section className="section-padding relative overflow-hidden bg-cream-50/50">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl" />

      <div className="container-narrow relative">
        <Card variant="gradient" padding="lg" className="animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="eyebrow mb-4 block">{t.eyebrow}</span>
            <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
            <p className="heading-4 text-gray-600 mb-4">{t.subtitle}</p>
            <p className="body-large max-w-2xl mx-auto">{t.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Examples */}
            <div>
              <h3 className="heading-4 text-anthracite mb-5">{t.examplesTitle}</h3>
              <ul className="space-y-4">
                {t.examples.map((example) => (
                  <li key={example} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckIcon className="text-violet" />
                    </div>
                    <span className="text-gray-700">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Methodology */}
            <div>
              <h3 className="heading-4 text-anthracite mb-5">{t.methodTitle}</h3>
              <ol className="space-y-4">
                {t.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    <span className="text-gray-700 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-2">{t.priceLabel}</p>
            <p className="font-display text-3xl font-semibold text-anthracite mb-6">{t.price}</p>
            <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="xl" icon={<ArrowIcon />}>
                {t.cta}
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}
