import type { Metadata } from 'next'
import { PricingTable } from '@/components/sections/PricingTable'
import {
  FormationsPricingTiers,
  FormationsPricingIA,
} from '@/components/sections/formations'
import { getMessages } from '@/lib/getMessages'
import { plans } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdService, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'

const pricingDescriptions: Record<string, string> = {
  fr: 'Tarifs transparents pour la création de votre site web professionnel. À partir de 49€/mois, hébergement et support inclus. Sans engagement.',
  en: 'Transparent pricing for your professional website creation. Starting at €49/month, hosting and support included. No commitment.',
  es: 'Precios transparentes para la creación de tu sitio web profesional. Desde 49€/mes, alojamiento y soporte incluido. Sin compromiso.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).pricing
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/pricing',
    title: t.title,
    description: pricingDescriptions[locale] || pricingDescriptions.fr,
  })
}

const formationsPricing = {
  fr: {
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
  en: {
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
  es: {
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
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = locale as Locale
  const t = getMessages(l).pricing
  const f = formationsPricing[l]
  const serviceJsonLd = jsonLdService(
    plans.map(plan => ({
      name: t.plans[plan.id]?.name || plan.id,
      description: t.plans[plan.id]?.description || '',
      price: plan.price,
    }))
  )

  const bcLabels: Record<string, { home: string; pricing: string }> = {
    fr: { home: 'Accueil', pricing: 'Tarifs' },
    en: { home: 'Home', pricing: 'Pricing' },
    es: { home: 'Inicio', pricing: 'Precios' },
  }
  const bc = bcLabels[l] || bcLabels.fr
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: bc.home, url: `https://mindzy.me/${l}` },
    { name: bc.pricing, url: `https://mindzy.me/${l}/pricing` },
  ])

  return (
    <div className="pt-24">
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PricingTable locale={l} />

      <FormationsPricingTiers
        locale={l}
        badge={f.linkedin.badge}
        title={f.linkedin.title}
        subtitle={f.linkedin.subtitle}
        ctaLabel={f.linkedin.ctaLabel}
        tiers={f.linkedin.tiers}
        variant="gray"
      />

      <FormationsPricingTiers
        locale={l}
        badge={f.meta.badge}
        title={f.meta.title}
        subtitle={f.meta.subtitle}
        ctaLabel={f.meta.ctaLabel}
        tiers={f.meta.tiers}
        variant="white"
      />

      <FormationsPricingIA
        locale={l}
        badge={f.ia.badge}
        title={f.ia.title}
        description={f.ia.description}
        price={f.ia.price}
        duration={f.ia.duration}
        priceLabel={f.ia.priceLabel}
        ctaLabel={f.ia.ctaLabel}
        includedLabel={f.ia.includedLabel}
        features={f.ia.features}
      />
    </div>
  )
}
