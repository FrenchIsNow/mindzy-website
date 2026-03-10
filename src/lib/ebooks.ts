import type { Locale } from './i18n'

export interface EbookChapter {
  num: string
  title: string
}

export interface EbookFeature {
  num: string
  label: string
  title: string
  desc: string
}

export interface EbookStat {
  value: string
  label: string
}

export interface EbookTestimonial {
  quote: string
  author: string
  role: string
}

export interface Ebook {
  slug: string
  title: Record<Locale, string>
  subtitle: Record<Locale, string>
  excerpt: Record<Locale, string>
  pages: number
  category: string
  tags: string[]
  image: string
  publishedDate: string
  downloadCount: number
  chapters: Record<Locale, EbookChapter[]>
  features: Record<Locale, EbookFeature[]>
  stats: Record<Locale, EbookStat[]>
  testimonial: Record<Locale, EbookTestimonial>
  ctaLink?: string
  free: boolean
}

export const ebooks: Ebook[] = [
  {
    slug: 'lancer-presence-digitale-2026',
    title: {
      fr: 'Lancez votre présence digitale en 2026',
      en: 'Launch Your Digital Presence in 2026',
      es: 'Lanza tu presencia digital en 2026',
    },
    subtitle: {
      fr: '39 pages. 10 chapitres. Des stratégies testées sur 150+ projets.',
      en: '39 pages. 10 chapters. Strategies tested on 150+ projects.',
      es: '39 páginas. 10 capítulos. Estrategias probadas en 150+ proyectos.',
    },
    excerpt: {
      fr: 'Le guide complet pour créer, optimiser et développer votre présence digitale en 2026. Des checklists actionnables et un plan d\'action 90 jours prêt à l\'emploi.',
      en: 'The complete guide to create, optimize and grow your digital presence in 2026. Actionable checklists and a ready-to-use 90-day action plan.',
      es: 'La guía completa para crear, optimizar y desarrollar tu presencia digital en 2026. Checklists accionables y un plan de acción de 90 días listo para usar.',
    },
    pages: 39,
    category: 'marketing',
    tags: ['digital', 'seo', 'stratégie', 'branding'],
    image: '/images/blog/seo-guide.svg',
    publishedDate: '2026-01-01',
    downloadCount: 847,
    free: true,
    ctaLink: 'https://calendar.app.google/JyUKfZ6xMRxKySfM9',
    chapters: {
      fr: [
        { num: '01', title: 'Les fondamentaux du digital en 2026' },
        { num: '02', title: 'Comprendre votre cible et créer votre persona' },
        { num: '03', title: 'Branding et identité visuelle' },
        { num: '04', title: 'Votre site web : vitrine ou machine à vendre ?' },
        { num: '05', title: 'Maîtriser les réseaux sociaux' },
        { num: '06', title: 'Acquérir vos premiers clients en ligne' },
        { num: '07', title: 'Mesurer et piloter vos KPI' },
        { num: '08', title: 'Automatisation et intelligence artificielle' },
        { num: '09', title: 'Plan 90 jours + Lexique complet' },
      ],
      en: [
        { num: '01', title: 'Digital fundamentals in 2026' },
        { num: '02', title: 'Understanding your target audience' },
        { num: '03', title: 'Branding and visual identity' },
        { num: '04', title: 'Your website: showcase or sales machine?' },
        { num: '05', title: 'Mastering social media' },
        { num: '06', title: 'Acquiring your first online clients' },
        { num: '07', title: 'Measuring and tracking your KPIs' },
        { num: '08', title: 'Automation and artificial intelligence' },
        { num: '09', title: '90-day plan + Complete glossary' },
      ],
      es: [
        { num: '01', title: 'Fundamentos digitales en 2026' },
        { num: '02', title: 'Entender tu público objetivo' },
        { num: '03', title: 'Branding e identidad visual' },
        { num: '04', title: 'Tu sitio web: ¿escaparate o máquina de ventas?' },
        { num: '05', title: 'Dominar las redes sociales' },
        { num: '06', title: 'Conseguir tus primeros clientes online' },
        { num: '07', title: 'Medir y gestionar tus KPI' },
        { num: '08', title: 'Automatización e inteligencia artificial' },
        { num: '09', title: 'Plan 90 días + Glosario completo' },
      ],
    },
    features: {
      fr: [
        { num: '01', label: 'STRATÉGIE', title: 'Une feuille de route en 10 chapitres', desc: 'Du branding à l\'automatisation, chaque étape est structurée avec une logique progressive. Pas de remplissage.' },
        { num: '02', label: 'DÉFINITIONS', title: 'Un lexique de 40+ termes expliqués', desc: 'SEO, KPI, ROAS, lead nurturing, algorithme… Chaque terme complexe est défini là où il apparaît.' },
        { num: '03', label: 'KPI', title: 'Des métriques concrètes pour piloter', desc: '4 tableaux KPI complets (site, réseaux, pub, email) avec cibles recommandées et actions correctives.' },
        { num: '04', label: 'ACTION', title: 'Checklists à la fin de chaque chapitre', desc: '4 actions concrètes à mettre en place chaque semaine. Vous savez exactement quoi faire après chaque lecture.' },
        { num: '05', label: 'IA', title: '4 prompts IA prêts à l\'emploi', desc: 'Des prompts testés pour rédiger vos textes de site, posts Instagram, objets d\'email et analyser vos concurrents.' },
        { num: '06', label: 'PLAN', title: 'Un plan d\'action sur 90 jours', desc: 'Fondation (J1-30), Activation (J31-60), Optimisation (J61-90). Chaque phase a ses objectifs et priorités.' },
      ],
      en: [
        { num: '01', label: 'STRATEGY', title: 'A 10-chapter roadmap', desc: 'From branding to automation, each step is structured with progressive logic. No filler.' },
        { num: '02', label: 'GLOSSARY', title: 'A glossary of 40+ explained terms', desc: 'SEO, KPI, ROAS, lead nurturing, algorithm… Each complex term is defined where it appears.' },
        { num: '03', label: 'KPI', title: 'Concrete metrics to track', desc: '4 complete KPI tables (website, social, ads, email) with recommended targets and corrective actions.' },
        { num: '04', label: 'ACTION', title: 'Checklists at the end of each chapter', desc: '4 concrete actions to implement each week. You know exactly what to do after each chapter.' },
        { num: '05', label: 'AI', title: '4 ready-to-use AI prompts', desc: 'Tested prompts to write your website copy, Instagram posts, email subjects and analyze competitors.' },
        { num: '06', label: 'PLAN', title: 'A 90-day action plan', desc: 'Foundation (D1-30), Activation (D31-60), Optimization (D61-90). Each phase has its objectives and priorities.' },
      ],
      es: [
        { num: '01', label: 'ESTRATEGIA', title: 'Una hoja de ruta en 10 capítulos', desc: 'Del branding a la automatización, cada paso está estructurado con lógica progresiva. Sin relleno.' },
        { num: '02', label: 'GLOSARIO', title: 'Un glosario de 40+ términos explicados', desc: 'SEO, KPI, ROAS, lead nurturing, algoritmo… Cada término complejo se define donde aparece.' },
        { num: '03', label: 'KPI', title: 'Métricas concretas para gestionar', desc: '4 tablas KPI completas (sitio, redes, publicidad, email) con objetivos recomendados y acciones correctivas.' },
        { num: '04', label: 'ACCIÓN', title: 'Checklists al final de cada capítulo', desc: '4 acciones concretas a implementar cada semana. Sabes exactamente qué hacer después de cada lectura.' },
        { num: '05', label: 'IA', title: '4 prompts de IA listos para usar', desc: 'Prompts probados para redactar textos de sitio, posts de Instagram, asuntos de email y analizar competidores.' },
        { num: '06', label: 'PLAN', title: 'Un plan de acción de 90 días', desc: 'Fundación (D1-30), Activación (D31-60), Optimización (D61-90). Cada fase tiene sus objetivos y prioridades.' },
      ],
    },
    stats: {
      fr: [
        { value: '150+', label: 'projets livrés' },
        { value: '4.9/5', label: 'satisfaction client' },
        { value: '39', label: 'pages actionnables' },
        { value: '847', label: 'téléchargements' },
      ],
      en: [
        { value: '150+', label: 'projects delivered' },
        { value: '4.9/5', label: 'client satisfaction' },
        { value: '39', label: 'actionable pages' },
        { value: '847', label: 'downloads' },
      ],
      es: [
        { value: '150+', label: 'proyectos entregados' },
        { value: '4.9/5', label: 'satisfacción cliente' },
        { value: '39', label: 'páginas accionables' },
        { value: '847', label: 'descargas' },
      ],
    },
    testimonial: {
      fr: {
        quote: '« En moins de 3 mois, j\'ai multiplié mes demandes de devis par 4 grâce aux stratégies de ce guide. Mindzy m\'a aidé à tout mettre en place. »',
        author: 'Camille R.',
        role: 'Architecte d\'intérieur, Lyon',
      },
      en: {
        quote: '"In less than 3 months, I multiplied my quote requests by 4 thanks to the strategies in this guide. Mindzy helped me put everything in place."',
        author: 'Camille R.',
        role: 'Interior designer, Lyon',
      },
      es: {
        quote: '"En menos de 3 meses, multipliqué mis solicitudes de presupuesto por 4 gracias a las estrategias de esta guía. Mindzy me ayudó a poner todo en marcha."',
        author: 'Camille R.',
        role: 'Arquitecta de interiores, Lyon',
      },
    },
  },
  {
    slug: 'seo-geo-therapeutes-guide',
    title: {
      fr: 'SEO & GEO pour thérapeutes et praticiens',
      en: 'SEO & GEO for Therapists and Practitioners',
      es: 'SEO & GEO para terapeutas y profesionales',
    },
    subtitle: {
      fr: '28 pages. 8 chapitres. Attirer des clients sans publicité payante.',
      en: '28 pages. 8 chapters. Attract clients without paid advertising.',
      es: '28 páginas. 8 capítulos. Atraer clientes sin publicidad pagada.',
    },
    excerpt: {
      fr: 'Guide pratique pour optimiser votre présence sur Google et les IA. Spécialement conçu pour les thérapeutes, psychologues, coachs et praticiens de santé.',
      en: 'Practical guide to optimize your presence on Google and AI engines. Specially designed for therapists, psychologists, coaches and health practitioners.',
      es: 'Guía práctica para optimizar tu presencia en Google y motores de IA. Especialmente diseñada para terapeutas, psicólogos, coaches y profesionales de salud.',
    },
    pages: 28,
    category: 'seo',
    tags: ['seo', 'geo', 'thérapeutes', 'visibilité'],
    image: '/images/blog/seo-guide.svg',
    publishedDate: '2026-02-01',
    downloadCount: 412,
    free: true,
    chapters: {
      fr: [
        { num: '01', title: 'Comprendre le SEO en 2026' },
        { num: '02', title: 'Les mots-clés de vos patients' },
        { num: '03', title: 'Optimiser votre fiche Google Business' },
        { num: '04', title: 'Rédiger des pages qui classent' },
        { num: '05', title: 'Le SEO technique pour non-développeurs' },
        { num: '06', title: 'Être cité par les IA (GEO)' },
        { num: '07', title: 'Mesurer vos résultats' },
        { num: '08', title: 'Plan d\'action 60 jours' },
      ],
      en: [
        { num: '01', title: 'Understanding SEO in 2026' },
        { num: '02', title: 'Your patients\' keywords' },
        { num: '03', title: 'Optimizing your Google Business profile' },
        { num: '04', title: 'Writing pages that rank' },
        { num: '05', title: 'Technical SEO for non-developers' },
        { num: '06', title: 'Being cited by AI engines (GEO)' },
        { num: '07', title: 'Measuring your results' },
        { num: '08', title: '60-day action plan' },
      ],
      es: [
        { num: '01', title: 'Entender el SEO en 2026' },
        { num: '02', title: 'Las palabras clave de tus pacientes' },
        { num: '03', title: 'Optimizar tu ficha de Google Business' },
        { num: '04', title: 'Escribir páginas que posicionan' },
        { num: '05', title: 'SEO técnico para no desarrolladores' },
        { num: '06', title: 'Ser citado por los motores de IA (GEO)' },
        { num: '07', title: 'Medir tus resultados' },
        { num: '08', title: 'Plan de acción 60 días' },
      ],
    },
    features: {
      fr: [
        { num: '01', label: 'SEO LOCAL', title: 'Dominer les recherches locales', desc: 'Techniques pour apparaître en premier quand vos patients cherchent un praticien dans leur ville.' },
        { num: '02', label: 'GOOGLE', title: 'Fiche Google Business optimisée', desc: 'Guide complet pour créer et optimiser votre fiche Google — photos, avis, catégories, posts.' },
        { num: '03', label: 'CONTENU', title: 'Rédiger pour vos patients', desc: 'Comment écrire des pages et articles qui répondent aux vraies questions de vos futurs patients.' },
        { num: '04', label: 'GEO', title: 'Être recommandé par les IA', desc: 'Les techniques pour être cité par ChatGPT, Perplexity et Google AI quand quelqu\'un cherche votre spécialité.' },
        { num: '05', label: 'TECHNIQUE', title: 'Checklist technique sans code', desc: 'Vitesse, mobile, HTTPS, balisage — tout ce qu\'il faut vérifier sans être développeur.' },
        { num: '06', label: 'MESURE', title: 'Tableau de bord Search Console', desc: 'Comment lire vos données GSC et prendre les bonnes décisions chaque mois.' },
      ],
      en: [
        { num: '01', label: 'LOCAL SEO', title: 'Dominate local searches', desc: 'Techniques to appear first when your patients search for a practitioner in their city.' },
        { num: '02', label: 'GOOGLE', title: 'Optimized Google Business profile', desc: 'Complete guide to create and optimize your Google profile — photos, reviews, categories, posts.' },
        { num: '03', label: 'CONTENT', title: 'Writing for your patients', desc: 'How to write pages and articles that answer the real questions of your future patients.' },
        { num: '04', label: 'GEO', title: 'Being recommended by AI', desc: 'Techniques to be cited by ChatGPT, Perplexity and Google AI when someone searches for your specialty.' },
        { num: '05', label: 'TECHNICAL', title: 'No-code technical checklist', desc: 'Speed, mobile, HTTPS, markup — everything to check without being a developer.' },
        { num: '06', label: 'METRICS', title: 'Search Console dashboard', desc: 'How to read your GSC data and make the right decisions every month.' },
      ],
      es: [
        { num: '01', label: 'SEO LOCAL', title: 'Dominar las búsquedas locales', desc: 'Técnicas para aparecer primero cuando tus pacientes buscan un profesional en su ciudad.' },
        { num: '02', label: 'GOOGLE', title: 'Ficha de Google Business optimizada', desc: 'Guía completa para crear y optimizar tu ficha de Google — fotos, reseñas, categorías, posts.' },
        { num: '03', label: 'CONTENIDO', title: 'Escribir para tus pacientes', desc: 'Cómo escribir páginas y artículos que respondan las preguntas reales de tus futuros pacientes.' },
        { num: '04', label: 'GEO', title: 'Ser recomendado por la IA', desc: 'Técnicas para ser citado por ChatGPT, Perplexity y Google AI cuando alguien busca tu especialidad.' },
        { num: '05', label: 'TÉCNICO', title: 'Checklist técnica sin código', desc: 'Velocidad, móvil, HTTPS, marcado — todo lo que hay que verificar sin ser desarrollador.' },
        { num: '06', label: 'MÉTRICAS', title: 'Panel de Search Console', desc: 'Cómo leer tus datos de GSC y tomar las decisiones correctas cada mes.' },
      ],
    },
    stats: {
      fr: [
        { value: '28', label: 'pages pratiques' },
        { value: '8', label: 'chapitres' },
        { value: '60j', label: 'plan d\'action' },
        { value: '412', label: 'téléchargements' },
      ],
      en: [
        { value: '28', label: 'practical pages' },
        { value: '8', label: 'chapters' },
        { value: '60d', label: 'action plan' },
        { value: '412', label: 'downloads' },
      ],
      es: [
        { value: '28', label: 'páginas prácticas' },
        { value: '8', label: 'capítulos' },
        { value: '60d', label: 'plan de acción' },
        { value: '412', label: 'descargas' },
      ],
    },
    testimonial: {
      fr: {
        quote: '« Grâce à ce guide, ma fiche Google est passée de 3 à 47 avis et j\'ai doublé mes consultations en 4 mois. Tout est expliqué simplement. »',
        author: 'Marie-Laure B.',
        role: 'Psychologue, Bordeaux',
      },
      en: {
        quote: '"Thanks to this guide, my Google profile went from 3 to 47 reviews and I doubled my consultations in 4 months. Everything is explained simply."',
        author: 'Marie-Laure B.',
        role: 'Psychologist, Bordeaux',
      },
      es: {
        quote: '"Gracias a esta guía, mi ficha de Google pasó de 3 a 47 reseñas y dupliqué mis consultas en 4 meses. Todo está explicado de forma sencilla."',
        author: 'Marie-Laure B.',
        role: 'Psicóloga, Bordeaux',
      },
    },
  },
]

export function getEbook(slug: string): Ebook | null {
  return ebooks.find(e => e.slug === slug) || null
}

export function getAllEbookSlugs(): string[] {
  return ebooks.map(e => e.slug)
}
