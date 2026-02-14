import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { buildPageMetadata } from '@/lib/seo'

const aboutDescriptions: Record<string, string> = {
  fr: 'Découvrez Mindzy, l\'agence web nouvelle génération. Notre mission : aider les entrepreneurs à développer leur activité grâce à un site web professionnel.',
  en: 'Discover Mindzy, the next-gen web agency. Our mission: help entrepreneurs grow their business with a professional website.',
  es: 'Descubre Mindzy, la agencia web de nueva generación. Nuestra misión: ayudar a emprendedores a crecer con un sitio web profesional.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).about
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/about',
    title: t.title,
    description: aboutDescriptions[locale] || aboutDescriptions.fr,
  })
}

const teamMembers = [
  {
    name: 'Alexandre Martin',
    role: { fr: 'Fondateur & CEO', en: 'Founder & CEO', es: 'Fundador y CEO' },
    description: {
      fr: 'Passionné par le digital et le bien-être, Alexandre a créé Mindzy pour aider les thérapeutes à développer leur pratique.',
      en: 'Passionate about digital and wellness, Alexandre created Mindzy to help therapists grow their practice.',
      es: 'Apasionado por lo digital y el bienestar, Alexandre creó Mindzy para ayudar a los terapeutas a desarrollar su práctica.',
    },
    initials: 'AM',
  },
  {
    name: 'Sophie Dubois',
    role: { fr: 'Directrice Créative', en: 'Creative Director', es: 'Directora Creativa' },
    description: {
      fr: 'Designer expérimentée, Sophie crée des expériences visuelles uniques qui captent l\'essence de chaque praticien.',
      en: 'Experienced designer, Sophie creates unique visual experiences that capture each practitioner\'s essence.',
      es: 'Diseñadora experimentada, Sophie crea experiencias visuales únicas que capturan la esencia de cada practicante.',
    },
    initials: 'SD',
  },
  {
    name: 'Thomas Bernard',
    role: { fr: 'Lead Développeur', en: 'Lead Developer', es: 'Desarrollador Principal' },
    description: {
      fr: 'Expert en technologies web, Thomas s\'assure que chaque site soit performant, sécurisé et optimisé pour le SEO.',
      en: 'Web technology expert, Thomas ensures every site is performant, secure, and SEO optimized.',
      es: 'Experto en tecnologías web, Thomas se asegura de que cada sitio sea eficiente, seguro y optimizado para SEO.',
    },
    initials: 'TB',
  },
]

const milestones = [
  {
    year: '2022',
    title: { fr: 'Création de Mindzy', en: 'Mindzy Founded', es: 'Fundación de Mindzy' },
    description: {
      fr: 'Lancement de notre mission : démocratiser le web pour les thérapeutes.',
      en: 'Launch of our mission: democratizing the web for therapists.',
      es: 'Lanzamiento de nuestra misión: democratizar la web para terapeutas.',
    },
  },
  {
    year: '2023',
    title: { fr: '50 sites livrés', en: '50 sites delivered', es: '50 sitios entregados' },
    description: {
      fr: 'Cap symbolique franchi avec une satisfaction client de 98%.',
      en: 'Symbolic milestone reached with 98% client satisfaction.',
      es: 'Hito simbólico alcanzado con 98% de satisfacción del cliente.',
    },
  },
  {
    year: '2024',
    title: { fr: '150+ clients', en: '150+ clients', es: '150+ clientes' },
    description: {
      fr: 'Expansion en Suisse, France et Belgique avec une équipe de 8 personnes.',
      en: 'Expansion to Switzerland, France and Belgium with a team of 8.',
      es: 'Expansión a Suiza, Francia y Bélgica con un equipo de 8 personas.',
    },
  },
  {
    year: '2025',
    title: { fr: 'L\'avenir', en: 'The future', es: 'El futuro' },
    description: {
      fr: 'Nouvelles fonctionnalités IA et expansion européenne.',
      en: 'New AI features and European expansion.',
      es: 'Nuevas funciones de IA y expansión europea.',
    },
  },
]

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    color: 'sage',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: 'gold',
  },
]

const colorClasses = {
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', gradient: 'from-violet-500 to-violet-600' },
  sage: { bg: 'bg-sage-50', text: 'text-sage-600', gradient: 'from-sage-500 to-sage-600' },
  gold: { bg: 'bg-gold-light/30', text: 'text-gold-dark', gradient: 'from-gold-dark to-gold' },
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).about

  return (
    <div className="pt-28 lg:pt-32">
      {/* Hero section */}
      <section className="section-padding-sm bg-gradient-to-b from-cream-100 via-cream-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />

        <div className="container-narrow relative text-center">
          <span className="eyebrow mb-4 block">Notre histoire</span>
          <h1 className="heading-1 text-anthracite mb-6">{t.title}</h1>
          <p className="body-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Mission section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow mb-4 block">Notre mission</span>
              <h2 className="heading-2 text-anthracite mb-6">{t.mission.title}</h2>
              <p className="body-large text-gray-600 mb-6">{t.mission.description}</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {locale === 'fr'
                  ? 'Nous croyons que chaque thérapeute mérite une présence en ligne à la hauteur de son expertise. C\'est pourquoi nous avons développé une approche unique, combinant design haut de gamme, performance technique et accompagnement personnalisé.'
                  : locale === 'en'
                    ? 'We believe every therapist deserves an online presence that matches their expertise. That\'s why we\'ve developed a unique approach, combining premium design, technical performance, and personalized support.'
                    : 'Creemos que cada terapeuta merece una presencia en línea a la altura de su experiencia. Por eso hemos desarrollado un enfoque único, combinando diseño premium, rendimiento técnico y acompañamiento personalizado.'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <div className="font-display text-3xl font-semibold text-violet">150+</div>
                  <div className="text-sm text-gray-500">{locale === 'fr' ? 'Clients' : 'Clients'}</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-semibold text-violet">98%</div>
                  <div className="text-sm text-gray-500">{locale === 'fr' ? 'Satisfaction' : 'Satisfaction'}</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-semibold text-violet">3</div>
                  <div className="text-sm text-gray-500">{locale === 'fr' ? 'Pays' : 'Countries'}</div>
                </div>
              </div>
            </div>

            {/* Decorative visual */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-violet-100 via-cream-100 to-sage-100 rounded-3xl relative overflow-hidden">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-dots opacity-50" />

                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft flex items-center justify-center animate-float">
                  <div className="text-4xl">💜</div>
                </div>
                <div className="absolute bottom-12 right-8 w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-4xl">🌿</div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <div className="text-5xl">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="section-padding bg-cream-50">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Ce qui nous guide</span>
            <h2 className="heading-2 text-anthracite mb-4">{t.values.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((v, i) => {
              const valueData = values[i]
              const colors = colorClasses[valueData.color as keyof typeof colorClasses]

              return (
                <Card
                  key={i}
                  variant="glass"
                  className="text-center group hover:shadow-elevated transition-all duration-500"
                >
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300',
                    colors.bg,
                    colors.text,
                    'group-hover:scale-110'
                  )}>
                    {valueData.icon}
                  </div>
                  <CardTitle className="text-lg mb-3">{v.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{v.description}</CardDescription>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Notre parcours</span>
            <h2 className="heading-2 text-anthracite mb-4">
              {locale === 'fr' ? 'L\'histoire de Mindzy' : locale === 'en' ? 'The Mindzy story' : 'La historia de Mindzy'}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet via-sage to-gold" />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={cn(
                    'relative pl-12 md:pl-0 md:w-1/2',
                    index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                  )}
                >
                  {/* Dot */}
                  <div className={cn(
                    'absolute top-0 w-8 h-8 rounded-full bg-white border-4 flex items-center justify-center',
                    'left-0 md:left-auto',
                    index % 2 === 0 ? 'md:-right-4' : 'md:-left-4',
                    index === 0 && 'border-violet',
                    index === 1 && 'border-sage-500',
                    index === 2 && 'border-gold',
                    index === 3 && 'border-violet-400',
                  )}>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      index === 0 && 'bg-violet',
                      index === 1 && 'bg-sage-500',
                      index === 2 && 'bg-gold',
                      index === 3 && 'bg-violet-400',
                    )} />
                  </div>

                  {/* Content */}
                  <Card variant="default" hover className={cn(index % 2 === 0 ? 'md:text-right' : '')}>
                    <div className={cn(
                      'inline-block px-3 py-1 rounded-full text-sm font-bold mb-3',
                      index === 0 && 'bg-violet-50 text-violet',
                      index === 1 && 'bg-sage-50 text-sage-600',
                      index === 2 && 'bg-gold-light/30 text-gold-dark',
                      index === 3 && 'bg-violet-50 text-violet-400',
                    )}>
                      {milestone.year}
                    </div>
                    <CardTitle className="text-lg mb-2">{milestone.title[locale as Locale]}</CardTitle>
                    <CardDescription>{milestone.description[locale as Locale]}</CardDescription>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section-padding bg-gradient-to-b from-cream-50 to-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">L'équipe</span>
            <h2 className="heading-2 text-anthracite mb-4">
              {locale === 'fr' ? 'Les visages derrière Mindzy' : locale === 'en' ? 'The faces behind Mindzy' : 'Las caras detrás de Mindzy'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                variant="default"
                hover
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Avatar */}
                <div className={cn(
                  'w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-white font-display text-2xl font-semibold',
                  index === 0 && 'bg-gradient-to-br from-violet-400 to-violet-600',
                  index === 1 && 'bg-gradient-to-br from-sage-400 to-sage-600',
                  index === 2 && 'bg-gradient-to-br from-gold-dark to-gold',
                )}>
                  {member.initials}
                </div>

                <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                <p className="text-violet text-sm font-medium mb-3">{member.role[locale as Locale]}</p>
                <CardDescription className="text-sm">{member.description[locale as Locale]}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-anthracite text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-800/10 rounded-full blur-3xl" />
        </div>

        <div className="container-narrow relative text-center">
          <h2 className="heading-2 mb-6">
            {locale === 'fr' ? 'Prêt à nous rejoindre ?' : locale === 'en' ? 'Ready to join us?' : '¿Listo para unirte a nosotros?'}
          </h2>
          <p className="body-large text-gray-400 mb-10 max-w-xl mx-auto">
            {locale === 'fr'
              ? 'Rejoignez plus de 150 thérapeutes qui ont transformé leur présence en ligne.'
              : locale === 'en'
                ? 'Join over 150 therapists who have transformed their online presence.'
                : 'Únete a más de 150 terapeutas que han transformado su presencia en línea.'}
          </p>
          <Link href={`/${locale}/diagnostic`}>
            <Button variant="primary" size="xl" icon={<ArrowIcon />}>
              {getMessages(locale as Locale).hero.cta}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
