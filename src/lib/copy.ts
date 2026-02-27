import type { Locale } from './i18n'

interface CopyKeys {
  nav: { home: string; solutions: string; portfolio: string; whyUs: string; blog: string; faq: string; cta: string; solutionsItems: Record<string, { title: string; subtitle: string }> }
  hero: { badge: string; title: string; titleHighlight: string; subtitle: string; cta: string; ctaSecondary: string; stats: { clients: string; satisfaction: string; support: string } }
  useCases: { title: string; subtitle: string; cards: Record<string, { title: string; description: string }> }
  whyMindzy: { title: string; subtitle: string; reasons: Record<string, { title: string; description: string }> }
  testimonials: { title: string; subtitle: string }
  pricing: { title: string; subtitle: string; monthly: string; setup: string; cta: string; popular: string; customQuote: { title: string; description: string; cta: string }; roi: { title: string; businessType: string; plan: string; breakeven: string; timeSaved: string; timeSavedLabel: string; newClients: string; newClientsLabel: string; extraRevenue: string; extraRevenueLabel: string; annualROI: string; disclaimer: string }; features: Record<string, string>; plans: Record<string, { name: string; description: string }> }
  diagnostic: { title: string; subtitle: string; progress: string; next: string; back: string; professionQuestion: string; otherProfessionPlaceholder: string; result: { title: string; low: { title: string; message: string }; medium: { title: string; message: string }; high: { title: string; message: string } }; cta: string }
  portfolio: { title: string; subtitle: string; filter: Record<string, string>; search: string; loadMore: string; viewSite: string }
  process: { title: string; subtitle: string; steps: Record<string, { title: string; description: string; duration: string }> }
  whyUs: { title: string; subtitle: string; comparison: { title: string; agencies: { title: string; points: string[] }; mindzy: { title: string; points: string[] } } }
  reviews: { title: string; subtitle: string }
  blog: { title: string; subtitle: string; readMore: string; readTime: string; likedArticle: string; relatedArticles: string; categories: Record<string, string> }
  faq: { title: string; subtitle: string; categories: Record<string, string>; allCategories: Record<string, string> }
  about: { title: string; subtitle: string; mission: { title: string; description: string }; values: { title: string; items: { title: string; description: string }[] } }
  legal: { cgu: { title: string }; cgv: { title: string }; mentions: { title: string } }
  footer: { description: string; sections: Record<string, string>; links: Record<string, string | undefined>; copyright: string }
  stickyCta: { message: string; startButton: string; meetingButton: string }
  chatbot: { title: string; subtitle: string; welcome: string; quickReplies: Record<string, string>; responses: Record<string, string>; buttons: Record<string, string>; whatsappMessage: string }
  common: { learnMore: string; getStarted: string; back: string; next: string; submit: string; loading: string }
}

function buildCopy(locale: 'fr' | 'en' | 'es'): CopyKeys {
  const isFr = locale === 'fr'
  const isEn = locale === 'en'
  return {
    nav: {
      home: isFr ? 'Accueil' : isEn ? 'Home' : 'Inicio',
      solutions: isFr ? 'Solutions' : isEn ? 'Solutions' : 'Soluciones',
      portfolio: 'Portfolio',
      whyUs: isFr ? 'Pourquoi nous' : isEn ? 'Why us' : 'Por qué nosotros',
      blog: 'Blog',
      faq: 'FAQ',
      cta: isFr ? 'Démarrer' : isEn ? 'Get started' : 'Empezar',
      solutionsItems: {
        siteWeb: { title: isFr ? 'Site web' : isEn ? 'Website' : 'Sitio web', subtitle: isFr ? 'Une vitrine digitale incontournable' : isEn ? 'An essential digital storefront' : 'Una vitrina digital imprescindible' },
        surMesure: { title: isFr ? 'Solution sur mesure' : isEn ? 'Custom solution' : 'Solución a medida', subtitle: isFr ? 'Projets stratégiques & architecture digitale' : isEn ? 'Strategic projects & digital architecture' : 'Proyectos estratégicos y arquitectura digital' },
        formations: { title: isFr ? 'Formations & Réseaux Sociaux' : isEn ? 'Training & Social Media' : 'Formación y Redes Sociales', subtitle: isFr ? 'Boostez votre notoriété' : isEn ? 'Boost your visibility' : 'Impulsa tu notoriedad' },
        branding: { title: isFr ? 'Branding & Contenu' : isEn ? 'Branding & Content' : 'Branding y Contenido', subtitle: isFr ? 'Identité visuelle & stratégie de contenu' : isEn ? 'Visual identity & content strategy' : 'Identidad visual y estrategia de contenido' },
      },
    },
    hero: {
      badge: isFr ? 'Agence web nouvelle génération' : isEn ? 'Next-gen web agency' : 'Agencia web de nueva generación',
      title: isFr ? 'Votre site web premium' : isEn ? 'Your premium website' : 'Tu sitio web premium',
      titleHighlight: isFr ? 'en 2 semaines' : isEn ? 'in 2 weeks' : 'en 2 semanas',
      subtitle: isFr ? 'Mindzy crée des solutions professionnels pour les entrepreneurs ambitieux. Réservation en ligne, SEO optimisé, design sur-mesure.' : isEn ? 'Mindzy creates professional websites for ambitious entrepreneurs. Online booking, optimized SEO, custom design.' : 'Mindzy crea sitios profesionales para emprendedores ambiciosos. Reservas en línea, SEO optimizado, diseño a medida.',
      cta: isFr ? 'Démarrer mon projet' : isEn ? 'Start my project' : 'Empezar mi proyecto',
      ctaSecondary: isFr ? 'Voir nos réalisations' : isEn ? 'View our work' : 'Ver nuestros trabajos',
      stats: { clients: isFr ? 'Clients satisfaits' : isEn ? 'Happy clients' : 'Clientes satisfechos', satisfaction: isFr ? 'Taux de satisfaction' : isEn ? 'Satisfaction rate' : 'Tasa de satisfacción', support: isFr ? 'Support inclus' : isEn ? 'Support included' : 'Soporte incluido' },
    },
    useCases: {
      title: isFr ? 'Dans quelle situation êtes-vous ?' : isEn ? "What's your situation?" : '¿Cuál es tu situación?',
      subtitle: isFr ? 'Choisissez votre profil pour découvrir la solution adaptée' : isEn ? 'Choose your profile to discover the right solution' : 'Elige tu perfil para descubrir la solución adecuada',
      cards: {
        beginner: { title: isFr ? 'Je lance mon activité' : isEn ? "I'm launching my business" : 'Estoy lanzando mi negocio', description: isFr ? 'Pas encore de site, je veux démarrer avec une présence professionnelle qui inspire confiance.' : isEn ? 'No website yet, I want to start with a professional presence that inspires trust.' : 'Aún no tengo sitio, quiero empezar con presencia profesional que inspire confianza.' },
        pro: { title: isFr ? "J'ai déjà un site" : isEn ? 'I have a website' : 'Ya tengo un sitio', description: isFr ? 'Mon site est obsolète ou ne me ressemble plus, je veux le moderniser.' : isEn ? 'My website is outdated or no longer represents me, I want to modernize it.' : 'Mi sitio está obsoleto o ya no me representa, quiero modernizarlo.' },
        booking: { title: isFr ? 'Je veux automatiser' : isEn ? 'I want to automate' : 'Quiero automatizar', description: isFr ? 'Je perds du temps avec la gestion manuelle, je veux des réservations et paiements en ligne.' : isEn ? 'I waste time on manual management, I want online bookings and payments.' : 'Pierdo tiempo en gestión manual, quiero reservas y pagos en línea.' },
        sales: { title: isFr ? 'Je veux vendre en ligne' : isEn ? 'I want to sell online' : 'Quiero vender en línea', description: isFr ? 'Je propose des produits ou services que je veux vendre directement sur mon site.' : isEn ? 'I offer products or services I want to sell directly on my site.' : 'Ofrezco productos o servicios que quiero vender directamente en mi sitio.' },
        custom: { title: isFr ? 'Projet sur-mesure' : isEn ? 'Custom project' : 'Proyecto personalizado', description: isFr ? 'Application web, mobile ou cross-plateforme : je veux une solution technique sur-mesure.' : isEn ? 'Web, mobile, or cross-platform app: I want a custom technical solution.' : 'App web, móvil o multiplataforma: quiero una solución técnica personalizada.' },
      },
    },
    whyMindzy: {
      title: isFr ? 'Pourquoi choisir Mindzy ?' : isEn ? 'Why choose Mindzy?' : '¿Por qué elegir Mindzy?',
      subtitle: isFr ? 'Ce qui nous différencie des agences traditionnelles' : isEn ? 'What sets us apart from traditional agencies' : 'Lo que nos diferencia de las agencias tradicionales',
      reasons: {
        specialized: { title: isFr ? 'Experts en conversion' : isEn ? 'Conversion experts' : 'Expertos en conversión', description: isFr ? 'Sites conçus pour convertir vos visiteurs en clients.' : isEn ? 'Sites designed to convert your visitors into clients.' : 'Sitios diseñados para convertir visitantes en clientes.' },
        turnkey: { title: isFr ? 'Solution clé en main' : isEn ? 'Turnkey solution' : 'Solución llave en mano', description: isFr ? 'Nous gérons tout : design, textes, SEO, mise en ligne.' : isEn ? 'We handle everything: design, content, SEO, launch.' : 'Gestionamos todo: diseño, contenido, SEO, lanzamiento.' },
        results: { title: isFr ? 'Résultats garantis' : isEn ? 'Guaranteed results' : 'Resultados garantizados', description: isFr ? 'Nos clients voient leur activité décoller.' : isEn ? 'Our clients see their business take off.' : 'Nuestros clientes ven despegar su negocio.' },
        support: { title: isFr ? 'Support dédié' : isEn ? 'Dedicated support' : 'Soporte dedicado', description: isFr ? 'Une équipe disponible pour vous accompagner.' : isEn ? 'A team available to support you.' : 'Un equipo disponible para acompañarte.' },
      },
    },
    testimonials: { title: isFr ? 'Ce que disent nos clients' : isEn ? 'What our clients say' : 'Lo que dicen nuestros clientes', subtitle: isFr ? 'Témoignages d\'entrepreneurs qui nous font confiance' : isEn ? 'Testimonials from entrepreneurs who trust us' : 'Testimonios de emprendedores que confían en nosotros' },
    pricing: {
      title: isFr ? 'Des tarifs transparents' : isEn ? 'Transparent pricing' : 'Precios transparentes',
      subtitle: isFr ? 'Choisissez la formule adaptée à vos besoins' : isEn ? 'Choose the plan that fits your needs' : 'Elige el plan que se adapte a tus necesidades',
      monthly: isFr ? '/mois TTC' : isEn ? '/month incl. VAT' : '/mes IVA incl.',
      setup: 'Setup',
      cta: isFr ? 'Choisir' : isEn ? 'Choose' : 'Elegir',
      popular: isFr ? 'Populaire' : isEn ? 'Popular' : 'Popular',
      customQuote: { title: isFr ? 'Projet sur-mesure ?' : isEn ? 'Custom project?' : '¿Proyecto personalizado?', description: isFr ? 'Gros projets ou besoins spécifiques : contactez-nous pour un devis.' : isEn ? 'Large projects or specific needs: contact us for a quote.' : 'Proyectos grandes o necesidades específicas: contáctenos para presupuesto.', cta: isFr ? 'Demander un devis' : isEn ? 'Request a quote' : 'Solicitar presupuesto' },
      roi: {
        title: isFr ? 'Calculateur de ROI' : isEn ? 'ROI Calculator' : 'Calculadora de ROI',
        businessType: isFr ? 'Type d\'activité' : isEn ? 'Business type' : 'Tipo de negocio',
        plan: 'Plan',
        breakeven: isFr ? 'suffisent pour rentabiliser' : isEn ? 'enough to recoup cost' : 'suficientes para rentabilizar',
        timeSaved: isFr ? 'heures économisées/mois' : isEn ? 'hours saved/month' : 'horas ahorradas/mes',
        timeSavedLabel: isFr ? 'Temps gagné' : isEn ? 'Time saved' : 'Tiempo ahorrado',
        newClients: isFr ? 'nouveaux clients estimés/mois' : isEn ? 'est. new clients/month' : 'nuevos clientes est./mes',
        newClientsLabel: isFr ? 'Croissance' : isEn ? 'Growth' : 'Crecimiento',
        extraRevenue: isFr ? 'revenu additionnel estimé/mois' : isEn ? 'est. extra revenue/month' : 'ingreso adicional est./mes',
        extraRevenueLabel: isFr ? 'Revenu additionnel' : isEn ? 'Extra revenue' : 'Ingreso adicional',
        annualROI: isFr ? 'ROI annuel estimé' : isEn ? 'Estimated annual ROI' : 'ROI anual estimado',
        disclaimer: isFr ? 'Estimations basées sur les moyennes du secteur' : isEn ? 'Estimates based on industry averages' : 'Estimaciones basadas en promedios del sector',
      },
      features: { pages: isFr ? 'pages' : 'pages', articles: isFr ? 'articles SEO/mois' : isEn ? 'SEO articles/month' : 'artículos SEO/mes', booking: isFr ? 'Réservation en ligne' : isEn ? 'Online booking' : 'Reservas en línea', payments: isFr ? 'Paiements en ligne' : isEn ? 'Online payments' : 'Pagos en línea', products: 'products', gmb: 'Google Business', support: isFr ? 'Support prioritaire' : isEn ? 'Priority support' : 'Soporte prioritario', ssl: 'SSL', hosting: isFr ? 'Hébergement inclus' : isEn ? 'Hosting included' : 'Hosting incluido' },
      plans: { basic: { name: isFr ? 'Starter' : isEn ? 'Starter' : 'Starter', description: isFr ? 'Pour démarrer votre présence en ligne' : isEn ? 'To start your online presence' : 'Para iniciar tu presencia en línea' }, pro: { name: 'Pro', description: isFr ? 'Pour développer votre visibilité. Paiement en ligne inclus.' : isEn ? 'To develop your visibility. Online payment included.' : 'Para desarrollar tu visibilidad. Pago en línea incluido.' }, ecommerce: { name: 'E-commerce', description: isFr ? 'Pour vendre en ligne' : isEn ? 'To sell online' : 'Para vender en línea' } },
    },
    diagnostic: {
      title: isFr ? 'Diagnostic express' : isEn ? 'Express diagnostic' : 'Diagnóstico express',
      subtitle: isFr ? 'Évaluez votre présence digitale en 60 secondes' : isEn ? 'Evaluate your digital presence in 60 seconds' : 'Evalúa tu presencia digital en 60 segundos',
      progress: isFr ? 'Question' : isEn ? 'Question' : 'Pregunta',
      next: isFr ? 'Suivant' : isEn ? 'Next' : 'Siguiente',
      back: isFr ? 'Retour' : isEn ? 'Back' : 'Atrás',
      professionQuestion: isFr ? 'Quelle est votre profession ?' : isEn ? 'What is your profession?' : '¿Cuál es su profesión?',
      otherProfessionPlaceholder: isFr ? 'Précisez votre profession' : isEn ? 'Specify your profession' : 'Especifique su profesión',
      result: { title: isFr ? 'Votre résultat' : isEn ? 'Your result' : 'Tu resultado', low: { title: isFr ? 'Potentiel inexploité' : isEn ? 'Untapped potential' : 'Potencial sin explotar', message: isFr ? 'Votre présence digitale a un fort potentiel d\'amélioration.' : isEn ? 'Your digital presence has strong improvement potential.' : 'Tu presencia digital tiene fuerte potencial de mejora.' }, medium: { title: isFr ? 'Bonne base' : isEn ? 'Good foundation' : 'Buena base', message: isFr ? 'Il reste des opportunités à saisir.' : isEn ? 'There are still opportunities to seize.' : 'Aún hay oportunidades que aprovechar.' }, high: { title: isFr ? 'Excellente présence' : isEn ? 'Excellent presence' : 'Excelente presencia', message: isFr ? 'Félicitations ! Nous pouvons vous aider à optimiser encore.' : isEn ? 'Congratulations! We can help you optimize further.' : '¡Felicitaciones! Podemos ayudarte a optimizar más.' } },
      cta: isFr ? 'Découvrir ma solution personnalisée' : isEn ? 'Discover my personalized solution' : 'Descubrir mi solución personalizada',
    },
    portfolio: { title: isFr ? 'Nos réalisations' : isEn ? 'Our work' : 'Nuestros trabajos', subtitle: isFr ? 'Sites web créés pour nos clients' : isEn ? 'Websites created for our clients' : 'Sitios creados para nuestros clientes', filter: { all: isFr ? 'Tous' : isEn ? 'All' : 'Todos', therapist: isFr ? 'Services' : isEn ? 'Services' : 'Servicios', clinic: isFr ? 'Entreprises' : isEn ? 'Businesses' : 'Empresas', coach: 'Coachs', ecom: 'E-commerce' }, search: isFr ? 'Rechercher...' : isEn ? 'Search...' : 'Buscar...', loadMore: isFr ? 'Voir plus' : isEn ? 'Load more' : 'Cargar más', viewSite: isFr ? 'Voir le site' : isEn ? 'View site' : 'Ver sitio' },
    process: { title: isFr ? 'Notre processus' : isEn ? 'Our process' : 'Nuestro proceso', subtitle: isFr ? 'De la première prise de contact à la mise en ligne' : isEn ? 'From first contact to launch' : 'Desde el primer contacto hasta el lanzamiento', steps: { diagnostic: { title: 'Diagnostic', description: isFr ? 'Nous analysons votre situation et objectifs.' : isEn ? 'We analyze your situation and goals.' : 'Analizamos tu situación y objetivos.', duration: '10 min' }, onboarding: { title: 'Onboarding', description: isFr ? 'Vous nous transmettez vos contenus.' : isEn ? 'You submit your content.' : 'Nos envías tu contenido.', duration: '30 min' }, design: { title: isFr ? 'Design & Développement' : isEn ? 'Design & Development' : 'Diseño y Desarrollo', description: isFr ? 'Création de votre site sur-mesure.' : isEn ? 'Creation of your custom website.' : 'Creación de tu sitio a medida.', duration: isFr ? '2 semaines' : isEn ? '2 weeks' : '2 semanas' }, launch: { title: isFr ? 'Mise en ligne' : isEn ? 'Launch' : 'Lanzamiento', description: isFr ? 'Déploiement avec formation et support.' : isEn ? 'Deployment with training and support.' : 'Despliegue con formación y soporte.', duration: isFr ? '1 jour' : isEn ? '1 day' : '1 día' } } },
    whyUs: { title: isFr ? 'Pourquoi Mindzy ?' : isEn ? 'Why Mindzy?' : '¿Por qué Mindzy?', subtitle: isFr ? 'Agences traditionnelles vs Mindzy' : isEn ? 'Traditional agencies vs Mindzy' : 'Agencias tradicionales vs Mindzy', comparison: { title: isFr ? 'La différence Mindzy' : isEn ? 'The Mindzy difference' : 'La diferencia Mindzy', agencies: { title: isFr ? 'Agences traditionnelles' : isEn ? 'Traditional agencies' : 'Agencias tradicionales', points: [isFr ? 'Templates génériques' : isEn ? 'Generic templates' : 'Plantillas genéricas', isFr ? 'Délais longs et coûts élevés' : isEn ? 'Long delays and high costs' : 'Plazos largos y costos altos', isFr ? 'Support limité après livraison' : isEn ? 'Limited post-delivery support' : 'Soporte limitado después de la entrega'] }, mindzy: { title: 'Mindzy', points: [isFr ? 'Design personnalisé 100%' : isEn ? '100% custom design' : 'Diseño personalizado 100%', isFr ? 'Livraison en 2 semaines' : isEn ? 'Delivery in 2 weeks' : 'Entrega en 2 semanas', isFr ? 'Support illimité inclus' : isEn ? 'Unlimited support included' : 'Soporte ilimitado incluido'] } } },
    reviews: { title: isFr ? 'Avis clients' : isEn ? 'Client reviews' : 'Opiniones', subtitle: isFr ? 'Témoignages vérifiés' : isEn ? 'Verified testimonials' : 'Testimonios verificados' },
    blog: { title: 'Blog', subtitle: isFr ? 'Conseils pour développer votre activité' : isEn ? 'Tips to grow your business' : 'Consejos para desarrollar tu negocio', readMore: isFr ? 'Lire la suite' : isEn ? 'Read more' : 'Leer más', readTime: isFr ? 'min de lecture' : isEn ? 'min read' : 'min de lectura', likedArticle: isFr ? 'Vous avez aimé cet article ?' : isEn ? 'Did you enjoy this article?' : '¿Te gustó este artículo?', relatedArticles: isFr ? 'Articles similaires' : isEn ? 'Related articles' : 'Artículos relacionados', categories: { all: isFr ? 'Tous' : isEn ? 'All' : 'Todos', marketing: 'Marketing', seo: 'SEO', productivite: isFr ? 'Productivité' : isEn ? 'Productivity' : 'Productividad', business: 'Business', branding: 'Branding', sante: isFr ? 'Santé' : isEn ? 'Health' : 'Salud' } },
    faq: { title: isFr ? 'Questions fréquentes' : isEn ? 'FAQ' : 'Preguntas frecuentes', subtitle: isFr ? 'Tout ce que vous devez savoir avant de démarrer' : isEn ? 'Everything you need to know before getting started' : 'Todo lo que necesitas saber antes de empezar', categories: { all: isFr ? 'Toutes' : isEn ? 'All' : 'Todas', general: isFr ? 'Général' : 'General', pricing: isFr ? 'Tarifs' : 'Pricing', technical: isFr ? 'Technique' : 'Technical', support: 'Support', features: isFr ? 'Fonctionnalités' : isEn ? 'Features' : 'Funcionalidades', process: isFr ? 'Processus' : isEn ? 'Process' : 'Proceso' }, allCategories: { all: isFr ? 'Toutes' : isEn ? 'All' : 'Todas', vision: isFr ? 'Vision & utilité' : isEn ? 'Vision & purpose' : 'Visión y utilidad', positionnement: isFr ? 'Positionnement' : isEn ? 'Positioning' : 'Posicionamiento', technique: isFr ? 'Technique' : isEn ? 'Technical' : 'Técnica', seo: 'SEO', fonctionnalites: isFr ? 'Fonctionnalités' : isEn ? 'Features' : 'Funcionalidades', autonomie: isFr ? 'Autonomie' : isEn ? 'Autonomy' : 'Autonomía', accompagnement: isFr ? 'Accompagnement' : isEn ? 'Support' : 'Acompañamiento', formation: 'Formation', tarifs: isFr ? 'Tarifs' : isEn ? 'Pricing' : 'Precios', 'cas-specifiques': isFr ? 'Cas spécifiques' : isEn ? 'Specific cases' : 'Casos específicos', decision: isFr ? 'Décision' : isEn ? 'Decision' : 'Decisión', confiance: isFr ? 'Confiance' : isEn ? 'Trust' : 'Confianza' } },
    about: { title: isFr ? 'À propos' : isEn ? 'About' : 'Sobre nosotros', subtitle: isFr ? 'Notre mission : digitaliser les entrepreneurs' : isEn ? 'Our mission: digitize entrepreneurs' : 'Nuestra misión: digitalizar a los emprendedores', mission: { title: isFr ? 'Notre mission' : isEn ? 'Our mission' : 'Nuestra misión', description: isFr ? 'Aider les entrepreneurs à développer leur activité en ligne.' : isEn ? 'Help entrepreneurs grow their business online.' : 'Ayudar a emprendedores a crecer en línea.' }, values: { title: isFr ? 'Nos valeurs' : isEn ? 'Our values' : 'Nuestros valores', items: [{ title: 'Excellence', description: isFr ? 'Perfection dans chaque projet.' : isEn ? 'Perfection in every project.' : 'Perfección en cada proyecto.' }, { title: isFr ? 'Simplicité' : isEn ? 'Simplicity' : 'Simplicidad', description: isFr ? 'Technologie accessible à tous.' : isEn ? 'Technology accessible to all.' : 'Tecnología accesible para todos.' }, { title: isFr ? 'Transparence' : isEn ? 'Transparency' : 'Transparencia', description: isFr ? 'Prix clairs, sans surprise.' : isEn ? 'Clear pricing, no surprises.' : 'Precios claros, sin sorpresas.' }] } },
    legal: { cgu: { title: isFr ? 'Conditions Générales d\'Utilisation' : isEn ? 'Terms of Use' : 'Términos de Uso' }, cgv: { title: isFr ? 'Conditions Générales de Vente' : isEn ? 'Terms of Sale' : 'Condiciones de Venta' }, mentions: { title: isFr ? 'Mentions Légales' : isEn ? 'Legal Notice' : 'Aviso Legal' } },
    footer: { description: isFr ? 'Mindzy crée des solutions premium pour les entrepreneurs.' : isEn ? 'Mindzy creates premium solutions for entrepreneurs.' : 'Mindzy crea soluciones premium para emprendedores.', sections: { solutions: 'Solutions', resources: isFr ? 'Ressources' : isEn ? 'Resources' : 'Recursos', company: isFr ? 'Entreprise' : isEn ? 'Company' : 'Empresa', legal: 'Legal' }, links: { siteWeb: isFr ? 'Site web' : isEn ? 'Website' : 'Sitio web', surMesure: isFr ? 'Solution sur mesure' : isEn ? 'Custom solution' : 'Solución a medida', formations: isFr ? 'Formations' : isEn ? 'Training' : 'Formación', branding: isFr ? 'Branding & Contenu' : isEn ? 'Branding & Content' : 'Branding y Contenido', portfolio: 'Portfolio', blog: 'Blog', faq: 'FAQ', about: isFr ? 'À propos' : isEn ? 'About' : 'Sobre nosotros', whyUs: isFr ? 'Pourquoi nous' : isEn ? 'Why us' : 'Por qué nosotros', reviews: isFr ? 'Avis' : isEn ? 'Reviews' : 'Opiniones', cgu: 'CGU', cgv: 'CGV', mentions: isFr ? 'Mentions' : 'Legal' }, copyright: isFr ? 'Tous droits réservés.' : isEn ? 'All rights reserved.' : 'Todos los derechos reservados.' },
    stickyCta: { message: isFr ? 'Prêt à développer votre présence en ligne ?' : isEn ? 'Ready to grow your online presence?' : '¿Listo para desarrollar tu presencia en línea?', startButton: isFr ? 'Démarrer' : isEn ? 'Get started' : 'Empezar', meetingButton: isFr ? 'Prendre un RDV' : isEn ? 'Book a call' : 'Reservar llamada' },
    chatbot: {
      title: isFr ? 'Assistant Mindzy' : isEn ? 'Mindzy Assistant' : 'Asistente Mindzy',
      subtitle: isFr ? 'Comment puis-je vous aider ?' : isEn ? 'How can I help you?' : '¿Cómo puedo ayudarte?',
      welcome: isFr ? 'Je peux te poser 3 questions ? 👋' : isEn ? 'Can I ask you 3 questions? 👋' : '¿Puedo hacerte 3 preguntas? 👋',
      quickReplies: { diagnostic: isFr ? '🔍 Faire un diagnostic' : isEn ? '🔍 Take diagnostic' : '🔍 Hacer diagnóstico', meeting: isFr ? '📅 Prendre rendez-vous' : isEn ? '📅 Book meeting' : '📅 Reservar cita', whatsapp: isFr ? '💬 Continuer sur WhatsApp' : isEn ? '💬 Continue on WhatsApp' : '💬 Continuar en WhatsApp' },
      responses: { diagnostic: isFr ? 'Parfait ! Notre diagnostic express en 60 secondes.' : isEn ? 'Perfect! Our 60-second express diagnostic.' : '¡Perfecto! Nuestro diagnóstico express en 60 segundos.', meeting: isFr ? 'Réservez un créneau avec notre équipe.' : isEn ? 'Book a slot with our team.' : 'Reserva una cita con nuestro equipo.', whatsapp: isFr ? 'Cliquez pour continuer sur WhatsApp.' : isEn ? 'Click to continue on WhatsApp.' : 'Haz clic para continuar en WhatsApp.', default: isFr ? 'Je suis là pour vous aider !' : isEn ? 'I\'m here to help!' : '¡Estoy aquí para ayudarte!' },
      buttons: { startDiagnostic: isFr ? 'Commencer le diagnostic' : isEn ? 'Start diagnostic' : 'Iniciar diagnóstico', bookMeeting: isFr ? 'Réserver un créneau' : isEn ? 'Book a slot' : 'Reservar cita', continueWhatsApp: isFr ? 'Continuer sur WhatsApp' : isEn ? 'Continue on WhatsApp' : 'Continuar en WhatsApp', restart: isFr ? 'Recommencer' : isEn ? 'Start over' : 'Empezar de nuevo' },
      whatsappMessage: isFr ? 'Bonjour, je viens du site Mindzy.' : isEn ? 'Hello, I come from the Mindzy website.' : 'Hola, vengo del sitio Mindzy.',
    },
    common: { learnMore: isFr ? 'En savoir plus' : isEn ? 'Learn more' : 'Saber más', getStarted: isFr ? 'Commencer' : isEn ? 'Get started' : 'Empezar', back: isFr ? 'Retour' : isEn ? 'Back' : 'Atrás', next: isFr ? 'Suivant' : isEn ? 'Next' : 'Siguiente', submit: isFr ? 'Envoyer' : isEn ? 'Submit' : 'Enviar', loading: isFr ? 'Chargement...' : isEn ? 'Loading...' : 'Cargando...' },
  }
}

export const copy: Record<Locale, CopyKeys> = {
  fr: buildCopy('fr'),
  en: buildCopy('en'),
  es: buildCopy('es'),
}
