'use client'

import { Button, ArrowIcon } from '@/components/ui/Button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import type { Locale } from '@/lib/i18n'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'

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

const accentColors = [
  { borderClass: 'border-l-rose-300', dotColor: 'bg-rose-400', triggerClass: 'text-rose-500' },
  { borderClass: 'border-l-violet-400', dotColor: 'bg-violet-400', triggerClass: 'text-violet-600' },
  { borderClass: 'border-l-cyan-400', dotColor: 'bg-cyan-400', triggerClass: 'text-cyan-600' },
  { borderClass: 'border-l-amber-400', dotColor: 'bg-amber-400', triggerClass: 'text-amber-700' },
]

export function MetaTikTokFormation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'Meta & TikTok',
      title: 'META & TIKTOK -- GENERER DES LEADS AVEC LES RESEAUX',
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
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F3FF 0%, #EEF2FF 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(167,139,250,0.25)' }}
      />
      <div
        className="absolute bottom-20 -left-10 w-[400px] h-[400px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(147,197,253,0.2)', animationDelay: '3s' }}
      />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-violet-500 text-xs font-medium uppercase tracking-widest mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-[#1E1B4B] mb-4">
            {t.title}
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-500">
            {t.subtitle}
          </p>
        </div>

        {/* Offer cards - 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, i) => {
            const accent = accentColors[i]
            return (
              <div
                key={offer.name.fr}
                className={cn(
                  'bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 border-l-2 p-6 lg:p-8 flex flex-col animate-fade-in-up transition-all duration-300 hover:bg-white/70 hover:shadow-lg',
                  accent.borderClass,
                  offer.featured && 'ring-1 ring-amber-200/30'
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)',
                }}
              >
                {/* Badge for featured */}
                {offer.featured && offer.badge && (
                  <div className="mb-4">
                    <span className="bg-amber-50/60 text-amber-700 text-xs font-medium px-3 py-1 rounded-full">
                      {offer.badge[locale]}
                    </span>
                  </div>
                )}

                {/* Offer name */}
                <h3 className="font-display text-lg font-semibold text-[#1E1B4B] tracking-tight mb-3">
                  {offer.name[locale]}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <span className="font-display text-2xl font-semibold text-[#1E1B4B]">
                    {offer.price}
                  </span>
                  <span className="text-base text-[#1E1B4B]/40 ml-1">&euro;</span>
                </div>

                {/* Target audience */}
                <p className="text-xs text-gray-400 mb-2">
                  {t.targetLabel} : {offer.target[locale]}
                </p>

                {/* Duration in frosted pill */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="bg-white/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-400">
                    {offer.duration[locale]}
                  </span>
                  {offer.format && (
                    <span className="bg-white/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-400">
                      {offer.format[locale]}
                    </span>
                  )}
                </div>

                {/* Programme accordion */}
                <Accordion type="single" className="mb-6">
                  <AccordionItem
                    value={`meta-${i}`}
                    className="border-white/40 rounded-xl"
                  >
                    <AccordionTrigger
                      value={`meta-${i}`}
                      className={cn('text-sm font-medium hover:bg-white/30', accent.triggerClass)}
                    >
                      {t.programmeLabel}
                    </AccordionTrigger>
                    <AccordionContent value={`meta-${i}`}>
                      <ul className="space-y-2.5">
                        {offer.programme[locale].map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm">
                            <span
                              className={cn('w-1 h-1 rounded-full mt-2 flex-shrink-0', accent.dotColor)}
                            />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Result box */}
                      <div className="mt-4 bg-white/40 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-sm">
                          <span className={cn('font-medium', accent.triggerClass)}>{t.resultLabel} :</span>{' '}
                          <span className="text-gray-600">{offer.result[locale]}</span>
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* CTA */}
                <div className="mt-auto">
                  <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      variant={offer.featured ? 'gold' : 'outline'}
                      size="lg"
                      icon={<ArrowIcon />}
                      className="w-full"
                    >
                      {t.cta}
                    </Button>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
