import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const meta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Branding & Création de contenu - Un univers à votre image',
    description:
      'Positionnement stratégique, identité visuelle, stratégie éditoriale et création de contenu digital. Des actifs stratégiques qui génèrent visibilité et opportunités.',
  },
  en: {
    title: 'Mindzy | Branding & Content creation - A universe in your image',
    description:
      'Strategic positioning, visual identity, editorial strategy and digital content creation. Strategic assets that generate visibility and opportunities.',
  },
  es: {
    title: 'Mindzy | Branding y creación de contenido - Un universo a tu imagen',
    description:
      'Posicionamiento estratégico, identidad visual, estrategia editorial y creación de contenido digital. Activos estratégicos que generan visibilidad y oportunidades.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = meta[locale] || meta.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/solutions/branding',
    title: t.title,
    description: t.description,
  })
}

const content = {
  fr: {
    badge: 'Branding & Création de contenu',
    title: 'Un univers à',
    titleHighlight: 'votre image',
    subtitle:
      'Nous développons des identités fortes et des stratégies de contenu orientées impact et acquisition. Nous ne créons pas du contenu pour "poster" — nous construisons des actifs stratégiques qui génèrent visibilité et opportunités.',
    features: [
      {
        icon: 'strategy',
        title: 'Positionnement stratégique & différenciation',
        description: 'Identité visuelle complète, direction artistique et positionnement qui vous distingue dans votre marché.',
      },
      {
        icon: 'identity',
        title: 'Identité visuelle & supports',
        description: 'Logo, charte graphique, cartes de visite, brochures et tous les supports physiques à la hauteur de votre image.',
      },
      {
        icon: 'logo',
        title: 'Stratégie éditoriale & contenu digital',
        description: 'Création de contenu digital (LinkedIn, Meta, TikTok…), stratégie éditoriale et structuration d\'un personal branding puissant.',
      },
      {
        icon: 'print',
        title: 'Contenu orienté autorité & conversion',
        description: 'Contenu conçu pour établir votre autorité et générer des opportunités business concrètes.',
      },
    ],
    process: {
      title: 'Notre démarche',
      steps: [
        { number: '01', title: 'Brief créatif', description: 'Compréhension de votre univers, vos valeurs et votre positionnement souhaité.' },
        { number: '02', title: 'Propositions & itérations', description: 'Exploration créative avec plusieurs directions, puis affinage selon vos retours.' },
        { number: '03', title: 'Livraison & déclinaisons', description: 'Fichiers finaux dans tous les formats + guide d\'utilisation de votre identité.' },
      ],
    },
    testimonial: {
      quote: 'Notre nouveau logo et nos cartes de visite ont complètement changé la perception de notre cabinet. On nous prend enfin au sérieux.',
      author: 'Antoine D.',
      role: 'Avocat associé',
    },
    cta: 'Créer mon identité',
  },
  en: {
    badge: 'Branding & Content creation',
    title: 'A universe in',
    titleHighlight: 'your image',
    subtitle:
      'We develop strong identities and content strategies focused on impact and acquisition. We don\'t create content just to "post" — we build strategic assets that generate visibility and opportunities.',
    features: [
      {
        icon: 'strategy',
        title: 'Strategic positioning & differentiation',
        description: 'Complete visual identity, art direction and positioning that sets you apart in your market.',
      },
      {
        icon: 'identity',
        title: 'Visual identity & materials',
        description: 'Logo, brand guidelines, business cards, brochures and all physical materials that match your image.',
      },
      {
        icon: 'logo',
        title: 'Editorial strategy & digital content',
        description: 'Digital content creation (LinkedIn, Meta, TikTok…), editorial strategy and powerful personal branding.',
      },
      {
        icon: 'print',
        title: 'Authority & conversion content',
        description: 'Content designed to establish your authority and generate concrete business opportunities.',
      },
    ],
    process: {
      title: 'Our approach',
      steps: [
        { number: '01', title: 'Creative brief', description: 'Understanding your universe, values and desired positioning.' },
        { number: '02', title: 'Proposals & iterations', description: 'Creative exploration with multiple directions, then refinement based on your feedback.' },
        { number: '03', title: 'Delivery & variations', description: 'Final files in all formats + usage guide for your identity.' },
      ],
    },
    testimonial: {
      quote: 'Our new logo and business cards completely changed the perception of our firm. People finally take us seriously.',
      author: 'Antoine D.',
      role: 'Partner attorney',
    },
    cta: 'Create my identity',
  },
  es: {
    badge: 'Branding y creación de contenido',
    title: 'Un universo a',
    titleHighlight: 'tu imagen',
    subtitle:
      'Desarrollamos identidades fuertes y estrategias de contenido orientadas al impacto y la adquisición. No creamos contenido para "publicar" — construimos activos estratégicos que generan visibilidad y oportunidades.',
    features: [
      {
        icon: 'strategy',
        title: 'Posicionamiento estratégico y diferenciación',
        description: 'Identidad visual completa, dirección artística y posicionamiento que te distingue en tu mercado.',
      },
      {
        icon: 'identity',
        title: 'Identidad visual y soportes',
        description: 'Logo, guía de marca, tarjetas de visita, folletos y todos los soportes físicos a la altura de tu imagen.',
      },
      {
        icon: 'logo',
        title: 'Estrategia editorial y contenido digital',
        description: 'Creación de contenido digital (LinkedIn, Meta, TikTok…), estrategia editorial y personal branding potente.',
      },
      {
        icon: 'print',
        title: 'Contenido de autoridad y conversión',
        description: 'Contenido diseñado para establecer tu autoridad y generar oportunidades de negocio concretas.',
      },
    ],
    process: {
      title: 'Nuestro enfoque',
      steps: [
        { number: '01', title: 'Brief creativo', description: 'Comprensión de tu universo, tus valores y tu posicionamiento deseado.' },
        { number: '02', title: 'Propuestas e iteraciones', description: 'Exploración creativa con varias direcciones, luego refinamiento según tus comentarios.' },
        { number: '03', title: 'Entrega y variaciones', description: 'Archivos finales en todos los formatos + guía de uso de tu identidad.' },
      ],
    },
    testimonial: {
      quote: 'Nuestro nuevo logo y tarjetas de visita cambiaron completamente la percepción de nuestro despacho. Por fin nos toman en serio.',
      author: 'Antoine D.',
      role: 'Abogado socio',
    },
    cta: 'Crear mi identidad',
  },
}

export default async function BrandingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: l } = await params
  const locale = l as Locale
  const t = content[locale]

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #F0ECFF 50%, #FEF3C7 100%)' }}
      >
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full blur-3xl animate-blob" style={{ background: 'rgba(244,114,182,0.15)' }} />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full blur-3xl animate-blob" style={{ background: 'rgba(167,139,250,0.2)', animationDelay: '2s' }} />

        <div className="container-narrow relative z-10 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-violet-500 mb-6 block">{t.badge}</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-[#1E1B4B] mb-8">
            {t.title} <span className="text-violet-600">{t.titleHighlight}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">{t.subtitle}</p>
          <Link href={`/${locale}/diagnostic`}>
            <Button variant="primary" size="xl" icon={<ArrowIcon />}>{t.cta}</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                style={{ boxShadow: '0 8px 32px -8px rgba(124,58,237,0.08)', animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center text-violet-600 mb-5">
                  <BrandingIcon name={feature.icon} />
                </div>
                <h3 className="text-xl font-semibold text-[#1E1B4B] mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#FAFAFF] py-24 lg:py-32">
        <div className="container-narrow">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-center text-[#1E1B4B] mb-16">{t.process.title}</h2>
          <div className="space-y-8">
            {t.process.steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-display text-xl font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1E1B4B] mb-1">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection locale={locale} variant="gradient" />
    </>
  )
}

function BrandingIcon({ name }: { name: string }) {
  const cls = 'w-5 h-5'
  switch (name) {
    case 'logo':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
    case 'identity':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>
    case 'print':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>
    case 'strategy':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    default:
      return null
  }
}
