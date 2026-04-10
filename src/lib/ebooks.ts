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

export interface EbookCardOverride {
  badgeLabel?: Partial<Record<Locale, string>>
  freeLabel?: Partial<Record<Locale, string>>
  title?: Partial<Record<Locale, string>>
  hook?: Partial<Record<Locale, string>>
  description?: Partial<Record<Locale, string>>
  bullets?: Partial<Record<Locale, string[]>>
  ctaLabel?: Partial<Record<Locale, string>>
}

export interface EbookDetailOverride {
  title?: Partial<Record<Locale, string>>
  excerpt?: Partial<Record<Locale, string>>
  featureIntro?: Partial<Record<Locale, string>>
  features?: Partial<Record<Locale, EbookFeature[]>>
  testimonial?: Partial<Record<Locale, EbookTestimonial>>
  bottomCtaTitle?: Partial<Record<Locale, string>>
  bottomCtaBody?: Partial<Record<Locale, string>>
  bottomCtaButtonLabel?: Partial<Record<Locale, string>>
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
  pdfByLocale?: Partial<Record<Locale, string>>
  cardOverride?: EbookCardOverride
  detailOverride?: EbookDetailOverride
}

export const ebooks: Ebook[] = [
  // ─── FR: Lancer sa présence digitale ─────────────────────────────────────────
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
    image: '/images/ebooks/launch-digital-presence-2026.webp',
    publishedDate: '2026-01-01',
    downloadCount: 847,
    free: true,
    pdfByLocale: { fr: 'lancer-presence-digitale-2026-fr.pdf', en: 'launch-digital-presence-2026-en.pdf', es: 'launch-digital-presence-2026-en.pdf' },
    ctaLink: 'https://calendar.app.google/JyUKfZ6xMRxKySfM9',
    chapters: {
      fr: [
        { num: '01', title: 'Les fondamentaux du digital en 2026' },
        { num: '02', title: 'Comprendre votre cible et créer votre persona' },
        { num: '03', title: 'Branding et identité visuelle' },
        { num: '04', title: 'Votre site web : vitrine ou machine à vendre ?' },
        { num: '05', title: 'Maîtriser les réseaux sociaux' },
        { num: '06', title: 'Acquérir vos premiers clients en ligne' },
        { num: '07', title: 'Mesurer, analyser et piloter les KPI' },
        { num: '08', title: 'Automatisation et intelligence artificielle' },
        { num: '09', title: 'Votre plan d\'action 90 jours' },
        { num: '10', title: 'Lexique du digital — De A à Z' },
      ],
      en: [
        { num: '01', title: 'Digital fundamentals in 2026' },
        { num: '02', title: 'Understanding your target audience & persona' },
        { num: '03', title: 'Branding and visual identity' },
        { num: '04', title: 'Your website: showcase or sales machine?' },
        { num: '05', title: 'Mastering social media' },
        { num: '06', title: 'Acquiring your first online clients' },
        { num: '07', title: 'Measuring, analyzing and tracking KPIs' },
        { num: '08', title: 'Automation and artificial intelligence' },
        { num: '09', title: 'Your 90-day action plan' },
        { num: '10', title: 'Digital glossary — A to Z' },
      ],
      es: [
        { num: '01', title: 'Fundamentos digitales en 2026' },
        { num: '02', title: 'Entender tu público objetivo y crear tu persona' },
        { num: '03', title: 'Branding e identidad visual' },
        { num: '04', title: 'Tu sitio web: ¿escaparate o máquina de ventas?' },
        { num: '05', title: 'Dominar las redes sociales' },
        { num: '06', title: 'Conseguir tus primeros clientes online' },
        { num: '07', title: 'Medir, analizar y gestionar los KPI' },
        { num: '08', title: 'Automatización e inteligencia artificial' },
        { num: '09', title: 'Tu plan de acción de 90 días' },
        { num: '10', title: 'Glosario digital — De A a Z' },
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
        { value: '24/7', label: 'support inclus' },
      ],
      en: [
        { value: '150+', label: 'projects delivered' },
        { value: '4.9/5', label: 'client satisfaction' },
        { value: '39', label: 'actionable pages' },
        { value: '24/7', label: 'support included' },
      ],
      es: [
        { value: '150+', label: 'proyectos entregados' },
        { value: '4.9/5', label: 'satisfacción cliente' },
        { value: '39', label: 'páginas accionables' },
        { value: '24/7', label: 'soporte incluido' },
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

  // ─── FR: Comprendre le GEO en 2026 (guide d'introduction) ────────────────────
  {
    slug: 'seo-geo-expert-guide',
    title: {
      fr: 'Comprendre le GEO en 2026',
      en: 'Understanding GEO in 2026',
      es: 'Entender el GEO en 2026',
    },
    subtitle: {
      fr: '9 pages. 5 chapitres. Les fondamentaux pour être cité par ChatGPT, Perplexity et Gemini.',
      en: '9 pages. 5 chapters. The fundamentals to get cited by ChatGPT, Perplexity and Gemini.',
      es: '9 páginas. 5 capítulos. Los fundamentos para ser citado por ChatGPT, Perplexity y Gemini.',
    },
    excerpt: {
      fr: 'Guide d\'introduction au Generative Engine Optimization (GEO). Comprenez pourquoi et comment apparaître dans les réponses de ChatGPT, Perplexity, Google AI Overviews et Gemini — et agissez dès aujourd\'hui.',
      en: 'An introduction to Generative Engine Optimization (GEO). Understand why and how to appear in ChatGPT, Perplexity, Google AI Overviews and Gemini responses — and act today.',
      es: 'Introducción al Generative Engine Optimization (GEO). Entiende por qué y cómo aparecer en las respuestas de ChatGPT, Perplexity, Google AI Overviews y Gemini — y actúa hoy.',
    },
    pages: 9,
    category: 'geo',
    tags: ['geo', 'ia', 'chatgpt', 'seo', 'visibilité'],
    image: '/images/ebooks/understanding-geo-2026.webp',
    publishedDate: '2026-02-01',
    downloadCount: 412,
    free: true,
    pdfByLocale: { fr: 'seo-geo-expert-guide-fr.pdf', en: 'understanding-geo-2026-en.pdf', es: 'understanding-geo-2026-en.pdf' },
    ctaLink: 'https://calendar.app.google/JyUKfZ6xMRxKySfM9',
    chapters: {
      fr: [
        { num: 'Intro', title: 'La révolution silencieuse de la recherche' },
        { num: '01', title: 'Comprendre le GEO — Définitions et fondements' },
        { num: '02', title: 'Les 7 piliers du GEO — Le Framework RACE' },
        { num: '03', title: 'Où et comment publier — Les sources citées par les LLM' },
        { num: '04', title: 'Checklist de démarrage — Les premiers pas' },
        { num: '05', title: 'Pourquoi agir maintenant — La fenêtre d\'opportunité' },
      ],
      en: [
        { num: 'Intro', title: 'The silent revolution of search' },
        { num: '01', title: 'Understanding GEO — Definitions and foundations' },
        { num: '02', title: 'The 7 pillars of GEO — The RACE Framework' },
        { num: '03', title: 'Where and how to publish — Sources cited by LLMs' },
        { num: '04', title: 'Getting started checklist — First steps' },
        { num: '05', title: 'Why act now — The opportunity window is closing' },
      ],
      es: [
        { num: 'Intro', title: 'La revolución silenciosa de la búsqueda' },
        { num: '01', title: 'Entender el GEO — Definiciones y fundamentos' },
        { num: '02', title: 'Los 7 pilares del GEO — El Framework RACE' },
        { num: '03', title: 'Dónde y cómo publicar — Las fuentes citadas por los LLM' },
        { num: '04', title: 'Checklist de inicio — Los primeros pasos' },
        { num: '05', title: 'Por qué actuar ahora — La ventana de oportunidad' },
      ],
    },
    features: {
      fr: [
        { num: '01', label: 'E-E-A-T', title: 'Autorité et expertise de source', desc: 'Contenu signé par un expert reconnu, cité par des sources autoritaires. Les LLM mesurent votre crédibilité — E-E-A-T n\'est plus optionnel en 2026.' },
        { num: '02', label: 'STRUCTURE', title: 'Structurer pour être extrait', desc: 'Sous-titres interrogatifs, paragraphes courts (60-100 mots), listes structurées — chaque bloc de contenu doit être extractible de façon autonome par les LLM.' },
        { num: '03', label: 'SCHEMA', title: 'Schema Markup — parler directement aux IA', desc: 'FAQPage, HowTo, Article, Organization — ces schemas augmentent la citabilité de façon mesurable (+22 % en médiane). Le langage direct des systèmes IA.' },
        { num: '04', label: 'RACE', title: 'Le Framework RACE expliqué', desc: 'Retrievability, Authoritativeness, Citability, Extractability — les 4 dimensions qui maximisent votre visibilité dans les réponses générées par l\'IA.' },
        { num: '05', label: 'SOURCES', title: 'Pyramide des sources citées par les LLM', desc: 'De Wikipedia à votre blog — comprendre les 5 niveaux d\'impact et identifier exactement où vous devez être présent pour être cité.' },
        { num: '06', label: 'CHECKLIST', title: '18 actions à fort impact à lancer', desc: 'Audit technique immédiat, actions contenu J1-J30, mise en place du suivi GEO — une checklist priorisée pour démarrer même avec un budget limité.' },
      ],
      en: [
        { num: '01', label: 'E-E-A-T', title: 'Authority and source expertise', desc: 'Content signed by a recognized expert, cited by authoritative sources. LLMs measure your credibility — E-E-A-T is no longer optional in 2026.' },
        { num: '02', label: 'STRUCTURE', title: 'Structure to be extracted', desc: 'Interrogative subheadings, short paragraphs (60-100 words), structured lists — each content block must be extractable independently by LLMs.' },
        { num: '03', label: 'SCHEMA', title: 'Schema Markup — speak directly to AI', desc: 'FAQPage, HowTo, Article, Organization — these schemas increase citability measurably (+22% median). The direct language of AI systems.' },
        { num: '04', label: 'RACE', title: 'The RACE Framework explained', desc: 'Retrievability, Authoritativeness, Citability, Extractability — the 4 dimensions that maximize your visibility in AI-generated responses.' },
        { num: '05', label: 'SOURCES', title: 'The LLM citation source pyramid', desc: 'From Wikipedia to your blog — understand the 5 impact levels and identify exactly where you need to be present to get cited.' },
        { num: '06', label: 'CHECKLIST', title: '18 high-impact actions to launch', desc: 'Immediate technical audit, content actions D1-D30, GEO tracking setup — a prioritized checklist to start even with a limited budget.' },
      ],
      es: [
        { num: '01', label: 'E-E-A-T', title: 'Autoridad y experiencia de fuente', desc: 'Contenido firmado por un experto reconocido, citado por fuentes autoritativas. Los LLM miden tu credibilidad — E-E-A-T ya no es opcional en 2026.' },
        { num: '02', label: 'ESTRUCTURA', title: 'Estructurar para ser extraído', desc: 'Subtítulos interrogativos, párrafos cortos (60-100 palabras), listas estructuradas — cada bloque de contenido debe ser extraíble de forma autónoma.' },
        { num: '03', label: 'SCHEMA', title: 'Schema Markup — hablar directamente a las IA', desc: 'FAQPage, HowTo, Article, Organization — estos schemas aumentan la citabilidad de forma medible (+22% en mediana). El idioma directo de los sistemas IA.' },
        { num: '04', label: 'RACE', title: 'El Framework RACE explicado', desc: 'Retrievability, Authoritativeness, Citability, Extractability — las 4 dimensiones que maximizan tu visibilidad en las respuestas generadas por IA.' },
        { num: '05', label: 'FUENTES', title: 'Pirámide de fuentes citadas por los LLM', desc: 'De Wikipedia a tu blog — comprender los 5 niveles de impacto e identificar exactamente dónde debes estar presente para ser citado.' },
        { num: '06', label: 'CHECKLIST', title: '18 acciones de alto impacto', desc: 'Auditoría técnica inmediata, acciones de contenido D1-D30, configuración del seguimiento GEO — una checklist priorizada para empezar incluso con presupuesto limitado.' },
      ],
    },
    stats: {
      fr: [
        { value: '900M', label: 'utilisateurs hebdo ChatGPT' },
        { value: '+527%', label: 'trafic IA en 5 mois' },
        { value: '~60%', label: 'recherches sans clic' },
        { value: '89%', label: 'acheteurs B2B utilisent l\'IA' },
      ],
      en: [
        { value: '900M', label: 'weekly ChatGPT users' },
        { value: '+527%', label: 'AI traffic in 5 months' },
        { value: '~60%', label: 'zero-click searches' },
        { value: '89%', label: 'B2B buyers use AI' },
      ],
      es: [
        { value: '900M', label: 'usuarios semanales ChatGPT' },
        { value: '+527%', label: 'tráfico IA en 5 meses' },
        { value: '~60%', label: 'búsquedas sin clic' },
        { value: '89%', label: 'compradores B2B usan IA' },
      ],
    },
    testimonial: {
      fr: {
        quote: '« Grâce à ce guide, j\'ai compris comment structurer mon contenu pour être cité par ChatGPT. En 8 semaines, mon cabinet apparaît dans les réponses IA pour 60 % de mes requêtes cibles. »',
        author: 'Marie-Laure B.',
        role: 'Psychologue, Bordeaux',
      },
      en: {
        quote: '"Thanks to this guide, I understood how to structure my content to be cited by ChatGPT. Within 8 weeks, my practice appears in AI responses for 60% of my target queries."',
        author: 'Marie-Laure B.',
        role: 'Psychologist, Bordeaux',
      },
      es: {
        quote: '"Gracias a esta guía, entendí cómo estructurar mi contenido para ser citado por ChatGPT. En 8 semanas, mi consulta aparece en respuestas IA para el 60% de mis consultas objetivo."',
        author: 'Marie-Laure B.',
        role: 'Psicóloga, Bordeaux',
      },
    },
    cardOverride: {
      badgeLabel: { en: 'GEO' },
      freeLabel: { en: 'FREE' },
      title: { en: 'Understanding GEO in 2026' },
      hook: { en: 'Why ChatGPT may never mention your business — and how to fix it.' },
      description: {
        en: 'GEO (Generative Engine Optimization) is the new discipline that determines whether AI engines recommend you or your competitors. This intro guide covers the fundamentals.',
      },
      bullets: {
        en: [
          'GEO vs SEO — the key differences',
          'The 7 pillars and RACE framework',
          'Where LLMs find their sources',
          '18-action starter checklist',
        ],
      },
      ctaLabel: { en: 'Get the free guide' },
    },
    detailOverride: {
      title: { en: 'Understanding GEO in 2026' },
      excerpt: {
        en: 'GEO (Generative Engine Optimization) is the new discipline that determines whether AI engines recommend you or your competitors. Learn the fundamentals — and act now while the window is open.',
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
