import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { WaitlistForm } from './WaitlistForm'

const pageMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy AI — Liste d\'attente | Accès anticipé à la plateforme IA',
    description: 'Rejoignez la liste d\'attente pour accéder en avant-première à Mindzy AI, la plateforme qui déploie des agents IA dans votre entreprise pour automatiser vos processus.',
  },
  en: {
    title: 'Mindzy AI — Waitlist | Early access to the AI platform',
    description: 'Join the waitlist for early access to Mindzy AI, the platform that deploys AI agents in your company to automate your processes.',
  },
  es: {
    title: 'Mindzy AI — Lista de espera | Acceso anticipado a la plataforma IA',
    description: 'Únete a la lista de espera para acceder antes que nadie a Mindzy AI, la plataforma que despliega agentes de IA en tu empresa para automatizar tus procesos.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = pageMeta[locale] || pageMeta.fr
  return buildPageMetadata({ locale: locale as Locale, path: '/ai-waitlist', title: t.title, description: t.description, noIndex: true })
}

export default async function AIWaitlistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = locale as Locale

  const content = {
    fr: {
      badge: 'Accès anticipé',
      heroTag: 'Bientôt disponible',
      title: 'Mindzy AI arrive.',
      titleSub: 'Soyez parmi les premiers.',
      subtitle: 'La plateforme qui transforme n\'importe quelle entreprise en organisation augmentée par l\'IA. Automatisez vos processus, boostez vos équipes, prenez de l\'avance sur vos concurrents.',
      formTitle: 'Réservez votre accès anticipé',
      formSubtitle: 'Gratuit, sans engagement. Nous vous contacterons pour une démo personnalisée.',
      features: [
        {
          icon: '⚡',
          title: 'Déploiement rapide',
          description: 'Opérationnel en quelques jours, pas en mois.',
        },
        {
          icon: '🎯',
          title: 'Sur mesure',
          description: 'Des agents calibrés sur vos processus et outils métier.',
        },
        {
          icon: '📈',
          title: 'ROI mesurable',
          description: 'Tableaux de bord pour suivre le temps et les coûts économisés.',
        },
        {
          icon: '🔒',
          title: 'Sécurisé & souverain',
          description: 'Vos données restent dans votre environnement, conformité RGPD.',
        },
      ],
      previewTitle: 'Ce que vous débloquez en avant-première',
      previewItems: [
        'Agents IA dédiés à vos processus internes',
        'Tableau de bord de productivité en temps réel',
        'Intégrations avec vos outils existants (CRM, ERP, email…)',
        'Support d\'implémentation prioritaire',
        'Tarif early adopter exclusif',
        'Accès aux nouvelles fonctionnalités en beta',
      ],
      socialProof: {
        label: 'Entreprises déjà inscrites',
        count: '240+',
      },
      alreadyTitle: 'Ils transforment déjà leur façon de travailler',
      testimonials: [
        {
          quote: 'Nos équipes passent maintenant 3× moins de temps sur le reporting. L\'IA gère tout automatiquement.',
          name: 'Directeur Opérationnel',
          company: 'PME industrielle, 85 employés',
        },
        {
          quote: 'La qualification de nos leads est entièrement automatisée. Nos commerciaux se concentrent sur la vente, enfin.',
          name: 'Directeur Commercial',
          company: 'SaaS B2B, 40 employés',
        },
        {
          quote: 'L\'onboarding de nos nouveaux employés est passé de 2 semaines à 3 jours grâce à l\'IA.',
          name: 'DRH',
          company: 'Cabinet de conseil, 120 employés',
        },
      ],
    },
    en: {
      badge: 'Early access',
      heroTag: 'Coming soon',
      title: 'Mindzy AI is coming.',
      titleSub: 'Be among the first.',
      subtitle: 'The platform that transforms any company into an AI-augmented organization. Automate your processes, empower your teams, and get ahead of your competitors.',
      formTitle: 'Reserve your early access',
      formSubtitle: 'Free, no commitment. We\'ll contact you for a personalized demo.',
      features: [
        {
          icon: '⚡',
          title: 'Fast deployment',
          description: 'Operational in days, not months.',
        },
        {
          icon: '🎯',
          title: 'Tailored',
          description: 'Agents calibrated to your processes and business tools.',
        },
        {
          icon: '📈',
          title: 'Measurable ROI',
          description: 'Dashboards to track time and costs saved.',
        },
        {
          icon: '🔒',
          title: 'Secure & sovereign',
          description: 'Your data stays in your environment, GDPR compliant.',
        },
      ],
      previewTitle: 'What you unlock with early access',
      previewItems: [
        'AI agents dedicated to your internal processes',
        'Real-time productivity dashboard',
        'Integrations with your existing tools (CRM, ERP, email…)',
        'Priority implementation support',
        'Exclusive early adopter pricing',
        'Access to new features in beta',
      ],
      socialProof: {
        label: 'Companies already registered',
        count: '240+',
      },
      alreadyTitle: 'They\'re already transforming the way they work',
      testimonials: [
        {
          quote: 'Our teams now spend 3× less time on reporting. The AI handles everything automatically.',
          name: 'Operations Director',
          company: 'Industrial SME, 85 employees',
        },
        {
          quote: 'Our lead qualification is fully automated. Our sales team can finally focus on selling.',
          name: 'Sales Director',
          company: 'B2B SaaS, 40 employees',
        },
        {
          quote: 'Onboarding for new employees went from 2 weeks to 3 days thanks to AI.',
          name: 'HR Director',
          company: 'Consulting firm, 120 employees',
        },
      ],
    },
    es: {
      badge: 'Acceso anticipado',
      heroTag: 'Próximamente',
      title: 'Mindzy AI llega.',
      titleSub: 'Sé de los primeros.',
      subtitle: 'La plataforma que transforma cualquier empresa en una organización aumentada por IA. Automatiza tus procesos, potencia tus equipos y adelántate a tus competidores.',
      formTitle: 'Reserva tu acceso anticipado',
      formSubtitle: 'Gratis, sin compromiso. Te contactaremos para una demo personalizada.',
      features: [
        {
          icon: '⚡',
          title: 'Despliegue rápido',
          description: 'Operativo en días, no en meses.',
        },
        {
          icon: '🎯',
          title: 'A medida',
          description: 'Agentes calibrados en tus procesos y herramientas de negocio.',
        },
        {
          icon: '📈',
          title: 'ROI medible',
          description: 'Dashboards para seguir el tiempo y los costes ahorrados.',
        },
        {
          icon: '🔒',
          title: 'Seguro y soberano',
          description: 'Tus datos permanecen en tu entorno, cumplimiento RGPD.',
        },
      ],
      previewTitle: 'Lo que desbloqueas con acceso anticipado',
      previewItems: [
        'Agentes de IA dedicados a tus procesos internos',
        'Panel de productividad en tiempo real',
        'Integraciones con tus herramientas existentes (CRM, ERP, email…)',
        'Soporte de implementación prioritario',
        'Precio exclusivo early adopter',
        'Acceso a nuevas funcionalidades en beta',
      ],
      socialProof: {
        label: 'Empresas ya inscritas',
        count: '240+',
      },
      alreadyTitle: 'Ya están transformando su forma de trabajar',
      testimonials: [
        {
          quote: 'Nuestros equipos ahora pasan 3× menos tiempo en el reporting. La IA lo gestiona todo automáticamente.',
          name: 'Director de Operaciones',
          company: 'PYME industrial, 85 empleados',
        },
        {
          quote: 'La cualificación de nuestros leads está completamente automatizada. Nuestro equipo de ventas puede finalmente centrarse en vender.',
          name: 'Director Comercial',
          company: 'SaaS B2B, 40 empleados',
        },
        {
          quote: 'El onboarding de nuevos empleados pasó de 2 semanas a 3 días gracias a la IA.',
          name: 'Director de RRHH',
          company: 'Consultora, 120 empleados',
        },
      ],
    },
  }

  const t = content[l as keyof typeof content] ?? content.fr

  return (
    <>
      {/* Hero with form */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite via-anthracite to-anthracite/95" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.6) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Glowing blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Badge variant="violet" className="border-violet-400/40 bg-violet-500/20 text-violet-300">
                  {t.badge}
                </Badge>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                  </span>
                  {t.heroTag}
                </span>
              </div>

              <h1 className="heading-display text-white mb-2">
                {t.title}
              </h1>
              <h1 className="heading-display mb-6">
                <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
                  {t.titleSub}
                </span>
              </h1>

              <p className="body-xl text-gray-300 mb-10 max-w-lg">
                {t.subtitle}
              </p>

              {/* Feature pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {t.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xl flex-shrink-0">{feature.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{feature.title}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-anthracite flex items-center justify-center text-xs font-medium text-white"
                      style={{
                        background: `hsl(${260 + i * 15}, 60%, ${50 + i * 5}%)`,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <span className="font-display text-lg font-semibold text-white">{t.socialProof.count}</span>
                  <span className="text-gray-400 text-sm ml-2">{t.socialProof.label}</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                <h2 className="font-display text-xl font-semibold text-anthracite mb-2">{t.formTitle}</h2>
                <p className="text-gray-500 text-sm mb-6">{t.formSubtitle}</p>
                <WaitlistForm locale={l} />
              </div>

              {/* Decorative glow behind the card */}
              <div className="absolute -inset-4 bg-violet-500/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* What you unlock */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-50/60 rounded-full blur-3xl" />
        <div className="container-narrow relative">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite">{t.previewTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.previewItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-violet-50 border border-violet/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-violet" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-anthracite font-medium text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-cream-50 relative overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite">{t.alreadyTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-soft">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-anthracite text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
