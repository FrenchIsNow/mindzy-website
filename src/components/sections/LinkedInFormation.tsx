'use client'

import { Button, ArrowIcon } from '@/components/ui/Button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import type { Locale } from '@/lib/i18n'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'

interface LinkedInPack {
  name: Record<Locale, string>
  price: number
  duration: Record<Locale, string>
  format: Record<Locale, string>
  objective: Record<Locale, string>
  programme: Record<Locale, string[]>
  result: Record<Locale, string>
  featured?: boolean
  badge?: Record<Locale, string>
}

const packs: LinkedInPack[] = [
  {
    name: {
      fr: 'Pack 1 -- Fondations LinkedIn',
      en: 'Pack 1 -- LinkedIn Foundations',
      es: 'Pack 1 -- Fundamentos LinkedIn',
    },
    price: 190,
    duration: {
      fr: '3 heures (2 sessions 1h30)',
      en: '3 hours (2 sessions 1h30)',
      es: '3 horas (2 sesiones 1h30)',
    },
    format: {
      fr: 'Live + supports + replay',
      en: 'Live + materials + replay',
      es: 'En vivo + materiales + replay',
    },
    objective: {
      fr: 'Poser les bases d\'un profil stratégique et d\'une visibilité cohérente.',
      en: 'Lay the foundations of a strategic profile and consistent visibility.',
      es: 'Sentar las bases de un perfil estratégico y una visibilidad coherente.',
    },
    programme: {
      fr: [
        'Optimisation avancée du profil',
        'Positionnement différenciant',
        'Ciblage précis de l\'audience',
        'Méthode simple de création de contenu',
        'Structure de posts performants',
      ],
      en: [
        'Advanced profile optimization',
        'Differentiating positioning',
        'Precise audience targeting',
        'Simple content creation method',
        'High-performing post structure',
      ],
      es: [
        'Optimización avanzada del perfil',
        'Posicionamiento diferenciador',
        'Segmentación precisa de la audiencia',
        'Método simple de creación de contenido',
        'Estructura de publicaciones eficaces',
      ],
    },
    result: {
      fr: 'Profil optimisé + ligne éditoriale claire',
      en: 'Optimized profile + clear editorial line',
      es: 'Perfil optimizado + línea editorial clara',
    },
  },
  {
    name: {
      fr: 'Pack 2 -- Acquisition & Prospection',
      en: 'Pack 2 -- Acquisition & Prospecting',
      es: 'Pack 2 -- Adquisición y Prospección',
    },
    price: 290,
    duration: {
      fr: '4 heures (2 sessions 2h)',
      en: '4 hours (2 sessions 2h)',
      es: '4 horas (2 sesiones 2h)',
    },
    format: {
      fr: 'Live + templates + scripts',
      en: 'Live + templates + scripts',
      es: 'En vivo + plantillas + scripts',
    },
    objective: {
      fr: 'Structurer un système de génération de leads.',
      en: 'Build a lead generation system.',
      es: 'Estructurar un sistema de generación de leads.',
    },
    programme: {
      fr: [
        'Méthodologie de prospection LinkedIn',
        'Ciblage intelligent',
        'Séquences de messages performantes',
        'Organisation du pipeline',
        'Routine hebdomadaire',
        'Sales Navigator : Recherche avancée, Filtres intelligents, Construction de listes qualifiées',
      ],
      en: [
        'LinkedIn prospecting methodology',
        'Smart targeting',
        'High-performing message sequences',
        'Pipeline organization',
        'Weekly routine',
        'Sales Navigator: Advanced search, Smart filters, Qualified list building',
      ],
      es: [
        'Metodología de prospección LinkedIn',
        'Segmentación inteligente',
        'Secuencias de mensajes eficaces',
        'Organización del pipeline',
        'Rutina semanal',
        'Sales Navigator: Búsqueda avanzada, Filtros inteligentes, Construcción de listas cualificadas',
      ],
    },
    result: {
      fr: 'Système de prospection activable immédiatement',
      en: 'Prospecting system ready to activate immediately',
      es: 'Sistema de prospección activable de inmediato',
    },
  },
  {
    name: {
      fr: 'Pack 3 -- LinkedIn Acquisition Mastery',
      en: 'Pack 3 -- LinkedIn Acquisition Mastery',
      es: 'Pack 3 -- LinkedIn Acquisition Mastery',
    },
    price: 490,
    duration: {
      fr: '8 heures (4 sessions 2h)',
      en: '8 hours (4 sessions 2h)',
      es: '8 horas (4 sesiones 2h)',
    },
    format: {
      fr: 'Pack 1 + Pack 2 + optimisation avancée',
      en: 'Pack 1 + Pack 2 + advanced optimization',
      es: 'Pack 1 + Pack 2 + optimización avanzada',
    },
    objective: {
      fr: 'Maîtriser l\'intégralité du système d\'acquisition LinkedIn.',
      en: 'Master the entire LinkedIn acquisition system.',
      es: 'Dominar todo el sistema de adquisición LinkedIn.',
    },
    programme: {
      fr: [
        'Contenu des Packs 1 & 2 inclus',
        'Stratégie de contenu avancée',
        'Plan 60 jours',
        'Automatisation responsable',
        'Optimisation des performances',
        'KPI & tracking',
      ],
      en: [
        'Packs 1 & 2 content included',
        'Advanced content strategy',
        '60-day plan',
        'Responsible automation',
        'Performance optimization',
        'KPI & tracking',
      ],
      es: [
        'Contenido de los Packs 1 y 2 incluido',
        'Estrategia de contenido avanzada',
        'Plan de 60 días',
        'Automatización responsable',
        'Optimización del rendimiento',
        'KPI y seguimiento',
      ],
    },
    result: {
      fr: 'Canal LinkedIn structuré, contenu prêt, pipeline actif',
      en: 'Structured LinkedIn channel, content ready, active pipeline',
      es: 'Canal LinkedIn estructurado, contenido listo, pipeline activo',
    },
    featured: true,
    badge: {
      fr: 'Complet',
      en: 'Complete',
      es: 'Completo',
    },
  },
]

export function LinkedInFormation({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      eyebrow: 'LinkedIn',
      title: 'LINKEDIN -- SYSTEME D\'ACQUISITION COMPLET',
      subtitle:
        'Des formations courtes, concrètes et directement applicables pour générer des résultats rapidement.',
      programmeLabel: 'Voir le programme',
      resultLabel: 'Résultat',
      cta: 'Réserver un appel',
    },
    en: {
      eyebrow: 'LinkedIn',
      title: 'LINKEDIN -- COMPLETE ACQUISITION SYSTEM',
      subtitle:
        'Short, concrete and directly applicable training to generate results quickly.',
      programmeLabel: 'View programme',
      resultLabel: 'Result',
      cta: 'Book a call',
    },
    es: {
      eyebrow: 'LinkedIn',
      title: 'LINKEDIN -- SISTEMA DE ADQUISICION COMPLETO',
      subtitle:
        'Formaciones cortas, concretas y directamente aplicables para generar resultados rápidamente.',
      programmeLabel: 'Ver el programa',
      resultLabel: 'Resultado',
      cta: 'Reservar una llamada',
    },
  }

  const t = content[locale]

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-violet-600 text-xs font-medium uppercase tracking-widest mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-500">
            {t.subtitle}
          </p>
        </div>

        {/* Pack cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packs.map((pack, i) => (
            <div
              key={pack.name.fr}
              className={cn(
                'bg-white rounded-xl border p-6 lg:p-8 flex flex-col animate-fade-in-up transition-all duration-200',
                pack.featured
                  ? 'border-violet-200 hover:border-violet-300 hover:shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Badge for featured */}
              {pack.featured && pack.badge && (
                <div className="mb-4">
                  <span className="text-xs text-violet-600 font-medium bg-violet-50 px-2 py-1 rounded">
                    {pack.badge[locale]}
                  </span>
                </div>
              )}

              {/* Pack name */}
              <h3 className="font-display text-lg font-semibold text-gray-900 tracking-tight mb-3">
                {pack.name[locale]}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="font-display text-3xl font-semibold text-gray-900">
                  {pack.price}
                </span>
                <span className="text-lg text-gray-400 ml-1">&euro;</span>
              </div>

              {/* Duration & format */}
              <div className="space-y-1 mb-4">
                <p className="text-xs text-gray-400">{pack.duration[locale]}</p>
                <p className="text-xs text-gray-400">{pack.format[locale]}</p>
              </div>

              {/* Objective */}
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {pack.objective[locale]}
              </p>

              {/* Programme accordion */}
              <Accordion type="single" className="mb-6">
                <AccordionItem
                  value={`linkedin-${i}`}
                  className="border-gray-200 rounded-xl"
                >
                  <AccordionTrigger
                    value={`linkedin-${i}`}
                    className="text-violet-600 text-sm font-medium hover:bg-gray-50"
                  >
                    {t.programmeLabel}
                  </AccordionTrigger>
                  <AccordionContent
                    value={`linkedin-${i}`}
                    className="text-gray-600"
                  >
                    <ul className="space-y-2.5">
                      {pack.programme[locale].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <span className="w-1 h-1 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Result box */}
                    <div className="mt-4 p-3 rounded-lg bg-gray-50">
                      <p className="text-sm">
                        <span className="text-violet-600 font-medium">{t.resultLabel} :</span>{' '}
                        <span className="text-gray-600">{pack.result[locale]}</span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* CTA */}
              <div className="mt-auto">
                <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block">
                  {pack.featured ? (
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<ArrowIcon />}
                      className="w-full"
                    >
                      {t.cta}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<ArrowIcon />}
                      className="w-full"
                    >
                      {t.cta}
                    </Button>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
