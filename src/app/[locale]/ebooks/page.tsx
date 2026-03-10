import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { buildPageMetadata, jsonLdBreadcrumb, jsonLdCollectionPage, JsonLd } from '@/lib/seo'
import type { Locale } from '@/lib/i18n'
import { ebooks } from '@/lib/ebooks'

const pageMeta: Record<string, { title: string; description: string; eyebrow: string; subtitle: string; downloadLabel: string; freeLabel: string }> = {
  fr: {
    title: 'Ressources & Guides gratuits — Mindzy',
    description: 'Téléchargez nos guides gratuits pour développer votre présence digitale, maîtriser le SEO et attirer plus de clients.',
    eyebrow: 'Ressources gratuites',
    subtitle: 'Des guides pratiques, créés par l\'équipe Mindzy sur la base de 150+ projets, pour vous aider à développer votre activité en ligne.',
    downloadLabel: 'Télécharger gratuitement',
    freeLabel: 'Gratuit',
  },
  en: {
    title: 'Free Resources & Guides — Mindzy',
    description: 'Download our free guides to develop your digital presence, master SEO and attract more clients.',
    eyebrow: 'Free resources',
    subtitle: 'Practical guides, created by the Mindzy team based on 150+ projects, to help you grow your online business.',
    downloadLabel: 'Download for free',
    freeLabel: 'Free',
  },
  es: {
    title: 'Recursos y Guías gratuitas — Mindzy',
    description: 'Descarga nuestras guías gratuitas para desarrollar tu presencia digital, dominar el SEO y atraer más clientes.',
    eyebrow: 'Recursos gratuitos',
    subtitle: 'Guías prácticas, creadas por el equipo de Mindzy basadas en 150+ proyectos, para ayudarte a desarrollar tu negocio online.',
    downloadLabel: 'Descargar gratis',
    freeLabel: 'Gratis',
  },
}

const categoryColors: Record<string, 'default' | 'primary' | 'success' | 'violet'> = {
  seo: 'primary',
  marketing: 'success',
  business: 'violet',
  branding: 'default',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = pageMeta[locale] || pageMeta.fr
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/ebooks',
    title: meta.title,
    description: meta.description,
  })
}

export default async function EbooksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = pageMeta[locale] || pageMeta.fr

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: locale === 'fr' ? 'Accueil' : locale === 'es' ? 'Inicio' : 'Home', url: `https://mindzy.me/${locale}` },
    { name: 'Ebooks', url: `https://mindzy.me/${locale}/ebooks` },
  ])

  const collectionJsonLd = jsonLdCollectionPage(
    `https://mindzy.me/${locale}/ebooks`,
    meta.title,
    meta.description,
    ebooks.map(e => ({ url: `https://mindzy.me/${locale}/ebooks/${e.slug}`, name: e.title[locale as Locale] || e.title.fr }))
  )

  return (
    <div className="pt-32 pb-24">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />

      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">{meta.eyebrow}</p>
          <h1 className="heading-2 text-anthracite mb-5 text-balance">
            {locale === 'fr' ? 'Guides & Ressources gratuits' : locale === 'es' ? 'Guías y Recursos gratuitos' : 'Free Guides & Resources'}
          </h1>
          <p className="body-large max-w-2xl mx-auto text-pretty">{meta.subtitle}</p>
        </div>

        <div className="divider mb-14" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ebooks.map((ebook) => {
            const title = ebook.title[locale as Locale] || ebook.title.fr
            const excerpt = ebook.excerpt[locale as Locale] || ebook.excerpt.fr
            const chapters = ebook.chapters[locale as Locale] || ebook.chapters.fr

            return (
              <article key={ebook.slug} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-violet to-violet-light" />

                <div className="p-8 flex flex-col flex-1">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-5">
                    <Badge variant={categoryColors[ebook.category] || 'default'} size="sm" className="capitalize">
                      {ebook.category}
                    </Badge>
                    {ebook.free && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-700 bg-sage-50 border border-sage-100 px-2.5 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {meta.freeLabel}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-2xl font-semibold text-anthracite tracking-tight leading-snug mb-3 group-hover:text-violet transition-colors duration-200">
                    {title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{excerpt}</p>

                  {/* Chapter preview */}
                  <ul className="space-y-2 mb-8">
                    {chapters.slice(0, 4).map((ch) => (
                      <li key={ch.num} className="flex items-center gap-3 text-sm">
                        <span className="font-mono text-[11px] font-bold text-violet/60 w-6 shrink-0">{ch.num}</span>
                        <span className="text-gray-600 truncate">{ch.title}</span>
                        <svg className="w-3.5 h-3.5 text-sage-400 shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </li>
                    ))}
                    {chapters.length > 4 && (
                      <li className="text-xs text-gray-400 pl-9">+{chapters.length - 4} {locale === 'fr' ? 'chapitres supplémentaires' : locale === 'es' ? 'capítulos más' : 'more chapters'}</li>
                    )}
                  </ul>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-8 pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {ebook.downloadCount.toLocaleString()} {locale === 'fr' ? 'téléchargements' : locale === 'es' ? 'descargas' : 'downloads'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {ebook.publishedDate}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/${locale}/ebooks/${ebook.slug}`}
                    className="mt-auto w-full py-3.5 bg-anthracite text-white font-semibold text-sm rounded-xl text-center transition-all duration-200 hover:bg-violet hover:shadow-lg hover:shadow-violet/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {meta.downloadLabel}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
