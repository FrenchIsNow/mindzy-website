import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { getAllCatalogEntries, getEbookLeads, getEbookOrders, listDbOnlyEbookSlugs, getEbookContent } from '@/lib/db'
import { ebooks } from '@/lib/ebooks'

export const dynamic = 'force-dynamic'

export default async function EbooksAdmin() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const catalog = await getAllCatalogEntries()
  const dbOnlySlugs = await listDbOnlyEbookSlugs()

  // DB-only ebooks: created via the wizard, no static fallback.
  const dbOnlyRows = await Promise.all(
    dbOnlySlugs
      .filter(s => !ebooks.some(e => e.slug === s))
      .map(async s => {
        const content = await getEbookContent(s, 'fr')
        return {
          slug: s,
          title: { fr: content?.title ?? s },
          pages: content?.pages ?? null,
          category: content?.category ?? '',
          image: content?.image_url ?? '',
        }
      }),
  )

  const allEbookLikes = [
    ...ebooks.map(e => ({ slug: e.slug, title: e.title.fr, isStatic: true })),
    ...dbOnlyRows.map(e => ({ slug: e.slug, title: e.title.fr, isStatic: false })),
  ]

  const rows = await Promise.all(
    allEbookLikes.map(async item => {
      const entry = catalog.find(c => c.slug === item.slug) ?? null
      const [leads, orders] = await Promise.all([
        getEbookLeads(item.slug),
        getEbookOrders(item.slug),
      ])
      const paidOrders = (orders as Array<{ status: string; amount_cents: number }>).filter(o => o.status === 'paid')
      const revenueCents = paidOrders.reduce((sum, o) => sum + (o.amount_cents || 0), 0)
      return {
        slug: item.slug,
        title: item.title,
        isStatic: item.isStatic,
        entry,
        leadsCount: leads.length,
        ordersCount: orders.length,
        paidCount: paidOrders.length,
        revenueCents,
      }
    }),
  )

  return (
    <Shell role="admin" userName="Admin">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ebooks</h1>
          <p className="mt-1 text-sm text-slate-600">Gérer prix, codes promo, leads et commandes.</p>
        </div>
        <Link
          href="/dashboard/admin/ebooks/new"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Nouveau ebook
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map(({ slug, title, isStatic, entry, leadsCount, ordersCount, paidCount, revenueCents }) => (
          <Link
            key={slug}
            href={`/dashboard/admin/ebooks/${slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium text-slate-900 group-hover:text-violet-700">{title}</h3>
                <p className="text-xs text-slate-500">
                  /{slug}
                  {!isStatic && <span className="ml-2 rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-700">Dashboard</span>}
                </p>
              </div>
              {entry ? (
                entry.is_free ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Gratuit</span>
                ) : (
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800">
                    {((entry.price_cents || 0) / 100).toFixed(2)} {entry.currency.toUpperCase()}
                  </span>
                )
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Non configuré</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
              <Stat label="Leads" value={leadsCount} />
              <Stat label="Commandes" value={`${paidCount}/${ordersCount}`} />
              <Stat label="CA" value={`${(revenueCents / 100).toFixed(0)} €`} />
            </div>
          </Link>
        ))}
      </div>
    </Shell>
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
