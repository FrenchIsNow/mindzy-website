import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { getCatalogEntry, getEbookLeads, getEbookOrders, getAllCatalogEntries, getEbookContent } from '@/lib/db'
import { getEbook, ebooks as allEbooks } from '@/lib/ebooks'
import EbookSettingsForm from './EbookSettingsForm'

export const dynamic = 'force-dynamic'

type Lead = { id: number; email: string; name: string; phone: string | null; company: string | null; created_at: string }
type Order = {
  id: number
  email: string
  name: string
  amount_cents: number
  currency: string
  status: string
  has_order_bump: boolean
  upsell_accepted: boolean
  upsell_amount_cents: number | null
  promo_code: string | null
  created_at: string
}

export default async function EbookDetail({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const { slug } = await params
  const staticEbook = getEbook(slug)
  const dbContent = !staticEbook ? await getEbookContent(slug, 'fr') : null
  if (!staticEbook && !dbContent) notFound()
  const ebook = staticEbook ?? {
    slug,
    title: { fr: dbContent?.title || slug },
    excerpt: { fr: dbContent?.excerpt || '' },
    pages: dbContent?.pages ?? 0,
    category: dbContent?.category ?? 'seo',
  } as unknown as NonNullable<ReturnType<typeof getEbook>>

  // getCatalogEntry filters by is_active; fall back to the full list if missing.
  const catalogAll = await getAllCatalogEntries()
  let entry = await getCatalogEntry(slug)
  if (!entry) entry = catalogAll.find(e => e.slug === slug) ?? null

  const [leadsRaw, ordersRaw] = await Promise.all([getEbookLeads(slug), getEbookOrders(slug)])
  const leads = leadsRaw as unknown as Lead[]
  const orders = ordersRaw as unknown as Order[]

  const paidOrders = orders.filter(o => o.status === 'paid')
  const revenueCents = paidOrders.reduce((s, o) => s + (o.amount_cents || 0), 0)
  const upsellCents = paidOrders.filter(o => o.upsell_accepted).reduce((s, o) => s + (o.upsell_amount_cents || 0), 0)

  return (
    <Shell role="admin" userName="Admin">
      <Link href="/dashboard/admin/ebooks" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Ebooks
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{ebook.title.fr}</h1>
          <p className="text-sm text-slate-600">/{ebook.slug} · {ebook.pages} pages · {ebook.category}</p>
        </div>
        <Link
          href={`/dashboard/admin/ebooks/${slug}/edit`}
          className="shrink-0 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Éditer la page
        </Link>
      </div>

      {/* Public page preview */}
      <div className="mt-4 mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Page publique</span>
        {(['fr', 'en', 'es'] as const).map(l => (
          <a
            key={l}
            href={`/${l}/ebooks/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
          >
            <span className="uppercase tracking-wider">{l}</span>
            <span className="text-slate-400">mindzy.me/{l}/ebooks/{slug}</span>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPI label="Leads" value={leads.length} />
        <KPI label="Commandes payées" value={`${paidOrders.length} / ${orders.length}`} />
        <KPI label="CA ebook" value={`${(revenueCents / 100).toFixed(0)} €`} />
        <KPI label="CA upsell" value={`${(upsellCents / 100).toFixed(0)} €`} />
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Paramètres catalogue</h2>
        <EbookSettingsForm
          slug={slug}
          initial={entry}
          ebookOptions={allEbooks
            .filter(e => e.slug !== slug)
            .map(e => {
              const c = (catalogAll.find(x => x.slug === e.slug) ?? null) as { price_cents: number | null } | null
              return { slug: e.slug, name: e.title.fr, priceCents: c?.price_cents ?? null }
            })}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Leads ({leads.length})
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">Aucun lead.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Téléphone</th>
                  <th className="px-4 py-3">Entreprise</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 100).map(l => (
                  <tr key={l.id}>
                    <td className="px-4 py-3 font-medium">{l.name}</td>
                    <td className="px-4 py-3 text-slate-700">{l.email}</td>
                    <td className="px-4 py-3 text-slate-600">{l.phone || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{l.company || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(l.created_at).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Commandes ({orders.length})
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">Aucune commande.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Promo</th>
                  <th className="px-4 py-3">Upsell</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 100).map(o => (
                  <tr key={o.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium">{o.name}</div>
                      <div className="text-xs text-slate-500">{o.email}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {(o.amount_cents / 100).toFixed(2)} {o.currency.toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{o.promo_code || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {o.upsell_accepted ? `+${((o.upsell_amount_cents || 0) / 100).toFixed(0)} €` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatus status={o.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500">{new Date(o.created_at).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </Shell>
  )
}

function KPI({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function OrderStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-amber-100 text-amber-800',
    refunded: 'bg-red-100 text-red-800',
  }
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}
