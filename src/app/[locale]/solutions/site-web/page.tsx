import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button, ArrowIcon, CheckIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CTASection } from '@/components/sections/CTASection'
import { SiteWebFAQ } from './faq'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { plans } from '@/lib/config'
import { formatPrice, cn } from '@/lib/utils'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

const meta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Création de site web professionnel - Design, SEO & Performance',
    description:
      'Créez un site web professionnel, optimisé SEO et pensé pour convertir. Design sur mesure, performances maximales, support inclus. Devis gratuit.',
  },
  en: {
    title: 'Mindzy | Professional Website Creation - Design, SEO & Performance',
    description:
      'Create a professional website, SEO optimized and designed to convert. Custom design, maximum performance, support included. Free quote.',
  },
  es: {
    title: 'Mindzy | Creación de sitio web profesional - Diseño, SEO & Rendimiento',
    description:
      'Crea un sitio web profesional, optimizado para SEO y diseñado para convertir. Diseño a medida, rendimiento máximo, soporte incluido. Presupuesto gratuito.',
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
    path: '/solutions/site-web',
    title: t.title,
    description: t.description,
  })
}

const content = {
  fr: {
    hero: {
      badge: 'Création de site web',
      title: 'Un site qui travaille',
      titleAccent: 'pour vous',
      subtitle: 'Sites professionnels pour entrepreneurs ambitieux. Design sur mesure, SEO intégré dès la conception, réservation en ligne et performances optimales.',
      cta: 'Démarrer mon projet',
      ctaSecondary: 'Voir nos réalisations',
    },
    pricingHero: {
      eyebrow: 'Tarification',
      title: 'Choisissez la formule',
      titleAccent: 'adaptée à vos besoins',
      subtitle: 'Des tarifs transparents et un accompagnement clé en main pour chaque entrepreneur.',
      monthly: '/mois HT',
      setup: 'Mise en place',
      cta: 'Choisir',
      popular: 'Populaire',
      plans: {
        basic: {
          name: 'Starter',
          description: 'L\'essentiel pour être visible en ligne.',
          features: ['1 page professionnelle', 'Google Business optimisé', 'Hébergement premium', 'Certificat SSL', 'Support technique'],
        },
        pro: {
          name: 'Pro',
          description: 'Visibilité maximale avec SEO et réservation.',
          features: ['5 pages', '15 articles SEO/mois', 'Réservation en ligne', 'Google Business optimisé', 'Hébergement premium', 'Certificat SSL'],
        },
        business: {
          name: 'Business',
          description: 'Tout inclus pour automatiser votre activité.',
          features: ['5 pages', '15 articles SEO/mois', 'Réservation en ligne', 'Paiements en ligne', 'Google Business optimisé', 'Hébergement premium', 'Certificat SSL'],
        },
        ecommerce: {
          name: 'E-commerce',
          description: 'Vendez en ligne avec une boutique complète.',
          features: ['5 pages', '20 produits', 'Paiements en ligne', 'Google Business optimisé', 'Hébergement premium', 'Certificat SSL'],
        },
      },
    },
    pain: {
      eyebrow: 'Le constat',
      title: 'Sans site professionnel, vous êtes invisible',
      items: [
        {
          icon: 'eye-off',
          title: 'Introuvable sur Google',
          description: '93% des parcours d\'achat commencent par une recherche en ligne. Sans SEO, vos clients potentiels ne vous trouvent jamais.',
        },
        {
          icon: 'clock',
          title: 'Un site lent qui fait fuir',
          description: '53% des visiteurs quittent un site qui met plus de 3 secondes à charger. Chaque seconde perdue = des clients en moins.',
        },
        {
          icon: 'x-circle',
          title: 'Un design amateur',
          description: '75% des utilisateurs jugent la crédibilité d\'une entreprise par le design de son site. Un mauvais design = zéro confiance.',
        },
      ],
    },
    features: {
      eyebrow: 'Ce qu\'on fait',
      title: 'Tout ce qu\'il faut pour briller en ligne',
      items: [
        {
          icon: 'paintbrush',
          title: 'Design unique & sur mesure',
          description: 'Pas de template. Chaque site est conçu spécifiquement pour votre activité, votre identité et vos objectifs.',
          highlight: 'Zéro template',
        },
        {
          icon: 'search',
          title: 'SEO technique & éditorial',
          description: 'Structure sémantique, balises optimisées, maillage interne, sitemap, schema.org. Tout est pensé pour Google dès le départ.',
          highlight: 'Page 1 Google',
        },
        {
          icon: 'zap',
          title: 'Performance & Core Web Vitals',
          description: 'Score PageSpeed 90+. Images optimisées, code minimal, CDN mondial. Votre site charge en moins d\'une seconde.',
          highlight: 'Score 90+',
        },
        {
          icon: 'smartphone',
          title: 'Responsive & mobile-first',
          description: 'Design adapté à tous les écrans. 70% du trafic vient du mobile — votre site sera irréprochable partout.',
          highlight: 'Mobile-first',
        },
        {
          icon: 'shield',
          title: 'Sécurité & RGPD',
          description: 'HTTPS, headers de sécurité, politique cookies conforme RGPD. Protection de vos données et de celles de vos visiteurs.',
          highlight: 'RGPD conforme',
        },
        {
          icon: 'bar-chart',
          title: 'Analytics & suivi',
          description: 'Intégration Google Analytics, Search Console, et tableaux de bord personnalisés pour suivre vos performances.',
          highlight: 'Données clés',
        },
      ],
    },
    approach: {
      eyebrow: 'Notre approche',
      title: 'Tout ce qu\'il faut pour briller en ligne',
      items: [
        { title: 'Mobile-first', description: '70% du trafic vient du mobile. Chaque site est conçu responsive, rapide et impeccable sur tous les écrans.' },
        { title: 'Performance maximale', description: 'Score PageSpeed 90+. Code minimal, images optimisées, CDN mondial. Votre site charge en moins d\'une seconde.' },
        { title: 'Sécurité & RGPD', description: 'HTTPS, headers de sécurité, politique cookies conforme. Protection de vos données et celles de vos visiteurs.' },
        { title: 'Design sur mesure', description: 'Pas de template. Chaque site est conçu pour votre activité, votre identité et vos objectifs.' },
      ],
    },
    showcase: {
      eyebrow: 'Nos réalisations',
      title: 'Des sites qui inspirent confiance',
      subtitle: 'Découvrez quelques-uns des projets que nous avons réalisés pour nos clients.',
    },
    process: {
      eyebrow: 'Notre méthode',
      title: 'De l\'idée au lancement en 5 étapes',
      steps: [
        {
          number: '01',
          title: 'Diagnostic & stratégie',
          description: 'Analyse de votre activité, de vos concurrents et de vos objectifs. Définition de l\'arborescence et de la stratégie de contenu.',
        },
        {
          number: '02',
          title: 'Maquettes & design',
          description: 'Création des maquettes haute fidélité pour chaque page. Vous validez le rendu visuel avant tout développement.',
        },
        {
          number: '03',
          title: 'Développement',
          description: 'Intégration pixel-perfect avec les technologies les plus performantes. Tests sur tous les navigateurs et appareils.',
        },
        {
          number: '04',
          title: 'Contenu & SEO',
          description: 'Rédaction ou optimisation de vos contenus. Configuration SEO complète : balises, schema.org, sitemap, robots.txt.',
        },
        {
          number: '05',
          title: 'Lancement & formation',
          description: 'Mise en production, redirection des anciens liens, formation à l\'administration. Vous êtes autonome et accompagné.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'Tout inclus',
      title: 'Ce que vous recevez',
      subtitle: 'Un site complet, clé en main, sans surprise.',
      columns: [
        {
          title: 'Design & développement',
          items: [
            'Design sur mesure (pas de template)',
            'Responsive mobile, tablette, desktop',
            'Animations & micro-interactions',
            'Pages illimitées',
            'Formulaire de contact fonctionnel',
            'Intégration Google Maps',
          ],
        },
        {
          title: 'SEO & performance',
          items: [
            'Optimisation SEO on-page complète',
            'Score PageSpeed 90+',
            'SSL/HTTPS inclus',
            'Sitemap XML & robots.txt',
            'Schema.org (données structurées)',
            'Hébergement haute disponibilité',
          ],
        },
        {
          title: 'Support & suivi',
          items: [
            'Formation à l\'administration',
            'Support technique réactif',
            'Mises à jour de sécurité',
            'Sauvegardes automatiques',
            'Rapport mensuel de trafic',
            'Modifications mineures incluses',
          ],
        },
      ],
    },
    planning: {
      eyebrow: 'Planification',
      title: 'Une stratégie de contenu',
      titleAccent: 'qui convertit',
      description: 'Avant de coder la moindre ligne, nous définissons ensemble votre positionnement, vos messages clés et l\'architecture de votre site. Cette étape garantit un site cohérent, optimisé SEO et aligné sur vos objectifs business.',
      items: [
        'Audit de votre marché & positionnement',
        'Définition de l\'arborescence du site',
        'Stratégie de mots-clés SEO',
        'Rédaction des contenus persuasifs',
        'Planification du parcours utilisateur',
        'Calendrier éditorial personnalisé',
      ],
      cta: 'Planifier mon projet',
    },
    comparison: {
      eyebrow: 'La différence',
      title: 'Mindzy vs les autres',
      headers: ['', 'Mindzy', 'Freelance', 'Agence classique', 'Template DIY'],
      rows: [
        { label: 'Design sur mesure', values: [true, 'Parfois', true, false] },
        { label: 'SEO intégré', values: [true, 'Basique', 'En option', false] },
        { label: 'Score PageSpeed 90+', values: [true, 'Variable', 'Variable', false] },
        { label: 'Délai < 2 semaines', values: [true, 'Variable', false, true] },
        { label: 'Support continu inclus', values: [true, false, 'Payant', false] },
        { label: 'Formation incluse', values: [true, 'Parfois', 'Payante', false] },
        { label: 'Rapport qualité-prix', values: ['Excellent', 'Bon', 'Élevé', 'Limité'] },
      ],
    },

    testimonials: {
      eyebrow: 'Témoignages',
      title: 'Ils nous font confiance',
      items: [
        {
          quote: 'Mindzy a transformé notre présence en ligne. En 2 semaines, nous avions un site professionnel qui génère des rendez-vous.',
          author: 'Marie L.',
          role: 'Thérapeute holistique',
          result: '+180% de visites en 3 mois',
        },
        {
          quote: 'Le design est exactement ce que j\'imaginais, et le SEO fonctionne vraiment. Je suis en première page sur mes mots-clés.',
          author: 'Pierre D.',
          role: 'Coach professionnel',
          result: 'Page 1 Google en 6 semaines',
        },
        {
          quote: 'Réactif, professionnel, et un rapport qualité-prix imbattable. Je recommande sans hésiter.',
          author: 'Sophie B.',
          role: 'Naturopathe',
          result: '3x plus de demandes de contact',
        },
      ],
    },
    faq: {
      eyebrow: 'Questions fréquentes',
      title: 'Vos questions, nos réponses',
      items: [
        {
          q: 'Combien coûte la création d\'un site web ?',
          a: 'Nos sites démarrent à partir de 49€ HT par mois, avec un accompagnement clé en main. Le prix exact dépend de vos besoins et du niveau de personnalisation. Nous proposons un devis gratuit et transparent après un premier échange.',
        },
        {
          q: 'Combien de temps faut-il pour créer un site ?',
          a: 'En moyenne, un site vitrine est livré en 10 à 14 jours. Les projets plus complexes (e-commerce, multilingue) prennent 3 à 4 semaines. Nous nous engageons sur un calendrier précis dès le départ.',
        },
        {
          q: 'Est-ce que le SEO est vraiment inclus ?',
          a: 'Oui, 100%. Chaque site est optimisé techniquement (structure, balises, vitesse, schema.org) et éditorialement (contenus, mots-clés, maillage). Ce n\'est pas un supplément, c\'est notre standard.',
        },
        {
          q: 'Puis-je modifier mon site moi-même ?',
          a: 'Bien sûr. Selon la solution choisie, vous aurez accès à un CMS intuitif ou nous effectuerons les modifications pour vous. Une formation est incluse dans chaque projet.',
        },
        {
          q: 'Que se passe-t-il après la mise en ligne ?',
          a: 'Nous assurons le suivi : hébergement, mises à jour de sécurité, sauvegardes, et modifications mineures incluses. Vous recevez un rapport mensuel de performance.',
        },
        {
          q: 'Pour quel type d\'entreprise travaillez-vous ?',
          a: 'Nous accompagnons les entrepreneurs ambitieux dans tous les secteurs : coachs, consultants, artisans, PME, professions libérales... Notre approche est centrée sur le résultat et s\'adapte à chaque activité.',
        },
      ],
    },
  },
  en: {
    hero: {
      badge: 'Website creation',
      title: 'A website that works',
      titleAccent: 'for you',
      subtitle: 'Professional websites for ambitious entrepreneurs. Custom design, SEO built-in from day one, online booking and optimal performance.',
      cta: 'Start my project',
      ctaSecondary: 'View our work',
    },
    pricingHero: {
      eyebrow: 'Pricing',
      title: 'Choose the plan',
      titleAccent: 'that fits your needs',
      subtitle: 'Transparent pricing and turnkey support for every entrepreneur.',
      monthly: '/mo excl. VAT',
      setup: 'Setup',
      cta: 'Get started',
      popular: 'Popular',
      plans: {
        basic: {
          name: 'Starter',
          description: 'The essentials to be visible online.',
          features: ['1 professional page', 'Optimized Google Business', 'Premium hosting', 'SSL certificate', 'Technical support'],
        },
        pro: {
          name: 'Pro',
          description: 'Maximum visibility with SEO & booking.',
          features: ['5 pages', '15 SEO articles/month', 'Online booking', 'Optimized Google Business', 'Premium hosting', 'SSL certificate'],
        },
        business: {
          name: 'Business',
          description: 'All-inclusive to automate your business.',
          features: ['5 pages', '15 SEO articles/month', 'Online booking', 'Online payments', 'Optimized Google Business', 'Premium hosting', 'SSL certificate'],
        },
        ecommerce: {
          name: 'E-commerce',
          description: 'Sell online with a complete store.',
          features: ['5 pages', '20 products', 'Online payments', 'Optimized Google Business', 'Premium hosting', 'SSL certificate'],
        },
      },
    },
    pain: {
      eyebrow: 'The problem',
      title: 'Without a professional website, you\'re invisible',
      items: [
        {
          icon: 'eye-off',
          title: 'Unfindable on Google',
          description: '93% of buying journeys start with an online search. Without SEO, your potential clients never find you.',
        },
        {
          icon: 'clock',
          title: 'A slow site that drives people away',
          description: '53% of visitors leave a site that takes more than 3 seconds to load. Every lost second = fewer clients.',
        },
        {
          icon: 'x-circle',
          title: 'An amateur design',
          description: '75% of users judge a business\'s credibility by its website design. Bad design = zero trust.',
        },
      ],
    },
    features: {
      eyebrow: 'What we do',
      title: 'Everything you need to shine online',
      items: [
        {
          icon: 'paintbrush',
          title: 'Unique & custom design',
          description: 'No templates. Each site is specifically designed for your business, identity and goals.',
          highlight: 'Zero templates',
        },
        {
          icon: 'search',
          title: 'Technical & editorial SEO',
          description: 'Semantic structure, optimized tags, internal linking, sitemap, schema.org. Everything is built for Google from day one.',
          highlight: 'Google page 1',
        },
        {
          icon: 'zap',
          title: 'Performance & Core Web Vitals',
          description: 'PageSpeed score 90+. Optimized images, minimal code, global CDN. Your site loads in under one second.',
          highlight: 'Score 90+',
        },
        {
          icon: 'smartphone',
          title: 'Responsive & mobile-first',
          description: 'Design adapted to all screens. 70% of traffic comes from mobile — your site will be flawless everywhere.',
          highlight: 'Mobile-first',
        },
        {
          icon: 'shield',
          title: 'Security & GDPR',
          description: 'HTTPS, security headers, GDPR-compliant cookie policy. Protecting your data and your visitors\' data.',
          highlight: 'GDPR compliant',
        },
        {
          icon: 'bar-chart',
          title: 'Analytics & tracking',
          description: 'Google Analytics, Search Console integration, and custom dashboards to track your performance.',
          highlight: 'Key metrics',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Everything you need to shine online',
      items: [
        { title: 'Mobile-first', description: '70% of traffic comes from mobile. Every site is designed responsive, fast and flawless on all screens.' },
        { title: 'Maximum performance', description: 'PageSpeed score 90+. Minimal code, optimized images, global CDN. Your site loads in under one second.' },
        { title: 'Security & GDPR', description: 'HTTPS, security headers, compliant cookie policy. Protecting your data and your visitors\' data.' },
        { title: 'Custom design', description: 'No templates. Each site is specifically designed for your business, identity and goals.' },
      ],
    },
    showcase: {
      eyebrow: 'Our work',
      title: 'Websites that inspire trust',
      subtitle: 'Discover some of the projects we have delivered for our clients.',
    },
    process: {
      eyebrow: 'Our method',
      title: 'From idea to launch in 5 steps',
      steps: [
        {
          number: '01',
          title: 'Diagnostic & strategy',
          description: 'Analysis of your business, competitors and goals. Defining the site structure and content strategy.',
          duration: '1-2 days',
        },
        {
          number: '02',
          title: 'Mockups & design',
          description: 'Creating high-fidelity mockups for each page. You validate the visual result before any development.',
          duration: '3-5 days',
        },
        {
          number: '03',
          title: 'Development',
          description: 'Pixel-perfect integration with the most performant technologies. Testing on all browsers and devices.',
          duration: '5-7 days',
        },
        {
          number: '04',
          title: 'Content & SEO',
          description: 'Writing or optimizing your content. Complete SEO setup: tags, schema.org, sitemap, robots.txt.',
          duration: '2-3 days',
        },
        {
          number: '05',
          title: 'Launch & training',
          description: 'Production deployment, old link redirects, admin training. You\'re autonomous and supported.',
          duration: '1 day',
        },
      ],
    },
    deliverables: {
      eyebrow: 'All included',
      title: 'What you receive',
      subtitle: 'A complete, turnkey website with no surprises.',
      columns: [
        {
          title: 'Design & development',
          items: [
            'Custom design (no templates)',
            'Responsive mobile, tablet, desktop',
            'Animations & micro-interactions',
            'Unlimited pages',
            'Working contact form',
            'Google Maps integration',
          ],
        },
        {
          title: 'SEO & performance',
          items: [
            'Complete on-page SEO optimization',
            'PageSpeed score 90+',
            'SSL/HTTPS included',
            'XML sitemap & robots.txt',
            'Schema.org (structured data)',
            'High-availability hosting',
          ],
        },
        {
          title: 'Support & monitoring',
          items: [
            'Admin training',
            'Responsive technical support',
            'Security updates',
            'Automatic backups',
            'Monthly traffic report',
            'Minor modifications included',
          ],
        },
      ],
    },
    planning: {
      eyebrow: 'Planning',
      title: 'A content strategy',
      titleAccent: 'that converts',
      description: 'Before writing a single line of code, we define together your positioning, key messages and site architecture. This step ensures a coherent, SEO-optimized site aligned with your business goals.',
      items: [
        'Market audit & positioning',
        'Site architecture definition',
        'SEO keyword strategy',
        'Persuasive content writing',
        'User journey planning',
        'Personalized editorial calendar',
      ],
      cta: 'Plan my project',
    },
    comparison: {
      eyebrow: 'The difference',
      title: 'Mindzy vs the rest',
      headers: ['', 'Mindzy', 'Freelancer', 'Traditional agency', 'DIY template'],
      rows: [
        { label: 'Custom design', values: [true, 'Sometimes', true, false] },
        { label: 'Built-in SEO', values: [true, 'Basic', 'Optional', false] },
        { label: 'PageSpeed 90+', values: [true, 'Variable', 'Variable', false] },
        { label: 'Delivery < 2 weeks', values: [true, 'Variable', false, true] },
        { label: 'Ongoing support included', values: [true, false, 'Paid', false] },
        { label: 'Training included', values: [true, 'Sometimes', 'Paid', false] },
        { label: 'Value for money', values: ['Excellent', 'Good', 'Expensive', 'Limited'] },
      ],
    },
   
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'They trust us',
      items: [
        {
          quote: 'Mindzy transformed our online presence. In 2 weeks, we had a professional site that generates appointments.',
          author: 'Marie L.',
          role: 'Holistic therapist',
          result: '+180% visits in 3 months',
        },
        {
          quote: 'The design is exactly what I imagined, and the SEO really works. I\'m on the first page for my keywords.',
          author: 'Pierre D.',
          role: 'Professional coach',
          result: 'Google page 1 in 6 weeks',
        },
        {
          quote: 'Responsive, professional, and unbeatable value for money. I recommend without hesitation.',
          author: 'Sophie B.',
          role: 'Naturopath',
          result: '3x more contact requests',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Your questions, our answers',
      items: [
        {
          q: 'How much does a website cost?',
          a: 'Our websites start from €49 excl. VAT per month, with full turnkey support. The exact price depends on your needs and level of customization. We offer a free and transparent quote after an initial discussion.',
        },
        {
          q: 'How long does it take to create a website?',
          a: 'On average, a showcase website is delivered in 10 to 14 days. More complex projects (e-commerce, multilingual) take 3 to 4 weeks. We commit to a precise timeline from the start.',
        },
        {
          q: 'Is SEO really included?',
          a: 'Yes, 100%. Every site is technically optimized (structure, tags, speed, schema.org) and editorially (content, keywords, linking). It\'s not an add-on, it\'s our standard.',
        },
        {
          q: 'Can I edit my site myself?',
          a: 'Of course. Depending on the chosen solution, you\'ll have access to an intuitive CMS or we\'ll make the changes for you. Training is included in every project.',
        },
        {
          q: 'What happens after launch?',
          a: 'We handle the follow-up: hosting, security updates, backups, and minor modifications included. You receive a monthly performance report.',
        },
        {
          q: 'What type of business do you work with?',
          a: 'We support ambitious entrepreneurs across all industries: coaches, consultants, artisans, SMBs, freelancers... Our approach is results-driven and adapts to every business.',
        },
      ],
    },
  },
  es: {
    hero: {
      badge: 'Creación de sitio web',
      title: 'Un sitio que trabaja',
      titleAccent: 'para ti',
      subtitle: 'Sitios profesionales para emprendedores ambiciosos. Diseño a medida, SEO integrado desde la concepción, reserva online y rendimiento óptimo.',
      cta: 'Empezar mi proyecto',
      ctaSecondary: 'Ver realizaciones',
    },
    pricingHero: {
      eyebrow: 'Precios',
      title: 'Elige el plan',
      titleAccent: 'adaptado a tus necesidades',
      subtitle: 'Precios transparentes y acompañamiento llave en mano para cada emprendedor.',
      monthly: '/mes sin IVA',
      setup: 'Configuración',
      cta: 'Empezar',
      popular: 'Popular',
      plans: {
        basic: {
          name: 'Starter',
          description: 'Lo esencial para ser visible online.',
          features: ['1 página profesional', 'Google Business optimizado', 'Alojamiento premium', 'Certificado SSL', 'Soporte técnico'],
        },
        pro: {
          name: 'Pro',
          description: 'Máxima visibilidad con SEO y reservas.',
          features: ['5 páginas', '15 artículos SEO/mes', 'Reserva online', 'Google Business optimizado', 'Alojamiento premium', 'Certificado SSL'],
        },
        business: {
          name: 'Business',
          description: 'Todo incluido para automatizar tu actividad.',
          features: ['5 páginas', '15 artículos SEO/mes', 'Reserva online', 'Pagos online', 'Google Business optimizado', 'Alojamiento premium', 'Certificado SSL'],
        },
        ecommerce: {
          name: 'E-commerce',
          description: 'Vende online con una tienda completa.',
          features: ['5 páginas', '20 productos', 'Pagos online', 'Google Business optimizado', 'Alojamiento premium', 'Certificado SSL'],
        },
      },
    },
    pain: {
      eyebrow: 'El problema',
      title: 'Sin un sitio profesional, eres invisible',
      items: [
        {
          icon: 'eye-off',
          title: 'Imposible de encontrar en Google',
          description: 'El 93% de los procesos de compra comienzan con una búsqueda online. Sin SEO, tus clientes potenciales nunca te encuentran.',
        },
        {
          icon: 'clock',
          title: 'Un sitio lento que ahuyenta',
          description: 'El 53% de los visitantes abandonan un sitio que tarda más de 3 segundos en cargar. Cada segundo perdido = menos clientes.',
        },
        {
          icon: 'x-circle',
          title: 'Un diseño amateur',
          description: 'El 75% de los usuarios juzgan la credibilidad de una empresa por el diseño de su sitio. Mal diseño = cero confianza.',
        },
      ],
    },
    features: {
      eyebrow: 'Lo que hacemos',
      title: 'Todo lo que necesitas para brillar online',
      items: [
        {
          icon: 'paintbrush',
          title: 'Diseño único y a medida',
          description: 'Sin plantillas. Cada sitio está diseñado específicamente para tu actividad, identidad y objetivos.',
          highlight: 'Cero plantillas',
        },
        {
          icon: 'search',
          title: 'SEO técnico y editorial',
          description: 'Estructura semántica, etiquetas optimizadas, enlazado interno, sitemap, schema.org. Todo pensado para Google desde el inicio.',
          highlight: 'Página 1 Google',
        },
        {
          icon: 'zap',
          title: 'Rendimiento & Core Web Vitals',
          description: 'Puntuación PageSpeed 90+. Imágenes optimizadas, código mínimo, CDN global. Tu sitio carga en menos de un segundo.',
          highlight: 'Score 90+',
        },
        {
          icon: 'smartphone',
          title: 'Responsive y mobile-first',
          description: 'Diseño adaptado a todas las pantallas. El 70% del tráfico viene del móvil — tu sitio será impecable en todas partes.',
          highlight: 'Mobile-first',
        },
        {
          icon: 'shield',
          title: 'Seguridad y RGPD',
          description: 'HTTPS, cabeceras de seguridad, política de cookies conforme al RGPD. Protección de tus datos y los de tus visitantes.',
          highlight: 'RGPD conforme',
        },
        {
          icon: 'bar-chart',
          title: 'Analytics y seguimiento',
          description: 'Integración Google Analytics, Search Console y paneles personalizados para seguir tu rendimiento.',
          highlight: 'Datos clave',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Todo lo que necesitas para brillar online',
      items: [
        { title: 'Mobile-first', description: 'El 70% del tráfico viene del móvil. Cada sitio está diseñado responsive, rápido e impecable en todas las pantallas.' },
        { title: 'Rendimiento máximo', description: 'Puntuación PageSpeed 90+. Código mínimo, imágenes optimizadas, CDN global. Tu sitio carga en menos de un segundo.' },
        { title: 'Seguridad y RGPD', description: 'HTTPS, cabeceras de seguridad, política de cookies conforme. Protección de tus datos y los de tus visitantes.' },
        { title: 'Diseño a medida', description: 'Sin plantillas. Cada sitio está diseñado para tu actividad, identidad y objetivos.' },
      ],
    },
    showcase: {
      eyebrow: 'Nuestras realizaciones',
      title: 'Sitios que inspiran confianza',
      subtitle: 'Descubre algunos de los proyectos que hemos realizado para nuestros clientes.',
    },
    process: {
      eyebrow: 'Nuestro método',
      title: 'De la idea al lanzamiento en 5 pasos',
      steps: [
        {
          number: '01',
          title: 'Diagnóstico y estrategia',
          description: 'Análisis de tu actividad, competidores y objetivos. Definición de la estructura y estrategia de contenido.',
          duration: '1-2 días',
        },
        {
          number: '02',
          title: 'Maquetas y diseño',
          description: 'Creación de maquetas de alta fidelidad para cada página. Validas el resultado visual antes de cualquier desarrollo.',
          duration: '3-5 días',
        },
        {
          number: '03',
          title: 'Desarrollo',
          description: 'Integración pixel-perfect con las tecnologías más eficientes. Pruebas en todos los navegadores y dispositivos.',
          duration: '5-7 días',
        },
        {
          number: '04',
          title: 'Contenido y SEO',
          description: 'Redacción u optimización de tus contenidos. Configuración SEO completa: etiquetas, schema.org, sitemap, robots.txt.',
          duration: '2-3 días',
        },
        {
          number: '05',
          title: 'Lanzamiento y formación',
          description: 'Puesta en producción, redirección de enlaces antiguos, formación en administración. Eres autónomo y acompañado.',
          duration: '1 día',
        },
      ],
    },
    deliverables: {
      eyebrow: 'Todo incluido',
      title: 'Lo que recibes',
      subtitle: 'Un sitio completo, llave en mano, sin sorpresas.',
      columns: [
        {
          title: 'Diseño y desarrollo',
          items: [
            'Diseño a medida (sin plantillas)',
            'Responsive móvil, tableta, escritorio',
            'Animaciones y micro-interacciones',
            'Páginas ilimitadas',
            'Formulario de contacto funcional',
            'Integración Google Maps',
          ],
        },
        {
          title: 'SEO y rendimiento',
          items: [
            'Optimización SEO on-page completa',
            'Puntuación PageSpeed 90+',
            'SSL/HTTPS incluido',
            'Sitemap XML y robots.txt',
            'Schema.org (datos estructurados)',
            'Alojamiento de alta disponibilidad',
          ],
        },
        {
          title: 'Soporte y seguimiento',
          items: [
            'Formación en administración',
            'Soporte técnico reactivo',
            'Actualizaciones de seguridad',
            'Copias de seguridad automáticas',
            'Informe mensual de tráfico',
            'Modificaciones menores incluidas',
          ],
        },
      ],
    },
    planning: {
      eyebrow: 'Planificación',
      title: 'Una estrategia de contenido',
      titleAccent: 'que convierte',
      description: 'Antes de escribir una sola línea de código, definimos juntos tu posicionamiento, mensajes clave y la arquitectura de tu sitio. Este paso garantiza un sitio coherente, optimizado para SEO y alineado con tus objetivos de negocio.',
      items: [
        'Auditoría de mercado y posicionamiento',
        'Definición de la arquitectura del sitio',
        'Estrategia de palabras clave SEO',
        'Redacción de contenidos persuasivos',
        'Planificación del recorrido del usuario',
        'Calendario editorial personalizado',
      ],
      cta: 'Planificar mi proyecto',
    },
    comparison: {
      eyebrow: 'La diferencia',
      title: 'Mindzy vs los demás',
      headers: ['', 'Mindzy', 'Freelance', 'Agencia clásica', 'Plantilla DIY'],
      rows: [
        { label: 'Diseño a medida', values: [true, 'A veces', true, false] },
        { label: 'SEO integrado', values: [true, 'Básico', 'Opcional', false] },
        { label: 'PageSpeed 90+', values: [true, 'Variable', 'Variable', false] },
        { label: 'Entrega < 2 semanas', values: [true, 'Variable', false, true] },
        { label: 'Soporte continuo incluido', values: [true, false, 'De pago', false] },
        { label: 'Formación incluida', values: [true, 'A veces', 'De pago', false] },
        { label: 'Relación calidad-precio', values: ['Excelente', 'Buena', 'Elevada', 'Limitada'] },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonios',
      title: 'Confían en nosotros',
      items: [
        {
          quote: 'Mindzy transformó nuestra presencia online. En 2 semanas teníamos un sitio profesional que genera citas.',
          author: 'Marie L.',
          role: 'Terapeuta holística',
          result: '+180% de visitas en 3 meses',
        },
        {
          quote: 'El diseño es exactamente lo que imaginaba, y el SEO funciona de verdad. Estoy en primera página con mis palabras clave.',
          author: 'Pierre D.',
          role: 'Coach profesional',
          result: 'Página 1 Google en 6 semanas',
        },
        {
          quote: 'Reactivo, profesional, y una relación calidad-precio inmejorable. Lo recomiendo sin dudar.',
          author: 'Sophie B.',
          role: 'Naturópata',
          result: '3x más solicitudes de contacto',
        },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Tus preguntas, nuestras respuestas',
      items: [
        {
          q: '¿Cuánto cuesta crear un sitio web?',
          a: 'Nuestros sitios comienzan desde 49€ sin IVA al mes, con acompañamiento llave en mano. El precio exacto depende de tus necesidades y nivel de personalización. Ofrecemos un presupuesto gratuito y transparente tras un primer intercambio.',
        },
        {
          q: '¿Cuánto tiempo se tarda en crear un sitio?',
          a: 'De media, un sitio escaparate se entrega en 10 a 14 días. Los proyectos más complejos (e-commerce, multilingüe) tardan de 3 a 4 semanas. Nos comprometemos con un calendario preciso desde el inicio.',
        },
        {
          q: '¿El SEO está realmente incluido?',
          a: 'Sí, 100%. Cada sitio está optimizado técnicamente (estructura, etiquetas, velocidad, schema.org) y editorialmente (contenidos, palabras clave, enlazado). No es un suplemento, es nuestro estándar.',
        },
        {
          q: '¿Puedo modificar mi sitio yo mismo?',
          a: 'Por supuesto. Según la solución elegida, tendrás acceso a un CMS intuitivo o realizaremos las modificaciones por ti. La formación está incluida en cada proyecto.',
        },
        {
          q: '¿Qué pasa después del lanzamiento?',
          a: 'Nos encargamos del seguimiento: alojamiento, actualizaciones de seguridad, copias de seguridad y modificaciones menores incluidas. Recibes un informe mensual de rendimiento.',
        },
        {
          q: '¿Para qué tipo de empresa trabajan?',
          a: 'Acompañamos a emprendedores ambiciosos de todos los sectores: coachs, consultores, artesanos, pymes, profesionales liberales... Nuestro enfoque está centrado en resultados y se adapta a cada actividad.',
        },
      ],
    },
  },
}

export default async function SiteWebPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: l } = await params
  const locale = l as Locale
  const t = content[locale]

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="relative isolate overflow-hidden bg-white">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern x="50%" y={-1} id="site-web-hero-grid" width={200} height={200} patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth={0} />
          </svg>
          <rect fill="url(#site-web-hero-grid)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        <div
          aria-hidden="true"
          className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
        >
          <div
            style={{ clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)' }}
            className="aspect-1108/632 w-277 bg-linear-to-r from-[#c084fc] to-[#7c3aed] opacity-20"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-sm/6 font-semibold text-violet-600 ring-1 ring-violet-600/20 ring-inset">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-[#1E1B4B] sm:text-7xl">
              {t.hero.title}{' '}
              <span className="text-violet-600">{t.hero.titleAccent}</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href={`/${locale}/diagnostic`}>
                <Button variant="primary" size="xl" icon={<ArrowIcon />}>
                  {t.hero.cta}
                </Button>
              </Link>
              <Link href={`/${locale}/portfolio`} className="text-sm/6 font-semibold text-[#1E1B4B]">
                {t.hero.ctaSecondary} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Image
                alt="Site web professionnel Mindzy"
                src="/images/portfolio/le-revenu.jpg"
                width={1080}
                height={600}
                className="w-304 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ PRICING ═══════ */}
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#c084fc] to-[#7c3aed] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-violet-600">{t.pricingHero.eyebrow}</h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            {t.pricingHero.title}{' '}
            <span className="text-violet-600">{t.pricingHero.titleAccent}</span>
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          {t.pricingHero.subtitle}
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-start gap-6 sm:mt-20 lg:max-w-7xl lg:grid-cols-4">
          {plans.map((plan) => {
            const isPopular = plan.id === 'pro'
            const planCopy = t.pricingHero.plans[plan.id as keyof typeof t.pricingHero.plans]
            return (
              <div
                key={plan.id}
                className={cn(
                  'relative rounded-3xl p-8 ring-1 sm:p-10',
                  isPopular
                    ? 'bg-white shadow-2xl ring-violet-600/20'
                    : 'bg-white/60 ring-gray-900/10',
                )}
              >
                {isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold text-white">
                    {t.pricingHero.popular}
                  </span>
                )}
                <h3 className="text-base/7 font-semibold text-violet-600">
                  {planCopy.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-base text-gray-500">{t.pricingHero.monthly}</span>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {t.pricingHero.setup} : {formatPrice(plan.setup)} HT
                </p>
                <p className="mt-6 text-base/7 text-gray-600">{planCopy.description}</p>
                <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
                  {planCopy.features.map((feature: string) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-violet-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/onboarding?plan=${plan.id}`}
                  className={cn(
                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:mt-10',
                    isPopular
                      ? 'bg-violet-600 text-white shadow-sm hover:bg-violet-500'
                      : 'text-violet-600 ring-1 ring-inset ring-violet-200 hover:ring-violet-300',
                  )}
                >
                  {t.pricingHero.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══════ PAIN POINTS ═══════ */}
      <section className="py-24 lg:py-32 bg-[#FAFAFF] relative">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">{t.pain.eyebrow}</span>
            <h2 className="heading-2 text-anthracite">{t.pain.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {t.pain.items.map((item, i) => (
              <div
                key={item.title}
                className="relative group p-8 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 via-white to-white transition-all duration-300 hover:shadow-lg hover:border-rose-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 mb-5">
                  <PainIcon name={item.icon} />
                </div>
                <h3 className="text-lg font-semibold text-anthracite mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ APPROACH (Bento Grid) ═══════ */}
      <section className="bg-[#FAFAFF] py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <span className="eyebrow mb-4 block text-center">{t.approach.eyebrow}</span>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-anthracite sm:text-5xl">
            {t.approach.title}
          </p>

          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* Mobile-first — tall left */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg,0.5rem)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-anthracite max-lg:text-center">
                    {t.approach.items[0].title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    {t.approach.items[0].description}
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[3rem] border-x-[12px] border-t-[12px] border-gray-800 bg-gray-900 shadow-2xl">
                    <div className="h-full w-full bg-gradient-to-b from-violet-50 via-white to-violet-100/80 p-4">
                      <div className="h-3 w-16 rounded-full bg-violet-300 mb-3" />
                      <div className="h-2 w-24 rounded-full bg-gray-200 mb-6" />
                      <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-3 mb-3">
                        <div className="h-20 rounded-lg bg-gradient-to-br from-violet-100 to-violet-50 mb-2" />
                        <div className="h-2 w-20 rounded-full bg-gray-200 mb-1.5" />
                        <div className="h-2 w-14 rounded-full bg-gray-100" />
                      </div>
                      <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-3">
                        <div className="h-20 rounded-lg bg-gradient-to-br from-cream-100 to-violet-50/50 mb-2" />
                        <div className="h-2 w-20 rounded-full bg-gray-200 mb-1.5" />
                        <div className="h-2 w-16 rounded-full bg-gray-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-inset ring-black/5 lg:rounded-l-[2rem]" />
            </div>

            {/* Performance — top middle */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg,0.5rem)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-anthracite max-lg:text-center">
                    {t.approach.items[1].title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    {t.approach.items[1].description}
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                    className="w-full max-lg:max-w-xs"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-inset ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/* Security — bottom middle */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg,0.5rem)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-anthracite max-lg:text-center">
                    {t.approach.items[2].title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    {t.approach.items[2].description}
                  </p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                    className="h-[min(152px,40cqw)] object-cover"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-inset ring-black/5" />
            </div>

            {/* Design — tall right */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg,0.5rem)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-anthracite max-lg:text-center">
                    {t.approach.items[3].title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    {t.approach.items[3].description}
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10">
                    <div className="flex bg-gray-900 outline outline-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          theme.config.ts
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">layout.tsx</div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14">
                      <pre className="text-sm/7 text-gray-300">
                        <code>
                          <span className="text-violet-400">export const</span>{' '}
                          <span className="text-amber-200">theme</span>{' '}
                          <span className="text-gray-500">=</span>{' '}
                          <span className="text-gray-400">{'{'}</span>
                          {'\n'}
                          {'  '}
                          <span className="text-emerald-300">colors</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-gray-400">{'{'}</span>
                          {'\n'}
                          {'    '}
                          <span className="text-emerald-300">primary</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-amber-200">&quot;#7C3AED&quot;</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'    '}
                          <span className="text-emerald-300">accent</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-amber-200">&quot;#C084FC&quot;</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'  '}
                          <span className="text-gray-400">{'}'}</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'  '}
                          <span className="text-emerald-300">fonts</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-gray-400">{'{'}</span>
                          {'\n'}
                          {'    '}
                          <span className="text-emerald-300">heading</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-amber-200">&quot;Playfair&quot;</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'    '}
                          <span className="text-emerald-300">body</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-amber-200">&quot;Inter&quot;</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'  '}
                          <span className="text-gray-400">{'}'}</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'  '}
                          <span className="text-emerald-300">layout</span>
                          <span className="text-gray-500">:</span>{' '}
                          <span className="text-amber-200">&quot;custom&quot;</span>
                          <span className="text-gray-500">,</span>
                          {'\n'}
                          {'  '}
                          <span className="text-gray-500">{'// Votre identité, pas un template'}</span>
                          {'\n'}
                          <span className="text-gray-400">{'}'}</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            </div>
          </div>
        </div>
      </section>

 
      {/* ═══════ SHOWCASE (Browser Mockups) ═══════ */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-cream-50/40 to-white overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">{t.showcase.eyebrow}</span>
            <h2 className="heading-2 text-anthracite mb-4">{t.showcase.title}</h2>
            <p className="body-large max-w-xl mx-auto">{t.showcase.subtitle}</p>
          </div>

          {/* Browser mockup grid - 3 stacked with perspective */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { src: '/images/portfolio/overlord-fund.jpg', name: 'Overlord Fund', domain: 'overlord.fund' },
                { src: '/images/portfolio/le-revenu.jpg', name: 'Le Revenu', domain: 'lerevenu.com' },
                { src: '/images/portfolio/ory-avocats.jpg', name: 'Ory Avocats', domain: 'ory-avocats.com' },
              ].map((project, i) => (
                <div
                  key={project.name}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {/* Browser frame */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden transition-all duration-500 group-hover:shadow-card-hover group-hover:-translate-y-2">
                    {/* Browser toolbar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                        <div className="w-2.5 h-2.5 rounded-full bg-sage-400" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-[10px] text-gray-400 truncate">
                          {project.domain}
                        </div>
                      </div>
                    </div>
                    {/* Screenshot */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.src}
                        alt={project.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-3 font-medium">{project.name}</p>
                </div>
              ))}
            </div>

            {/* View more link */}
            <div className="text-center mt-10">
              <Link href={`/${locale}/portfolio`}>
                <Button variant="outline" size="lg" icon={<ArrowIcon />}>
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS TIMELINE (Serpentine) ═══════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-wide">
          <div className="text-center mb-20">
            <span className="eyebrow mb-4 block">{t.process.eyebrow}</span>
            <h2 className="heading-2 text-anthracite">{t.process.title}</h2>
          </div>

          {/* Mobile: vertical flow */}
          <div className="md:hidden space-y-6">
            {t.process.steps.map((step, i) => (
              <div key={step.number} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-violet-500 flex items-center justify-center text-white font-display text-sm font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    {i < 4 && <div className="w-px h-6 bg-violet-200 mt-2" />}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-semibold text-anthracite mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: serpentine layout */}
          <div className="hidden md:block">
            {/* Row 1: [01] → [02] → [03] */}
            <div className="grid grid-cols-3 gap-6">
              {t.process.steps.slice(0, 3).map((step, i) => (
                <div
                  key={step.number}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full" style={{ boxShadow: '0 4px 24px -8px rgba(124,58,237,0.08)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-violet-500 flex items-center justify-center text-white font-display text-sm font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <h3 className="font-semibold text-anthracite leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="absolute top-1/2 -right-[18px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Serpentine bend: vertical connector aligned to col 3 center */}
            <div className="grid grid-cols-3 gap-6">
              <div />
              <div />
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-violet-200" />
                  <div className="w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm my-0.5">
                    <svg className="w-3 h-3 text-violet-400" viewBox="0 0 16 16" fill="none">
                      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="w-px h-4 bg-violet-200" />
                </div>
              </div>
            </div>

            {/* Row 2: [05] ← [04]  (right-to-left flow) */}
            <div className="grid grid-cols-3 gap-6">
              <div />
              {[t.process.steps[4], t.process.steps[3]].map((step) => (
                <div
                  key={step.number}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${(step.number === '04' ? 3 : 4) * 150}ms` }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full" style={{ boxShadow: '0 4px 24px -8px rgba(124,58,237,0.08)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-violet-500 flex items-center justify-center text-white font-display text-sm font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <h3 className="font-semibold text-anthracite leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {step.number === '04' && (
                    <div className="absolute top-1/2 -left-[18px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale as Locale} />


      {/* ═══════ CTA ═══════ */}
      <CTASection locale={locale} variant="gradient" />
    </>
  )
}

/* ═══════ ICON COMPONENTS ═══════ */

function PainIcon({ name }: { name: string }) {
  const cls = 'w-5 h-5'
  switch (name) {
    case 'eye-off':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
    case 'clock':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    case 'x-circle':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    default:
      return null
  }
}

