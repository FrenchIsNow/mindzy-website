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

const packNumbers = ['01', '02', '03']

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
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#0F0F1E' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)' }}
      />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-violet-400 mb-4 block">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-gray-400">
            {t.subtitle}
          </p>
        </div>

        {/* Pack cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packs.map((pack, i) => (
            <div
              key={pack.name.fr}
              className={cn(
                'relative rounded-2xl overflow-hidden flex flex-col animate-fade-in-up transition-all duration-500 group',
                pack.featured
                  ? 'lg:-translate-y-2'
                  : ''
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                border: pack.featured
                  ? '1px solid rgba(124,58,237,0.3)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: pack.featured
                  ? '0 0 80px -20px rgba(124,58,237,0.3)'
                  : 'none',
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: pack.featured
                    ? '0 0 60px -15px rgba(124,58,237,0.25) inset'
                    : '0 0 60px -15px rgba(255,255,255,0.05) inset',
                }}
              />

              {/* Large pack number as decoration */}
              <span
                className="absolute top-2 right-4 font-display text-8xl font-bold select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.03)' }}
              >
                {packNumbers[i]}
              </span>

              <div className="p-6 lg:p-8 flex flex-col flex-1 relative">
                {/* Badge for featured */}
                {pack.featured && pack.badge && (
                  <div className="mb-4">
                    <span
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))',
                        border: '1px solid rgba(212,175,55,0.3)',
                        color: '#D4AF37',
                      }}
                    >
                      {pack.badge[locale]}
                    </span>
                  </div>
                )}

                {/* Pack name */}
                <h3 className="font-display text-xl font-semibold text-white tracking-tight mb-3">
                  {pack.name[locale]}
                </h3>

                {/* Price - OVERSIZED gold */}
                <div className="mb-4">
                  <span
                    className="font-display text-4xl font-semibold"
                    style={{ color: '#D4AF37' }}
                  >
                    {pack.price} &euro;
                  </span>
                </div>

                {/* Duration badge - glass pill */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full text-gray-300"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {pack.duration[locale]}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full text-gray-400"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {pack.format[locale]}
                  </span>
                </div>

                {/* Objective */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {pack.objective[locale]}
                </p>

                {/* Programme accordion - dark themed */}
                <Accordion type="single" className="mb-6">
                  <AccordionItem
                    value={`linkedin-${i}`}
                    className="border-white/[0.06] rounded-xl"
                  >
                    <AccordionTrigger
                      value={`linkedin-${i}`}
                      className="text-sm font-semibold text-gray-300 hover:bg-white/[0.03]"
                    >
                      {t.programmeLabel}
                    </AccordionTrigger>
                    <AccordionContent
                      value={`linkedin-${i}`}
                      className="text-gray-400"
                    >
                      <ul className="space-y-2.5">
                        {pack.programme[locale].map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                            <span className="text-gray-400">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Result box */}
                      <div
                        className="mt-4 p-4 rounded-xl"
                        style={{
                          background: 'rgba(124,58,237,0.1)',
                          border: '1px solid rgba(124,58,237,0.2)',
                        }}
                      >
                        <p className="text-sm font-medium">
                          <span className="text-violet-400">{t.resultLabel} :</span>{' '}
                          <span className="text-gray-300">{pack.result[locale]}</span>
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
                      <button
                        className="w-full inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 px-8 py-3.5 text-base gap-2 group"
                        style={{
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'rgba(255,255,255,0.8)',
                          background: 'transparent',
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {t.cta}
                          <span className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                            <ArrowIcon />
                          </span>
                        </span>
                      </button>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
