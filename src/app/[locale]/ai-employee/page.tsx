import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FeaturedPortfolio } from '@/components/sections/FeaturedPortfolio'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const pageMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy AI Employé | Transformez votre entreprise avec l\'IA',
    description: 'Automatisez les tâches répétitives, boostez la productivité de vos équipes et prenez une longueur d\'avance sur la concurrence grâce aux agents IA Mindzy.',
  },
  en: {
    title: 'Mindzy AI Employee | Transform your company with AI',
    description: 'Automate repetitive tasks, boost your team\'s productivity, and gain a competitive edge with Mindzy\'s AI agents.',
  },
  es: {
    title: 'Mindzy AI Empleado | Transforma tu empresa con IA',
    description: 'Automatiza las tareas repetitivas, impulsa la productividad de tu equipo y gana ventaja competitiva con los agentes de IA de Mindzy.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = pageMeta[locale] || pageMeta.fr
  return buildPageMetadata({ locale: locale as Locale, path: '/ai-employee', title: t.title, description: t.description })
}

export default async function AIEmployeePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = locale as Locale

  const content = {
    fr: {
      hero: {
        badge: 'Révolution IA en entreprise',
        title: 'L\'Employé IA qui donne à votre entreprise',
        titleHighlight: 'une longueur d\'avance',
        subtitle: 'Automatisez les tâches répétitives, libérez le potentiel de vos équipes et accélérez votre croissance grâce à des agents IA sur mesure, disponibles 24h/24.',
        cta: 'Rejoindre la liste d\'attente',
        ctaSecondary: 'Voir nos réalisations',
        stats: [
          { value: '10×', label: 'Plus rapide sur les tâches répétitives' },
          { value: '80%', label: 'Des tâches non créatrices de valeur automatisées' },
          { value: '24/7', label: 'Disponibilité sans congés ni arrêts' },
        ],
      },
      pain: {
        eyebrow: 'Le problème',
        title: 'Vos équipes méritent mieux que des tâches sans valeur',
        subtitle: 'Chaque jour, vos collaborateurs passent des heures sur des actions répétitives qui freinent leur productivité et votre croissance.',
        points: [
          {
            icon: '⏱',
            title: 'Du temps perdu à la chaîne',
            description: 'Emails, rapports, relances clients, saisies manuelles : vos équipes s\'épuisent sur des tâches qui pourraient être entièrement automatisées.',
          },
          {
            icon: '📉',
            title: 'Des processus qui ralentissent tout',
            description: 'Validations, transferts d\'informations, copies de données entre outils : chaque étape manuelle est un frein à votre compétitivité.',
          },
          {
            icon: '🔄',
            title: 'Les talents humains sous-exploités',
            description: 'Vos meilleurs éléments passent 60% de leur temps sur des tâches répétitives au lieu de se concentrer sur l\'innovation et la stratégie.',
          },
        ],
      },
      benefits: {
        eyebrow: 'Ce que l\'IA change',
        title: 'Un employé IA qui prend en charge l\'essentiel',
        subtitle: 'Nos agents IA traitent en temps réel les tâches à faible valeur ajoutée, permettant à vos équipes de se concentrer sur ce qui compte vraiment.',
        items: [
          {
            icon: '✉️',
            title: 'Gestion des emails & communications',
            description: 'Tri automatique, réponses intelligentes, relances clients et synthèses de conversations — sans intervention humaine.',
          },
          {
            icon: '📊',
            title: 'Rapports & analyses automatisés',
            description: 'Génération de rapports, tableaux de bord mis à jour en temps réel et synthèses exécutives prêtes en quelques secondes.',
          },
          {
            icon: '🎯',
            title: 'Qualification & relance commerciale',
            description: 'Identification des prospects chauds, relances automatisées et scoring de leads pour que votre équipe vente se concentre sur la conversion.',
          },
          {
            icon: '🤝',
            title: 'Support client 24/7',
            description: 'Réponses instantanées aux questions fréquentes, escalade intelligente vers l\'humain et suivi des tickets sans délai.',
          },
          {
            icon: '⚙️',
            title: 'Automatisation des workflows internes',
            description: 'Connexion de vos outils, transferts de données, validations et notifications automatiques entre vos équipes.',
          },
          {
            icon: '📋',
            title: 'Veille & synthèses stratégiques',
            description: 'Surveillance de votre marché, résumés des actualités sectorielles et alertes concurrentielles livrées directement à votre direction.',
          },
        ],
      },
      useCases: {
        eyebrow: 'Pour chaque département',
        title: 'L\'IA s\'adapte à votre organisation',
        subtitle: 'Chaque service de votre entreprise peut bénéficier d\'agents IA dédiés, calibrés sur vos processus spécifiques.',
        departments: [
          {
            name: 'Finance & Comptabilité',
            color: 'from-violet-500 to-violet-700',
            tasks: ['Réconciliation automatique', 'Reporting mensuel', 'Suivi des factures', 'Alertes d\'anomalies'],
          },
          {
            name: 'Marketing & Communication',
            color: 'from-rose-400 to-rose-600',
            tasks: ['Création de contenu', 'Veille concurrentielle', 'Analyse des performances', 'Planification éditoriale'],
          },
          {
            name: 'Ressources Humaines',
            color: 'from-sage-500 to-sage-700',
            tasks: ['Tri des candidatures', 'Onboarding automatisé', 'Suivi des formations', 'Enquêtes collaborateurs'],
          },
          {
            name: 'Direction & Stratégie',
            color: 'from-gold to-gold-dark',
            tasks: ['Synthèses décisionnelles', 'Tableaux de bord', 'Suivi des OKRs', 'Veille sectorielle'],
          },
        ],
      },
      howItWorks: {
        eyebrow: 'Comment ça marche',
        title: 'Déployé en 3 étapes, opérationnel en jours',
        steps: [
          {
            number: '01',
            title: 'Audit de vos processus',
            description: 'Nos experts analysent vos flux de travail actuels pour identifier les tâches à plus fort potentiel d\'automatisation.',
          },
          {
            number: '02',
            title: 'Configuration des agents IA',
            description: 'Nous configurons des agents IA calibrés sur vos outils, votre vocabulaire métier et vos processus spécifiques.',
          },
          {
            number: '03',
            title: 'Vos équipes se concentrent sur l\'essentiel',
            description: 'Libérés des tâches répétitives, vos collaborateurs peuvent enfin se consacrer à la création de valeur et à l\'innovation.',
          },
        ],
      },
      cta: {
        eyebrow: 'Prêt à transformer votre entreprise ?',
        title: 'Soyez parmi les premiers à adopter l\'IA employé',
        subtitle: 'Rejoignez la liste d\'attente pour accéder en avant-première à la plateforme Mindzy AI et transformer la façon dont votre entreprise travaille.',
        primary: 'Rejoindre la liste d\'attente',
        secondary: 'En savoir plus',
      },
    },
    en: {
      hero: {
        badge: 'AI revolution in business',
        title: 'The AI Employee that gives your company',
        titleHighlight: 'a competitive edge',
        subtitle: 'Automate repetitive tasks, unlock your team\'s full potential, and accelerate your growth with custom AI agents available 24/7.',
        cta: 'Join the waitlist',
        ctaSecondary: 'View our work',
        stats: [
          { value: '10×', label: 'Faster on repetitive tasks' },
          { value: '80%', label: 'Of low-value tasks automated' },
          { value: '24/7', label: 'Availability with no breaks' },
        ],
      },
      pain: {
        eyebrow: 'The problem',
        title: 'Your teams deserve better than low-value tasks',
        subtitle: 'Every day, your employees spend hours on repetitive actions that slow down their productivity and your growth.',
        points: [
          {
            icon: '⏱',
            title: 'Time lost on a daily basis',
            description: 'Emails, reports, customer follow-ups, manual data entry: your teams burn out on tasks that could be fully automated.',
          },
          {
            icon: '📉',
            title: 'Processes that slow everything down',
            description: 'Approvals, information transfers, copy-pasting between tools: every manual step is a drag on your competitiveness.',
          },
          {
            icon: '🔄',
            title: 'Human talent underutilized',
            description: 'Your best people spend 60% of their time on repetitive tasks instead of focusing on innovation and strategy.',
          },
        ],
      },
      benefits: {
        eyebrow: 'What AI changes',
        title: 'An AI employee that handles the essentials',
        subtitle: 'Our AI agents process low-value tasks in real time, allowing your teams to focus on what truly matters.',
        items: [
          {
            icon: '✉️',
            title: 'Email & communications management',
            description: 'Automatic sorting, smart replies, customer follow-ups and conversation summaries — without human intervention.',
          },
          {
            icon: '📊',
            title: 'Automated reports & analytics',
            description: 'Report generation, real-time dashboards and executive summaries ready in seconds.',
          },
          {
            icon: '🎯',
            title: 'Lead qualification & follow-up',
            description: 'Identify hot prospects, automated follow-ups, and lead scoring so your sales team focuses on closing deals.',
          },
          {
            icon: '🤝',
            title: '24/7 customer support',
            description: 'Instant answers to common questions, smart escalation to humans, and ticket tracking without delay.',
          },
          {
            icon: '⚙️',
            title: 'Internal workflow automation',
            description: 'Connect your tools, automate data transfers, validations and notifications between your teams.',
          },
          {
            icon: '📋',
            title: 'Market intelligence & strategic summaries',
            description: 'Market monitoring, industry news summaries and competitive alerts delivered directly to your leadership.',
          },
        ],
      },
      useCases: {
        eyebrow: 'For every department',
        title: 'AI adapts to your organization',
        subtitle: 'Every department in your company can benefit from dedicated AI agents, calibrated to your specific processes.',
        departments: [
          {
            name: 'Finance & Accounting',
            color: 'from-violet-500 to-violet-700',
            tasks: ['Automatic reconciliation', 'Monthly reporting', 'Invoice tracking', 'Anomaly alerts'],
          },
          {
            name: 'Marketing & Communications',
            color: 'from-rose-400 to-rose-600',
            tasks: ['Content creation', 'Competitive intelligence', 'Performance analysis', 'Editorial planning'],
          },
          {
            name: 'Human Resources',
            color: 'from-sage-500 to-sage-700',
            tasks: ['Application screening', 'Automated onboarding', 'Training tracking', 'Employee surveys'],
          },
          {
            name: 'Leadership & Strategy',
            color: 'from-gold to-gold-dark',
            tasks: ['Decision summaries', 'Dashboards', 'OKR tracking', 'Industry intelligence'],
          },
        ],
      },
      howItWorks: {
        eyebrow: 'How it works',
        title: 'Deployed in 3 steps, operational in days',
        steps: [
          {
            number: '01',
            title: 'Process audit',
            description: 'Our experts analyze your current workflows to identify the tasks with the highest automation potential.',
          },
          {
            number: '02',
            title: 'AI agent configuration',
            description: 'We configure AI agents calibrated to your tools, business vocabulary, and specific processes.',
          },
          {
            number: '03',
            title: 'Your teams focus on what matters',
            description: 'Free from repetitive tasks, your employees can finally dedicate themselves to creating value and driving innovation.',
          },
        ],
      },
      cta: {
        eyebrow: 'Ready to transform your company?',
        title: 'Be among the first to adopt AI employees',
        subtitle: 'Join the waitlist for early access to the Mindzy AI platform and transform the way your company works.',
        primary: 'Join the waitlist',
        secondary: 'Learn more',
      },
    },
    es: {
      hero: {
        badge: 'Revolución IA en empresas',
        title: 'El Empleado IA que da a tu empresa',
        titleHighlight: 'una ventaja competitiva',
        subtitle: 'Automatiza las tareas repetitivas, desbloquea el potencial de tu equipo y acelera tu crecimiento con agentes de IA personalizados disponibles 24/7.',
        cta: 'Unirse a la lista de espera',
        ctaSecondary: 'Ver nuestros proyectos',
        stats: [
          { value: '10×', label: 'Más rápido en tareas repetitivas' },
          { value: '80%', label: 'Tareas de bajo valor automatizadas' },
          { value: '24/7', label: 'Disponibilidad sin interrupciones' },
        ],
      },
      pain: {
        eyebrow: 'El problema',
        title: 'Tus equipos merecen más que tareas sin valor',
        subtitle: 'Cada día, tus empleados pasan horas en acciones repetitivas que frenan su productividad y tu crecimiento.',
        points: [
          {
            icon: '⏱',
            title: 'Tiempo perdido a diario',
            description: 'Emails, informes, seguimientos de clientes, entradas de datos manuales: tus equipos se agotan en tareas que podrían automatizarse por completo.',
          },
          {
            icon: '📉',
            title: 'Procesos que ralentizan todo',
            description: 'Aprobaciones, transferencias de información, copias entre herramientas: cada paso manual frena tu competitividad.',
          },
          {
            icon: '🔄',
            title: 'Talento humano desaprovechado',
            description: 'Tus mejores empleados pasan el 60% del tiempo en tareas repetitivas en lugar de enfocarse en la innovación y la estrategia.',
          },
        ],
      },
      benefits: {
        eyebrow: 'Lo que cambia la IA',
        title: 'Un empleado IA que se encarga de lo esencial',
        subtitle: 'Nuestros agentes de IA procesan en tiempo real las tareas de bajo valor añadido, permitiendo a tus equipos concentrarse en lo que realmente importa.',
        items: [
          {
            icon: '✉️',
            title: 'Gestión de emails y comunicaciones',
            description: 'Clasificación automática, respuestas inteligentes, seguimientos de clientes y resúmenes de conversaciones — sin intervención humana.',
          },
          {
            icon: '📊',
            title: 'Informes y análisis automatizados',
            description: 'Generación de informes, dashboards en tiempo real y resúmenes ejecutivos listos en segundos.',
          },
          {
            icon: '🎯',
            title: 'Cualificación y seguimiento comercial',
            description: 'Identificación de prospectos calientes, seguimientos automatizados y scoring de leads para que tu equipo de ventas se centre en cerrar.',
          },
          {
            icon: '🤝',
            title: 'Soporte al cliente 24/7',
            description: 'Respuestas instantáneas a preguntas frecuentes, escalado inteligente a humanos y seguimiento de tickets sin demora.',
          },
          {
            icon: '⚙️',
            title: 'Automatización de flujos internos',
            description: 'Conecta tus herramientas, automatiza transferencias de datos, validaciones y notificaciones entre tus equipos.',
          },
          {
            icon: '📋',
            title: 'Inteligencia de mercado y resúmenes estratégicos',
            description: 'Monitoreo del mercado, resúmenes de noticias del sector y alertas competitivas entregadas directamente a tu dirección.',
          },
        ],
      },
      useCases: {
        eyebrow: 'Para cada departamento',
        title: 'La IA se adapta a tu organización',
        subtitle: 'Cada departamento de tu empresa puede beneficiarse de agentes de IA dedicados, calibrados en tus procesos específicos.',
        departments: [
          {
            name: 'Finanzas & Contabilidad',
            color: 'from-violet-500 to-violet-700',
            tasks: ['Reconciliación automática', 'Reporting mensual', 'Seguimiento de facturas', 'Alertas de anomalías'],
          },
          {
            name: 'Marketing & Comunicación',
            color: 'from-rose-400 to-rose-600',
            tasks: ['Creación de contenido', 'Inteligencia competitiva', 'Análisis de rendimiento', 'Planificación editorial'],
          },
          {
            name: 'Recursos Humanos',
            color: 'from-sage-500 to-sage-700',
            tasks: ['Cribado de candidaturas', 'Onboarding automatizado', 'Seguimiento de formaciones', 'Encuestas de empleados'],
          },
          {
            name: 'Dirección & Estrategia',
            color: 'from-gold to-gold-dark',
            tasks: ['Resúmenes decisionales', 'Cuadros de mando', 'Seguimiento de OKRs', 'Inteligencia sectorial'],
          },
        ],
      },
      howItWorks: {
        eyebrow: 'Cómo funciona',
        title: 'Desplegado en 3 pasos, operativo en días',
        steps: [
          {
            number: '01',
            title: 'Auditoría de procesos',
            description: 'Nuestros expertos analizan tus flujos de trabajo actuales para identificar las tareas con mayor potencial de automatización.',
          },
          {
            number: '02',
            title: 'Configuración de agentes IA',
            description: 'Configuramos agentes de IA calibrados en tus herramientas, vocabulario de negocio y procesos específicos.',
          },
          {
            number: '03',
            title: 'Tus equipos se concentran en lo esencial',
            description: 'Libres de tareas repetitivas, tus empleados pueden finalmente dedicarse a crear valor e innovar.',
          },
        ],
      },
      cta: {
        eyebrow: '¿Listo para transformar tu empresa?',
        title: 'Sé de los primeros en adoptar el empleado IA',
        subtitle: 'Únete a la lista de espera para acceder en primicia a la plataforma Mindzy AI y transformar la forma de trabajar de tu empresa.',
        primary: 'Unirse a la lista de espera',
        secondary: 'Saber más',
      },
    },
  }

  const t = content[l] || content.fr

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite via-anthracite/95 to-anthracite/90" />

        {/* Animated tech grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.6) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Glowing blobs */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-down mb-8">
              <Badge variant="violet" className="border-violet-400/40 bg-violet-500/20 text-violet-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                {t.hero.badge}
              </Badge>
            </div>

            <h1 className="heading-display text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t.hero.title}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-violet-500/30" viewBox="0 0 200 12" fill="none">
                  <path d="M1 8.5C47 1.5 153 1.5 199 8.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="body-xl max-w-2xl mx-auto mb-12 text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href={`/${l}/ai-waitlist`}>
                <Button variant="primary" size="xl" icon={<ArrowIcon />}>
                  {t.hero.cta}
                </Button>
              </Link>
              <Link href={`/${l}/portfolio`}>
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="inline-flex flex-wrap items-center justify-center gap-8 sm:gap-12 px-8 py-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                {t.hero.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/10" />}
                    <div className="text-center sm:text-left">
                      <div className="font-display text-3xl font-semibold text-violet-300">{stat.value}</div>
                      <div className="text-xs text-gray-400 max-w-[120px]">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Pain Points */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50/50 rounded-full blur-3xl" />
        <div className="container-wide relative">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">{t.pain.eyebrow}</span>
            <h2 className="heading-2 text-anthracite mb-4">{t.pain.title}</h2>
            <p className="body-large max-w-2xl mx-auto">{t.pain.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.pain.points.map((point, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet/20 hover:shadow-soft transition-all duration-300"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="font-display text-xl font-semibold text-anthracite mb-3">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed">{point.description}</p>
                {/* Decorative number */}
                <div className="absolute top-4 right-6 font-display text-7xl font-bold text-gray-100 select-none leading-none">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-b from-cream-50 to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-100/30 rounded-full blur-3xl" />
        <div className="container-wide relative">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">{t.benefits.eyebrow}</span>
            <h2 className="heading-2 text-anthracite mb-4">{t.benefits.title}</h2>
            <p className="body-large max-w-2xl mx-auto">{t.benefits.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.items.map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-glow hover:border-violet/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-violet-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-anthracite mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases by department */}
      <section className="section-padding bg-anthracite text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="text-center mb-16">
            <span className="eyebrow text-violet-400 mb-4 block">{t.useCases.eyebrow}</span>
            <h2 className="heading-2 text-white mb-4">{t.useCases.title}</h2>
            <p className="body-large text-gray-400 max-w-2xl mx-auto">{t.useCases.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.useCases.departments.map((dept, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
                <div className="p-6 bg-white/5">
                  <h3 className="font-display text-base font-semibold text-white mb-4">{dept.name}</h3>
                  <ul className="space-y-2">
                    {dept.tasks.map((task, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-50/60 rounded-full blur-3xl" />
        <div className="container-narrow relative">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">{t.howItWorks.eyebrow}</span>
            <h2 className="heading-2 text-anthracite">{t.howItWorks.title}</h2>
          </div>

          <div className="space-y-8">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-10 items-start group">
                {/* Number */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-violet-50 border border-violet/10 flex items-center justify-center group-hover:bg-violet group-hover:border-violet transition-all duration-300">
                  <span className="font-display text-xl font-bold text-violet group-hover:text-white transition-colors">{step.number}</span>
                </div>
                {/* Connector line */}
                <div className="flex-1 pt-1">
                  <h3 className="font-display text-xl font-semibold text-anthracite mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <FeaturedPortfolio locale={l} />

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" />

        <div className="container-narrow relative text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {t.cta.eyebrow}
          </span>
          <h2 className="heading-2 mb-6">{t.cta.title}</h2>
          <p className="body-large text-white/80 mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${l}/ai-waitlist`}>
              <Button variant="secondary" size="xl" icon={<ArrowIcon />} className="bg-white text-violet hover:bg-gray-100">
                {t.cta.primary}
              </Button>
            </Link>
            <Link href={`/${l}/portfolio`}>
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                {t.cta.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
