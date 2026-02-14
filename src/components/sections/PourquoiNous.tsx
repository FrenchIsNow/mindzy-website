import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

const copy: Record<
  Locale,
  {
    eyebrow: string
    title: string
    subtitle: string
    blocks: {
      title: string
      description: string
      checks: [string, string, string, string]
    }[]
  }
> = {
  fr: {
    eyebrow: 'Pourquoi nous',
    title: 'Une approche centrée sur votre réalité',
    subtitle:
      'Aucun projet ne commence par une solution toute faite. Chaque projet commence par la compréhension de votre activité, de vos usages et de vos contraintes.',
    blocks: [
      {
        title: 'Des projets sur mesure, pas des produits',
        description:
          'Nous concevons des sites, applications et systèmes internes adaptés à des besoins simples comme complexes, sans chercher à faire rentrer votre projet dans un cadre pré-défini.',
        checks: [
          'Sur mesure fonctionnel et technique',
          'Évolutivité pensée dès le départ',
          'Du projet simple au système structuré',
          'Priorité à l\u2019usage réel',
        ],
      },
      {
        title: 'Un accompagnement humain et impliqué',
        description:
          'Chez Mindzy, vous n\u2019êtes pas un dossier de plus. Nous vous accompagnons, conseillons et ajustons le projet avec vous, à chaque étape.',
        checks: [
          'Interlocuteurs impliqués',
          'Échanges clairs et pédagogiques',
          'Conseils concrets, pas du jargon',
          'Présence avant, pendant et après',
        ],
      },
      {
        title: 'Une expertise SEO intégrée',
        description:
          'La visibilité n\u2019est pas un ajout, elle fait partie du projet. Le référencement est pensé dès la conception pour assurer une base saine et durable.',
        checks: [
          'Structure claire et lisible',
          'Contenus pensés pour le référencement',
          'Performance et vitesse optimisées',
          'Vision long terme, pas de recettes miracles',
        ],
      },
      {
        title: 'Des projets pensés pour durer',
        description:
          'Nous privilégions la stabilité, la clarté et la maintenabilité. L\u2019objectif : un projet qui reste pertinent et utilisable dans le temps.',
        checks: [
          'Projets fiables et robustes',
          'Faciles à faire évoluer',
          'Technologies maîtrisées',
          'Maintenance simplifiée',
        ],
      },
      {
        title: 'Une expérience cohérente sur tous les supports',
        description:
          'Chaque projet est conçu pour être fluide et cohérent, quel que soit l\u2019écran ou le contexte d\u2019utilisation.',
        checks: [
          'Responsive natif',
          'Mobile et desktop cohérents',
          'Performance maîtrisée',
          'Expérience claire et accessible',
        ],
      },
      {
        title: 'Analyse du besoin réel',
        description:
          'Nous ne partons jamais d\u2019un template ou d\u2019un process figé. Chaque projet commence par la compréhension de votre activité.',
        checks: [
          'Analyse du besoin réel',
          'Adaptation à votre métier',
          'Aucune solution standard imposée',
          'Vision court et long terme',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Why us',
    title: 'An approach centered on your reality',
    subtitle:
      'No project starts with a ready-made solution. Every project begins with understanding your business, your workflows, and your constraints.',
    blocks: [
      {
        title: 'Custom projects, not off-the-shelf products',
        description:
          'We design websites, applications, and internal systems tailored to needs both simple and complex, without forcing your project into a predefined framework.',
        checks: [
          'Functional and technical customization',
          'Scalability built in from the start',
          'From simple projects to structured systems',
          'Priority on real-world usage',
        ],
      },
      {
        title: 'Human and committed support',
        description:
          'At Mindzy, you are not just another file. We guide you, advise you, and adjust the project with you at every step.',
        checks: [
          'Dedicated contacts',
          'Clear and educational exchanges',
          'Concrete advice, not jargon',
          'Present before, during, and after',
        ],
      },
      {
        title: 'Built-in SEO expertise',
        description:
          'Visibility is not an add-on \u2014 it is part of the project. SEO is considered from the design phase to ensure a healthy and lasting foundation.',
        checks: [
          'Clear and readable structure',
          'Content designed for search engines',
          'Optimized performance and speed',
          'Long-term vision, no miracle recipes',
        ],
      },
      {
        title: 'Projects built to last',
        description:
          'We prioritize stability, clarity, and maintainability. The goal: a project that stays relevant and usable over time.',
        checks: [
          'Reliable and robust projects',
          'Easy to evolve',
          'Mastered technologies',
          'Simplified maintenance',
        ],
      },
      {
        title: 'A consistent experience across all devices',
        description:
          'Every project is designed to be fluid and consistent, regardless of screen or usage context.',
        checks: [
          'Native responsive design',
          'Consistent on mobile and desktop',
          'Controlled performance',
          'Clear and accessible experience',
        ],
      },
      {
        title: 'Real needs analysis',
        description:
          'We never start from a template or a rigid process. Every project begins with understanding your business.',
        checks: [
          'Real needs analysis',
          'Adapted to your industry',
          'No standard solution imposed',
          'Short and long-term vision',
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Por qué nosotros',
    title: 'Un enfoque centrado en tu realidad',
    subtitle:
      'Ningún proyecto comienza con una solución prefabricada. Cada proyecto comienza por comprender tu actividad, tus usos y tus limitaciones.',
    blocks: [
      {
        title: 'Proyectos a medida, no productos estándar',
        description:
          'Diseñamos sitios web, aplicaciones y sistemas internos adaptados a necesidades simples o complejas, sin encajar tu proyecto en un marco predefinido.',
        checks: [
          'Personalización funcional y técnica',
          'Escalabilidad pensada desde el inicio',
          'Del proyecto simple al sistema estructurado',
          'Prioridad al uso real',
        ],
      },
      {
        title: 'Un acompañamiento humano y comprometido',
        description:
          'En Mindzy, no eres un expediente más. Te acompañamos, asesoramos y ajustamos el proyecto contigo, en cada etapa.',
        checks: [
          'Interlocutores comprometidos',
          'Intercambios claros y pedagógicos',
          'Consejos concretos, sin jerga',
          'Presentes antes, durante y después',
        ],
      },
      {
        title: 'Experiencia SEO integrada',
        description:
          'La visibilidad no es un añadido, forma parte del proyecto. El posicionamiento se piensa desde el diseño para asegurar una base sólida y duradera.',
        checks: [
          'Estructura clara y legible',
          'Contenidos pensados para el posicionamiento',
          'Rendimiento y velocidad optimizados',
          'Visión a largo plazo, sin recetas milagrosas',
        ],
      },
      {
        title: 'Proyectos pensados para durar',
        description:
          'Priorizamos la estabilidad, la claridad y la mantenibilidad. El objetivo: un proyecto que siga siendo relevante y utilizable con el tiempo.',
        checks: [
          'Proyectos fiables y robustos',
          'Fáciles de evolucionar',
          'Tecnologías dominadas',
          'Mantenimiento simplificado',
        ],
      },
      {
        title: 'Una experiencia coherente en todos los soportes',
        description:
          'Cada proyecto está diseñado para ser fluido y coherente, sin importar la pantalla o el contexto de uso.',
        checks: [
          'Responsive nativo',
          'Coherente en móvil y escritorio',
          'Rendimiento controlado',
          'Experiencia clara y accesible',
        ],
      },
      {
        title: 'Análisis de la necesidad real',
        description:
          'Nunca partimos de una plantilla ni de un proceso rígido. Cada proyecto comienza por comprender tu actividad.',
        checks: [
          'Análisis de la necesidad real',
          'Adaptación a tu sector',
          'Ninguna solución estándar impuesta',
          'Visión a corto y largo plazo',
        ],
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  Icons (Heroicons outline style, 24x24)                            */
/* ------------------------------------------------------------------ */

function PuzzleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875S10.5 3.09 10.5 4.125c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.421 48.421 0 01-4.185-.428.652.652 0 00-.727.576 48.112 48.112 0 00-.343 5.066.648.648 0 00.564.682c.225.03.45.055.675.074a.64.64 0 01.59.69c-.02.344-.034.689-.034 1.035 0 .37.128.713.349 1.003.221.29.401.604.401.959 0 1.036-1.007 1.875-2.25 1.875s-2.25-.84-2.25-1.875c0-.355.18-.669.401-.959.221-.29.349-.634.349-1.003 0-.346-.013-.69-.034-1.035a.64.64 0 01.59-.69c.225-.02.45-.045.675-.074a.648.648 0 00.564-.682 48.112 48.112 0 00-.343-5.066.652.652 0 00-.727-.576 48.5 48.5 0 01-4.185.428A.64.64 0 013 6.087v0c0-.355.186-.676.401-.959C3.622 4.838 3.75 4.494 3.75 4.125 3.75 3.09 4.757 2.25 6 2.25s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959"
      />
    </svg>
  )
}

function HeartHandshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  )
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  )
}

function DevicesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"
      />
    </svg>
  )
}

function ClipboardAnalysisIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Block configuration                                               */
/* ------------------------------------------------------------------ */

const blocksMeta = [
  {
    icon: PuzzleIcon,
    colorClasses: {
      iconBg: 'bg-violet-50',
      iconText: 'text-violet-600',
      border: 'border-violet-100',
      gradient: 'from-violet-500 to-violet-600',
    },
  },
  {
    icon: HeartHandshakeIcon,
    colorClasses: {
      iconBg: 'bg-sage-50',
      iconText: 'text-sage-600',
      border: 'border-sage-100',
      gradient: 'from-sage-500 to-sage-600',
    },
  },
  {
    icon: MagnifyingGlassIcon,
    colorClasses: {
      iconBg: 'bg-gold-light/30',
      iconText: 'text-gold-dark',
      border: 'border-gold-light',
      gradient: 'from-gold-dark to-gold',
    },
  },
  {
    icon: ShieldCheckIcon,
    colorClasses: {
      iconBg: 'bg-rose-50',
      iconText: 'text-rose-500',
      border: 'border-rose-100',
      gradient: 'from-rose-400 to-rose-500',
    },
  },
  {
    icon: DevicesIcon,
    colorClasses: {
      iconBg: 'bg-sky-50',
      iconText: 'text-sky-600',
      border: 'border-sky-100',
      gradient: 'from-sky-500 to-sky-600',
    },
  },
  {
    icon: ClipboardAnalysisIcon,
    colorClasses: {
      iconBg: 'bg-amber-50',
      iconText: 'text-amber-600',
      border: 'border-amber-200',
      gradient: 'from-amber-500 to-orange-500',
    },
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function PourquoiNous({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <section className="py-16 bg-cream-50 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 -left-32 w-[420px] h-[420px] bg-violet-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-24 w-[360px] h-[360px] bg-sage-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-light/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Blocks grid: 1 col mobile, 2 cols lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.blocks.map((block, index) => {
            const meta = blocksMeta[index]
            const Icon = meta.icon

            return (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    'group rounded-2xl bg-white/70 backdrop-blur-sm border p-8 transition-all duration-300',
                    'hover:shadow-elevated hover:-translate-y-1',
                    meta.colorClasses.border
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110',
                      meta.colorClasses.iconBg,
                      meta.colorClasses.iconText
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-anthracite tracking-tight mb-3">
                    {block.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed mb-5">
                    {block.description}
                  </p>

                  {/* Checkmarks */}
                  <ul className="space-y-2.5">
                    {block.checks.map((check, ci) => (
                      <li key={ci} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                          <CheckIcon className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm text-gray-600 leading-snug">
                          {check}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative bottom line on hover */}
                  <div
                    className={cn(
                      'w-12 h-1 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300',
                      `bg-gradient-to-r ${meta.colorClasses.gradient}`
                    )}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
