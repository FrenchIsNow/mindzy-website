import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { TrackedLink } from '@/components/ui/TrackedLink'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const sectionCopy = {
  fr: {
    eyebrow: 'Votre situation',
    title: 'À chaque besoin, une approche adaptée',
    subtitle:
      'Sites, applications, systèmes internes : Mindzy accompagne la création de projets sur mesure, du simple besoin aux structures complexes.',
    cta: 'En savoir plus',
  },
  en: {
    eyebrow: 'Your situation',
    title: 'A tailored approach for every need',
    subtitle:
      'Websites, applications, internal systems: Mindzy supports the creation of custom projects, from simple needs to complex structures.',
    cta: 'Learn more',
  },
  es: {
    eyebrow: 'Tu situación',
    title: 'Un enfoque adaptado a cada necesidad',
    subtitle:
      'Sitios web, aplicaciones, sistemas internos: Mindzy acompaña la creación de proyectos a medida, desde necesidades simples hasta estructuras complejas.',
    cta: 'Saber más',
  },
}

const cards = [
  {
    id: 'launch',
    title: {
      fr: 'Je démarre mon activité',
      en: 'I\'m starting my business',
      es: 'Estoy empezando mi actividad',
    },
    subtitle: {
      fr: 'Je construis les bases',
      en: 'I\'m building the foundations',
      es: 'Estoy construyendo las bases',
    },
    description: {
      fr: 'Je lance mon activité et j\'ai besoin d\'un projet clair et professionnel pour poser des bases solides et crédibles dès le départ.',
      en: 'I\'m launching my business and need a clear, professional project to build solid and credible foundations from the start.',
      es: 'Estoy lanzando mi actividad y necesito un proyecto claro y profesional para establecer bases sólidas y creíbles desde el principio.',
    },
    gradient: 'from-violet-500 to-violet-600',
    bgGradient: 'from-violet-50 to-violet-100/50',
    iconBg: 'bg-violet-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    id: 'evolve',
    title: {
      fr: 'J\'ai déjà un projet en place',
      en: 'I already have a project in place',
      es: 'Ya tengo un proyecto en marcha',
    },
    subtitle: {
      fr: 'Je fais évoluer l\'existant',
      en: 'I\'m evolving what exists',
      es: 'Hago evolucionar lo existente',
    },
    description: {
      fr: 'Mon site ou mon système ne correspond plus à mon activité actuelle. Je veux le faire évoluer, l\'améliorer ou le repenser.',
      en: 'My website or system no longer matches my current business. I want to evolve it, improve it, or rethink it.',
      es: 'Mi sitio o sistema ya no corresponde a mi actividad actual. Quiero hacerlo evolucionar, mejorarlo o repensarlo.',
    },
    gradient: 'from-sage-500 to-sage-600',
    bgGradient: 'from-sage-50 to-sage-100/50',
    iconBg: 'bg-sage-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: 'simplify',
    title: {
      fr: 'Je veux simplifier mon fonctionnement',
      en: 'I want to simplify how I work',
      es: 'Quiero simplificar mi funcionamiento',
    },
    subtitle: {
      fr: 'Je structure mon quotidien',
      en: 'I\'m structuring my daily work',
      es: 'Estructuro mi día a día',
    },
    description: {
      fr: 'Je perds du temps avec des process manuels ou dispersés. J\'ai besoin d\'un système plus fluide et mieux organisé.',
      en: 'I\'m wasting time with manual or scattered processes. I need a smoother, better-organized system.',
      es: 'Pierdo tiempo con procesos manuales o dispersos. Necesito un sistema más fluido y mejor organizado.',
    },
    gradient: 'from-gold-dark to-gold',
    bgGradient: 'from-gold-light/30 to-gold-light/10',
    iconBg: 'bg-gold-light/50',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: 'grow',
    title: {
      fr: 'Je développe mon activité',
      en: 'I\'m growing my business',
      es: 'Estoy desarrollando mi actividad',
    },
    subtitle: {
      fr: 'Je passe à l\'étape suivante',
      en: 'I\'m moving to the next level',
      es: 'Paso a la siguiente etapa',
    },
    description: {
      fr: 'Je souhaite aller plus loin avec mon projet : vendre en ligne, centraliser des usages ou accompagner une montée en charge.',
      en: 'I want to take my project further: sell online, centralize uses, or support scaling up.',
      es: 'Quiero ir más lejos con mi proyecto: vender en línea, centralizar usos o acompañar un crecimiento.',
    },
    gradient: 'from-rose-400 to-rose-500',
    bgGradient: 'from-rose-50 to-rose-100/50',
    iconBg: 'bg-rose-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    id: 'custom',
    title: {
      fr: 'J\'ai un besoin spécifique',
      en: 'I have a specific need',
      es: 'Tengo una necesidad específica',
    },
    subtitle: {
      fr: 'Projet sur mesure',
      en: 'Custom project',
      es: 'Proyecto a medida',
    },
    description: {
      fr: 'Application, plateforme, système interne ou projet complexe : j\'ai un besoin précis qui nécessite une approche sur mesure.',
      en: 'Application, platform, internal system, or complex project: I have a precise need that requires a custom approach.',
      es: 'Aplicación, plataforma, sistema interno o proyecto complejo: tengo una necesidad precisa que requiere un enfoque a medida.',
    },
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-100/50',
    iconBg: 'bg-cyan-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: 'training',
    title: {
      fr: 'J\'ai besoin d\'être formé',
      en: 'I need training',
      es: 'Necesito formación',
    },
    subtitle: {
      fr: 'Je monte en compétence',
      en: 'I\'m building my skills',
      es: 'Mejoro mis competencias',
    },
    description: {
      fr: 'Je veux mieux comprendre et utiliser le digital dans mon activité : réseaux sociaux, usages de l\'IA, optimisation de mes pratiques ou accompagnement ciblé.',
      en: 'I want to better understand and use digital tools in my business: social media, AI usage, optimizing my practices, or targeted support.',
      es: 'Quiero comprender y utilizar mejor lo digital en mi actividad: redes sociales, usos de la IA, optimización de mis prácticas o acompañamiento específico.',
    },
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-100/50',
    iconBg: 'bg-amber-100',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
]

export function UseCaseCards({ locale }: { locale: Locale }) {
  const t = sectionCopy[locale]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="container-wide relative">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <TrackedLink
              key={card.id}
              href={`/${locale}/diagnostic`}
              trackEvent={`usecase_${card.id}`}
              trackLocation="use_case_cards"
              className="block group"
            >
              <Card
                variant="default"
                hover
                className={cn('h-full relative overflow-hidden', 'animate-fade-in-up')}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    `bg-gradient-to-br ${card.bgGradient}`
                  )}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300',
                        card.iconBg,
                        'text-gray-700 group-hover:scale-110'
                      )}
                    >
                      {card.icon}
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white',
                        `bg-gradient-to-br ${card.gradient}`
                      )}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <CardTitle className="mb-1 group-hover:text-anthracite transition-colors">
                    {card.title[locale]}
                  </CardTitle>
                  <p
                    className={cn(
                      'text-sm font-medium mb-3',
                      `bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`
                    )}
                  >
                    {card.subtitle[locale]}
                  </p>
                  <CardDescription className="mb-5">
                    {card.description[locale]}
                  </CardDescription>

                  <span
                    className={cn(
                      'inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300',
                      `bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`
                    )}
                  >
                    {t.cta}
                    <svg
                      className="w-4 h-4 text-violet group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>

                <div
                  className={cn(
                    'absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 transition-all duration-500',
                    `bg-gradient-to-br ${card.gradient}`,
                    'group-hover:scale-150 group-hover:opacity-20'
                  )}
                />
              </Card>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  )
}
