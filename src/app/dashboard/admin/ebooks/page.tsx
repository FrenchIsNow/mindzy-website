import Link from 'next/link'
import { getAllCatalogEntries, getEbookContent, getEbookLeads, getEbookOrders, listDbOnlyEbookSlugs } from '@/lib/db'
import { ebooks as staticEbooks } from '@/lib/ebooks'
import type { CatalogEntry } from '@/lib/db'

export const dynamic = 'force-dynamic'

type SearchParams = { status?: string; q?: string }

const statusOptions: Array<{ value: CatalogEntry['status'] | 'all'; label: string }> = [
  { value: 'all', label: 'Tous' },
  { value: 'published', label: 'Publiés' },
  { value: 'scheduled', label: 'Planifiés' },
  { value: 'draft', label: 'Brouillons' },
  { value: 'archived', label: 'Archivés' },
]

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    published: 'bg-emerald-100 text-emerald-800',
    scheduled: 'bg-amber-100 text-amber-800',
    draft: 'bg-slate-100 text-slate-600',
    archived: 'bg-red-100 text-red-800',
  }
  const labels: Record<string, string> = {
    published: 'Publié',
    scheduled: 'Planifié',
    draft: 'Brouillon',
    archived: 'Archivé',
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] ?? styles.draft}`}>
      {labels[status] ?? status}
    </span>
  )
}

export default async function EbooksAdmin({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { status, q } = await searchParams
  const selectedStatus = status ?? 'all'
  const query = (q ?? '').trim().toLowerCase()

  const catalog = await getAllCatalogEntries()
  const dbOnlySlugs = await listDbOnlyEbookSlugs()
  const slugs = new Set<string>([
    ...staticEbooks.map(e => e.slug),
    ...dbOnlySlugs,
    ...catalog.map(c => c.slug),
  ])

  const rows = await Promise.all(
    Array.from(slugs).map(async slug => {
      const staticEbook = staticEbooks.find(e => e.slug === slug)
      const isStatic = !!staticEbook
      const content = await getEbookContent(slug, 'fr')
      const entry = catalog.find(c => c.slug === slug) ?? null
      const title = content?.title ?? staticEbook?.title.fr ?? entry?.seo_title ?? slug
      const [leads, orders] = await Promise.all([getEbookLeads(slug), getEbookOrders(slug)])
      const paidOrders = (orders as Array<{ status: string; amount_cents: number }>).filter(o => o.status === 'paid')
      const revenueCents = paidOrders.reduce((sum, o) => sum + (o.amount_cents || 0), 0)
      return { slug, title, isStatic, entry, leadsCount: leads.length, ordersCount: orders.length, paidCount: paidOrders.length, revenueCents }
    }),
  )

  const filtered = rows.filter(({ slug, title, entry }) => {
    const matchesStatus = selectedStatus === 'all' || entry?.status === selectedStatus
    const matchesQuery =
      !query ||
      slug.toLowerCase().includes(query) ||
      (typeof title === 'string' && title.toLowerCase().includes(query)) ||
      (entry?.seo_description ?? '').toLowerCase().includes(query)
    return matchesStatus && matchesQuery
  })

  return (
    <div className="space-y-5">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Lead magnets</h1>
          <p className="mt-1 text-sm text-slate-600">Créer, planifier et suivre les lead magnets (PDF, page interne ou article) et leurs leads.</p>
        </div>
        <Link
          href="/dashboard/admin/ebooks/new"
          className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Nouveau lead magnet
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form method="GET" className="flex max-w-md items-center gap-2">
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Rechercher un lead magnet…"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
          />
          {status && status !== 'all' ? <input type="hidden" name="status" value={status} /> : null}
          <button type="submit" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Rechercher
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map(({ value, label }) => {
            const active = selectedStatus === value
            const href = value === 'all' ? (q ? `?q=${encodeURIComponent(q)}` : '/dashboard/admin/ebooks') : `?status=${value}${q ? `&q=${encodeURIComponent(q)}` : ''}`
            return (
              <Link
                key={value}
                href={href}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  active ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Aucun lead magnet ne correspond aux critères.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(({ slug, title, isStatic, entry, leadsCount, ordersCount, paidCount, revenueCents }) => (
            <Link
              key={slug}
              href={`/dashboard/admin/ebooks/${slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-medium text-slate-900 group-hover:text-violet-700">{title}</h3>
                  <p className="text-xs text-slate-500">/{slug}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {entry ? statusBadge(entry.status) : statusBadge('draft')}
                  {!isStatic && <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-700">DB</span>}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate-500">
                {entry?.is_free ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">Gratuit</span>
                ) : entry ? (
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 font-medium text-violet-700">
                    {((entry.price_cents || 0) / 100).toFixed(2)} {entry.currency.toUpperCase()}
                  </span>
                ) : null}
                {entry?.scheduled_at && entry.status === 'scheduled' ? (
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                    Planifié le {new Date(entry.scheduled_at).toLocaleDateString('fr-FR')}
                  </span>
                ) : null}
                {entry?.published_at ? (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5">Publié le {new Date(entry.published_at).toLocaleDateString('fr-FR')}</span>
                ) : null}
              </div>

              <div className="mt-auto grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
                <Stat label="Leads" value={leadsCount} />
                <Stat label="Commandes" value={`${paidCount}/${ordersCount}`} />
                <Stat label="CA" value={`${(revenueCents / 100).toFixed(0)} €`} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-base font-semibold text-slate-900">{value}</div>
    </div>
  )
}
