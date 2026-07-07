import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCatalogEntry, getEbookContent, getAllCatalogEntries, getDeliverableType } from '@/lib/db'
import { getEbook, ebooks as allStaticEbooks } from '@/lib/ebooks'
import { locales, type Locale, defaultLocale } from '@/lib/i18n'
import DownloadForm from './DownloadForm'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const { ebooks } = await import('@/lib/ebooks')
  return ebooks.flatMap(ebook => locales.map(locale => ({ locale, slug: ebook.slug })))
}

export default async function EbookLanding({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale

  const staticEbook = getEbook(slug)
  const dbContent = !staticEbook ? await getEbookContent(slug, locale) : null
  const [entry, catalog] = await Promise.all([
    getCatalogEntry(slug),
    getAllCatalogEntries(),
  ])

  if (!staticEbook && !dbContent) notFound()

  // Related: up to 3 other active ebooks (catalog.is_active wins, fall back to
  // static list). Exclude the current slug. Prefer catalog entries with a real slug.
  const inactiveSlugs = new Set(catalog.filter(c => !c.is_active).map(c => c.slug))
  const relatedSlugs = allStaticEbooks
    .map(e => e.slug)
    .filter(s => s !== slug && !inactiveSlugs.has(s))
    .slice(0, 3)
  const related = relatedSlugs
    .map(s => ({ ebook: getEbook(s), slug: s }))
    .filter(r => r.ebook)

  const title =
    staticEbook?.title[locale] ||
    dbContent?.title ||
    staticEbook?.title[defaultLocale] ||
    slug

  const subtitle =
    staticEbook?.subtitle[locale] ||
    staticEbook?.subtitle[defaultLocale] ||
    ''

  const excerpt =
    staticEbook?.excerpt[locale] ||
    dbContent?.excerpt ||
    staticEbook?.excerpt[defaultLocale] ||
    ''

  const image = staticEbook?.image || dbContent?.image_url || '/images/ebooks/placeholder.webp'
  const pages = staticEbook?.pages || dbContent?.pages || null
  const isFree = entry?.is_free ?? staticEbook?.free ?? true
  const formFields = Array.isArray(entry?.form_fields) ? (entry.form_fields as string[]) : ['email', 'firstName', 'lastName', 'company', 'role']

  const deliverableType = getDeliverableType(entry, locale)
  const htmlContent = dbContent?.html_content ?? ''
  const showInlineContent = deliverableType === 'page' && Boolean(htmlContent)

  return (
    <>
      <div className="container-narrow section-padding">
        <Link href={`/${locale}/ebooks`} className="mb-6 inline-block text-sm text-violet-600 hover:underline">
          ← Tous les ebooks
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-violet-600">
              {staticEbook?.category || 'guide'}
            </div>
            <h1 className="heading-3 mb-4">{title}</h1>
            {subtitle && <p className="mb-4 text-lg font-medium text-slate-700">{subtitle}</p>}
            <p className="mb-6 text-slate-600">{excerpt}</p>
            {pages && (
              <div className="mb-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {pages} pages · {isFree ? 'Gratuit' : 'Payant'}
              </div>
            )}

            {staticEbook?.chapters?.[locale] && (
              <div className="mt-8">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Contenu</h2>
                <ul className="space-y-2">
                  {staticEbook.chapters[locale]?.map(chapter => (
                    <li key={chapter.num} className="flex gap-3 text-sm text-slate-700">
                      <span className="font-mono text-violet-600">{chapter.num}</span>
                      <span>{chapter.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <DownloadForm slug={slug} locale={locale} fields={formFields} deliverableType={deliverableType} />
          </div>
        </div>
      </div>

      {showInlineContent && (
        <section id="content" className="container-narrow section-padding border-t border-slate-200">
          {/* Lead-magnet HTML body — admin-controlled, sanitized at render time via the wrapper. */}
          <div
            className="lead-magnet-html prose max-w-none"
            // The content is admin-authored (or seeded from a vetted source file) and
            // lives in ebook_content.html_content. We render it inside a scoped wrapper.
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </section>
      )}

      {related.length > 0 && (
        <div className="container-narrow section-padding border-t border-slate-200">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="heading-4">Autres ebooks</h2>
            <Link href={`/${locale}/ebooks`} className="text-sm font-medium text-violet-600 hover:underline">
              Voir tous les ebooks →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(({ ebook, slug: rSlug }) => {
              if (!ebook) return null
              const rTitle = ebook.title[locale] || ebook.title[defaultLocale] || rSlug
              const rSubtitle = ebook.subtitle[locale] || ebook.subtitle[defaultLocale] || ''
              const rImage = ebook.image || '/images/ebooks/placeholder.webp'
              return (
                <Link
                  key={rSlug}
                  href={`/${locale}/ebooks/${rSlug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-violet-300 hover:shadow-sm"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={rImage} alt={rTitle} className="h-full w-full object-cover transition group-hover:scale-105" />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-600">
                      {ebook.category || 'guide'}
                    </div>
                    <div className="font-semibold text-slate-900">{rTitle}</div>
                    {rSubtitle && <div className="mt-1 line-clamp-2 text-sm text-slate-600">{rSubtitle}</div>}
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/ebooks`}
              className="inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Voir tous les ebooks
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
