import Link from 'next/link'
import { listBlogSites } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function BlogsPage() {
  const sites = await listBlogSites()

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
          <p className="mt-1 text-sm text-slate-600">Tous les sites de blog — cliquez pour ouvrir les articles, les idées et les paramètres.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/admin/blog-sites/new"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            + Nouveau site
          </Link>
        </div>
      </div>

      {sites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucun blog site configuré.</p>
          <Link href="/dashboard/admin/blog-sites/new" className="mt-4 inline-block text-violet-600 hover:underline">
            Créer le premier site →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map(site => {
            const src = (site.settings as { source_locale?: string } | null | undefined)?.source_locale ?? 'fr'
            return (
              <Link
                key={site.id}
                href={`/dashboard/admin/blogs/${site.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm"
              >
                <div className="mb-1 text-sm font-medium text-slate-900">{site.name}</div>
                <div className="text-xs text-slate-500">/{site.slug}</div>
                {site.domain && <div className="mt-2 text-xs text-slate-400">{site.domain}</div>}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]">
                  {site.is_default && (
                    <span className="inline-flex rounded-full bg-violet-100 px-2 py-0.5 font-medium text-violet-800">
                      Défaut
                    </span>
                  )}
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                    source: {src.toUpperCase()}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
