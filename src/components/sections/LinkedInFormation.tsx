'use client'

import { Card, CardTitle } from '@/components/ui/Card'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import type { Locale } from '@/lib/i18n'
import { config } from '@/lib/config'

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
      title: 'LINKEDIN -- SYSTÈME D\'ACQUISITION COMPLET',
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
      title: 'LINKEDIN -- SISTEMA DE ADQUISICIÓN COMPLETO',
      subtitle:
        'Formaciones cortas, concretas y directamente aplicables para generar resultados rápidamente.',
      programmeLabel: 'Ver el programa',
      resultLabel: 'Resultado',
      cta: 'Reservar una llamada',
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cream-200/30 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Pack cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packs.map((pack, i) => (
            <Card
              key={pack.name.fr}
              variant={pack.featured ? 'featured' : 'default'}
              padding="none"
              className="overflow-hidden flex flex-col animate-fade-in-up relative"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Top color stripe */}
              <div className={`h-2 ${pack.featured ? 'bg-gradient-to-r from-violet-500 to-violet-700' : 'bg-gradient-to-r from-violet-300 to-violet-500'}`} />

              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Badge for featured */}
                {pack.featured && pack.badge && (
                  <div className="mb-4">
                    <Badge variant="gold">{pack.badge[locale]}</Badge>
                  </div>
                )}

                {/* Pack name */}
                <CardTitle as="h3" className="mb-3">{pack.name[locale]}</CardTitle>

                {/* Duration & format badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary" size="sm">{pack.duration[locale]}</Badge>
                  <Badge variant="default" size="sm">{pack.format[locale]}</Badge>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-display text-3xl font-semibold text-anthracite">{pack.price} &euro;</span>
                </div>

                {/* Objective */}
                <p className="text-gray-600 mb-6">{pack.objective[locale]}</p>

                {/* Programme accordion */}
                <Accordion type="single" className="mb-6">
                  <AccordionItem value={`linkedin-${i}`} className="border-gray-100">
                    <AccordionTrigger value={`linkedin-${i}`} className="text-sm font-semibold text-violet">
                      {t.programmeLabel}
                    </AccordionTrigger>
                    <AccordionContent value={`linkedin-${i}`}>
                      <ul className="space-y-2">
                        {pack.programme[locale].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <svg className="w-4 h-4 mt-0.5 text-violet flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 bg-cream-50 rounded-lg">
                        <p className="text-sm font-medium text-anthracite">
                          <span className="text-violet">{t.resultLabel} :</span> {pack.result[locale]}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* CTA */}
                <div className="mt-auto">
                  <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      variant={pack.featured ? 'primary' : 'outline'}
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
