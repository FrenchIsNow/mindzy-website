import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { TrackedLink } from '@/components/ui/TrackedLink'
import { config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export function Hero({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      badge: 'Solutions digitales sur mesure',
      title: 'Des solutions digitales',
      titleHighlight: 'pensées pour votre activité',
      subtitle: 'Sites, applications, systèmes internes : Mindzy accompagne la création de projets sur mesure, du simple besoin aux structures complexes.',
      cta: 'Prendre rendez-vous',
      ctaSecondary: 'Voir nos réalisations',
      ctaFormation: 'Démarrer une formation',
      stats: {
        clients: 'Projets livrés',
        satisfaction: 'Satisfaction client',
        support: 'Support inclus',
      },
      trustBadgeLeft: {
        title: 'Projets sur mesure',
        subtitle: 'Approche personnalisée',
      },
      trustBadgeRight: {
        title: 'Accompagnement humain',
        subtitle: 'À chaque étape',
      },
    },
    en: {
      badge: 'Custom digital solutions',
      title: 'Digital solutions',
      titleHighlight: 'designed for your business',
      subtitle: 'Websites, applications, internal systems: Mindzy supports the creation of custom projects, from simple needs to complex structures.',
      cta: 'Book a meeting',
      ctaSecondary: 'View our work',
      ctaFormation: 'Start a training',
      stats: {
        clients: 'Projects delivered',
        satisfaction: 'Client satisfaction',
        support: 'Support included',
      },
      trustBadgeLeft: {
        title: 'Projets sur mesure',
        subtitle: 'Approche personnalisée',
      },
      trustBadgeRight: {
        title: 'Accompagnement humain',
        subtitle: 'À chaque étape',
      },
    },
    es: {
      badge: 'Soluciones digitales a medida',
      title: 'Soluciones digitales',
      titleHighlight: 'diseñadas para tu negocio',
      subtitle: 'Sitios web, aplicaciones, sistemas internos: Mindzy acompaña la creación de proyectos a medida, desde necesidades simples hasta estructuras complejas.',
      cta: 'Reservar una cita',
      ctaSecondary: 'Ver nuestros trabajos',
      ctaFormation: 'Iniciar una formación',
      stats: {
        clients: 'Proyectos entregados',
        satisfaction: 'Satisfacción del cliente',
        support: 'Soporte incluido',
      },
      trustBadgeLeft: {
        title: 'Projets sur mesure',
        subtitle: 'Approche personnalisée',
      },
      trustBadgeRight: {
        title: 'Accompagnement humain',
        subtitle: 'À chaque étape',
      },
    },
  }

  const t = content[locale]

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-white" />

      {/* Animated gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-blob animation-delay-2000" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl animate-blob animation-delay-4000" style={{ animationDelay: '4s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-violet animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 left-[10%] w-2 h-2 rounded-full bg-gold animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 right-[20%] w-4 h-4 rounded-full bg-sage-400 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-[20%] w-2 h-2 rounded-full bg-rose-400 animate-float" style={{ animationDelay: '3s' }} />

      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in-down mb-8">
            <Badge variant="gold" className="shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t.badge}
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="heading-display text-anthracite mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.title}{' '}
            <span className="relative inline-block">
              <span className="text-gradient">{t.titleHighlight}</span>
              {/* Decorative underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-violet/20" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8.5C47 1.5 153 1.5 199 8.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="body-xl max-w-2xl mx-auto mb-12 text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="xl" icon={<ArrowIcon />}>
                {t.cta}
              </Button>
            </a>
            <TrackedLink href={`/${locale}/portfolio`} trackEvent="view_portfolio" trackLocation="hero">
              <Button variant="secondary" size="xl">
                {t.ctaSecondary}
              </Button>
            </TrackedLink>
            
          </div>

          {/* Stats */}
          <div className="hidden sm:block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex flex-wrap items-center justify-center gap-8 sm:gap-12 px-8 py-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 shadow-soft">
              <StatItem value="150+" label={t.stats.clients} icon={<UsersIcon />} />
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <StatItem value="98%" label={t.stats.satisfaction} icon={<StarIcon />} />
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <StatItem value="24/7" label={t.stats.support} icon={<SupportIcon />} />
            </div>
          </div>
        </div>

        {/* Floating trust badges - positioned asymmetrically */}
        <div className="hidden lg:block absolute -left-4 top-1/2 transform -translate-y-1/2 animate-float" style={{ animationDelay: '1s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white">
                {/* Target/puzzle icon */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-anthracite">{t.trustBadgeLeft.title}</div>
                <div className="text-xs text-gray-500">{t.trustBadgeLeft.subtitle}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-24 top-2/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-white">
                {/* Users/heart icon */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-anthracite">{t.trustBadgeRight.title}</div>
                <div className="text-xs text-gray-500">{t.trustBadgeRight.subtitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

function StatItem({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="icon-circle-sm bg-violet-50 text-violet">
        {icon}
      </div>
      <div className="text-left">
        <div className="font-display text-2xl font-semibold text-anthracite">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  )
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}
