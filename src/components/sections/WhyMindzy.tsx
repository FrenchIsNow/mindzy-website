import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const translations = {
  eyebrow: {
    fr: 'Nos engagements',
    en: 'Our commitments',
    es: 'Nuestros compromisos',
  },
  title: {
    fr: 'Ce qui fait la différence',
    en: 'What makes the difference',
    es: 'Lo que marca la diferencia',
  },
}

const valuePropositions = [
  {
    key: 'bespoke',
    title: {
      fr: 'Une approche sur mesure',
      en: 'A tailored approach',
      es: 'Un enfoque a medida',
    },
    description: {
      fr: 'Chaque projet est pensé selon votre activité, vos usages et vos objectifs. Pas de modèle standard, pas de solution toute faite.',
      en: 'Every project is designed around your activity, your workflows, and your goals. No standard template, no off-the-shelf solution.',
      es: 'Cada proyecto se diseña en función de su actividad, sus usos y sus objetivos. Sin plantillas estándar, sin soluciones prefabricadas.',
    },
    color: 'violet' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2" />
      </svg>
    ),
  },
  {
    key: 'support',
    title: {
      fr: 'Un accompagnement & suivi humain',
      en: 'Human support & follow-up',
      es: 'Acompañamiento y seguimiento humano',
    },
    description: {
      fr: 'Nous prenons le temps de comprendre votre besoin, de vous conseiller et de vous accompagner à chaque étape du projet.',
      en: 'We take the time to understand your needs, advise you, and support you at every stage of the project.',
      es: 'Nos tomamos el tiempo de entender sus necesidades, asesorarle y acompañarle en cada etapa del proyecto.',
    },
    color: 'sage' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    key: 'seo',
    title: {
      fr: 'Une expertise SEO intégrée',
      en: 'Built-in SEO expertise',
      es: 'Experiencia SEO integrada',
    },
    description: {
      fr: 'Le référencement est intégré dès la conception du projet : structure, contenus et performance sont pensés pour une visibilité durable sur les moteurs de recherche.',
      en: 'SEO is built in from the very start of the project: structure, content, and performance are all designed for lasting visibility on search engines.',
      es: 'El posicionamiento se integra desde el inicio del proyecto: estructura, contenidos y rendimiento están pensados para una visibilidad duradera en los motores de búsqueda.',
    },
    color: 'gold' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    key: 'durable',
    title: {
      fr: 'Des projets utiles et durables',
      en: 'Useful and lasting projects',
      es: 'Proyectos útiles y duraderos',
    },
    description: {
      fr: 'Nous concevons des projets clairs, fiables et pensés pour évoluer, qu\'ils soient simples ou complexes.',
      en: 'We build clear, reliable projects designed to evolve, whether simple or complex.',
      es: 'Diseñamos proyectos claros, fiables y pensados para evolucionar, ya sean simples o complejos.',
    },
    color: 'rose' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    key: 'turnkey',
    title: {
      fr: 'Solution Clé en main',
      en: 'Turnkey solution',
      es: 'Solución llave en mano',
    },
    description: {
      fr: 'Nous gérons tout : design, textes, SEO, mise en ligne, maintenance.',
      en: 'We handle everything: design, copy, SEO, launch, and maintenance.',
      es: 'Nos encargamos de todo: diseño, textos, SEO, puesta en línea y mantenimiento.',
    },
    color: 'cyan' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
]

const colorClasses = {
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    gradient: 'from-violet-500 to-violet-600',
    border: 'border-violet-100',
  },
  sage: {
    bg: 'bg-sage-50',
    text: 'text-sage-600',
    gradient: 'from-sage-500 to-sage-600',
    border: 'border-sage-100',
  },
  gold: {
    bg: 'bg-gold-light/30',
    text: 'text-gold-dark',
    gradient: 'from-gold-dark to-gold',
    border: 'border-gold-light',
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-500',
    gradient: 'from-rose-400 to-rose-500',
    border: 'border-rose-100',
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600',
    border: 'border-cyan-100',
  },
}

export function WhyMindzy({ locale }: { locale: Locale }) {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-cream-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/40 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{translations.eyebrow[locale]}</span>
          <h2 className="heading-2 text-anthracite mb-4">{translations.title[locale]}</h2>
        </div>

        {/* Value propositions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {valuePropositions.map((vp, index) => {
            const colors = colorClasses[vp.color]
            return (
              <div
                key={vp.key}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card variant="glass" className="h-full text-center group hover:shadow-elevated transition-all duration-500">
                  {/* Icon container */}
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300',
                    colors.bg,
                    colors.text,
                    'group-hover:scale-110 group-hover:shadow-lg'
                  )}>
                    {vp.icon}
                  </div>

                  {/* Content */}
                  <CardTitle className="text-lg mb-3">{vp.title[locale]}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {vp.description[locale]}
                  </CardDescription>

                  {/* Decorative line */}
                  <div className={cn(
                    'w-12 h-1 mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300',
                    `bg-gradient-to-r ${colors.gradient}`
                  )} />
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
