'use client'

import { Card, CardTitle } from '@/components/ui/Card'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import type { Locale } from '@/lib/i18n'
import { config } from '@/lib/config'

interface MetaOffer {
  name: Record<Locale, string>
  price: number
  duration: Record<Locale, string>
  format?: Record<Locale, string>
  target: Record<Locale, string>
  programme: Record<Locale, string[]>
  result: Record<Locale, string>
  featured?: boolean
  badge?: Record<Locale, string>
}

const offers: MetaOffer[] = [
  {
    name: {
      fr: 'Offre 1 -- Lancer sa Présence',
      en: 'Offer 1 -- Launch Your Presence',
      es: 'Oferta 1 -- Lanzar tu Presencia',
    },
    price: 190,
    duration: {
      fr: '3h (2 sessions 1h30)',
      en: '3h (2 sessions 1h30)',
      es: '3h (2 sesiones 1h30)',
    },
    format: {
      fr: 'Live + supports + replay',
      en: 'Live + materials + replay',
      es: 'En vivo + materiales + replay',
    },
    target: {
      fr: 'Entrepreneurs, indépendants, petites entreprises',
      en: 'Entrepreneurs, freelancers, small businesses',
      es: 'Emprendedores, autónomos, pequeñas empresas',
    },
    programme: {
      fr: [
        'Fonctionnement des algorithmes',
        'Contenu organique vs publicité',
        'Positionnement',
        'Contenu qui attire des prospects',
        'Plan de publication',
      ],
      en: [
        'How algorithms work',
        'Organic content vs advertising',
        'Positioning',
        'Content that attracts prospects',
        'Publication plan',
      ],
      es: [
        'Funcionamiento de los algoritmos',
        'Contenido orgánico vs publicidad',
        'Posicionamiento',
        'Contenido que atrae prospectos',
        'Plan de publicación',
      ],
    },
    result: {
      fr: 'Stratégie claire + plan d\'action concret',
      en: 'Clear strategy + concrete action plan',
      es: 'Estrategia clara + plan de acción concreto',
    },
  },
  {
    name: {
      fr: 'Offre 2 -- Campagnes Rentables',
      en: 'Offer 2 -- Profitable Campaigns',
      es: 'Oferta 2 -- Campañas Rentables',
    },
    price: 340,
    duration: {
      fr: '4h (2 sessions 2h)',
      en: '4h (2 sessions 2h)',
      es: '4h (2 sesiones 2h)',
    },
    target: {
      fr: 'Ceux qui veulent passer à la publicité',
      en: 'Those who want to move to advertising',
      es: 'Los que quieren pasar a la publicidad',
    },
    programme: {
      fr: [
        'Configuration compte publicitaire',
        'Installation pixel',
        'Campagne Meta',
        'Campagne TikTok',
        'Indicateurs clés (CPM, CPC, CPA)',
        'Optimisation',
      ],
      en: [
        'Ad account configuration',
        'Pixel installation',
        'Meta campaign',
        'TikTok campaign',
        'Key indicators (CPM, CPC, CPA)',
        'Optimization',
      ],
      es: [
        'Configuración de cuenta publicitaria',
        'Instalación del pixel',
        'Campaña Meta',
        'Campaña TikTok',
        'Indicadores clave (CPM, CPC, CPA)',
        'Optimización',
      ],
    },
    result: {
      fr: 'Campagnes actives et optimisables seul',
      en: 'Active campaigns you can optimize on your own',
      es: 'Campañas activas y optimizables por tu cuenta',
    },
  },
  {
    name: {
      fr: 'Offre 3 -- Système d\'Acquisition Complet',
      en: 'Offer 3 -- Complete Acquisition System',
      es: 'Oferta 3 -- Sistema de Adquisición Completo',
    },
    price: 590,
    duration: {
      fr: '8h (4 sessions 2h)',
      en: '8h (4 sessions 2h)',
      es: '8h (4 sesiones 2h)',
    },
    target: {
      fr: 'Entrepreneurs et PME',
      en: 'Entrepreneurs and SMBs',
      es: 'Emprendedores y PYMES',
    },
    programme: {
      fr: [
        'Stratégie organique + publicité',
        'Tunnel (page + offre + relance)',
        'Retargeting',
        'Structuration audiences',
        'Optimisation budgets',
        'Analyse résultats',
      ],
      en: [
        'Organic strategy + advertising',
        'Funnel (page + offer + follow-up)',
        'Retargeting',
        'Audience structuring',
        'Budget optimization',
        'Results analysis',
      ],
      es: [
        'Estrategia orgánica + publicidad',
        'Embudo (página + oferta + seguimiento)',
        'Retargeting',
        'Estructuración de audiencias',
        'Optimización de presupuestos',
        'Análisis de resultados',
      ],
    },
    result: {
      fr: 'Système complet générant des leads en continu',
      en: 'Complete system generating continuous leads',
      es: 'Sistema completo generando leads de forma continua',
    },
  },
  {
    name: {
      fr: 'Offre 4 -- Machine à Leads Automatisée',
      en: 'Offer 4 -- Automated Lead Machine',
      es: 'Oferta 4 -- Máquina de Leads Automatizada',
    },
    price: 890,
    duration: {
      fr: '12h (6 sessions 2h)',
      en: '12h (6 sessions 2h)',
      es: '12h (6 sesiones 2h)',
    },
    target: {
      fr: 'Entrepreneurs ambitieux, agences, entreprises en croissance',
      en: 'Ambitious entrepreneurs, agencies, growing companies',
      es: 'Emprendedores ambiciosos, agencias, empresas en crecimiento',
    },
    programme: {
      fr: [
        'Business Manager avancé',
        'Multi-campagnes par offre',
        'Tunnel + CRM',
        'Retargeting avancé',
        'Formulaires lead natifs',
        'Click to WhatsApp/Messenger',
        'TikTok Lead Gen',
        'Automatisation leads',
        'Scaling progressif',
        'Plan 90 jours',
      ],
      en: [
        'Advanced Business Manager',
        'Multi-campaigns per offer',
        'Funnel + CRM',
        'Advanced retargeting',
        'Native lead forms',
        'Click to WhatsApp/Messenger',
        'TikTok Lead Gen',
        'Lead automation',
        'Progressive scaling',
        '90-day plan',
      ],
      es: [
        'Business Manager avanzado',
        'Multi-campañas por oferta',
        'Embudo + CRM',
        'Retargeting avanzado',
        'Formularios de leads nativos',
        'Click to WhatsApp/Messenger',
        'TikTok Lead Gen',
        'Automatización de leads',
        'Escalado progresivo',
        'Plan de 90 días',
      ],
    },
    result: {
      fr: 'Machine à leads multicanale opérationnelle',
      en: 'Operational multichannel lead machine',
      es: 'Máquina de leads multicanal operativa',
    },
    featured: true,
    badge: {
      fr: 'Machine à Leads',
      en: 'Lead Machine',
      es: 'Máquina de Leads',
    },
  },
]

export function MetaTikTokFormation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Meta & TikTok',
      title: 'META & TIKTOK -- GÉNÉRER DES LEADS AVEC LES RÉSEAUX',
      subtitle:
        'Apprenez à utiliser Meta (Facebook + Instagram) et TikTok pour créer un vrai système d\'acquisition.',
      targetLabel: 'Pour',
      programmeLabel: 'Voir le programme',
      resultLabel: 'Résultat',
      cta: 'Réserver un appel',
    },
    en: {
      eyebrow: 'Meta & TikTok',
      title: 'META & TIKTOK -- GENERATE LEADS WITH SOCIAL MEDIA',
      subtitle:
        'Learn how to use Meta (Facebook + Instagram) and TikTok to create a real acquisition system.',
      targetLabel: 'For',
      programmeLabel: 'View programme',
      resultLabel: 'Result',
      cta: 'Book a call',
    },
    es: {
      eyebrow: 'Meta & TikTok',
      title: 'META & TIKTOK -- GENERAR LEADS CON LAS REDES SOCIALES',
      subtitle:
        'Aprende a usar Meta (Facebook + Instagram) y TikTok para crear un verdadero sistema de adquisición.',
      targetLabel: 'Para',
      programmeLabel: 'Ver el programa',
      resultLabel: 'Resultado',
      cta: 'Reservar una llamada',
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding relative overflow-hidden bg-cream-50/50">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, i) => (
            <Card
              key={offer.name.fr}
              variant={offer.featured ? 'featured' : 'default'}
              padding="none"
              className="overflow-hidden flex flex-col animate-fade-in-up relative"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Top color stripe */}
              <div className={`h-2 ${offer.featured ? 'bg-gradient-to-r from-rose-400 to-rose-600' : 'bg-gradient-to-r from-rose-300 to-rose-500'}`} />

              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Badge for featured */}
                {offer.featured && offer.badge && (
                  <div className="mb-4">
                    <Badge variant="gold">{offer.badge[locale]}</Badge>
                  </div>
                )}

                {/* Offer name */}
                <CardTitle as="h3" className="mb-3">{offer.name[locale]}</CardTitle>

                {/* Target audience */}
                <p className="text-sm text-gray-500 mb-3">
                  <span className="font-semibold text-anthracite">{t.targetLabel} :</span> {offer.target[locale]}
                </p>

                {/* Duration & format badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary" size="sm">{offer.duration[locale]}</Badge>
                  {offer.format && <Badge variant="default" size="sm">{offer.format[locale]}</Badge>}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-display text-3xl font-semibold text-anthracite">{offer.price} &euro;</span>
                </div>

                {/* Programme accordion */}
                <Accordion type="single" className="mb-6">
                  <AccordionItem value={`meta-${i}`} className="border-gray-100">
                    <AccordionTrigger value={`meta-${i}`} className="text-sm font-semibold text-rose-500">
                      {t.programmeLabel}
                    </AccordionTrigger>
                    <AccordionContent value={`meta-${i}`}>
                      <ul className="space-y-2">
                        {offer.programme[locale].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <svg className="w-4 h-4 mt-0.5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 bg-rose-50 rounded-lg">
                        <p className="text-sm font-medium text-anthracite">
                          <span className="text-rose-500">{t.resultLabel} :</span> {offer.result[locale]}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* CTA */}
                <div className="mt-auto">
                  <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      variant={offer.featured ? 'primary' : 'outline'}
                      size="lg"
                      icon={<ArrowIcon />}
                      className="w-full"
                    >
                      {t.cta}
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
