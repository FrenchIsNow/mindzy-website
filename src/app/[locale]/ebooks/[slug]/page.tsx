import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { buildPageMetadata, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'
import type { Locale } from '@/lib/i18n'
import { getEbook, getAllEbookSlugs } from '@/lib/ebooks'
import { resolvePublicEbook, getAllResolvedEbookSlugs } from '@/lib/ebook-resolver'
import { EbookDownloadForm } from '@/components/features/EbookDownloadForm'
import { config } from '@/lib/config'

export async function generateStaticParams() {
  const slugs = await getAllResolvedEbookSlugs()
  return slugs.map(slug => ({ slug }))
}

const categoryColors: Record<string, 'default' | 'primary' | 'success' | 'violet'> = {
  seo: 'primary',
  marketing: 'success',
  business: 'violet',
  branding: 'default',
}

const pageMeta: Record<string, {
  backLabel: string
  freeLabel: string
  downloadLabel: string
  contentsLabel: string
  featuresLabel: string
  statsLabel: string
  testimonialLabel: string
  badgeLabel: string
  formTitle: string
  formSubtitle: string
  namePlaceholder: string
  nameLabel: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  submitBtn: string
  gdpr: string
  trustPdf: string
  trustInstant: string
  trustFree: string
  successTitle: string
  successBody: string
  successCta: string
  nameError: string
  emailError: string
  phoneError: string
  companyError: string
  downloadsLabel: string
  publishedLabel: string
  whatYouLearnLabel: string
}> = {
  fr: {
    backLabel: 'Tous les guides',
    freeLabel: 'Gratuit',
    downloadLabel: 'Télécharger gratuitement',
    contentsLabel: 'Au programme',
    featuresLabel: 'Ce que contient ce guide',
    statsLabel: 'En chiffres',
    testimonialLabel: 'Témoignage',
    badgeLabel: 'Disponible maintenant',
    formTitle: 'Télécharger ce guide gratuit',
    formSubtitle: 'Accès immédiat · Format PDF · Aucune carte requise',
    namePlaceholder: 'Marie Dupont',
    nameLabel: 'Prénom & Nom',
    emailLabel: 'Email professionnel',
    emailPlaceholder: 'marie@cabinet.fr',
    phoneLabel: 'Téléphone',
    phonePlaceholder: '+33 6 12 34 56 78',
    companyLabel: 'Cabinet / Entreprise',
    companyPlaceholder: 'Cabinet Dupont',
    submitBtn: 'Obtenir le guide',
    gdpr: 'En soumettant ce formulaire, vous acceptez de recevoir des emails de Mindzy. Pas de spam, désabonnement à tout moment.',
    trustPdf: 'Format PDF',
    trustInstant: 'Accès immédiat',
    trustFree: '100% gratuit',
    successTitle: 'Votre guide est prêt !',
    successBody: 'Vérifiez votre boîte email — votre guide PDF vous a été envoyé.<br/>Vous souhaitez aller plus loin avec Mindzy ?',
    successCta: 'Prendre rendez-vous',
    nameError: 'Votre nom est requis',
    emailError: 'Entrez un email valide',
    phoneError: 'Le téléphone est requis',
    companyError: 'Le cabinet ou l\'entreprise est requis',
    downloadsLabel: 'téléchargements',
    publishedLabel: 'Publié le',
    whatYouLearnLabel: 'Ce que vous allez apprendre',
  },
  en: {
    backLabel: 'All guides',
    freeLabel: 'Free',
    downloadLabel: 'Download for free',
    contentsLabel: 'In this guide',
    featuresLabel: 'What this guide contains',
    statsLabel: 'By the numbers',
    testimonialLabel: 'Testimonial',
    badgeLabel: 'Available now',
    formTitle: 'Download this free guide',
    formSubtitle: 'Instant access · PDF format · No card required',
    namePlaceholder: 'John Smith',
    nameLabel: 'First & Last Name',
    emailLabel: 'Professional email',
    emailPlaceholder: 'john@practice.com',
    phoneLabel: 'Phone',
    phonePlaceholder: '+1 555 123 4567',
    companyLabel: 'Practice / Company',
    companyPlaceholder: 'Smith Practice',
    submitBtn: 'Get the guide',
    gdpr: 'By submitting this form, you agree to receive emails from Mindzy. No spam, unsubscribe anytime.',
    trustPdf: 'PDF format',
    trustInstant: 'Instant access',
    trustFree: '100% free',
    successTitle: 'Your guide is ready!',
    successBody: 'Check your email — your PDF guide has been sent.<br/>Want to go further with Mindzy?',
    successCta: 'Book a call',
    nameError: 'Your name is required',
    emailError: 'Enter a valid email',
    phoneError: 'Phone is required',
    companyError: 'Practice or company is required',
    downloadsLabel: 'downloads',
    publishedLabel: 'Published on',
    whatYouLearnLabel: 'What you will learn',
  },
  es: {
    backLabel: 'Todas las guías',
    freeLabel: 'Gratis',
    downloadLabel: 'Descargar gratis',
    contentsLabel: 'En esta guía',
    featuresLabel: 'Qué contiene esta guía',
    statsLabel: 'En cifras',
    testimonialLabel: 'Testimonio',
    badgeLabel: 'Disponible ahora',
    formTitle: 'Descargar esta guía gratuita',
    formSubtitle: 'Acceso inmediato · Formato PDF · Sin tarjeta requerida',
    namePlaceholder: 'María García',
    nameLabel: 'Nombre y Apellido',
    emailLabel: 'Email profesional',
    emailPlaceholder: 'maria@consultorio.es',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+34 612 345 678',
    companyLabel: 'Consulta / Empresa',
    companyPlaceholder: 'Consulta García',
    submitBtn: 'Obtener la guía',
    gdpr: 'Al enviar este formulario, aceptas recibir emails de Mindzy. Sin spam, cancelación en cualquier momento.',
    trustPdf: 'Formato PDF',
    trustInstant: 'Acceso inmediato',
    trustFree: '100% gratuito',
    successTitle: '¡Tu guía está lista!',
    successBody: 'Revisa tu email — tu guía PDF ha sido enviada.<br/>¿Quieres ir más lejos con Mindzy?',
    successCta: 'Reservar una llamada',
    nameError: 'Tu nombre es obligatorio',
    emailError: 'Introduce un email válido',
    phoneError: 'El teléfono es obligatorio',
    companyError: 'La consulta o empresa es obligatoria',
    downloadsLabel: 'descargas',
    publishedLabel: 'Publicado el',
    whatYouLearnLabel: 'Lo que aprenderás',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const ebook = await resolvePublicEbook(slug)
  if (!ebook) return { title: 'Guide' }
  const title = ebook.title[locale as Locale] || ebook.title.fr
  const description = ebook.excerpt[locale as Locale] || ebook.excerpt.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/ebooks/${slug}`,
    title,
    description,
  })
}

export default async function EbookDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const ebook = await resolvePublicEbook(slug) as (Awaited<ReturnType<typeof resolvePublicEbook>> & { _dbPdfUrl?: string }) | null
  if (!ebook) notFound()

  const l = locale as Locale
  const meta = pageMeta[locale] || pageMeta.fr
  const detailOverride = ebook.detailOverride
  const title = detailOverride?.title?.[l] || ebook.title[l] || ebook.title.fr
  const excerpt = detailOverride?.excerpt?.[l] || ebook.excerpt[l] || ebook.excerpt.fr
  const testimonial = detailOverride?.testimonial?.[l] || ebook.testimonial[l] || ebook.testimonial.fr
  const features = detailOverride?.features?.[l] || ebook.features[l] || ebook.features.fr
  const featureIntro = detailOverride?.featureIntro?.[l] || meta.featuresLabel
  const defaultBottomTitle = locale === 'fr'
    ? 'Prêt à passer à l\'étape suivante ?'
    : locale === 'es'
      ? '¿Listo para dar el siguiente paso?'
      : 'Ready to take the next step?'
  const defaultBottomBody = locale === 'fr'
    ? 'Appliquez ce guide avec l\'accompagnement de l\'équipe Mindzy. Réservez un appel découverte gratuit.'
    : locale === 'es'
      ? 'Aplica esta guía con el acompañamiento del equipo Mindzy. Reserva una llamada de descubrimiento gratuita.'
      : 'Apply this guide with the Mindzy team. Book a free discovery call.'
  const defaultBottomButtonLabel = locale === 'fr'
    ? 'Réserver un appel gratuit'
    : locale === 'es'
      ? 'Reservar una llamada gratuita'
      : 'Book a free call'
  const bottomCtaTitle = detailOverride?.bottomCtaTitle?.[l] || defaultBottomTitle
  const bottomCtaBody = detailOverride?.bottomCtaBody?.[l] || defaultBottomBody
  const bottomCtaButtonLabel = detailOverride?.bottomCtaButtonLabel?.[l] || defaultBottomButtonLabel
  // DB-only ebooks store the direct Blob URL in _dbPdfUrl; static ebooks use the local /ebooks/ path.
  const pdfPath = ebook._dbPdfUrl ?? `/ebooks/${ebook.pdfByLocale?.[l] ?? `${slug}-fr.pdf`}`

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: locale === 'fr' ? 'Accueil' : locale === 'es' ? 'Inicio' : 'Home', url: `https://mindzy.me/${locale}` },
    { name: locale === 'fr' ? 'Ressources' : locale === 'es' ? 'Recursos' : 'Resources', url: `https://mindzy.me/${locale}/ebooks` },
    { name: title, url: `https://mindzy.me/${locale}/ebooks/${slug}` },
  ])

  return (
    <div className="pt-28 pb-24">
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumb */}
      <div className="container-wide mb-10">
        <Link
          href={`/${locale}/ebooks`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-violet transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {meta.backLabel}
        </Link>
      </div>

      {/* Hero */}
      <div className="container-wide mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

          {/* Left: content */}
          <div>
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <Badge variant={categoryColors[ebook.category] || 'default'} className="capitalize">
                {ebook.category}
              </Badge>
              {ebook.free && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-700 bg-sage-50 border border-sage-100 px-3 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {meta.freeLabel}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl font-bold text-anthracite tracking-tight leading-[1.1] mb-5 text-balance">
              {title}
            </h1>

            <p className="body-large text-gray-500 mb-8 text-pretty max-w-xl">{excerpt}</p>

            {/* Ebook image */}
            <div className="mb-10">
              <Image
                src={ebook.image}
                alt={title}
                width={2368}
                height={1792}
                className="w-full h-auto rounded-2xl border border-gray-100 shadow-md object-cover"
                priority
              />
            </div>

            {/* Testimonial */}
            <div className="mt-10 p-6 bg-gradient-to-br from-violet-50/60 to-cream-50/40 rounded-2xl border border-violet/10">
              <svg className="w-8 h-8 text-violet/20 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-sm text-gray-600 leading-relaxed italic mb-4">{testimonial.quote}</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-anthracite">{testimonial.author}</div>
                  <div className="text-xs text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: sticky form */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-900/5 p-8">
              <EbookDownloadForm
                slug={slug}
                locale={locale}
                pdfPath={pdfPath}
                ctaLink={ebook.ctaLink || config.CALENDLY_URL}
                labels={{
                  badge: meta.badgeLabel,
                  title: meta.formTitle,
                  subtitle: meta.formSubtitle,
                  namePlaceholder: meta.namePlaceholder,
                  nameLabel: meta.nameLabel,
                  emailLabel: meta.emailLabel,
                  emailPlaceholder: meta.emailPlaceholder,
                  phoneLabel: meta.phoneLabel,
                  phonePlaceholder: meta.phonePlaceholder,
                  companyLabel: meta.companyLabel,
                  companyPlaceholder: meta.companyPlaceholder,
                  submitBtn: meta.submitBtn,
                  gdpr: meta.gdpr,
                  trustPdf: meta.trustPdf,
                  trustInstant: meta.trustInstant,
                  trustFree: meta.trustFree,
                  successTitle: meta.successTitle,
                  successBody: meta.successBody,
                  successCta: meta.successCta,
                  nameError: meta.nameError,
                  emailError: meta.emailError,
                  phoneError: meta.phoneError,
                  companyError: meta.companyError,
                }}
              />
            </div>

            {/* Download count */}
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {ebook.downloadCount.toLocaleString()} {meta.downloadsLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider mb-20" />
      </div>

      {/* What you will learn / Features */}
      <div className="container-wide mb-20">
        <h2 className="heading-2 text-anthracite text-balance mb-2">{meta.whatYouLearnLabel}</h2>
        <p className="text-gray-500 mb-10">{featureIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.num}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-violet/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold tracking-widest text-violet/60 uppercase">{f.label}</span>
                <span className="font-mono text-xs text-gray-300">{f.num}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 transition-colors duration-200">
                <svg className="w-5 h-5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold text-anthracite leading-snug mb-2 group-hover:text-violet transition-colors duration-200">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider mb-20" />
      </div>

      {/* Bottom CTA */}
      <div className="container-wide mt-24">
        <div className="bg-gradient-to-br from-anthracite via-anthracite to-violet/80 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-violet blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-violet-300 blur-3xl" />
          </div>

          <div className="relative">
            <p className="text-violet-300 text-sm font-semibold tracking-widest uppercase mb-4">Mindzy</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              {bottomCtaTitle}
            </h2>
            <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto">
              {bottomCtaBody}
            </p>
            <Link
              href={ebook.ctaLink || `/${locale}/diagnostic`}
              target={ebook.ctaLink ? '_blank' : undefined}
              rel={ebook.ctaLink ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-anthracite font-bold text-sm rounded-full hover:bg-violet-50 transition-colors duration-200 cursor-pointer"
            >
              {bottomCtaButtonLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
