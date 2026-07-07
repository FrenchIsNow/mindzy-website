import Link from 'next/link'
import { getAllCatalogEntries } from '@/lib/db'
import { ebooks as staticEbooks } from '@/lib/ebooks'
import { locales, type Locale, defaultLocale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function EbooksDirectory({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale

  const catalog = await getAllCatalogEntries()

  const items = staticEbooks.map(ebook => {
    const entry = catalog.find(c => c.slug === ebook.slug)
    return { slug: ebook.slug, ebook, entry, isActive: entry?.is_active ?? true }
  }).filter(item => item.isActive)

  const dbOnly = catalog
    .filter(c => c.is_active && !staticEbooks.some(e => e.slug === c.slug))
    .map(c => ({ slug: c.slug, entry: c, ebook: null }))

  return (
    <>
      <div className="container-narrow section-padding">
        <div className="mb-10 text-center">
          <h1 className="heading-3 mb-3">Guides & ebooks</h1>
          <p className="text-slate-600">Téléchargez nos guides pratiques pour construire votre infrastructure digitale.</p>
        </div>

        {items.length === 0 && dbOnly.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-600">Aucun ebook disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map(({ slug, ebook, entry }) => (
              <Link
                key={slug}
                href={`/${locale}/ebooks/${slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-violet-300 hover:shadow-md"
              >
                <div className="mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={ebook?.image || '/images/ebooks/placeholder.webp'}
                    alt={ebook?.title[locale] || slug}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-600">
                  {ebook?.category || 'guide'}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-violet-700">
                  {ebook?.title[locale] || ebook?.title[defaultLocale] || slug}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                  {ebook?.excerpt[locale] || ebook?.excerpt[defaultLocale] || ''}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm text-slate-500">{ebook?.pages} pages</span>
                  <span className="text-sm font-medium text-violet-600 group-hover:underline">
                    Télécharger →
                  </span>
                </div>
              </Link>
            ))}

            {dbOnly.map(({ slug, entry }) => (
              <Link
                key={slug}
                href={`/${locale}/ebooks/${slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-violet-300 hover:shadow-md"
              >
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-600">
                  ebook
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-violet-700">
                  {entry.seo_title || slug}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                  {entry.seo_description || ''}
                </p>
                <div className="mt-auto">
                  <span className="text-sm font-medium text-violet-600 group-hover:underline">
                    Télécharger →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
