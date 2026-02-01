import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

interface CTASectionProps {
  locale: Locale
  variant?: 'default' | 'gradient' | 'dark'
}

export function CTASection({ locale, variant = 'default' }: CTASectionProps) {
  const content = {
    fr: {
      eyebrow: 'Prêt à vous lancer ?',
      title: 'Créez votre site web professionnel dès aujourd\'hui',
      subtitle: 'Rejoignez plus de 150 thérapeutes qui ont transformé leur présence en ligne avec Mindzy.',
      primaryCta: 'Démarrer maintenant',
      secondaryCta: 'Voir les tarifs',
      features: ['Site livré en 2 semaines', 'Support illimité inclus', 'Satisfait ou remboursé'],
    },
    en: {
      eyebrow: 'Ready to get started?',
      title: 'Create your professional website today',
      subtitle: 'Join over 150 therapists who have transformed their online presence with Mindzy.',
      primaryCta: 'Get started now',
      secondaryCta: 'View pricing',
      features: ['Site delivered in 2 weeks', 'Unlimited support included', 'Satisfaction guaranteed'],
    },
    es: {
      eyebrow: '¿Listo para empezar?',
      title: 'Crea tu sitio web profesional hoy',
      subtitle: 'Únete a más de 150 terapeutas que han transformado su presencia en línea con Mindzy.',
      primaryCta: 'Empezar ahora',
      secondaryCta: 'Ver precios',
      features: ['Sitio entregado en 2 semanas', 'Soporte ilimitado incluido', 'Garantía de satisfacción'],
    },
  }

  const t = content[locale]

  if (variant === 'dark') {
    return (
      <section className="section-padding bg-anthracite text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-800/10 rounded-full blur-3xl" />
        </div>

        <div className="container-narrow relative text-center">
          <span className="eyebrow text-violet-400 mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 mb-6">{t.title}</h2>
          <p className="body-large text-gray-400 mb-10 max-w-xl mx-auto">{t.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href={`/${locale}/diagnostic`}>
              <Button variant="primary" size="xl" icon={<ArrowIcon />}>
                {t.primaryCta}
              </Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                {t.secondaryCta}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6">
            {t.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-5 h-5 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'gradient') {
    return (
      <section className="section-padding relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-white/10 rounded-full" />

        <div className="container-narrow relative text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {t.eyebrow}
          </span>
          <h2 className="heading-2 mb-6">{t.title}</h2>
          <p className="body-large text-white/80 mb-10 max-w-xl mx-auto">{t.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href={`/${locale}/diagnostic`}>
              <Button variant="secondary" size="xl" icon={<ArrowIcon />} className="bg-white text-violet hover:bg-gray-100">
                {t.primaryCta}
              </Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                {t.secondaryCta}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6">
            {t.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-white/80 text-sm">
                <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cream-200/50 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow relative">
        <div className="bg-gradient-to-br from-cream-50 via-white to-violet-50/30 rounded-3xl p-8 md:p-12 lg:p-16 border border-gray-100 shadow-soft text-center">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-6">{t.title}</h2>
          <p className="body-large mb-10 max-w-xl mx-auto">{t.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href={`/${locale}/diagnostic`}>
              <Button variant="primary" size="xl" icon={<ArrowIcon />}>
                {t.primaryCta}
              </Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button variant="secondary" size="xl">
                {t.secondaryCta}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6">
            {t.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
