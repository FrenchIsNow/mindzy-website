import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const meta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Solution sur mesure - Apps, mobile & agents IA',
    description:
      'Applications web, mobiles, agents IA et automatisation avancée. Des solutions techniques sur mesure pour votre entreprise.',
  },
  en: {
    title: 'Mindzy | Custom solution - Apps, mobile & AI agents',
    description:
      'Web applications, mobile apps, AI agents and advanced automation. Custom technical solutions for your business.',
  },
  es: {
    title: 'Mindzy | Solución a medida - Apps, móvil y agentes IA',
    description:
      'Aplicaciones web, móviles, agentes IA y automatización avanzada. Soluciones técnicas a medida para tu empresa.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = meta[locale] || meta.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/solutions/sur-mesure',
    title: t.title,
    description: t.description,
  })
}

const content = {
  fr: {
    badge: 'Solution sur mesure',
    title: 'La technologie au service de',
    titleHighlight: 'votre ambition',
    subtitle:
      'Pour les projets ambitieux nécessitant une architecture digitale avancée, scalable et orientée performance. Nous concevons des infrastructures digitales sur mesure adaptées à vos objectifs business.',
    features: [
      {
        icon: 'code',
        title: 'Développement de solutions digitales',
        description: 'Applications web, mobiles, plateformes SaaS, marketplaces, interfaces privées & dashboards stratégiques, sites web sur mesure (corporate, premium, conversion).',
      },
      {
        icon: 'bot',
        title: 'Agents IA & automatisation',
        description: 'Agents conversationnels, analyse de données, agents commerciaux, IA support client, systèmes multi-agents. Architecture no-code/low-code/full-code.',
      },
      {
        icon: 'automation',
        title: 'Automatisation avancée',
        description: 'Systèmes complexes multi-outils, orchestration d\'API, centralisation et structuration de la data, automatisation complète des workflows.',
      },
      {
        icon: 'phone',
        title: 'Branding & création de contenu',
        description: 'Positionnement stratégique, identité visuelle, direction artistique, stratégie éditoriale et création de contenu digital.',
      },
    ],
    featureSection1: {
      eyebrow: 'Développement de solutions',
      title: 'Des infrastructures digitales sur mesure',
      description: 'Nous concevons des infrastructures digitales sur mesure adaptées à vos objectifs business. Chaque solution est pensée pour maximiser l\'expérience utilisateur, optimiser la conversion et garantir une architecture technique robuste.',
      features: [
        { title: 'Architecture scalable', description: 'Infrastructure cloud-native conçue pour évoluer avec votre croissance et assurer la scalabilité.' },
        { title: 'Intégrations API', description: 'Connexion fluide avec vos outils existants : CRM, ERP, paiement, messagerie, analytics.' },
        { title: 'Temps réel & performance', description: 'Données synchronisées instantanément, interfaces réactives et temps de chargement minimal.' },
      ],
    },
    featureSection2: {
      eyebrow: 'Agents IA & automatisation',
      title: 'Des systèmes intelligents intégrés à votre activité',
      description: 'Nous construisons des systèmes intelligents intégrés directement à votre activité. Agents IA, automatisation avancée et orchestration d\'API pour transformer vos processus.',
      features: [
        { title: 'Agents IA spécialisés', description: 'Agents conversationnels, analyse de données, agents commerciaux automatisés, IA support client et systèmes multi-agents.' },
        { title: 'Automatisation avancée', description: 'Systèmes complexes multi-outils, architecture no-code/low-code/full-code, orchestration d\'API et centralisation de la data.' },
        { title: 'Workflows automatisés', description: 'Automatisation complète des workflows, tri de leads, génération de rapports, relances et suivi automatiques.' },
      ],
    },
    process: {
      title: 'Notre approche',
      steps: [
        { number: '01', title: 'Audit & architecture', description: 'Analyse de vos besoins et conception de l\'architecture technique optimale.' },
        { number: '02', title: 'Développement itératif', description: 'Sprints courts avec démonstrations régulières et ajustements.' },
        { number: '03', title: 'Déploiement & évolution', description: 'Mise en production, monitoring et accompagnement à long terme.' },
      ],
    },
    testimonial: {
      quote: 'Mindzy a développé notre plateforme de gestion interne en un temps record. L\'IA intégrée nous fait gagner 20h par semaine.',
      author: 'Thomas R.',
      role: 'CEO, Startup SaaS',
    },
    diffusion: {
      eyebrow: 'Diffusion optimisée',
      title: 'Planifiez, diffusez,',
      titleAccent: 'convertissez',
      description: 'Votre solution digitale ne suffit pas sans une stratégie de diffusion efficace. Nous orchestrons la distribution de vos contenus sur tous les canaux pour maximiser votre visibilité et générer des résultats concrets.',
      items: [
        { title: 'Stratégie multi-canal', description: 'Présence coordonnée sur les réseaux sociaux, email, SEO et publicité payante pour toucher votre audience où elle se trouve.' },
        { title: 'Planification éditoriale', description: 'Calendrier de publication structuré, contenus adaptés à chaque plateforme et automatisation des publications.' },
        { title: 'Optimisation continue', description: 'Analyse des performances en temps réel, A/B testing et ajustement de la stratégie pour maximiser le ROI.' },
      ],
    },
    cta: 'Discuter de mon projet',
  },
  en: {
    badge: 'Custom solution',
    title: 'Technology serving',
    titleHighlight: 'your ambition',
    subtitle:
      'For ambitious projects requiring advanced, scalable and performance-oriented digital architecture. We design custom digital infrastructures tailored to your business objectives.',
    features: [
      {
        icon: 'code',
        title: 'Digital solution development',
        description: 'Web & mobile apps, SaaS platforms, marketplaces, private interfaces & strategic dashboards, custom websites (corporate, premium, conversion).',
      },
      {
        icon: 'bot',
        title: 'AI agents & automation',
        description: 'Conversational agents, data analysis, sales agents, AI customer support, multi-agent systems. No-code/low-code/full-code architecture.',
      },
      {
        icon: 'automation',
        title: 'Advanced automation',
        description: 'Complex multi-tool systems, API orchestration, data centralization & structuring, complete workflow automation.',
      },
      {
        icon: 'phone',
        title: 'Branding & content creation',
        description: 'Strategic positioning, visual identity, art direction, editorial strategy and digital content creation.',
      },
    ],
    featureSection1: {
      eyebrow: 'Solution development',
      title: 'Custom digital infrastructures',
      description: 'We design custom digital infrastructures tailored to your business objectives. Every solution is built to maximize user experience, optimize conversion and ensure robust technical architecture.',
      features: [
        { title: 'Scalable architecture', description: 'Cloud-native infrastructure designed to grow with your business and ensure scalability.' },
        { title: 'API integrations', description: 'Seamless connection with your existing tools: CRM, ERP, payments, messaging, analytics.' },
        { title: 'Real-time & performance', description: 'Instantly synced data, responsive interfaces and minimal load times.' },
      ],
    },
    featureSection2: {
      eyebrow: 'AI agents & automation',
      title: 'Smart systems integrated into your business',
      description: 'We build smart systems integrated directly into your business. AI agents, advanced automation and API orchestration to transform your processes.',
      features: [
        { title: 'Specialized AI agents', description: 'Conversational agents, data analysis, automated sales agents, AI customer support and multi-agent systems.' },
        { title: 'Advanced automation', description: 'Complex multi-tool systems, no-code/low-code/full-code architecture, API orchestration and data centralization.' },
        { title: 'Automated workflows', description: 'Complete workflow automation, lead sorting, report generation, automatic follow-ups and tracking.' },
      ],
    },
    process: {
      title: 'Our approach',
      steps: [
        { number: '01', title: 'Audit & architecture', description: 'Analysis of your needs and design of the optimal technical architecture.' },
        { number: '02', title: 'Iterative development', description: 'Short sprints with regular demos and adjustments.' },
        { number: '03', title: 'Deployment & evolution', description: 'Production launch, monitoring and long-term support.' },
      ],
    },
    testimonial: {
      quote: 'Mindzy developed our internal management platform in record time. The integrated AI saves us 20 hours per week.',
      author: 'Thomas R.',
      role: 'CEO, SaaS Startup',
    },
    diffusion: {
      eyebrow: 'Optimized distribution',
      title: 'Plan, distribute,',
      titleAccent: 'convert',
      description: 'Your digital solution isn\'t enough without an effective distribution strategy. We orchestrate content distribution across all channels to maximize your visibility and generate concrete results.',
      items: [
        { title: 'Multi-channel strategy', description: 'Coordinated presence on social media, email, SEO and paid advertising to reach your audience wherever they are.' },
        { title: 'Editorial planning', description: 'Structured publishing calendar, content tailored to each platform and automated scheduling.' },
        { title: 'Continuous optimization', description: 'Real-time performance analysis, A/B testing and strategy adjustments to maximize ROI.' },
      ],
    },
    cta: 'Discuss my project',
  },
  es: {
    badge: 'Solución a medida',
    title: 'La tecnología al servicio de',
    titleHighlight: 'tu ambición',
    subtitle:
      'Para proyectos ambiciosos que requieren una arquitectura digital avanzada, escalable y orientada al rendimiento. Diseñamos infraestructuras digitales a medida adaptadas a tus objetivos de negocio.',
    features: [
      {
        icon: 'code',
        title: 'Desarrollo de soluciones digitales',
        description: 'Apps web y móviles, plataformas SaaS, marketplaces, interfaces privadas y dashboards estratégicos, sitios web a medida (corporativo, premium, conversión).',
      },
      {
        icon: 'bot',
        title: 'Agentes IA y automatización',
        description: 'Agentes conversacionales, análisis de datos, agentes comerciales, IA soporte cliente, sistemas multi-agente. Arquitectura no-code/low-code/full-code.',
      },
      {
        icon: 'automation',
        title: 'Automatización avanzada',
        description: 'Sistemas complejos multi-herramienta, orquestación de APIs, centralización y estructuración de datos, automatización completa de workflows.',
      },
      {
        icon: 'phone',
        title: 'Branding y creación de contenido',
        description: 'Posicionamiento estratégico, identidad visual, dirección artística, estrategia editorial y creación de contenido digital.',
      },
    ],
    featureSection1: {
      eyebrow: 'Desarrollo de soluciones',
      title: 'Infraestructuras digitales a medida',
      description: 'Diseñamos infraestructuras digitales a medida adaptadas a tus objetivos de negocio. Cada solución está pensada para maximizar la experiencia de usuario, optimizar la conversión y garantizar una arquitectura técnica robusta.',
      features: [
        { title: 'Arquitectura escalable', description: 'Infraestructura cloud-native diseñada para crecer con tu negocio y asegurar la escalabilidad.' },
        { title: 'Integraciones API', description: 'Conexión fluida con tus herramientas existentes: CRM, ERP, pagos, mensajería, analytics.' },
        { title: 'Tiempo real y rendimiento', description: 'Datos sincronizados al instante, interfaces reactivas y tiempos de carga mínimos.' },
      ],
    },
    featureSection2: {
      eyebrow: 'Agentes IA y automatización',
      title: 'Sistemas inteligentes integrados en tu actividad',
      description: 'Construimos sistemas inteligentes integrados directamente en tu actividad. Agentes IA, automatización avanzada y orquestación de APIs para transformar tus procesos.',
      features: [
        { title: 'Agentes IA especializados', description: 'Agentes conversacionales, análisis de datos, agentes comerciales automatizados, IA soporte cliente y sistemas multi-agente.' },
        { title: 'Automatización avanzada', description: 'Sistemas complejos multi-herramienta, arquitectura no-code/low-code/full-code, orquestación de APIs y centralización de datos.' },
        { title: 'Workflows automatizados', description: 'Automatización completa de workflows, clasificación de leads, generación de informes, seguimientos automáticos.' },
      ],
    },
    process: {
      title: 'Nuestro enfoque',
      steps: [
        { number: '01', title: 'Auditoría y arquitectura', description: 'Análisis de tus necesidades y diseño de la arquitectura técnica óptima.' },
        { number: '02', title: 'Desarrollo iterativo', description: 'Sprints cortos con demostraciones regulares y ajustes.' },
        { number: '03', title: 'Despliegue y evolución', description: 'Puesta en producción, monitoreo y acompañamiento a largo plazo.' },
      ],
    },
    testimonial: {
      quote: 'Mindzy desarrolló nuestra plataforma de gestión interna en tiempo récord. La IA integrada nos ahorra 20 horas por semana.',
      author: 'Thomas R.',
      role: 'CEO, Startup SaaS',
    },
    diffusion: {
      eyebrow: 'Difusión optimizada',
      title: 'Planifica, difunde,',
      titleAccent: 'convierte',
      description: 'Tu solución digital no basta sin una estrategia de difusión eficaz. Orquestamos la distribución de tus contenidos en todos los canales para maximizar tu visibilidad y generar resultados concretos.',
      items: [
        { title: 'Estrategia multicanal', description: 'Presencia coordinada en redes sociales, email, SEO y publicidad pagada para alcanzar a tu audiencia donde se encuentre.' },
        { title: 'Planificación editorial', description: 'Calendario de publicación estructurado, contenidos adaptados a cada plataforma y automatización de publicaciones.' },
        { title: 'Optimización continua', description: 'Análisis de rendimiento en tiempo real, A/B testing y ajuste de la estrategia para maximizar el ROI.' },
      ],
    },
    cta: 'Hablar de mi proyecto',
  },
}

export default async function SurMesurePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: l } = await params
  const locale = l as Locale
  const t = content[locale]

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F0ECFF 50%, #E8F4FF 100%)' }}
      >
        <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full blur-3xl animate-blob" style={{ background: 'rgba(167,139,250,0.2)' }} />
        <div className="absolute bottom-20 -left-10 w-[350px] h-[350px] rounded-full blur-3xl animate-blob" style={{ background: 'rgba(165,243,252,0.15)', animationDelay: '3s' }} />

        <div className="container-narrow relative z-10 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-violet-500 mb-6 block">{t.badge}</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-[#1E1B4B] mb-8">
            {t.title} <span className="text-violet-600">{t.titleHighlight}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">{t.subtitle}</p>
          <Link href={`/${locale}/diagnostic`}>
            <Button variant="primary" size="xl" icon={<ArrowIcon />}>{t.cta}</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                style={{ boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)', animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center text-violet-600 mb-5">
                  <SurMesureIcon name={feature.icon} />
                </div>
                <h3 className="text-xl font-semibold text-[#1E1B4B] mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 1 — Text left, Image right */}
      <section className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl pl-2 pr-6 lg:pl-4 lg:pr-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-violet-600">
                  {t.featureSection1.eyebrow}
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1E1B4B] sm:text-5xl">
                  {t.featureSection1.title}
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  {t.featureSection1.description}
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {t.featureSection1.features.map((feature, i) => {
                    const icons = [CloudArrowUpIcon, LockClosedIcon, ServerIcon]
                    const Icon = icons[i] ?? CloudArrowUpIcon
                    return (
                      <div key={feature.title} className="relative pl-9">
                        <dt className="inline font-semibold text-[#1E1B4B]">
                          <Icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-violet-600" />
                          {feature.title}.
                        </dt>{' '}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </div>
            <img
              alt="Application sur mesure"
              src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </section>

      {/* Feature Section 2 — Image left, Text right */}
      <section className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl pl-6 pr-2 lg:pl-8 lg:pr-4">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pt-4 lg:pl-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-violet-600">
                  {t.featureSection2.eyebrow}
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1E1B4B] sm:text-5xl">
                  {t.featureSection2.title}
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  {t.featureSection2.description}
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {t.featureSection2.features.map((feature) => (
                    <div key={feature.title} className="relative pl-9">
                      <dt className="inline font-semibold text-[#1E1B4B]">
                        <svg className="absolute top-1 left-1 size-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {feature.title}.
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <Image
                src="/images/portfolio/overlord-fund.jpg"
                alt="Intelligence artificielle"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#FAFAFF] py-24 lg:py-32">
        <div className="container-narrow">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-center text-[#1E1B4B] mb-16">{t.process.title}</h2>
          <div className="space-y-8 fk">
            {t.process.steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-display text-xl font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1E1B4B] mb-1">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <CTASection locale={locale} variant="gradient" />
    </>
  )
}

function SurMesureIcon({ name }: { name: string }) {
  const cls = 'w-5 h-5'
  switch (name) {
    case 'code':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    case 'phone':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    case 'bot':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    case 'automation':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
    default:
      return null
  }
}
