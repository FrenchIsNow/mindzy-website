import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { copy } from '@/lib/copy'
import { testimonials } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const whyUsDescriptions: Record<string, string> = {
  fr: 'Pourquoi choisir Mindzy plutôt qu\'une agence web traditionnelle ? Design personnalisé, livraison en 2 semaines, support illimité, prix transparents.',
  en: 'Why choose Mindzy over a traditional web agency? Custom design, delivery in 2 weeks, unlimited support, transparent pricing.',
  es: '¿Por qué elegir Mindzy en lugar de una agencia web tradicional? Diseño personalizado, entrega en 2 semanas, soporte ilimitado, precios transparentes.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].whyUs
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/pourquoi-nous',
    title: t.title,
    description: whyUsDescriptions[locale] || whyUsDescriptions.fr,
  })
}

const stats = {
  fr: [
    { value: '150+', label: 'Sites créés', description: 'Pour des entrepreneurs partout en Europe' },
    { value: '98%', label: 'Satisfaction client', description: 'Basé sur les avis vérifiés' },
    { value: '2 sem.', label: 'Délai moyen', description: 'De la commande à la mise en ligne' },
    { value: '24/7', label: 'Support réactif', description: 'Réponse sous 4h en moyenne' },
  ],
  en: [
    { value: '150+', label: 'Sites created', description: 'For entrepreneurs across Europe' },
    { value: '98%', label: 'Client satisfaction', description: 'Based on verified reviews' },
    { value: '2 wks', label: 'Average delivery', description: 'From order to launch' },
    { value: '24/7', label: 'Responsive support', description: 'Average response under 4h' },
  ],
  es: [
    { value: '150+', label: 'Sitios creados', description: 'Para emprendedores en toda Europa' },
    { value: '98%', label: 'Satisfacción del cliente', description: 'Basado en opiniones verificadas' },
    { value: '2 sem.', label: 'Plazo promedio', description: 'Del pedido al lanzamiento' },
    { value: '24/7', label: 'Soporte receptivo', description: 'Respuesta promedio en 4h' },
  ],
}

const differentiators = {
  fr: [
    {
      icon: '🎯',
      title: 'Spécialistes de la conversion',
      description: 'Nos sites ne sont pas juste beaux, ils sont conçus pour transformer vos visiteurs en clients. Chaque élément est optimisé pour guider vers l\'action.',
      details: ['Appels à l\'action stratégiques', 'Parcours utilisateur optimisé', 'Formulaires de conversion testés', 'Analytics et suivi des performances'],
    },
    {
      icon: '⚡',
      title: 'Rapidité d\'exécution',
      description: 'Là où les agences traditionnelles prennent 2-3 mois, nous livrons votre site en 2 semaines. Sans compromis sur la qualité.',
      details: ['Processus optimisé et rodé', 'Templates premium personnalisables', 'Équipe dédiée et réactive', 'Méthodologie agile'],
    },
    {
      icon: '💰',
      title: 'Tarification transparente',
      description: 'Pas de devis à rallonge ni de surprises. Nos prix sont clairs et tout compris : création, hébergement, support.',
      details: ['Prix affichés = prix finaux', 'Pas de frais cachés', 'Abonnement tout inclus', 'Options clairement tarifées'],
    },
    {
      icon: '🛡️',
      title: 'Accompagnement continu',
      description: 'Notre relation ne s\'arrête pas à la livraison. Nous restons à vos côtés pour faire évoluer votre site et résoudre tout problème.',
      details: ['Support illimité inclus', 'Modifications mensuelles', 'Mises à jour de sécurité', 'Conseils stratégiques'],
    },
    {
      icon: '🔍',
      title: 'SEO intégré dès le départ',
      description: 'Chaque site est construit avec les meilleures pratiques SEO pour vous positionner sur Google et attirer des clients organiquement.',
      details: ['Structure optimisée Google', 'Balises méta configurées', 'Vitesse de chargement A+', 'Google Business inclus'],
    },
    {
      icon: '📱',
      title: 'Mobile-first par défaut',
      description: 'Plus de 60% du trafic web vient du mobile. Tous nos sites sont conçus en priorité pour offrir une expérience parfaite sur smartphone.',
      details: ['Design responsive natif', 'Touch-friendly', 'Chargement ultra-rapide', 'PWA disponible'],
    },
  ],
  en: [
    {
      icon: '🎯',
      title: 'Conversion specialists',
      description: 'Our sites are not just beautiful, they are designed to turn your visitors into clients. Every element is optimized to guide towards action.',
      details: ['Strategic CTAs', 'Optimized user journey', 'Tested conversion forms', 'Analytics and performance tracking'],
    },
    {
      icon: '⚡',
      title: 'Speed of execution',
      description: 'Where traditional agencies take 2-3 months, we deliver your site in 2 weeks. Without compromising on quality.',
      details: ['Optimized and proven process', 'Customizable premium templates', 'Dedicated and responsive team', 'Agile methodology'],
    },
    {
      icon: '💰',
      title: 'Transparent pricing',
      description: 'No lengthy quotes or surprises. Our prices are clear and all-inclusive: creation, hosting, support.',
      details: ['Displayed prices = final prices', 'No hidden fees', 'All-inclusive subscription', 'Clearly priced options'],
    },
    {
      icon: '🛡️',
      title: 'Continuous support',
      description: 'Our relationship doesn\'t end at delivery. We stay by your side to evolve your site and solve any problems.',
      details: ['Unlimited support included', 'Monthly modifications', 'Security updates', 'Strategic advice'],
    },
    {
      icon: '🔍',
      title: 'SEO built-in from the start',
      description: 'Every site is built with SEO best practices to rank you on Google and attract clients organically.',
      details: ['Google-optimized structure', 'Configured meta tags', 'A+ loading speed', 'Google Business included'],
    },
    {
      icon: '📱',
      title: 'Mobile-first by default',
      description: 'Over 60% of web traffic comes from mobile. All our sites are designed mobile-first for a perfect smartphone experience.',
      details: ['Native responsive design', 'Touch-friendly', 'Ultra-fast loading', 'PWA available'],
    },
  ],
  es: [
    {
      icon: '🎯',
      title: 'Especialistas en conversión',
      description: 'Nuestros sitios no solo son hermosos, están diseñados para convertir visitantes en clientes. Cada elemento está optimizado para guiar hacia la acción.',
      details: ['CTAs estratégicos', 'Recorrido del usuario optimizado', 'Formularios de conversión probados', 'Análisis y seguimiento del rendimiento'],
    },
    {
      icon: '⚡',
      title: 'Velocidad de ejecución',
      description: 'Donde las agencias tradicionales tardan 2-3 meses, nosotros entregamos tu sitio en 2 semanas. Sin comprometer la calidad.',
      details: ['Proceso optimizado y probado', 'Plantillas premium personalizables', 'Equipo dedicado y receptivo', 'Metodología ágil'],
    },
    {
      icon: '💰',
      title: 'Precios transparentes',
      description: 'Sin presupuestos extensos ni sorpresas. Nuestros precios son claros y todo incluido: creación, hosting, soporte.',
      details: ['Precios mostrados = precios finales', 'Sin costos ocultos', 'Suscripción todo incluido', 'Opciones claramente tarifadas'],
    },
    {
      icon: '🛡️',
      title: 'Acompañamiento continuo',
      description: 'Nuestra relación no termina en la entrega. Permanecemos a tu lado para evolucionar tu sitio y resolver cualquier problema.',
      details: ['Soporte ilimitado incluido', 'Modificaciones mensuales', 'Actualizaciones de seguridad', 'Consejos estratégicos'],
    },
    {
      icon: '🔍',
      title: 'SEO integrado desde el inicio',
      description: 'Cada sitio está construido con las mejores prácticas SEO para posicionarte en Google y atraer clientes orgánicamente.',
      details: ['Estructura optimizada para Google', 'Etiquetas meta configuradas', 'Velocidad de carga A+', 'Google Business incluido'],
    },
    {
      icon: '📱',
      title: 'Mobile-first por defecto',
      description: 'Más del 60% del tráfico web viene del móvil. Todos nuestros sitios están diseñados mobile-first para una experiencia perfecta en smartphone.',
      details: ['Diseño responsive nativo', 'Touch-friendly', 'Carga ultrarrápida', 'PWA disponible'],
    },
  ],
}

const guarantees = {
  fr: [
    { icon: '✓', title: 'Satisfait ou remboursé', description: 'Si votre site ne vous convient pas dans les 30 premiers jours, nous vous remboursons intégralement les frais de mise en place.' },
    { icon: '✓', title: 'Livraison garantie', description: 'Nous nous engageons à livrer votre site dans les délais convenus. En cas de retard de notre fait, le premier mois d\'abonnement est offert.' },
    { icon: '✓', title: 'Disponibilité 99.9%', description: 'Notre infrastructure garantit une disponibilité maximale de votre site. En cas de panne prolongée, nous vous indemnisons.' },
    { icon: '✓', title: 'Données sécurisées', description: 'Vos données sont hébergées en Europe, sauvegardées quotidiennement, et protégées par les dernières normes de sécurité.' },
  ],
  en: [
    { icon: '✓', title: 'Satisfaction guaranteed', description: 'If your site doesn\'t meet your expectations within the first 30 days, we fully refund the setup fees.' },
    { icon: '✓', title: 'Delivery guaranteed', description: 'We commit to delivering your site within the agreed timeframe. In case of delay on our end, the first month is free.' },
    { icon: '✓', title: '99.9% uptime', description: 'Our infrastructure guarantees maximum availability of your site. In case of extended downtime, we compensate you.' },
    { icon: '✓', title: 'Secure data', description: 'Your data is hosted in Europe, backed up daily, and protected by the latest security standards.' },
  ],
  es: [
    { icon: '✓', title: 'Satisfacción garantizada', description: 'Si tu sitio no te convence en los primeros 30 días, te reembolsamos íntegramente los gastos de instalación.' },
    { icon: '✓', title: 'Entrega garantizada', description: 'Nos comprometemos a entregar tu sitio en los plazos acordados. En caso de retraso por nuestra parte, el primer mes es gratis.' },
    { icon: '✓', title: 'Disponibilidad 99.9%', description: 'Nuestra infraestructura garantiza la máxima disponibilidad de tu sitio. En caso de caída prolongada, te compensamos.' },
    { icon: '✓', title: 'Datos seguros', description: 'Tus datos están alojados en Europa, respaldados diariamente y protegidos por los últimos estándares de seguridad.' },
  ],
}

const process = {
  fr: [
    { step: '01', title: 'Appel découverte', description: 'Un appel de 30 minutes pour comprendre votre activité, vos objectifs et vos besoins. Gratuit et sans engagement.', duration: '30 min' },
    { step: '02', title: 'Proposition sur-mesure', description: 'Sous 48h, vous recevez une proposition personnalisée avec maquettes, tarif et planning détaillé.', duration: '48h' },
    { step: '03', title: 'Collecte des contenus', description: 'Nous vous guidons pour rassembler vos textes, images et informations. Notre équipe peut aussi s\'en charger.', duration: '1 sem.' },
    { step: '04', title: 'Design & développement', description: 'Notre équipe crée votre site. Vous validez chaque étape avec 2 rounds de révisions inclus.', duration: '2 sem.' },
    { step: '05', title: 'Tests & optimisation', description: 'Tests complets (mobile, vitesse, SEO), corrections et optimisations avant le lancement.', duration: '2-3 jours' },
    { step: '06', title: 'Mise en ligne & formation', description: 'Déploiement de votre site + session de formation pour prendre en main les outils.', duration: '1 jour' },
  ],
  en: [
    { step: '01', title: 'Discovery call', description: 'A 30-minute call to understand your business, goals and needs. Free and no commitment.', duration: '30 min' },
    { step: '02', title: 'Custom proposal', description: 'Within 48h, you receive a personalized proposal with mockups, pricing and detailed timeline.', duration: '48h' },
    { step: '03', title: 'Content collection', description: 'We guide you to gather your texts, images and information. Our team can also handle this.', duration: '1 week' },
    { step: '04', title: 'Design & development', description: 'Our team creates your site. You validate each step with 2 rounds of revisions included.', duration: '2 weeks' },
    { step: '05', title: 'Testing & optimization', description: 'Complete testing (mobile, speed, SEO), fixes and optimizations before launch.', duration: '2-3 days' },
    { step: '06', title: 'Launch & training', description: 'Deployment of your site + training session to master the tools.', duration: '1 day' },
  ],
  es: [
    { step: '01', title: 'Llamada de descubrimiento', description: 'Una llamada de 30 minutos para entender tu negocio, objetivos y necesidades. Gratis y sin compromiso.', duration: '30 min' },
    { step: '02', title: 'Propuesta personalizada', description: 'En 48h, recibes una propuesta personalizada con maquetas, precios y cronograma detallado.', duration: '48h' },
    { step: '03', title: 'Recopilación de contenido', description: 'Te guiamos para reunir tus textos, imágenes e información. Nuestro equipo también puede encargarse.', duration: '1 sem.' },
    { step: '04', title: 'Diseño y desarrollo', description: 'Nuestro equipo crea tu sitio. Validas cada etapa con 2 rondas de revisiones incluidas.', duration: '2 sem.' },
    { step: '05', title: 'Pruebas y optimización', description: 'Pruebas completas (móvil, velocidad, SEO), correcciones y optimizaciones antes del lanzamiento.', duration: '2-3 días' },
    { step: '06', title: 'Lanzamiento y formación', description: 'Despliegue de tu sitio + sesión de formación para dominar las herramientas.', duration: '1 día' },
  ],
}

const comparisonTable = {
  fr: {
    headers: ['Critère', 'Agences traditionnelles', 'Freelances', 'DIY (Wix, etc.)', 'Mindzy'],
    rows: [
      ['Prix moyen', '3 000 - 15 000€', '1 500 - 5 000€', '200 - 500€/an', 'À partir de 49€/mois'],
      ['Délai de livraison', '2-4 mois', '1-2 mois', 'DIY (variable)', '2 semaines'],
      ['Design personnalisé', '✓ Premium', '✓ Variable', '✗ Templates', '✓ Premium'],
      ['SEO optimisé', '✓ (supplément)', '? Variable', '✗ Basique', '✓ Inclus'],
      ['Réservation en ligne', '? Sur demande', '? Variable', '? Plugins', '✓ Intégré'],
      ['Support continu', '✗ Limité', '? Variable', '✗ Forum', '✓ Illimité'],
      ['Mises à jour', '✗ Facturées', '✗ Facturées', '✓ Auto', '✓ Incluses'],
      ['Hébergement', '✗ Extra', '✗ Extra', '✓ Inclus', '✓ Premium inclus'],
    ],
  },
  en: {
    headers: ['Criteria', 'Traditional agencies', 'Freelancers', 'DIY (Wix, etc.)', 'Mindzy'],
    rows: [
      ['Average price', '€3,000 - €15,000', '€1,500 - €5,000', '€200 - €500/year', 'From €49/month'],
      ['Delivery time', '2-4 months', '1-2 months', 'DIY (variable)', '2 weeks'],
      ['Custom design', '✓ Premium', '✓ Variable', '✗ Templates', '✓ Premium'],
      ['SEO optimized', '✓ (extra)', '? Variable', '✗ Basic', '✓ Included'],
      ['Online booking', '? On request', '? Variable', '? Plugins', '✓ Built-in'],
      ['Ongoing support', '✗ Limited', '? Variable', '✗ Forum', '✓ Unlimited'],
      ['Updates', '✗ Billed', '✗ Billed', '✓ Auto', '✓ Included'],
      ['Hosting', '✗ Extra', '✗ Extra', '✓ Included', '✓ Premium included'],
    ],
  },
  es: {
    headers: ['Criterio', 'Agencias tradicionales', 'Freelancers', 'DIY (Wix, etc.)', 'Mindzy'],
    rows: [
      ['Precio promedio', '3.000 - 15.000€', '1.500 - 5.000€', '200 - 500€/año', 'Desde 49€/mes'],
      ['Tiempo de entrega', '2-4 meses', '1-2 meses', 'DIY (variable)', '2 semanas'],
      ['Diseño personalizado', '✓ Premium', '✓ Variable', '✗ Plantillas', '✓ Premium'],
      ['SEO optimizado', '✓ (extra)', '? Variable', '✗ Básico', '✓ Incluido'],
      ['Reservas en línea', '? Bajo demanda', '? Variable', '? Plugins', '✓ Integrado'],
      ['Soporte continuo', '✗ Limitado', '? Variable', '✗ Foro', '✓ Ilimitado'],
      ['Actualizaciones', '✗ Facturadas', '✗ Facturadas', '✓ Auto', '✓ Incluidas'],
      ['Hosting', '✗ Extra', '✗ Extra', '✓ Incluido', '✓ Premium incluido'],
    ],
  },
}

const titles = {
  fr: {
    stats: 'En quelques chiffres',
    differentiators: 'Ce qui nous rend uniques',
    comparison: 'Comparatif détaillé',
    process: 'Notre processus en 6 étapes',
    guarantees: 'Nos garanties',
    testimonials: 'Ils nous font confiance',
    cta: 'Prêt à transformer votre présence en ligne ?',
    ctaSubtitle: 'Réservez un appel découverte gratuit de 30 minutes pour discuter de votre projet.',
    ctaButton: 'Réserver mon appel gratuit',
    ctaSecondary: 'Voir nos tarifs',
  },
  en: {
    stats: 'By the numbers',
    differentiators: 'What makes us unique',
    comparison: 'Detailed comparison',
    process: 'Our 6-step process',
    guarantees: 'Our guarantees',
    testimonials: 'They trust us',
    cta: 'Ready to transform your online presence?',
    ctaSubtitle: 'Book a free 30-minute discovery call to discuss your project.',
    ctaButton: 'Book my free call',
    ctaSecondary: 'See our pricing',
  },
  es: {
    stats: 'En números',
    differentiators: 'Lo que nos hace únicos',
    comparison: 'Comparación detallada',
    process: 'Nuestro proceso en 6 pasos',
    guarantees: 'Nuestras garantías',
    testimonials: 'Confían en nosotros',
    cta: '¿Listo para transformar tu presencia en línea?',
    ctaSubtitle: 'Reserva una llamada de descubrimiento gratuita de 30 minutos para discutir tu proyecto.',
    ctaButton: 'Reservar mi llamada gratis',
    ctaSecondary: 'Ver nuestros precios',
  },
}

export default async function PourquoiNousPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = locale as Locale
  const t = copy[l].whyUs
  const tt = titles[l]
  const localeStats = stats[l]
  const localeDiff = differentiators[l]
  const localeGuarantees = guarantees[l]
  const localeProcess = process[l]
  const localeComparison = comparisonTable[l]

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container-wide mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="violet" className="mb-4">
            {l === 'fr' ? 'Pourquoi nous choisir' : l === 'en' ? 'Why choose us' : 'Por qué elegirnos'}
          </Badge>
          <h1 className="heading-1 text-anthracite mb-6">{t.title}</h1>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-wide mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {localeStats.map((stat, i) => (
            <Card key={i} variant="elevated" className="text-center p-6 hover:shadow-glow transition-shadow">
              <div className="text-4xl md:text-5xl font-display font-bold text-violet mb-2">{stat.value}</div>
              <div className="font-semibold text-anthracite mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="container-wide mb-24">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-anthracite mb-4">{tt.differentiators}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localeDiff.map((item, i) => (
            <Card key={i} variant="outline" className="p-6 hover:border-violet/50 transition-colors">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-display font-semibold text-anthracite mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.details.map((detail, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-violet">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-cream-100 py-20 mb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite mb-4">{tt.comparison}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-soft overflow-hidden">
              <thead>
                <tr className="bg-anthracite text-white">
                  {localeComparison.headers.map((header, i) => (
                    <th key={i} className={`px-6 py-4 text-left font-display ${i === 4 ? 'bg-violet' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {localeComparison.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-6 py-4 ${j === 0 ? 'font-semibold text-anthracite' : 'text-gray-600'} ${j === 4 ? 'bg-violet/5 font-semibold text-violet' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container-wide mb-24">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-anthracite mb-4">{tt.process}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localeProcess.map((step, i) => (
            <div key={i} className="relative">
              <Card variant="glass" className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet/10 flex items-center justify-center">
                    <span className="font-display font-bold text-violet">{step.step}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-semibold text-anthracite">{step.title}</h3>
                      <Badge variant="outline" size="sm">{step.duration}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="container-wide mb-24">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-anthracite mb-4">{tt.guarantees}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {localeGuarantees.map((guarantee, i) => (
            <Card key={i} variant="elevated" className="p-6 border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                  {guarantee.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-anthracite mb-2">{guarantee.title}</h3>
                  <p className="text-gray-600">{guarantee.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="bg-gradient-to-b from-violet-50 to-cream-50 py-20 mb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite mb-4">{tt.testimonials}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} variant="elevated" className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.quote[l]}&rdquo;</p>
                <div>
                  <div className="font-semibold text-anthracite">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.profession[l]}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-wide">
        <Card variant="gradient" className="p-12 text-center">
          <h2 className="heading-2 text-anthracite mb-4">{tt.cta}</h2>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">{tt.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/diagnostic`}>
              <Button variant="primary" size="lg">{tt.ctaButton}</Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button variant="outline" size="lg">{tt.ctaSecondary}</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
