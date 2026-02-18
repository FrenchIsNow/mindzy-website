import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import {
  FormationsPageHero,
  FormationsFeatureGrid,
  FormationsBentoGrid,
  FormationsPricingTiers,
  FormationsPricingIA,
} from '@/components/sections/formations'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const meta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Formations & Réseaux Sociaux - Boostez votre notoriété',
    description:
      'Formations stratégiques LinkedIn, Meta, TikTok et Intelligence Artificielle. Programmes concrets pour transformer votre acquisition digitale.',
  },
  en: {
    title: 'Mindzy | Training & Social Media - Boost your visibility',
    description:
      'Strategic training in LinkedIn, Meta, TikTok and AI. Concrete programs to transform your digital acquisition.',
  },
  es: {
    title: 'Mindzy | Formación y Redes Sociales - Impulsa tu notoriedad',
    description:
      'Formaciones estratégicas en LinkedIn, Meta, TikTok e IA. Programas concretos para transformar tu adquisición digital.',
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
    path: '/solutions/formations',
    title: t.title,
    description: t.description,
  })
}

const content = {
  fr: {
    badge: 'Formations & Réseaux Sociaux',
    title: 'Boostez votre',
    titleHighlight: 'notoriété',
    subtitle:
      'Des formations stratégiques conçues pour transformer l\'acquisition, la performance marketing et l\'intégration de l\'intelligence artificielle en véritables leviers business.',
    features: [
      {
        icon: 'linkedin',
        title: 'LinkedIn — Système d\'acquisition complet',
        description: 'Profil stratégique, positionnement différenciant, prospection structurée, Sales Navigator et stratégie de contenu avancée.',
      },
      {
        icon: 'meta',
        title: 'Meta, TikTok & Google — Générer des leads',
        description: 'Algorithmes, contenu organique, publicité, retargeting, tunnels de conversion et machine à leads automatisée. ',
      },
      {
        icon: 'ai',
        title: 'Intelligence Artificielle — Stratégie & Transformation',
        description: 'Formation avancée orientée intégration concrète de l\'IA dans les processus métier. Transformation opérationnelle, pas simple découverte d\'outils.',
      },
      {
        icon: 'custom',
        title: 'Formation sur mesure',
        description: 'Pour entreprises, équipes et grands comptes. Programme adapté à votre secteur, votre maturité digitale et vos objectifs stratégiques. Sur devis.',
      },
    ],
    pricing: {
      linkedin: {
        badge: 'LinkedIn',
        title: 'Transformez LinkedIn en machine à clients',
        subtitle: 'Du profil optimisé au système de prospection complet — générez des leads qualifiés chaque semaine.',
        ctaLabel: 'Réserver ma place',
        tiers: [
          {
            name: 'Fondations',
            price: '190€',
            duration: '3h · 2 sessions',
            description: 'Posez les bases d\'un profil qui attire et convertit vos prospects idéaux.',
            features: ['Optimisation avancée du profil', 'Positionnement différenciant', 'Ciblage précis de l\'audience', 'Structure de posts performants'],
            featured: false,
          },
          {
            name: 'Acquisition & Prospection',
            price: '290€',
            duration: '4h · 2 sessions',
            description: 'Structurez un système qui génère des leads chaque semaine.',
            features: ['Méthodologie de prospection', 'Séquences de messages', 'LinkedIn Sales Navigator', 'Listes qualifiées', 'Routine d\'acquisition'],
            featured: false,
          },
          {
            name: 'LinkedIn Mastery',
            price: '490€',
            duration: '8h · 4 sessions',
            description: 'Le système complet : profil, contenu, prospection et pipeline actif.',
            features: ['Pack Fondations + Acquisition inclus', 'Stratégie de contenu avancée', 'Plan d\'action 60 jours', 'Automatisation responsable', 'KPI & tracking'],
            featured: true,
          },
        ],
      },
      meta: {
        badge: 'Meta, TikTok & Google',
        title: 'Générez des leads avec les réseaux sociaux',
        subtitle: 'Maîtrisez les algorithmes, créez du contenu qui convertit et lancez des campagnes rentables.',
        ctaLabel: 'Réserver ma place',
        tiers: [
          {
            name: 'Lancer sa Présence',
            price: '190€',
            duration: '3h · 2 sessions',
            description: 'Comprenez les algorithmes et posez une stratégie claire pour attirer vos prospects.',
            features: ['Fonctionnement des algorithmes', 'Positionnement clair', 'Contenu qui attire des prospects', 'Plan de publication structuré'],
            featured: false,
          },
          {
            name: 'Campagnes Rentables',
            price: '340€',
            duration: '4h · 2 sessions',
            description: 'Créez des campagnes Meta, TikTok et Google Ads optimisées qui génèrent des leads.',
            features: ['Configuration des comptes publicitaires', 'Installation pixel & tracking', 'Campagnes Meta, TikTok & Google Ads', 'Optimisation des résultats'],
            featured: false,
          },
          {
            name: 'Acquisition Complète',
            price: '590€',
            duration: '8h · 4 sessions',
            description: 'Contenu + publicité + retargeting pour un flux régulier de prospects qualifiés.',
            features: ['Stratégie organique + publicité', 'Tunnel de conversion complet', 'Retargeting avancé', 'Structuration des audiences', 'Optimisation des budgets'],
            featured: true,
          },
        ],
      },
      ia: {
        badge: 'Intelligence Artificielle',
        title: 'Stratégie & Transformation Business',
        description: 'Formation avancée orientée intégration concrète de l\'IA dans les processus métier. Transformation opérationnelle, pas simple découverte d\'outils.',
        price: '690€',
        duration: '8h · 4 sessions',
        priceLabel: 'Prix fixe · Live + ateliers pratiques',
        ctaLabel: 'Réserver ma place',
        includedLabel: 'Ce qui est inclus',
        features: ['Diagnostic & opportunités stratégiques', 'Architecture IA personnalisée', 'Implémentation opérationnelle', 'Optimisation & industrialisation', 'Roadmap sur 30 à 90 jours', 'Frameworks & templates livrés'],
      },
    },
    bento: {
      badge: 'Notre approche',
      title: 'Tout ce qu\'il faut pour réussir sur le digital',
      items: [
        { title: 'Stratégie de contenu', subtitle: 'Planification', description: 'Apprenez à créer un calendrier éditorial performant et à produire du contenu qui génère des leads qualifiés.' },
        { title: 'Publication optimisée', subtitle: 'Diffusion', description: 'Maîtrisez les meilleurs horaires, formats et techniques pour maximiser la portée de chaque publication.' },
        { title: 'Analyse des résultats', subtitle: 'Mesure', description: 'Suivez vos KPIs et ajustez votre stratégie grâce aux données.' },
        { title: 'Automatisation IA', subtitle: 'Productivité', description: 'Utilisez l\'IA pour accélérer la création de contenu et automatiser les tâches répétitives.' },
        { title: 'Communauté engagée', subtitle: 'Réseau', description: 'Construisez une audience fidèle et transformez vos abonnés en clients.' },
      ],
    },
    testimonial: {
      quote: 'Grâce à la formation LinkedIn, j\'ai multiplié par 5 mes demandes de devis en 3 mois. La méthode est claire et les résultats concrets.',
      author: 'Sophie M.',
      role: 'Consultante indépendante',
    },
    cta: 'Découvrir les formations',
  },
  en: {
    badge: 'Training & Social Media',
    title: 'Boost your',
    titleHighlight: 'visibility',
    subtitle:
      'Strategic training designed to transform acquisition, marketing performance and AI integration into real business levers.',
    features: [
      {
        icon: 'linkedin',
        title: 'LinkedIn — Complete acquisition system',
        description: 'Strategic profile, differentiated positioning, structured prospecting, Sales Navigator and advanced content strategy. From €190 to €490.',
      },
      {
        icon: 'meta',
        title: 'Meta, TikTok & Google — Lead generation',
        description: 'Algorithms, organic content, advertising, retargeting, conversion funnels and automated lead machine. From €190 to €890.',
      },
      {
        icon: 'ai',
        title: 'Artificial Intelligence — Strategy & Transformation',
        description: 'Advanced training focused on concrete AI integration into business processes. Operational transformation, not just tool discovery. €690.',
      },
      {
        icon: 'custom',
        title: 'Custom training',
        description: 'For companies, teams and large accounts. Program adapted to your industry, digital maturity and strategic objectives. On quote.',
      },
    ],
    pricing: {
      linkedin: {
        badge: 'LinkedIn',
        title: 'Turn LinkedIn into a client-generating machine',
        subtitle: 'From optimized profile to full prospecting system — generate qualified leads every week.',
        ctaLabel: 'Book my spot',
        tiers: [
          {
            name: 'Foundations',
            price: '€190',
            duration: '3h · 2 sessions',
            description: 'Build a profile that attracts and converts your ideal prospects.',
            features: ['Advanced profile optimization', 'Differentiated positioning', 'Precise audience targeting', 'High-performing post structure'],
            featured: false,
          },
          {
            name: 'Acquisition & Prospecting',
            price: '€290',
            duration: '4h · 2 sessions',
            description: 'Build a system that generates leads every week.',
            features: ['Prospecting methodology', 'Message sequences', 'LinkedIn Sales Navigator', 'Qualified lists', 'Acquisition routine'],
            featured: false,
          },
          {
            name: 'LinkedIn Mastery',
            price: '€490',
            duration: '8h · 4 sessions',
            description: 'The complete system: profile, content, prospecting and active pipeline.',
            features: ['Foundations + Acquisition included', 'Advanced content strategy', '60-day action plan', 'Responsible automation', 'KPI & tracking'],
            featured: true,
          },
        ],
      },
      meta: {
        badge: 'Meta, TikTok & Google',
        title: 'Generate leads with social media',
        subtitle: 'Master algorithms, create converting content and launch profitable campaigns.',
        ctaLabel: 'Book my spot',
        tiers: [
          {
            name: 'Launch your Presence',
            price: '€190',
            duration: '3h · 2 sessions',
            description: 'Understand algorithms and set a clear strategy to attract prospects.',
            features: ['How algorithms work', 'Clear positioning', 'Content that attracts prospects', 'Structured publication plan'],
            featured: false,
          },
          {
            name: 'Profitable Campaigns',
            price: '€340',
            duration: '4h · 2 sessions',
            description: 'Create optimized Meta, TikTok and Google Ads campaigns that generate leads.',
            features: ['Ad accounts configuration', 'Pixel & tracking setup', 'Meta, TikTok & Google Ads campaigns', 'Results optimization'],
            featured: false,
          },
          {
            name: 'Complete Acquisition',
            price: '€590',
            duration: '8h · 4 sessions',
            description: 'Content + advertising + retargeting for a steady flow of qualified leads.',
            features: ['Organic + paid strategy', 'Full conversion funnel', 'Advanced retargeting', 'Audience structuring', 'Budget optimization'],
            featured: true,
          },
        ],
      },
      ia: {
        badge: 'Artificial Intelligence',
        title: 'Strategy & Business Transformation',
        description: 'Advanced training focused on concrete AI integration into business processes. Operational transformation, not just tool discovery.',
        price: '€690',
        duration: '8h · 4 sessions',
        priceLabel: 'Fixed price · Live + hands-on workshops',
        ctaLabel: 'Book my spot',
        includedLabel: 'What\'s included',
        features: ['Strategic diagnostic & opportunities', 'Custom AI architecture', 'Operational implementation', 'Optimization & scaling', '30–90 day roadmap', 'Frameworks & templates delivered'],
      },
    },
    bento: {
      badge: 'Our approach',
      title: 'Everything you need to succeed online',
      items: [
        { title: 'Content strategy', subtitle: 'Planning', description: 'Learn to create a high-performance editorial calendar and produce content that generates qualified leads.' },
        { title: 'Optimized publishing', subtitle: 'Distribution', description: 'Master the best times, formats and techniques to maximize the reach of every post.' },
        { title: 'Results analysis', subtitle: 'Measurement', description: 'Track your KPIs and adjust your strategy with data-driven insights.' },
        { title: 'AI automation', subtitle: 'Productivity', description: 'Use AI to accelerate content creation and automate repetitive tasks.' },
        { title: 'Engaged community', subtitle: 'Network', description: 'Build a loyal audience and turn followers into clients.' },
      ],
    },
    testimonial: {
      quote: 'Thanks to the LinkedIn training, I multiplied my quote requests by 5 in 3 months. The method is clear and the results concrete.',
      author: 'Sophie M.',
      role: 'Independent consultant',
    },
    cta: 'Discover training programs',
  },
  es: {
    badge: 'Formación y Redes Sociales',
    title: 'Impulsa tu',
    titleHighlight: 'notoriedad',
    subtitle:
      'Formaciones estratégicas diseñadas para transformar la adquisición, el rendimiento marketing y la integración de la inteligencia artificial en verdaderas palancas de negocio.',
    features: [
      {
        icon: 'linkedin',
        title: 'LinkedIn — Sistema de adquisición completo',
        description: 'Perfil estratégico, posicionamiento diferenciador, prospección estructurada, Sales Navigator y estrategia de contenido avanzada. Desde 190€ hasta 490€.',
      },
      {
        icon: 'meta',
        title: 'Meta, TikTok y Google — Generación de leads',
        description: 'Algoritmos, contenido orgánico, publicidad, retargeting, embudos de conversión y máquina de leads automatizada. Desde 190€ hasta 890€.',
      },
      {
        icon: 'ai',
        title: 'Inteligencia Artificial — Estrategia y Transformación',
        description: 'Formación avanzada orientada a la integración concreta de la IA en los procesos de negocio. Transformación operacional, no simple descubrimiento de herramientas. 690€.',
      },
      {
        icon: 'custom',
        title: 'Formación a medida',
        description: 'Para empresas, equipos y grandes cuentas. Programa adaptado a tu sector, tu madurez digital y tus objetivos estratégicos. Bajo presupuesto.',
      },
    ],
    pricing: {
      linkedin: {
        badge: 'LinkedIn',
        title: 'Transforma LinkedIn en tu máquina de clientes',
        subtitle: 'Del perfil optimizado al sistema de prospección completo — genera leads cualificados cada semana.',
        ctaLabel: 'Reservar mi plaza',
        tiers: [
          {
            name: 'Fundamentos',
            price: '190€',
            duration: '3h · 2 sesiones',
            description: 'Construye un perfil que atrae y convierte a tus prospectos ideales.',
            features: ['Optimización avanzada del perfil', 'Posicionamiento diferenciador', 'Segmentación precisa', 'Estructura de posts eficaces'],
            featured: false,
          },
          {
            name: 'Adquisición y Prospección',
            price: '290€',
            duration: '4h · 2 sesiones',
            description: 'Estructura un sistema que genera leads cada semana.',
            features: ['Metodología de prospección', 'Secuencias de mensajes', 'LinkedIn Sales Navigator', 'Listas cualificadas', 'Rutina de adquisición'],
            featured: false,
          },
          {
            name: 'LinkedIn Mastery',
            price: '490€',
            duration: '8h · 4 sesiones',
            description: 'El sistema completo: perfil, contenido, prospección y pipeline activo.',
            features: ['Fundamentos + Adquisición incluidos', 'Estrategia de contenido avanzada', 'Plan de acción 60 días', 'Automatización responsable', 'KPI & tracking'],
            featured: true,
          },
        ],
      },
      meta: {
        badge: 'Meta, TikTok & Google',
        title: 'Genera leads con las redes sociales',
        subtitle: 'Domina los algoritmos, crea contenido que convierte y lanza campañas rentables.',
        ctaLabel: 'Reservar mi plaza',
        tiers: [
          {
            name: 'Lanzar tu Presencia',
            price: '190€',
            duration: '3h · 2 sesiones',
            description: 'Comprende los algoritmos y establece una estrategia clara para atraer prospectos.',
            features: ['Funcionamiento de algoritmos', 'Posicionamiento claro', 'Contenido que atrae prospectos', 'Plan de publicación estructurado'],
            featured: false,
          },
          {
            name: 'Campañas Rentables',
            price: '340€',
            duration: '4h · 2 sesiones',
            description: 'Crea campañas Meta, TikTok y Google Ads optimizadas que generen leads.',
            features: ['Configuración de cuentas publicitarias', 'Instalación pixel & tracking', 'Campañas Meta, TikTok y Google Ads', 'Optimización de resultados'],
            featured: false,
          },
          {
            name: 'Adquisición Completa',
            price: '590€',
            duration: '8h · 4 sesiones',
            description: 'Contenido + publicidad + retargeting para un flujo regular de prospectos cualificados.',
            features: ['Estrategia orgánica + publicidad', 'Embudo de conversión completo', 'Retargeting avanzado', 'Estructuración de audiencias', 'Optimización de presupuestos'],
            featured: true,
          },
        ],
      },
      ia: {
        badge: 'Inteligencia Artificial',
        title: 'Estrategia y Transformación Business',
        description: 'Formación avanzada orientada a la integración concreta de la IA en los procesos de negocio. Transformación operativa, no simple descubrimiento de herramientas.',
        price: '690€',
        duration: '8h · 4 sesiones',
        priceLabel: 'Precio fijo · Live + talleres prácticos',
        ctaLabel: 'Reservar mi plaza',
        includedLabel: 'Qué incluye',
        features: ['Diagnóstico y oportunidades estratégicas', 'Arquitectura IA personalizada', 'Implementación operativa', 'Optimización e industrialización', 'Hoja de ruta 30–90 días', 'Frameworks y templates entregados'],
      },
    },
    bento: {
      badge: 'Nuestro enfoque',
      title: 'Todo lo que necesitas para triunfar en digital',
      items: [
        { title: 'Estrategia de contenido', subtitle: 'Planificación', description: 'Aprende a crear un calendario editorial eficaz y a producir contenido que genere leads cualificados.' },
        { title: 'Publicación optimizada', subtitle: 'Difusión', description: 'Domina los mejores horarios, formatos y técnicas para maximizar el alcance de cada publicación.' },
        { title: 'Análisis de resultados', subtitle: 'Medición', description: 'Sigue tus KPIs y ajusta tu estrategia gracias a los datos.' },
        { title: 'Automatización IA', subtitle: 'Productividad', description: 'Usa la IA para acelerar la creación de contenido y automatizar tareas repetitivas.' },
        { title: 'Comunidad comprometida', subtitle: 'Red', description: 'Construye una audiencia fiel y transforma a tus seguidores en clientes.' },
      ],
    },
    testimonial: {
      quote: 'Gracias a la formación LinkedIn, multipliqué por 5 mis solicitudes de presupuesto en 3 meses. El método es claro y los resultados concretos.',
      author: 'Sophie M.',
      role: 'Consultora independiente',
    },
    cta: 'Descubrir las formaciones',
  },
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: l } = await params
  const locale = l as Locale
  const t = content[locale]

  return (
    <>
      <FormationsPageHero
        locale={locale}
        badge={t.badge}
        title={t.title}
        titleHighlight={t.titleHighlight}
        subtitle={t.subtitle}
        cta={t.cta}
      />

      <FormationsFeatureGrid features={t.features} />

      <FormationsBentoGrid
        badge={t.bento.badge}
        title={t.bento.title}
        items={t.bento.items}
      />

      <FormationsPricingTiers
        locale={locale}
        badge={t.pricing.linkedin.badge}
        title={t.pricing.linkedin.title}
        subtitle={t.pricing.linkedin.subtitle}
        ctaLabel={t.pricing.linkedin.ctaLabel}
        tiers={t.pricing.linkedin.tiers}
        variant="white"
      />

      <FormationsPricingTiers
        locale={locale}
        badge={t.pricing.meta.badge}
        title={t.pricing.meta.title}
        subtitle={t.pricing.meta.subtitle}
        ctaLabel={t.pricing.meta.ctaLabel}
        tiers={t.pricing.meta.tiers}
        variant="gray"
      />

      <FormationsPricingIA
        locale={locale}
        badge={t.pricing.ia.badge}
        title={t.pricing.ia.title}
        description={t.pricing.ia.description}
        price={t.pricing.ia.price}
        duration={t.pricing.ia.duration}
        priceLabel={t.pricing.ia.priceLabel}
        ctaLabel={t.pricing.ia.ctaLabel}
        includedLabel={t.pricing.ia.includedLabel}
        features={t.pricing.ia.features}
      />

      <TestimonialsSection
        locale={locale}
        featured={{
          quote: t.testimonial.quote,
          author: t.testimonial.author,
          role: t.testimonial.role,
        }}
      />

      <CTASection locale={locale} variant="gradient" />
    </>
  )
}
