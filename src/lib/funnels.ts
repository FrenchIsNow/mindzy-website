import type { Locale } from './i18n'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FunnelStep {
  num: string
  title: string
  desc: string
}

export interface FunnelBenefit {
  icon: 'star' | 'check' | 'bolt' | 'shield' | 'target' | 'chart'
  title: string
  desc: string
}

export interface FunnelTestimonial {
  quote: string
  author: string
  role: string
  result: string // specific measurable outcome
  initials: string
}

export interface FunnelValueItem {
  name: string
  value: number
}

export interface FunnelFAQItem {
  q: string
  a: string
}

export interface FunnelUpsell {
  title: string
  desc: string
  price: number
  cta: string
  link: string
}

export interface FunnelProduct {
  slug: string
  /** Price in euros */
  price: number
  /** Crossed-out original price (for anchoring) */
  originalPrice?: number
  currency: string
  /** How the product is delivered after purchase */
  deliveryType: 'pdf' | 'video' | 'link' | 'email'
  /** PDF path (e.g. /ebooks/my-product.pdf) or external URL */
  deliveryValue: string
  /** Image shown in hero + checkout summary */
  productImage: string

  // ── Copywriting per locale ───────────────────────────────────────────────

  hero: Record<Locale, {
    badge: string           // small label above headline ("Nouveau · Édition 2026")
    headline: string        // the hook — problem-focused or transformation
    subheadline: string     // who it's for + specific outcome
    cta: string             // primary button label ("Obtenir l'accès maintenant")
    urgency?: string        // scarcity line ("Seulement 47 exemplaires restants")
    socialProof?: string    // trust line ("1 240 praticiens font déjà confiance à Mindzy")
  }>

  problem: Record<Locale, {
    title: string
    intro: string           // empathetic opening paragraph
    bullets: string[]       // pain points (3-5 max)
    agitation: string       // consequence paragraph — what happens if they don't act
  }>

  solution: Record<Locale, {
    title: string
    body: string            // bridge — introduce product as the solution
    steps: FunnelStep[]     // how it works (3-5 steps)
  }>

  benefits: Record<Locale, {
    title: string
    intro: string
    items: FunnelBenefit[]  // outcome-focused (not feature-focused)
  }>

  testimonials: Record<Locale, FunnelTestimonial[]>

  valueStack: Record<Locale, {
    title: string
    items: FunnelValueItem[]
    totalValue: number
    yourPrice: number
    cta: string
  }>

  faq: Record<Locale, FunnelFAQItem[]>

  guarantee: Record<Locale, {
    days: number
    title: string
    body: string
  }>

  finalCta: Record<Locale, {
    title: string
    body: string
    cta: string
    urgency?: string
  }>

  /** Optional ISO date for the launch deadline countdown (e.g. "2026-04-30T23:59:59"). Falls back to weekly Sunday reset. */
  launchDeadline?: string

  /** Optional author block — founder credibility */
  author?: Record<Locale, {
    name: string
    title: string
    avatar?: string
    bio: string
    credentials: string[]
  }>

  /** Optional chapter preview / table of contents */
  chapters?: Record<Locale, {
    title: string
    intro: string
    items: { num: string; name: string; takeaway: string }[]
  }>

  /** Optional "who this is for / not for" qualifier */
  whoFor?: Record<Locale, {
    title: string
    forTitle: string
    forItems: string[]
    notForTitle: string
    notForItems: string[]
  }>

  /** Optional stronger guarantee bullets ("read first 2 chapters", etc.) */
  strongGuarantee?: Record<Locale, {
    badge: string
    title: string
    body: string
    bullets: string[]
  }>

  /** Optional exit-intent lead magnet offer (free checklist, etc.) */
  exitIntent?: Record<Locale, {
    title: string
    body: string
    cta: string
    declineText: string
  }>

  /** Optional comparison/anchor table (DIY vs Agency vs This product) */
  comparison?: Record<Locale, {
    title: string
    columns: { name: string; price: string; highlight?: boolean; rows: (string | boolean)[] }[]
    rowLabels: string[]
  }>

  /** Optional bonus stack (Hormozi-style with strikethrough perceived values) */
  bonusStack?: Record<Locale, {
    title: string
    intro: string
    items: { name: string; desc: string; value: number }[]
  }>

  /** Optional order bump shown on checkout (presumed-yes) */
  orderBump?: Record<Locale, {
    title: string
    desc: string
    price: number
  }>

  /** Optional one-click upsell shown on the thank-you page */
  upsell?: Record<Locale, FunnelUpsell>

  /** Labels for checkout & thank-you pages */
  checkout: Record<Locale, {
    title: string
    summary: string         // short product description in order box
    nameLabel: string
    emailLabel: string
    namePlaceholder: string
    emailPlaceholder: string
    paymentTitle: string
    submitBtn: string
    secureNote: string
    guaranteeNote: string
  }>

  thankyou: Record<Locale, {
    title: string
    body: string
    downloadBtn: string
    nextStepsTitle: string
    nextSteps: string[]
    upsellTitle?: string
    shareTitle: string
    shareBody: string
  }>
}

// ─── Helper ──────────────────────────────────────────────────────────────────

export function getFunnel(slug: string): FunnelProduct | undefined {
  return funnels.find(f => f.slug === slug)
}

export function getAllFunnelSlugs(): string[] {
  return funnels.map(f => f.slug)
}

// ─── Products ─────────────────────────────────────────────────────────────────
// To duplicate: copy one entry below, change the slug, and update the copy.
// The page routes are generated automatically from every entry in this array.

export const funnels: FunnelProduct[] = [

  // ─── PRODUCT 1 — Kit Présence Digitale Premium ────────────────────────────
  // Paid upgrade to the free ebook — deeper content, templates, scripts, etc.
  {
    slug: 'kit-presence-digitale-premium',
    price: 97,
    originalPrice: 197,
    currency: 'EUR',
    deliveryType: 'pdf',
    deliveryValue: '/ebooks/lancer-presence-digitale-2026.pdf',
    productImage: '/images/products/kit-presence-digitale.jpg',

    hero: {
      fr: {
        badge: 'Nouveau · Édition 2026',
        headline: 'Obtenez vos 5 premiers clients en ligne en 90 jours — ou remboursé.',
        subheadline: 'Le kit complet pour les thérapeutes et praticiens bien-être qui veulent une présence digitale professionnelle sans gaspiller des mois à tâtonner.',
        cta: 'Je veux mon kit maintenant →',
        urgency: 'Offre de lancement : -51 % jusqu\'à dimanche minuit.',
        socialProof: 'Déjà utilisé par 1 240+ praticiens en France, Belgique et Suisse.',
      },
      en: {
        badge: 'New · 2026 Edition',
        headline: 'Get your first 5 online clients in 90 days — or your money back.',
        subheadline: 'The complete kit for therapists and wellness practitioners who want a professional digital presence without wasting months figuring it out.',
        cta: 'I want my kit now →',
        urgency: 'Launch offer: -51% until Sunday midnight.',
        socialProof: 'Already used by 1,240+ practitioners in France, Belgium and Switzerland.',
      },
      es: {
        badge: 'Nuevo · Edición 2026',
        headline: 'Consigue tus primeros 5 clientes online en 90 días — o te devolvemos el dinero.',
        subheadline: 'El kit completo para terapeutas y practicantes de bienestar que quieren una presencia digital profesional sin perder meses buscando cómo hacerlo.',
        cta: 'Quiero mi kit ahora →',
        urgency: 'Oferta de lanzamiento: -51% hasta el domingo a medianoche.',
        socialProof: 'Ya utilizado por más de 1.240 practicantes en Francia, Bélgica y Suiza.',
      },
    },

    problem: {
      fr: {
        title: 'Vous avez une expertise précieuse. Vos clients potentiels ne vous trouvent pas.',
        intro: 'Vous pratiquez depuis des années. Vos patients repartent transformés. Votre travail est réel et profond. Mais en ligne, vous êtes invisible — et vous le savez.',
        bullets: [
          'Votre site web (si vous en avez un) ressemble à ceux de vos concurrents des années 2010.',
          'Vous postez sur les réseaux sociaux sans résultat et sans stratégie cohérente.',
          'Vous dépendez 100% du bouche-à-oreille et vivez dans l\'incertitude financière.',
          'Vous avez essayé de créer vous-même votre site mais c\'était trop technique.',
          'Vous n\'avez pas le budget pour une agence à 5 000 € et doutez du retour sur investissement.',
        ],
        agitation: 'Chaque mois qui passe sans présence professionnelle en ligne, c\'est 3 à 8 nouveaux clients potentiels que vous perdez au profit de confrères moins compétents mais mieux positionnés. En 12 mois, cela représente 36 à 96 consultations — soit entre 3 600 € et 9 600 € de chiffre d\'affaires que vous n\'encaisserez jamais.',
      },
      en: {
        title: 'You have valuable expertise. Your potential clients can\'t find you.',
        intro: 'You\'ve been practicing for years. Your patients leave transformed. Your work is real and deep. But online, you\'re invisible — and you know it.',
        bullets: [
          'Your website (if you have one) looks like your competitors\' from the 2010s.',
          'You post on social media without results and without a coherent strategy.',
          'You\'re 100% dependent on word-of-mouth and live with financial uncertainty.',
          'You tried building your own site but it was too technical.',
          'You don\'t have the budget for a €5,000 agency and doubt the return on investment.',
        ],
        agitation: 'Every month without a professional online presence is 3 to 8 potential new clients lost to less skilled but better-positioned colleagues. Over 12 months, that\'s 36 to 96 consultations — between €3,600 and €9,600 in revenue you\'ll never earn.',
      },
      es: {
        title: 'Tienes una experiencia valiosa. Tus clientes potenciales no te encuentran.',
        intro: 'Llevas años practicando. Tus pacientes se van transformados. Tu trabajo es real y profundo. Pero en línea, eres invisible — y lo sabes.',
        bullets: [
          'Tu sitio web (si tienes uno) parece de los competidores de los años 2010.',
          'Publicas en redes sociales sin resultados ni estrategia coherente.',
          'Dependes 100% del boca a boca y vives con incertidumbre financiera.',
          'Intentaste crear tu propio sitio pero era demasiado técnico.',
          'No tienes presupuesto para una agencia de 5.000€ y dudas del retorno de inversión.',
        ],
        agitation: 'Cada mes sin presencia profesional en línea son 3 a 8 potenciales nuevos clientes que pierdes a favor de colegas menos competentes pero mejor posicionados. En 12 meses, son 36 a 96 consultas — entre 3.600€ y 9.600€ de facturación que nunca ganarás.',
      },
    },

    solution: {
      fr: {
        title: 'Le Kit Présence Digitale Premium — tout ce qu\'il vous faut pour être visible dès cette semaine.',
        body: 'Nous avons condensé 3 ans d\'expérience avec 1 200+ praticiens dans un kit actionnable. Pas de théorie creuse — des templates, des scripts et un plan en 90 jours que vous pouvez appliquer immédiatement.',
        steps: [
          { num: '01', title: 'Téléchargez le kit complet', desc: 'Accès immédiat aux 147 pages, 12 templates et 3 scripts de prospection dès votre paiement confirmé.' },
          { num: '02', title: 'Suivez le plan 90 jours', desc: 'Chaque semaine a une mission précise. Semaine 1 : positionnement. Semaine 2 : site. Semaine 3 : contenu. Etc.' },
          { num: '03', title: 'Activez vos canaux d\'acquisition', desc: 'Utilisez les scripts prêts-à-l\'emploi pour votre page Google My Business, votre bio Instagram et vos premiers emails.' },
          { num: '04', title: 'Recevez vos premiers clients qualifiés', desc: 'Dès la semaine 3, vos prospects vous trouvent. Dès le mois 2, votre agenda commence à se remplir.' },
        ],
      },
      en: {
        title: 'The Digital Presence Premium Kit — everything you need to be visible this week.',
        body: 'We\'ve condensed 3 years of experience with 1,200+ practitioners into an actionable kit. No hollow theory — templates, scripts and a 90-day plan you can apply immediately.',
        steps: [
          { num: '01', title: 'Download the complete kit', desc: 'Immediate access to 147 pages, 12 templates and 3 prospecting scripts as soon as your payment is confirmed.' },
          { num: '02', title: 'Follow the 90-day plan', desc: 'Each week has a specific mission. Week 1: positioning. Week 2: website. Week 3: content. Etc.' },
          { num: '03', title: 'Activate your acquisition channels', desc: 'Use the ready-to-use scripts for your Google My Business page, your Instagram bio and your first emails.' },
          { num: '04', title: 'Receive your first qualified clients', desc: 'By week 3, prospects find you. By month 2, your calendar starts filling up.' },
        ],
      },
      es: {
        title: 'El Kit Presencia Digital Premium — todo lo que necesitas para ser visible esta semana.',
        body: 'Hemos condensado 3 años de experiencia con más de 1.200 practicantes en un kit accionable. Sin teoría vacía — plantillas, scripts y un plan de 90 días que puedes aplicar inmediatamente.',
        steps: [
          { num: '01', title: 'Descarga el kit completo', desc: 'Acceso inmediato a 147 páginas, 12 plantillas y 3 scripts de prospección en cuanto se confirme tu pago.' },
          { num: '02', title: 'Sigue el plan de 90 días', desc: 'Cada semana tiene una misión específica. Semana 1: posicionamiento. Semana 2: sitio web. Semana 3: contenido. Etc.' },
          { num: '03', title: 'Activa tus canales de adquisición', desc: 'Usa los scripts listos para tu página de Google My Business, tu bio de Instagram y tus primeros emails.' },
          { num: '04', title: 'Recibe tus primeros clientes cualificados', desc: 'En la semana 3, los prospectos te encuentran. En el mes 2, tu agenda empieza a llenarse.' },
        ],
      },
    },

    benefits: {
      fr: {
        title: 'Ce que vous obtenez exactement',
        intro: 'Pas des promesses vagues. Des livrables concrets qui changent la trajectoire de votre cabinet.',
        items: [
          { icon: 'bolt', title: 'Visibilité Google en 30 jours', desc: 'Le guide pas-à-pas pour apparaître dans les résultats locaux quand un patient cherche votre spécialité.' },
          { icon: 'target', title: 'Positionnement différenciant', desc: '3 frameworks pour définir votre niche, votre message et votre offre de façon à attirer vos clients idéaux.' },
          { icon: 'star', title: '12 templates prêts-à-copier', desc: 'Posts Instagram, email de bienvenue, page À propos, fiche Google My Business — tout est rédigé, vous n\'avez qu\'à personnaliser.' },
          { icon: 'chart', title: 'Système de conversion automatique', desc: 'Une séquence de 5 emails qui transforme vos abonnés curieux en patients qui prennent rendez-vous.' },
          { icon: 'shield', title: 'Méthode testée sur 1 200+ praticiens', desc: 'Ce n\'est pas de la théorie. Chaque conseil a été validé sur des cabinets comme le vôtre, en France, Belgique et Suisse.' },
          { icon: 'check', title: 'Plan 90 jours semaine par semaine', desc: 'Vous n\'avez jamais à vous demander "par où commencer". Chaque semaine est planifiée avec des actions précises et un budget réaliste.' },
        ],
      },
      en: {
        title: 'Exactly what you get',
        intro: 'No vague promises. Concrete deliverables that change your practice\'s trajectory.',
        items: [
          { icon: 'bolt', title: 'Google visibility in 30 days', desc: 'Step-by-step guide to appearing in local results when a patient searches for your specialty.' },
          { icon: 'target', title: 'Differentiating positioning', desc: '3 frameworks to define your niche, message and offer to attract your ideal clients.' },
          { icon: 'star', title: '12 ready-to-copy templates', desc: 'Instagram posts, welcome email, About page, Google My Business listing — everything is written, just personalize.' },
          { icon: 'chart', title: 'Automatic conversion system', desc: 'A 5-email sequence that transforms curious subscribers into patients who book appointments.' },
          { icon: 'shield', title: 'Method tested on 1,200+ practitioners', desc: 'Not theory. Every piece of advice has been validated on practices like yours, in France, Belgium and Switzerland.' },
          { icon: 'check', title: 'Week-by-week 90-day plan', desc: 'You never have to wonder "where do I start". Each week is planned with precise actions and a realistic budget.' },
        ],
      },
      es: {
        title: 'Exactamente lo que obtienes',
        intro: 'Sin promesas vagas. Entregables concretos que cambian la trayectoria de tu consulta.',
        items: [
          { icon: 'bolt', title: 'Visibilidad en Google en 30 días', desc: 'Guía paso a paso para aparecer en resultados locales cuando un paciente busca tu especialidad.' },
          { icon: 'target', title: 'Posicionamiento diferenciador', desc: '3 frameworks para definir tu nicho, mensaje y oferta para atraer a tus clientes ideales.' },
          { icon: 'star', title: '12 plantillas listas para copiar', desc: 'Posts de Instagram, email de bienvenida, página Sobre mí, ficha de Google My Business — todo está redactado, solo personaliza.' },
          { icon: 'chart', title: 'Sistema de conversión automático', desc: 'Una secuencia de 5 emails que transforma suscriptores curiosos en pacientes que reservan citas.' },
          { icon: 'shield', title: 'Método probado en 1.200+ practicantes', desc: 'No es teoría. Cada consejo ha sido validado en consultas como la tuya, en Francia, Bélgica y Suiza.' },
          { icon: 'check', title: 'Plan de 90 días semana a semana', desc: 'Nunca tienes que preguntarte "¿por dónde empiezo?". Cada semana está planificada con acciones precisas y un presupuesto realista.' },
        ],
      },
    },

    testimonials: {
      fr: [
        {
          quote: 'En 6 semaines j\'ai eu 4 nouveaux patients via Google. C\'était mort avant. Le guide est clair, actionnable, sans jargon inutile.',
          author: 'Sophie M.',
          role: 'Psychologue, Lyon',
          result: '+4 nouveaux patients en 6 semaines via Google',
          initials: 'SM',
        },
        {
          quote: 'J\'avais peur que ce soit trop "digital marketing" pour moi. Mais les templates sont vraiment prêts à l\'emploi. Mon agenda est plein pour la première fois depuis 3 ans.',
          author: 'Karim B.',
          role: 'Ostéopathe, Bordeaux',
          result: 'Agenda plein pour la première fois en 3 ans',
          initials: 'KB',
        },
        {
          quote: 'Le ROI est dingue. J\'ai payé 97 € et j\'ai récupéré ça en une seule consultation supplémentaire par mois. Le reste c\'est du bénéfice pur.',
          author: 'Anaïs R.',
          role: 'Naturopathe, Paris',
          result: 'ROI récupéré en 1 mois, +6 clients en 90 jours',
          initials: 'AR',
        },
      ],
      en: [
        {
          quote: 'In 6 weeks I had 4 new patients via Google. It was dead before. The guide is clear, actionable, without unnecessary jargon.',
          author: 'Sophie M.',
          role: 'Psychologist, Lyon',
          result: '+4 new patients in 6 weeks via Google',
          initials: 'SM',
        },
        {
          quote: 'I was afraid it would be too "digital marketing" for me. But the templates are truly ready to use. My calendar is full for the first time in 3 years.',
          author: 'Karim B.',
          role: 'Osteopath, Bordeaux',
          result: 'Full calendar for the first time in 3 years',
          initials: 'KB',
        },
        {
          quote: 'The ROI is crazy. I paid €97 and got it back in one extra consultation per month. The rest is pure profit.',
          author: 'Anaïs R.',
          role: 'Naturopath, Paris',
          result: 'ROI recovered in 1 month, +6 clients in 90 days',
          initials: 'AR',
        },
      ],
      es: [
        {
          quote: 'En 6 semanas tuve 4 nuevos pacientes vía Google. Antes era nada. La guía es clara, accionable, sin jerga innecesaria.',
          author: 'Sophie M.',
          role: 'Psicóloga, Lyon',
          result: '+4 nuevos pacientes en 6 semanas vía Google',
          initials: 'SM',
        },
        {
          quote: 'Tenía miedo de que fuera demasiado "marketing digital" para mí. Pero las plantillas están realmente listas para usar. Mi agenda está llena por primera vez en 3 años.',
          author: 'Karim B.',
          role: 'Osteópata, Burdeos',
          result: 'Agenda llena por primera vez en 3 años',
          initials: 'KB',
        },
        {
          quote: 'El ROI es increíble. Pagué 97€ y lo recuperé en una sola consulta adicional al mes. El resto es beneficio puro.',
          author: 'Anaïs R.',
          role: 'Naturópata, París',
          result: 'ROI recuperado en 1 mes, +6 clientes en 90 días',
          initials: 'AR',
        },
      ],
    },

    valueStack: {
      fr: {
        title: 'Ce que vous recevez — valeur totale : 582 €',
        items: [
          { name: 'Guide Présence Digitale 2026 (147 pages)', value: 97 },
          { name: '12 templates Instagram + Email + GMB', value: 147 },
          { name: '3 scripts de prospection prêts-à-l\'emploi', value: 97 },
          { name: 'Calculateur ROI présence digitale (Excel)', value: 47 },
          { name: 'Checklist SEO local (47 points)', value: 47 },
          { name: 'Plan 90 jours imprimable (PDF + Notion)', value: 97 },
          { name: 'Accès aux mises à jour pendant 12 mois', value: 50 },
        ],
        totalValue: 582,
        yourPrice: 97,
        cta: 'Je veux accéder au kit pour 97 €',
      },
      en: {
        title: 'What you receive — total value: €582',
        items: [
          { name: 'Digital Presence Guide 2026 (147 pages)', value: 97 },
          { name: '12 Instagram + Email + GMB templates', value: 147 },
          { name: '3 ready-to-use prospecting scripts', value: 97 },
          { name: 'Digital presence ROI calculator (Excel)', value: 47 },
          { name: 'Local SEO checklist (47 points)', value: 47 },
          { name: 'Printable 90-day plan (PDF + Notion)', value: 97 },
          { name: '12-month update access', value: 50 },
        ],
        totalValue: 582,
        yourPrice: 97,
        cta: 'I want the kit for €97',
      },
      es: {
        title: 'Lo que recibes — valor total: 582€',
        items: [
          { name: 'Guía Presencia Digital 2026 (147 páginas)', value: 97 },
          { name: '12 plantillas Instagram + Email + GMB', value: 147 },
          { name: '3 scripts de prospección listos para usar', value: 97 },
          { name: 'Calculadora ROI presencia digital (Excel)', value: 47 },
          { name: 'Checklist SEO local (47 puntos)', value: 47 },
          { name: 'Plan de 90 días imprimible (PDF + Notion)', value: 97 },
          { name: 'Acceso a actualizaciones durante 12 meses', value: 50 },
        ],
        totalValue: 582,
        yourPrice: 97,
        cta: 'Quiero el kit por 97€',
      },
    },

    faq: {
      fr: [
        { q: 'Pour qui est ce kit ?', a: 'Pour tout praticien en santé douce, bien-être ou thérapie qui veut attirer des clients en ligne sans dépenser une fortune. Que vous débutiez ou que vous ayez déjà un cabinet, les stratégies s\'adaptent à votre situation.' },
        { q: 'Est-ce que j\'ai besoin de compétences techniques ?', a: 'Non. Tout est expliqué pas à pas, sans jargon. Si vous pouvez utiliser Word et Instagram, vous pouvez appliquer ce kit. Nous avons des praticiens de 50+ ans qui ont tout mis en place seuls.' },
        { q: 'Combien de temps faut-il pour voir des résultats ?', a: 'Les premiers effets (trafic Google, engagement) arrivent en semaines 2-3. Les premiers nouveaux clients qualifiés arrivent généralement entre la semaine 4 et le mois 2. En 90 jours, vous avez un système qui tourne.' },
        { q: 'Quelle est la politique de remboursement ?', a: 'Vous avez 30 jours pour tester. Si vous appliquez au moins 3 semaines du plan et que vous n\'avez obtenu aucun résultat, nous vous remboursons intégralement. Sans questions.' },
        { q: 'Le kit est-il mis à jour ?', a: 'Oui. Vous avez accès aux mises à jour pendant 12 mois. Quand l\'algorithme Google change ou que de nouvelles fonctionnalités Instagram apparaissent, nous mettons le kit à jour et vous recevez la nouvelle version.' },
        { q: 'Je travaille déjà avec une agence. Ce kit est-il utile ?', a: 'Oui. Comprendre les bases vous permet de mieux travailler avec votre agence, d\'évaluer si leur travail est efficace, et de ne pas être dépendant d\'eux à 100 %.' },
      ],
      en: [
        { q: 'Who is this kit for?', a: 'For any practitioner in alternative health, wellness or therapy who wants to attract clients online without spending a fortune. Whether you\'re starting out or already have a practice, the strategies adapt to your situation.' },
        { q: 'Do I need technical skills?', a: 'No. Everything is explained step by step, without jargon. If you can use Word and Instagram, you can apply this kit. We have 50+ year old practitioners who set everything up on their own.' },
        { q: 'How long to see results?', a: 'First effects (Google traffic, engagement) arrive in weeks 2-3. First qualified new clients generally arrive between week 4 and month 2. In 90 days, you have a running system.' },
        { q: 'What is the refund policy?', a: 'You have 30 days to test. If you apply at least 3 weeks of the plan and get no results, we refund you in full. No questions asked.' },
        { q: 'Is the kit updated?', a: 'Yes. You have access to updates for 12 months. When the Google algorithm changes or new Instagram features appear, we update the kit and you receive the new version.' },
        { q: 'I already work with an agency. Is this kit useful?', a: 'Yes. Understanding the basics lets you work better with your agency, evaluate if their work is effective, and not be 100% dependent on them.' },
      ],
      es: [
        { q: '¿Para quién es este kit?', a: 'Para cualquier practicante en salud alternativa, bienestar o terapia que quiera atraer clientes en línea sin gastar una fortuna. Ya seas principiante o ya tengas una consulta, las estrategias se adaptan a tu situación.' },
        { q: '¿Necesito habilidades técnicas?', a: 'No. Todo se explica paso a paso, sin jerga. Si puedes usar Word e Instagram, puedes aplicar este kit. Tenemos practicantes de 50+ años que configuraron todo solos.' },
        { q: '¿Cuánto tiempo para ver resultados?', a: 'Los primeros efectos (tráfico de Google, engagement) llegan en las semanas 2-3. Los primeros clientes nuevos cualificados generalmente llegan entre la semana 4 y el mes 2. En 90 días, tienes un sistema funcionando.' },
        { q: '¿Cuál es la política de reembolso?', a: 'Tienes 30 días para probarlo. Si aplicas al menos 3 semanas del plan y no obtienes ningún resultado, te reembolsamos íntegramente. Sin preguntas.' },
        { q: '¿Se actualiza el kit?', a: 'Sí. Tienes acceso a las actualizaciones durante 12 meses. Cuando cambia el algoritmo de Google o aparecen nuevas funciones de Instagram, actualizamos el kit y recibes la nueva versión.' },
        { q: 'Ya trabajo con una agencia. ¿Es útil este kit?', a: 'Sí. Entender los fundamentos te permite trabajar mejor con tu agencia, evaluar si su trabajo es efectivo, y no depender de ellos al 100%.' },
      ],
    },

    guarantee: {
      fr: {
        days: 30,
        title: 'Garantie 30 jours — zéro risque',
        body: 'Appliquez le kit pendant 30 jours. Si vous suivez le plan 3 semaines minimum et que vous n\'observez aucune amélioration mesurable (trafic, leads, visibilité), envoyez-nous un email et nous vous remboursons l\'intégralité — sans délai, sans questions.',
      },
      en: {
        days: 30,
        title: '30-day guarantee — zero risk',
        body: 'Apply the kit for 30 days. If you follow the plan for at least 3 weeks and see no measurable improvement (traffic, leads, visibility), send us an email and we refund you in full — immediately, no questions asked.',
      },
      es: {
        days: 30,
        title: 'Garantía de 30 días — cero riesgo',
        body: 'Aplica el kit durante 30 días. Si sigues el plan mínimo 3 semanas y no observas ninguna mejora medible (tráfico, leads, visibilidad), envíanos un email y te reembolsamos íntegramente — sin demora, sin preguntas.',
      },
    },

    finalCta: {
      fr: {
        title: 'Votre prochain patient qualifié peut vous trouver cette semaine.',
        body: 'Chaque jour sans système en place est un jour où des patients cherchent quelqu\'un comme vous — et trouvent un concurrent.',
        cta: 'Obtenir le kit maintenant — 97 €',
        urgency: 'Prix de lancement : -51 % · Remonte à 197 € dimanche.',
      },
      en: {
        title: 'Your next qualified patient can find you this week.',
        body: 'Every day without a system in place is a day when patients search for someone like you — and find a competitor.',
        cta: 'Get the kit now — €97',
        urgency: 'Launch price: -51% · Goes back to €197 Sunday.',
      },
      es: {
        title: 'Tu próximo paciente cualificado puede encontrarte esta semana.',
        body: 'Cada día sin un sistema en marcha es un día en que los pacientes buscan a alguien como tú — y encuentran a un competidor.',
        cta: 'Obtener el kit ahora — 97€',
        urgency: 'Precio de lanzamiento: -51% · Vuelve a 197€ el domingo.',
      },
    },

    upsell: {
      fr: {
        title: 'Ajout recommandé : Site Web Pro livré en 4 semaines',
        desc: 'Vous avez le kit. Passez à la vitesse supérieure avec un site web professionnel conçu par l\'équipe Mindzy — optimisé SEO, connecté à votre système de prise de rendez-vous, livré en 4 semaines.',
        price: 123,
        cta: 'Ajouter le site web Pro (123 €/mois) →',
        link: '/fr/solutions/site-web',
      },
      en: {
        title: 'Recommended add-on: Pro Website delivered in 4 weeks',
        desc: 'You have the kit. Level up with a professional website designed by the Mindzy team — SEO optimized, connected to your booking system, delivered in 4 weeks.',
        price: 123,
        cta: 'Add Pro website (€123/month) →',
        link: '/en/solutions/site-web',
      },
      es: {
        title: 'Complemento recomendado: Sitio web Pro entregado en 4 semanas',
        desc: 'Tienes el kit. Sube de nivel con un sitio web profesional diseñado por el equipo Mindzy — SEO optimizado, conectado a tu sistema de reservas, entregado en 4 semanas.',
        price: 123,
        cta: 'Añadir sitio web Pro (123€/mes) →',
        link: '/es/solutions/site-web',
      },
    },

    comparison: {
      fr: {
        title: 'Comparez vos options',
        rowLabels: [
          'Site web professionnel',
          'Stratégie de contenu',
          'Templates prêts-à-l\'emploi',
          'Plan d\'action 90 jours',
          'Méthode validée sur 1 200+ praticiens',
          'Délai pour démarrer',
          'Garantie résultats',
        ],
        columns: [
          { name: 'Le faire seul', price: '0 €', rows: [false, false, false, false, false, '6-12 mois', false] },
          { name: 'Agence classique', price: '5 000 €+', rows: [true, false, false, false, false, '2-3 mois', false] },
          { name: 'Kit Premium', price: '97 €', highlight: true, rows: [true, true, true, true, true, 'Aujourd\'hui', true] },
        ],
      },
      en: {
        title: 'Compare your options',
        rowLabels: [
          'Professional website',
          'Content strategy',
          'Ready-to-use templates',
          '90-day action plan',
          'Method validated on 1,200+ practitioners',
          'Time to start',
          'Results guarantee',
        ],
        columns: [
          { name: 'Do it alone', price: '€0', rows: [false, false, false, false, false, '6-12 months', false] },
          { name: 'Classic agency', price: '€5,000+', rows: [true, false, false, false, false, '2-3 months', false] },
          { name: 'Premium Kit', price: '€97', highlight: true, rows: [true, true, true, true, true, 'Today', true] },
        ],
      },
      es: {
        title: 'Compara tus opciones',
        rowLabels: [
          'Sitio web profesional',
          'Estrategia de contenido',
          'Plantillas listas para usar',
          'Plan de acción de 90 días',
          'Método validado con más de 1.200 practicantes',
          'Tiempo para empezar',
          'Garantía de resultados',
        ],
        columns: [
          { name: 'Hazlo solo', price: '0 €', rows: [false, false, false, false, false, '6-12 meses', false] },
          { name: 'Agencia clásica', price: '5.000 €+', rows: [true, false, false, false, false, '2-3 meses', false] },
          { name: 'Kit Premium', price: '97 €', highlight: true, rows: [true, true, true, true, true, 'Hoy', true] },
        ],
      },
    },

    bonusStack: {
      fr: {
        title: 'Et 4 bonus offerts (valeur 488 €)',
        intro: 'Pour les commandes passées avant dimanche minuit uniquement.',
        items: [
          { name: 'BONUS #1 — Pack 50 visuels Canva', desc: 'Templates Instagram et stories prêts à personnaliser à vos couleurs.', value: 97 },
          { name: 'BONUS #2 — Scripts de prospection LinkedIn', desc: '12 messages testés qui décrochent des rendez-vous sans paraître commercial.', value: 147 },
          { name: 'BONUS #3 — Calculateur de tarifs', desc: 'Le tableur qui calcule votre tarif optimal selon votre marché et vos charges.', value: 67 },
          { name: 'BONUS #4 — Audit vidéo personnalisé', desc: 'Vous nous envoyez votre site, on enregistre une vidéo de 15 min avec nos recommandations.', value: 177 },
        ],
      },
      en: {
        title: 'Plus 4 free bonuses (value €488)',
        intro: 'For orders placed before Sunday midnight only.',
        items: [
          { name: 'BONUS #1 — 50 Canva visuals pack', desc: 'Instagram and story templates ready to customize in your brand colors.', value: 97 },
          { name: 'BONUS #2 — LinkedIn prospecting scripts', desc: '12 tested messages that book meetings without sounding salesy.', value: 147 },
          { name: 'BONUS #3 — Pricing calculator', desc: 'The spreadsheet that calculates your optimal rate based on your market and costs.', value: 67 },
          { name: 'BONUS #4 — Personalized video audit', desc: 'Send us your site, we record a 15-min video with our recommendations.', value: 177 },
        ],
      },
      es: {
        title: 'Y 4 bonos gratuitos (valor 488€)',
        intro: 'Solo para pedidos realizados antes del domingo a medianoche.',
        items: [
          { name: 'BONO #1 — Pack 50 visuales Canva', desc: 'Plantillas de Instagram y stories listas para personalizar con tus colores.', value: 97 },
          { name: 'BONO #2 — Scripts de prospección LinkedIn', desc: '12 mensajes probados que consiguen reuniones sin parecer comercial.', value: 147 },
          { name: 'BONO #3 — Calculadora de tarifas', desc: 'La hoja que calcula tu tarifa óptima según tu mercado y gastos.', value: 67 },
          { name: 'BONO #4 — Auditoría en vídeo personalizada', desc: 'Nos envías tu sitio y grabamos un vídeo de 15 min con nuestras recomendaciones.', value: 177 },
        ],
      },
    },

    orderBump: {
      fr: {
        title: 'Oui, ajoutez le Support Premium 30 jours (+27 €)',
        desc: 'Posez toutes vos questions par email pendant 30 jours, réponse en moins de 24h. Recommandé par 87% des acheteurs.',
        price: 27,
      },
      en: {
        title: 'Yes, add 30-day Premium Support (+€27)',
        desc: 'Ask all your questions by email for 30 days, reply within 24h. Recommended by 87% of buyers.',
        price: 27,
      },
      es: {
        title: 'Sí, añade Soporte Premium 30 días (+27€)',
        desc: 'Haz todas tus preguntas por email durante 30 días, respuesta en menos de 24h. Recomendado por el 87% de los compradores.',
        price: 27,
      },
    },

    checkout: {
      fr: {
        title: 'Finaliser votre commande',
        summary: 'Kit Présence Digitale Premium 2026 — accès immédiat',
        nameLabel: 'Prénom & Nom',
        emailLabel: 'Email',
        namePlaceholder: 'Marie Dupont',
        emailPlaceholder: 'marie@cabinet.fr',
        paymentTitle: 'Paiement sécurisé',
        submitBtn: 'Confirmer et accéder au kit →',
        secureNote: 'Paiement 100% sécurisé · SSL · Vos données ne sont jamais partagées',
        guaranteeNote: 'Satisfait ou remboursé 30 jours',
      },
      en: {
        title: 'Complete your order',
        summary: 'Digital Presence Premium Kit 2026 — immediate access',
        nameLabel: 'First & Last Name',
        emailLabel: 'Email',
        namePlaceholder: 'John Smith',
        emailPlaceholder: 'john@practice.com',
        paymentTitle: 'Secure payment',
        submitBtn: 'Confirm and access the kit →',
        secureNote: '100% secure payment · SSL · Your data is never shared',
        guaranteeNote: '30-day money-back guarantee',
      },
      es: {
        title: 'Finalizar tu pedido',
        summary: 'Kit Presencia Digital Premium 2026 — acceso inmediato',
        nameLabel: 'Nombre y Apellido',
        emailLabel: 'Email',
        namePlaceholder: 'María García',
        emailPlaceholder: 'maria@consultorio.es',
        paymentTitle: 'Pago seguro',
        submitBtn: 'Confirmar y acceder al kit →',
        secureNote: 'Pago 100% seguro · SSL · Tus datos nunca se comparten',
        guaranteeNote: 'Garantía de devolución de 30 días',
      },
    },

    thankyou: {
      fr: {
        title: 'Bienvenue dans le kit ! 🎉',
        body: 'Votre paiement est confirmé. Votre kit complet est prêt à être téléchargé. Vérifiez également votre boîte email — nous vous avons envoyé le lien de téléchargement et vos accès.',
        downloadBtn: 'Télécharger mon kit maintenant',
        nextStepsTitle: 'Par où commencer ?',
        nextSteps: [
          'Commencez par lire la section "Positionnement" (pages 8-24) — c\'est la base de tout.',
          'Remplissez le tableau de positionnement en page 18 avant de faire quoi que ce soit d\'autre.',
          'Configurez votre fiche Google My Business cette semaine (checklist p.47).',
          'Rejoignez le groupe WhatsApp privé (lien en page 3 du guide) pour poser vos questions.',
        ],
        upsellTitle: 'Envie d\'aller encore plus vite ?',
        shareTitle: 'Partagez, aidez un confrère',
        shareBody: 'Si ce kit vous a été utile, partagez-le à un confrère ou collègue. Chaque partage nous aide à créer du contenu encore plus actionnable.',
      },
      en: {
        title: 'Welcome to the kit! 🎉',
        body: 'Your payment is confirmed. Your complete kit is ready to download. Also check your email — we sent you the download link and your access.',
        downloadBtn: 'Download my kit now',
        nextStepsTitle: 'Where to start?',
        nextSteps: [
          'Start by reading the "Positioning" section (pages 8-24) — it\'s the foundation of everything.',
          'Fill in the positioning table on page 18 before doing anything else.',
          'Set up your Google My Business listing this week (checklist p.47).',
          'Join the private WhatsApp group (link on page 3 of the guide) to ask your questions.',
        ],
        upsellTitle: 'Want to go even faster?',
        shareTitle: 'Share, help a colleague',
        shareBody: 'If this kit was useful to you, share it with a colleague. Every share helps us create even more actionable content.',
      },
      es: {
        title: '¡Bienvenido al kit! 🎉',
        body: 'Tu pago está confirmado. Tu kit completo está listo para descargar. También revisa tu email — te enviamos el enlace de descarga y tus accesos.',
        downloadBtn: 'Descargar mi kit ahora',
        nextStepsTitle: '¿Por dónde empezar?',
        nextSteps: [
          'Empieza leyendo la sección "Posicionamiento" (páginas 8-24) — es la base de todo.',
          'Rellena la tabla de posicionamiento en la página 18 antes de hacer cualquier otra cosa.',
          'Configura tu ficha de Google My Business esta semana (checklist p.47).',
          'Únete al grupo privado de WhatsApp (enlace en la página 3 de la guía) para hacer tus preguntas.',
        ],
        upsellTitle: '¿Quieres ir aún más rápido?',
        shareTitle: 'Comparte, ayuda a un colega',
        shareBody: 'Si este kit te fue útil, compártelo con un colega. Cada compartición nos ayuda a crear contenido aún más accionable.',
      },
    },
  },

  // ─── PRODUCT 2 — Guide Expert SEO + GEO 2026 ──────────────────────────────
  {
    slug: 'guide-seo-geo-expert',
    price: 9.99,
    originalPrice: 47,
    currency: 'EUR',
    deliveryType: 'pdf',
    deliveryValue: '/ebooks/seo-geo-expert-guide.pdf',
    productImage: '/images/products/guide-seo-geo.jpg',
    launchDeadline: '2026-04-30T23:59:59',

    author: {
      fr: {
        name: 'L\'équipe Mindzy',
        title: 'Agence SEO + GEO',
        bio: 'Depuis 2022, on a aidé 1 240+ entrepreneurs, coachs, freelances et indépendants à être trouvés sur Google. En 2025, on a été parmi les premiers à tester le GEO sur 80+ sites — voici exactement ce qui marche.',
        credentials: ['1 240+ clients accompagnés', '80+ sites optimisés GEO en 2025', '12+ citations ChatGPT / mois en moyenne'],
      },
      en: {
        name: 'The Mindzy team',
        title: 'SEO + GEO agency',
        bio: 'Since 2022, we\'ve helped 1,240+ entrepreneurs, coaches, freelancers and independents get found on Google. In 2025, we were among the first to test GEO on 80+ sites — here\'s exactly what works.',
        credentials: ['1,240+ clients supported', '80+ sites GEO-optimized in 2025', '12+ ChatGPT citations / month average'],
      },
      es: {
        name: 'El equipo Mindzy',
        title: 'Agencia SEO + GEO',
        bio: 'Desde 2022, hemos ayudado a 1.240+ emprendedores, coaches, freelancers e independientes a ser encontrados en Google. En 2025, fuimos de los primeros en probar GEO en 80+ sitios — aquí está exactamente lo que funciona.',
        credentials: ['1.240+ clientes acompañados', '80+ sitios optimizados GEO en 2025', '12+ citas ChatGPT / mes promedio'],
      },
    },

    chapters: {
      fr: {
        title: 'Ce qu\'il y a à l\'intérieur — 11 chapitres, 40 pages',
        intro: 'Pas de remplissage. Chaque chapitre se termine par une action concrète à appliquer le jour même.',
        items: [
          { num: '01', name: 'Comprendre le GEO — définitions et fondements', takeaway: 'GEO vs SEO vs AEO : les différences clés et comment fonctionnent les moteurs génératifs' },
          { num: '02', name: 'Les 7 piliers du GEO et le Framework RACE', takeaway: 'La boussole stratégique pour rendre votre contenu récupérable, citable et extractible' },
          { num: '03', name: 'Stratégie de contenu GEO', takeaway: 'Architecture Pillar Page + Topic Cluster, règle des 60 premiers mots, stratégies par profil' },
          { num: '04', name: 'GEO Technique — Schema Markup', takeaway: 'Checklist d\'audit technique : exactement quoi mettre, exactement où pour être lu par les IA' },
          { num: '05', name: 'Où publier pour être cité par les IA', takeaway: 'La pyramide des sources citées par les LLM et le planning de publication recommandé' },
          { num: '06', name: 'Mesurer le GEO — KPI et outils 2026', takeaway: 'Les nouveaux indicateurs de visibilité IA et comment les suivre dans GA4 et les outils spécialisés' },
          { num: '07', name: 'Roadmap 90 jours et budget GEO', takeaway: 'Un plan d\'action semaine par semaine adapté à chaque taille d\'organisation' },
          { num: '08', name: 'Cas pratiques — Freelance, Startup, Grand groupe', takeaway: 'Scénarios réels pour appliquer le GEO selon votre profil' },
        ],
      },
      en: {
        title: 'What\'s inside — 11 chapters, 40 pages',
        intro: 'No filler. Every chapter ends with a concrete action you can apply the same day.',
        items: [
          { num: '01', name: 'Understanding GEO — definitions and foundations', takeaway: 'GEO vs SEO vs AEO: key differences and how generative engines work' },
          { num: '02', name: 'The 7 GEO pillars and the RACE Framework', takeaway: 'The strategic compass to make your content retrievable, citable, and extractable' },
          { num: '03', name: 'GEO content strategy', takeaway: 'Pillar Page + Topic Cluster architecture, the 60-first-words rule, strategies by profile' },
          { num: '04', name: 'GEO Technical — Schema Markup', takeaway: 'Technical audit checklist: exactly what to add and where to be read by AIs' },
          { num: '05', name: 'Where to publish to get cited by AIs', takeaway: 'The pyramid of sources cited by LLMs and the recommended publishing schedule' },
          { num: '06', name: 'Measuring GEO — 2026 KPIs and tools', takeaway: 'New indicators to track and how to monitor AI traffic in GA4 and specialized tools' },
          { num: '07', name: '90-day roadmap and GEO budget', takeaway: 'A week-by-week action plan adapted to every organization size' },
          { num: '08', name: 'Case studies — Freelancer, Startup, Enterprise', takeaway: 'Real scenarios to apply GEO according to your profile' },
        ],
      },
      es: {
        title: 'Lo que hay dentro — 11 capítulos, 40 páginas',
        intro: 'Sin relleno. Cada capítulo termina con una acción concreta que puedes aplicar el mismo día.',
        items: [
          { num: '01', name: 'Comprender el GEO — definiciones y fundamentos', takeaway: 'GEO vs SEO vs AEO: diferencias clave y cómo funcionan los motores generativos' },
          { num: '02', name: 'Los 7 pilares del GEO y el Framework RACE', takeaway: 'La brújula estratégica para hacer tu contenido recuperable, citable y extraíble' },
          { num: '03', name: 'Estrategia de contenido GEO', takeaway: 'Arquitectura Pillar Page + Topic Cluster, regla de los 60 primeros palabras, estrategias por perfil' },
          { num: '04', name: 'GEO Técnico — Schema Markup', takeaway: 'Checklist de auditoría técnica: exactamente qué añadir y dónde para ser leído por las IAs' },
          { num: '05', name: 'Dónde publicar para ser citado por las IAs', takeaway: 'La pirámide de fuentes citadas por los LLMs y el calendario de publicación recomendado' },
          { num: '06', name: 'Medir el GEO — KPIs y herramientas 2026', takeaway: 'Los nuevos indicadores de visibilidad IA y cómo rastrear el tráfico IA en GA4 y herramientas especializadas' },
          { num: '07', name: 'Hoja de ruta 90 días y presupuesto GEO', takeaway: 'Un plan de acción semana a semana adaptado a cada tamaño de organización' },
          { num: '08', name: 'Casos prácticos — Freelance, Startup, Gran empresa', takeaway: 'Escenarios reales para aplicar el GEO según tu perfil' },
        ],
      },
    },

    whoFor: {
      fr: {
        title: 'Ce guide est-il pour vous ?',
        forTitle: 'Pour vous si...',
        forItems: [
          'Vous êtes entrepreneur, coach, freelance, consultant ou indépendant.',
          'Vous avez déjà un site mais peu (ou pas) de visibilité.',
          'Vous voulez agir vous-même sans payer 3 000 € à une agence.',
          'Vous êtes prêt à passer 2-3h par semaine pendant 60 jours pour appliquer le guide.',
        ],
        notForTitle: 'Pas pour vous si...',
        notForItems: [
          'Vous cherchez une solution magique qui marche sans rien faire.',
          'Vous n\'avez pas encore de site web.',
          'Vous n\'avez aucune intention de produire du contenu sur votre site.',
        ],
      },
      en: {
        title: 'Is this guide for you?',
        forTitle: 'For you if...',
        forItems: [
          'You\'re an entrepreneur, coach, freelancer, consultant or independent.',
          'You already have a site but little (or no) visibility.',
          'You want to act yourself without paying €3,000 to an agency.',
          'You\'re ready to spend 2-3h per week for 60 days applying the guide.',
        ],
        notForTitle: 'Not for you if...',
        notForItems: [
          'You\'re looking for a magic fix that works without effort.',
          'You don\'t have a website yet.',
          'You have no intention of producing content on your site.',
        ],
      },
      es: {
        title: '¿Esta guía es para ti?',
        forTitle: 'Para ti si...',
        forItems: [
          'Eres emprendedor, coach, freelancer, consultor o independiente.',
          'Ya tienes un sitio pero poca (o ninguna) visibilidad.',
          'Quieres actuar tú mismo sin pagar 3.000 € a una agencia.',
          'Estás listo para dedicar 2-3h por semana durante 60 días aplicando la guía.',
        ],
        notForTitle: 'No es para ti si...',
        notForItems: [
          'Buscas una solución mágica que funcione sin esfuerzo.',
          'Aún no tienes sitio web.',
          'No tienes ninguna intención de producir contenido en tu sitio.',
        ],
      },
    },

    exitIntent: {
      fr: {
        title: 'Attendez — récupérez la checklist GEO gratuite',
        body: 'Avant de partir : la checklist d\'audit GEO en 12 points (extrait du guide). Aucun engagement, juste votre email.',
        cta: 'Recevoir la checklist gratuite',
        declineText: 'Non merci, je préfère partir sans',
      },
      en: {
        title: 'Wait — grab the free GEO checklist',
        body: 'Before you go: the 12-point GEO audit checklist (extract from the guide). No commitment, just your email.',
        cta: 'Get the free checklist',
        declineText: 'No thanks, I\'ll leave without it',
      },
      es: {
        title: 'Espera — llévate la checklist GEO gratis',
        body: 'Antes de irte: la checklist de auditoría GEO de 12 puntos (extracto de la guía). Sin compromiso, solo tu email.',
        cta: 'Recibir la checklist gratis',
        declineText: 'No gracias, prefiero irme',
      },
    },

    hero: {
      fr: {
        badge: 'Guide Expert · 2026',
        headline: 'Faites-vous citer par ChatGPT et Google quand un client cherche ce que vous proposez.',
        subheadline: 'Le guide complet SEO + GEO (Generative Engine Optimization) pour être trouvé en 2026 — par les humains et par les IA.',
        cta: 'Obtenir le guide maintenant →',
        urgency: 'Offre de lancement : -79 % jusqu\'à dimanche minuit.',
        socialProof: '320+ clients utilisent déjà ce guide pour dominer Google et les IA.',
      },
      en: {
        badge: 'Expert Guide · 2026',
        headline: 'Get cited by ChatGPT and Google when a client searches for what you offer.',
        subheadline: 'The complete SEO + GEO (Generative Engine Optimization) guide to be found in 2026 — by humans and AIs.',
        cta: 'Get the guide now →',
        urgency: 'Launch offer: -79% until Sunday midnight.',
        socialProof: '320+ clients already use this guide to dominate Google and AIs.',
      },
      es: {
        badge: 'Guía Experta · 2026',
        headline: 'Que ChatGPT y Google te citen cuando un cliente busque lo que ofreces.',
        subheadline: 'La guía completa SEO + GEO (Generative Engine Optimization) para ser encontrado en 2026 — por humanos e IAs.',
        cta: 'Obtener la guía ahora →',
        urgency: 'Oferta de lanzamiento: -79% hasta el domingo a medianoche.',
        socialProof: 'Más de 320 clientes ya usan esta guía para dominar Google e IAs.',
      },
    },

    problem: {
      fr: {
        title: 'Vos futurs clients ne tapent plus dans Google. Ils demandent à ChatGPT.',
        intro: 'Le SEO classique ne suffit plus. Près d\'un internaute sur deux passe désormais par une IA pour chercher un service — et si votre site n\'est pas optimisé pour ces IA, vous êtes invisible pour la moitié de votre marché.',
        bullets: [
          'Vous êtes peut-être bien classé dans Google… mais ChatGPT ne vous cite jamais.',
          'Vous ne savez pas ce qu\'est le GEO (Generative Engine Optimization).',
          'Votre contenu est rédigé pour les humains, pas pour être ingéré par les IA.',
          'Vous regardez vos concurrents se faire recommander par ChatGPT pendant que votre site stagne.',
        ],
        agitation: 'Chaque mois, le pourcentage de clients qui passent par une IA augmente. Dans 12 mois, si vous ne basculez pas votre stratégie maintenant, ce sera 70 % de votre marché qui ne vous trouvera jamais — quoi que vous fassiez sur Google.',
      },
      en: {
        title: 'Your future clients don\'t type into Google anymore. They ask ChatGPT.',
        intro: 'Classic SEO isn\'t enough. Nearly 1 in 2 people now search for a service through an AI — and if your site isn\'t optimized for those AIs, you\'re invisible to half your market.',
        bullets: [
          'You might rank well on Google… but ChatGPT never cites you.',
          'You don\'t know what GEO (Generative Engine Optimization) is.',
          'Your content is written for humans, not to be ingested by AIs.',
          'You watch competitors get recommended by ChatGPT while your site stagnates.',
        ],
        agitation: 'Every month, the share of clients going through an AI grows. In 12 months, if you don\'t pivot now, 70% of your market will never find you — no matter what you do on Google.',
      },
      es: {
        title: 'Tus futuros clientes ya no escriben en Google. Le preguntan a ChatGPT.',
        intro: 'El SEO clásico ya no basta. Casi 1 de cada 2 personas ahora busca un servicio a través de una IA — y si tu sitio no está optimizado para esas IAs, eres invisible para la mitad de tu mercado.',
        bullets: [
          'Puede que tengas buen ranking en Google… pero ChatGPT nunca te cita.',
          'No sabes qué es el GEO (Generative Engine Optimization).',
          'Tu contenido está escrito para humanos, no para ser ingerido por IAs.',
          'Ves a tus competidores recibir recomendaciones de ChatGPT mientras tu sitio se estanca.',
        ],
        agitation: 'Cada mes crece el porcentaje de clientes que pasan por una IA. En 12 meses, si no pivotas ahora, el 70% de tu mercado nunca te encontrará — hagas lo que hagas en Google.',
      },
    },

    solution: {
      fr: {
        title: 'Le Guide Expert SEO + GEO 2026 — la double stratégie pour dominer Google et les IA.',
        body: 'Un guide opérationnel de 40 pages qui vous montre exactement comment rédiger, structurer et optimiser votre contenu pour être trouvé partout — Google, ChatGPT, Perplexity, Claude, Gemini.',
        steps: [
          { num: '01', title: 'Téléchargez le guide PDF', desc: 'Accès immédiat au guide PDF 40 pages : 11 chapitres, framework RACE, roadmap 90 jours et checklist d\'audit GEO.' },
          { num: '02', title: 'Auditez votre site en 30 minutes', desc: 'La checklist d\'audit GEO qui révèle exactement ce que les IA voient (et ne voient pas) sur votre site.' },
          { num: '03', title: 'Réécrivez vos pages clés', desc: 'Avec le framework RACE, transformez vos pages existantes pour qu\'elles soient citées par les IA.' },
          { num: '04', title: 'Mesurez votre visibilité IA', desc: 'Suivez chaque semaine combien de fois vous êtes cité par ChatGPT et les autres LLM.' },
        ],
      },
      en: {
        title: 'The Expert SEO + GEO 2026 Guide — the dual strategy to dominate Google and AIs.',
        body: 'A 40-page operational guide that shows you exactly how to write, structure and optimize content to be found everywhere — Google, ChatGPT, Perplexity, Claude, Gemini.',
        steps: [
          { num: '01', title: 'Download the PDF guide', desc: 'Immediate access to the 40-page PDF guide: 11 chapters, RACE framework, 90-day roadmap and GEO audit checklist.' },
          { num: '02', title: 'Audit your site in 30 minutes', desc: 'The GEO audit checklist that reveals exactly what AIs see (and don\'t see) on your site.' },
          { num: '03', title: 'Rewrite your key pages', desc: 'With the RACE framework, transform your existing pages so they get cited by AIs.' },
          { num: '04', title: 'Measure your AI visibility', desc: 'Track weekly how often you\'re cited by ChatGPT and other LLMs.' },
        ],
      },
      es: {
        title: 'La Guía Experta SEO + GEO 2026 — la doble estrategia para dominar Google e IAs.',
        body: 'Una guía operativa de 40 páginas que te muestra exactamente cómo escribir, estructurar y optimizar tu contenido para ser encontrado en todas partes — Google, ChatGPT, Perplexity, Claude, Gemini.',
        steps: [
          { num: '01', title: 'Descarga la guía PDF', desc: 'Acceso inmediato a la guía PDF de 40 páginas: 11 capítulos, framework RACE, hoja de ruta 90 días y checklist de auditoría GEO.' },
          { num: '02', title: 'Audita tu sitio en 30 minutos', desc: 'La checklist de auditoría GEO que revela exactamente lo que las IAs ven (y no ven) en tu sitio.' },
          { num: '03', title: 'Reescribe tus páginas clave', desc: 'Con el framework RACE, transforma tus páginas existentes para que las IAs las citen.' },
          { num: '04', title: 'Mide tu visibilidad en IAs', desc: 'Sigue semanalmente cuántas veces te cita ChatGPT y otros LLMs.' },
        ],
      },
    },

    benefits: {
      fr: {
        title: 'Ce que vous obtenez exactement',
        intro: 'Pas de théorie. Des frameworks testés, des templates prêts-à-copier, et un plan d\'action clair.',
        items: [
          { icon: 'bolt', title: 'Citations dans ChatGPT en 60 jours', desc: 'La méthode pas-à-pas pour passer de 0 à 12+ citations par mois dans les principaux LLM.' },
          { icon: 'target', title: 'Framework RACE du GEO', desc: 'La boussole stratégique en 4 dimensions : Retrievability, Authoritativeness, Citability, Extractability.' },
          { icon: 'check', title: 'Checklist d\'audit GEO technique', desc: 'Auditez votre site en 30 minutes et identifiez chaque point bloquant pour les IA.' },
          { icon: 'chart', title: 'KPI et outils de mesure 2026', desc: 'Les nouveaux indicateurs de visibilité IA et comment les suivre dans GA4 et les outils spécialisés.' },
          { icon: 'star', title: 'Roadmap 90 jours + budget par profil', desc: 'Un plan d\'action concret adapté aux freelances, startups, PME et grandes entreprises.' },
          { icon: 'shield', title: 'Mises à jour gratuites à vie', desc: 'Le GEO évolue vite. Vous recevez chaque nouvelle édition gratuitement.' },
        ],
      },
      en: {
        title: 'Exactly what you get',
        intro: 'No theory. Tested frameworks, ready-to-copy templates, and a clear action plan.',
        items: [
          { icon: 'bolt', title: 'Citations in ChatGPT in 60 days', desc: 'The step-by-step method to go from 0 to 12+ citations per month in major LLMs.' },
          { icon: 'target', title: 'GEO RACE Framework', desc: 'The strategic compass in 4 dimensions: Retrievability, Authoritativeness, Citability, Extractability.' },
          { icon: 'check', title: 'GEO technical audit checklist', desc: 'Audit your site in 30 minutes and identify every blocker for AIs.' },
          { icon: 'chart', title: '2026 KPIs and measurement tools', desc: 'New AI visibility metrics and how to track them in GA4 and specialized tools.' },
          { icon: 'star', title: '90-day roadmap + budget by profile', desc: 'A concrete action plan tailored to freelancers, startups, SMBs and enterprises.' },
          { icon: 'shield', title: 'Free lifetime updates', desc: 'GEO evolves fast. You get every new edition for free.' },
        ],
      },
      es: {
        title: 'Exactamente lo que obtienes',
        intro: 'Sin teoría. Frameworks probados, plantillas listas para copiar y un plan de acción claro.',
        items: [
          { icon: 'bolt', title: 'Citas en ChatGPT en 60 días', desc: 'El método paso a paso para pasar de 0 a 12+ citas mensuales en los principales LLMs.' },
          { icon: 'target', title: 'Framework RACE del GEO', desc: 'La brújula estratégica en 4 dimensiones: Retrievability, Authoritativeness, Citability, Extractability.' },
          { icon: 'check', title: 'Checklist de auditoría GEO técnica', desc: 'Audita tu sitio en 30 minutos e identifica cada bloqueo para las IAs.' },
          { icon: 'chart', title: 'KPIs y herramientas de medición 2026', desc: 'Los nuevos indicadores de visibilidad IA y cómo seguirlos en GA4 y herramientas especializadas.' },
          { icon: 'star', title: 'Hoja de ruta 90 días + presupuesto por perfil', desc: 'Un plan de acción concreto adaptado a freelances, startups, pymes y grandes empresas.' },
          { icon: 'shield', title: 'Actualizaciones gratis de por vida', desc: 'El GEO evoluciona rápido. Recibes cada nueva edición gratis.' },
        ],
      },
    },

    testimonials: {
      fr: [
        { quote: 'En 6 semaines, je suis passée de 0 à 8 citations dans ChatGPT par mois. Mon agenda est plein.', author: 'Camille R.', role: 'Coach business, Lyon', result: '+8 citations IA / mois', initials: 'CR' },
        { quote: 'Le framework GEO a changé ma façon de rédiger. Mes articles sont maintenant cités par Perplexity.', author: 'Thomas B.', role: 'Consultant freelance, Bordeaux', result: 'Cité par 3 LLM', initials: 'TB' },
        { quote: 'Investissement rentabilisé dès le premier mois. Aujourd\'hui, 40% de mes nouveaux clients viennent d\'une IA.', author: 'Élise M.', role: 'Fondatrice agence, Paris', result: '40% des clients via IA', initials: 'EM' },
      ],
      en: [
        { quote: 'In 6 weeks I went from 0 to 8 citations in ChatGPT per month. My calendar is full.', author: 'Camille R.', role: 'Business coach, Lyon', result: '+8 AI citations / month', initials: 'CR' },
        { quote: 'The GEO framework changed how I write. My articles now get cited by Perplexity.', author: 'Thomas B.', role: 'Freelance consultant, Bordeaux', result: 'Cited by 3 LLMs', initials: 'TB' },
        { quote: 'Paid for itself in the first month. Today, 40% of my new clients come from an AI.', author: 'Élise M.', role: 'Agency founder, Paris', result: '40% of clients via AI', initials: 'EM' },
      ],
      es: [
        { quote: 'En 6 semanas pasé de 0 a 8 citas mensuales en ChatGPT. Mi agenda está llena.', author: 'Camille R.', role: 'Coach de negocio, Lyon', result: '+8 citas IA / mes', initials: 'CR' },
        { quote: 'El framework GEO cambió mi forma de escribir. Mis artículos ahora son citados por Perplexity.', author: 'Thomas B.', role: 'Consultor freelance, Burdeos', result: 'Citado por 3 LLMs', initials: 'TB' },
        { quote: 'Rentabilizado el primer mes. Hoy, el 40% de mis nuevos clientes vienen de una IA.', author: 'Élise M.', role: 'Fundadora de agencia, París', result: '40% de clientes vía IA', initials: 'EM' },
      ],
    },

    valueStack: {
      fr: {
        title: 'Tout ce que vous obtenez aujourd\'hui',
        items: [
          { name: 'Guide PDF 40 pages SEO + GEO 2026', value: 67 },
          { name: 'Framework RACE + 7 piliers GEO', value: 47 },
          { name: 'Checklist d\'audit GEO technique', value: 27 },
          { name: 'Roadmap 90 jours + budget par profil', value: 37 },
          { name: 'Mises à jour gratuites à vie', value: 47 },
        ],
        totalValue: 225,
        yourPrice: 9.99,
        cta: 'Je veux le guide maintenant →',
      },
      en: {
        title: 'Everything you get today',
        items: [
          { name: '40-page SEO + GEO 2026 PDF guide', value: 67 },
          { name: 'RACE Framework + 7 GEO pillars', value: 47 },
          { name: 'GEO technical audit checklist', value: 27 },
          { name: '90-day roadmap + budget by profile', value: 37 },
          { name: 'Free lifetime updates', value: 47 },
        ],
        totalValue: 225,
        yourPrice: 9.99,
        cta: 'I want the guide now →',
      },
      es: {
        title: 'Todo lo que obtienes hoy',
        items: [
          { name: 'Guía PDF de 40 páginas SEO + GEO 2026', value: 67 },
          { name: 'Framework RACE + 7 pilares GEO', value: 47 },
          { name: 'Checklist de auditoría GEO técnica', value: 27 },
          { name: 'Hoja de ruta 90 días + presupuesto por perfil', value: 37 },
          { name: 'Actualizaciones gratis de por vida', value: 47 },
        ],
        totalValue: 225,
        yourPrice: 9.99,
        cta: 'Quiero la guía ahora →',
      },
    },

    faq: {
      fr: [
        { q: 'C\'est quoi le GEO exactement ?', a: 'GEO = Generative Engine Optimization. C\'est l\'optimisation de votre contenu pour qu\'il soit cité par les IA génératives (ChatGPT, Perplexity, Claude, Gemini) — l\'équivalent du SEO mais pour les LLM.' },
        { q: 'Je suis débutant en SEO, ce guide est-il pour moi ?', a: 'Oui. Le guide commence par les fondamentaux SEO avant d\'aborder le GEO. Vous n\'avez besoin d\'aucune compétence technique préalable.' },
        { q: 'Combien de temps avant de voir des résultats ?', a: 'Les premières citations dans ChatGPT apparaissent généralement en 30-60 jours après application des frameworks. Le SEO Google prend 60-90 jours.' },
        { q: 'Quel format est livré ?', a: 'Un PDF de 40 pages (11 chapitres) téléchargeable immédiatement après le paiement, plus l\'accès à toutes les futures mises à jour.' },
      ],
      en: [
        { q: 'What exactly is GEO?', a: 'GEO = Generative Engine Optimization. It\'s optimizing your content so it gets cited by generative AIs (ChatGPT, Perplexity, Claude, Gemini) — the equivalent of SEO but for LLMs.' },
        { q: 'I\'m a beginner in SEO, is this guide for me?', a: 'Yes. The guide starts with SEO fundamentals before moving to GEO. You don\'t need any prior technical skills.' },
        { q: 'How long until I see results?', a: 'First citations in ChatGPT typically appear within 30-60 days after applying the frameworks. Google SEO takes 60-90 days.' },
        { q: 'What format is delivered?', a: 'A 40-page PDF (11 chapters), downloadable immediately after payment, plus access to all future updates.' },
      ],
      es: [
        { q: '¿Qué es exactamente el GEO?', a: 'GEO = Generative Engine Optimization. Es la optimización de tu contenido para que sea citado por IAs generativas (ChatGPT, Perplexity, Claude, Gemini) — el equivalente al SEO pero para LLMs.' },
        { q: 'Soy principiante en SEO, ¿esta guía es para mí?', a: 'Sí. La guía empieza con los fundamentos del SEO antes de abordar el GEO. No necesitas ninguna habilidad técnica previa.' },
        { q: '¿Cuánto tiempo hasta ver resultados?', a: 'Las primeras citas en ChatGPT suelen aparecer en 30-60 días tras aplicar los frameworks. El SEO de Google tarda 60-90 días.' },
        { q: '¿Qué formato se entrega?', a: 'Un PDF de 40 páginas (11 capítulos), descargable inmediatamente tras el pago, más acceso a todas las futuras actualizaciones.' },
      ],
    },

    guarantee: {
      fr: { days: 0, title: 'Accès immédiat & sans engagement', body: 'Téléchargement instantané après le paiement. Mises à jour gratuites à vie incluses.' },
      en: { days: 0, title: 'Instant access & no commitment', body: 'Instant download after payment. Free lifetime updates included.' },
      es: { days: 0, title: 'Acceso inmediato y sin compromiso', body: 'Descarga instantánea tras el pago. Actualizaciones gratuitas de por vida incluidas.' },
    },

    finalCta: {
      fr: { title: 'Devenez visible — par les humains et par les IA.', body: 'Aujourd\'hui, près d\'un internaute sur deux passe par une IA pour chercher un service. Demain, ce sera 70%. Préparez-vous maintenant.', cta: 'Obtenir le guide pour 9,99 € →', urgency: 'Offre de lancement : -79 % jusqu\'à dimanche minuit.' },
      en: { title: 'Become visible — to humans and AIs.', body: 'Today, nearly 1 in 2 people use an AI to search for a service. Tomorrow, it\'ll be 70%. Get ready now.', cta: 'Get the guide for €9.99 →', urgency: 'Launch offer: -79% until Sunday midnight.' },
      es: { title: 'Hazte visible — para humanos y para IAs.', body: 'Hoy, casi 1 de cada 2 personas usa una IA para buscar un servicio. Mañana, será el 70%. Prepárate ahora.', cta: 'Obtener la guía por 9,99 € →', urgency: 'Oferta de lanzamiento: -79% hasta el domingo a medianoche.' },
    },

    comparison: {
      fr: {
        title: 'SEO seul vs SEO + GEO',
        rowLabels: ['Visibilité Google', 'Visibilité ChatGPT / Perplexity', 'Frameworks de contenu', 'Templates prêts-à-l\'emploi', 'Mises à jour incluses', 'Délai pour démarrer'],
        columns: [
          { name: 'SEO classique', price: '0 €', rows: [true, false, false, false, false, '6 mois'] },
          { name: 'Formation SEO', price: '500 €+', rows: [true, false, true, false, false, '2 mois'] },
          { name: 'Guide SEO + GEO', price: '9,99 €', highlight: true, rows: [true, true, true, true, true, 'Aujourd\'hui'] },
        ],
      },
      en: {
        title: 'SEO alone vs SEO + GEO',
        rowLabels: ['Google visibility', 'ChatGPT / Perplexity visibility', 'Content frameworks', 'Ready-to-use templates', 'Updates included', 'Time to start'],
        columns: [
          { name: 'Classic SEO', price: '€0', rows: [true, false, false, false, false, '6 months'] },
          { name: 'SEO course', price: '€500+', rows: [true, false, true, false, false, '2 months'] },
          { name: 'SEO + GEO Guide', price: '€9.99', highlight: true, rows: [true, true, true, true, true, 'Today'] },
        ],
      },
      es: {
        title: 'SEO solo vs SEO + GEO',
        rowLabels: ['Visibilidad en Google', 'Visibilidad en ChatGPT / Perplexity', 'Frameworks de contenido', 'Plantillas listas para usar', 'Actualizaciones incluidas', 'Tiempo para empezar'],
        columns: [
          { name: 'SEO clásico', price: '0 €', rows: [true, false, false, false, false, '6 meses'] },
          { name: 'Formación SEO', price: '500 €+', rows: [true, false, true, false, false, '2 meses'] },
          { name: 'Guía SEO + GEO', price: '9,99 €', highlight: true, rows: [true, true, true, true, true, 'Hoy'] },
        ],
      },
    },

    bonusStack: {
      fr: {
        title: 'Et 3 bonus offerts (valeur 197 €)',
        intro: 'Pour les commandes passées avant dimanche minuit uniquement.',
        items: [
          { name: 'BONUS #1 — Lexique complet du GEO', desc: 'Tous les termes GEO définis et expliqués : LLM, RAG, E-E-A-T, schema markup, citabilité — votre référence.', value: 47 },
          { name: 'BONUS #2 — Outil de suivi visibilité IA', desc: 'Le tableur qui mesure vos citations dans ChatGPT et Perplexity chaque semaine.', value: 67 },
          { name: 'BONUS #3 — Mises à jour à vie', desc: 'Chaque nouvelle édition du guide vous est envoyée gratuitement.', value: 83 },
        ],
      },
      en: {
        title: 'Plus 3 free bonuses (value €197)',
        intro: 'For orders placed before Sunday midnight only.',
        items: [
          { name: 'BONUS #1 — Complete GEO Glossary', desc: 'All GEO terms defined and explained: LLM, RAG, E-E-A-T, schema markup, citability — your reference.', value: 47 },
          { name: 'BONUS #2 — AI visibility tracking tool', desc: 'The spreadsheet that measures your weekly citations in ChatGPT and Perplexity.', value: 67 },
          { name: 'BONUS #3 — Lifetime updates', desc: 'Every new edition of the guide sent to you for free.', value: 83 },
        ],
      },
      es: {
        title: 'Y 3 bonos gratuitos (valor 197€)',
        intro: 'Solo para pedidos realizados antes del domingo a medianoche.',
        items: [
          { name: 'BONO #1 — Glosario completo del GEO', desc: 'Todos los términos GEO definidos y explicados: LLM, RAG, E-E-A-T, schema markup, citabilidad — tu referencia.', value: 47 },
          { name: 'BONO #2 — Herramienta de seguimiento IA', desc: 'La hoja que mide tus citas semanales en ChatGPT y Perplexity.', value: 67 },
          { name: 'BONO #3 — Actualizaciones de por vida', desc: 'Cada nueva edición de la guía te llega gratis.', value: 83 },
        ],
      },
    },

    orderBump: {
      fr: { title: 'Oui, ajoutez l\'audit GEO personnalisé de mon site (+27 €)', desc: 'On audite votre site et on vous envoie un rapport écrit de 8-12 pages avec vos 5 actions GEO prioritaires, classées par impact. Recommandé par 89% des acheteurs.', price: 27 },
      en: { title: 'Yes, add the personalized GEO site audit (+€27)', desc: 'We audit your site and send you a written 8-12 page report with your top 5 GEO priorities, ranked by impact. Recommended by 89% of buyers.', price: 27 },
      es: { title: 'Sí, añade la auditoría GEO personalizada de mi sitio (+27€)', desc: 'Auditamos tu sitio y te enviamos un informe escrito de 8-12 páginas con tus 5 prioridades GEO, clasificadas por impacto. Recomendado por el 89% de los compradores.', price: 27 },
    },

    upsell: {
      fr: { title: 'Audit GEO Premium de votre site (rapport complet)', desc: 'Un audit GEO approfondi de votre site avec un rapport écrit détaillé : analyse page par page, plan d\'action priorisé sur 90 jours, et corrections mot-pour-mot à appliquer.', price: 197, cta: 'Ajouter l\'audit Premium (197€) →', link: '/fr/contact' },
      en: { title: 'Premium GEO site audit (full report)', desc: 'An in-depth GEO audit of your site with a detailed written report: page-by-page analysis, prioritized 90-day action plan, and word-for-word fixes to apply.', price: 197, cta: 'Add Premium audit (€197) →', link: '/en/contact' },
      es: { title: 'Auditoría GEO Premium de tu sitio (informe completo)', desc: 'Una auditoría GEO en profundidad de tu sitio con un informe escrito detallado: análisis página por página, plan de acción priorizado a 90 días y correcciones palabra por palabra para aplicar.', price: 197, cta: 'Añadir auditoría Premium (197€) →', link: '/es/contact' },
    },

    checkout: {
      fr: { title: 'Finaliser votre commande', summary: 'Guide Expert SEO + GEO 2026 — accès immédiat', nameLabel: 'Prénom & Nom', emailLabel: 'Email', namePlaceholder: 'Marie Dupont', emailPlaceholder: 'marie@email.com', paymentTitle: 'Paiement sécurisé', submitBtn: 'Continuer vers le paiement →', secureNote: 'Paiement 100% sécurisé · SSL · Vos données ne sont jamais partagées', guaranteeNote: 'Accès immédiat & sans engagement' },
      en: { title: 'Complete your order', summary: 'Expert SEO + GEO 2026 Guide — immediate access', nameLabel: 'First & Last Name', emailLabel: 'Email', namePlaceholder: 'Marie Dupont', emailPlaceholder: 'marie@email.com', paymentTitle: 'Secure payment', submitBtn: 'Continue to payment →', secureNote: '100% secure payment · SSL · Your data is never shared', guaranteeNote: 'Instant access & no commitment' },
      es: { title: 'Finalizar tu pedido', summary: 'Guía Experta SEO + GEO 2026 — acceso inmediato', nameLabel: 'Nombre y Apellido', emailLabel: 'Email', namePlaceholder: 'María García', emailPlaceholder: 'maria@email.com', paymentTitle: 'Pago seguro', submitBtn: 'Continuar al pago →', secureNote: 'Pago 100% seguro · SSL · Tus datos nunca se comparten', guaranteeNote: 'Acceso inmediato y sin compromiso' },
    },

    thankyou: {
      fr: { title: 'Bienvenue ! 🎉', body: 'Votre paiement est confirmé. Votre guide est prêt à être téléchargé. Vérifiez aussi votre email.', downloadBtn: 'Télécharger mon guide', nextStepsTitle: 'Par où commencer ?', nextSteps: ['Commencez par le Chapitre 1 pour comprendre GEO vs SEO.', 'Faites la checklist d\'audit GEO sur votre site (Chapitre 4).', 'Appliquez le Framework RACE à votre page d\'accueil.', 'Mesurez vos citations IA dans 30 jours avec les KPI du Chapitre 6.'], upsellTitle: 'Allez encore plus vite', shareTitle: 'Partagez à un confrère', shareBody: 'Si ce guide vous a aidé, partagez-le.' },
      en: { title: 'Welcome! 🎉', body: 'Your payment is confirmed. Your guide is ready to download. Also check your email.', downloadBtn: 'Download my guide', nextStepsTitle: 'Where to start?', nextSteps: ['Start with Chapter 1 to understand GEO vs SEO.', 'Run the GEO audit checklist on your site (Chapter 4).', 'Apply the RACE Framework to your homepage.', 'Measure your AI citations in 30 days using the Chapter 6 KPIs.'], upsellTitle: 'Go even faster', shareTitle: 'Share with a colleague', shareBody: 'If this guide helped you, share it.' },
      es: { title: '¡Bienvenido! 🎉', body: 'Tu pago está confirmado. Tu guía está lista para descargar. Revisa también tu email.', downloadBtn: 'Descargar mi guía', nextStepsTitle: '¿Por dónde empezar?', nextSteps: ['Empieza por el Capítulo 1 para entender GEO vs SEO.', 'Haz la checklist de auditoría GEO en tu sitio (Capítulo 4).', 'Aplica el Framework RACE a tu página de inicio.', 'Mide tus citas en IAs en 30 días con los KPIs del Capítulo 6.'], upsellTitle: 'Ve aún más rápido', shareTitle: 'Comparte con un colega', shareBody: 'Si esta guía te ayudó, compártela.' },
    },
  },

]
