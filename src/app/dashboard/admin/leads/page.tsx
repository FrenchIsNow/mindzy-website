import Link from 'next/link'
import { listLeadsFiltered, countLeadsBySource } from '@/lib/db'
import { type LeadFilters } from '@/lib/db'
import CopyButton from '@/components/dashboard/CopyButton'

export const dynamic = 'force-dynamic'

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'] as const
const LOCALES = ['fr', 'en', 'es', 'de', 'it', 'pt'] as const

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; status?: string; locale?: string; q?: string }>
}) {
  const sp = await searchParams
  const filters: LeadFilters = {
    source: sp.source || undefined,
    status: sp.status || undefined,
    locale: sp.locale || undefined,
    q: sp.q || undefined,
    limit: 200,
  }
  const [{ rows, total }, sources] = await Promise.all([listLeadsFiltered(filters), countLeadsBySource()])

  function linkWith(key: string, value: string | undefined) {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(sp)) if (v && k !== key) params.set(k, v)
    if (value) params.set(key, value)
    return `/dashboard/admin/leads?${params.toString()}`
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Prospects</h1>
          <p className="mt-1 text-sm text-slate-600">{total.toLocaleString('fr-FR')} leads capturés au total.</p>
        </div>
        <a
          href={`/api/dashboard/leads/export?${new URLSearchParams(
            Object.entries(sp).filter(([, v]) => v) as [string, string][],
          ).toString()}`}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          ⤓ Exporter CSV
        </a>
      </div>

      <form className="mb-4 flex flex-wrap items-center gap-2" method="get">
        <input
          name="q"
          defaultValue={sp.q ?? ''}
          placeholder="Rechercher (email, nom, société)…"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-violet-500 focus:outline-none"
        />
        {(sp.source || sp.status || sp.locale) && (
          <Link href="/dashboard/admin/leads" className="text-xs text-slate-500 hover:underline">
            Réinitialiser
          </Link>
        )}
        <button type="submit" className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white">
          Filtrer
        </button>
      </form>

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterPill label="Tous" href={linkWith('source', undefined)} active={!sp.source} count={total} />
        {Object.entries(sources).map(([source, count]) => (
          <FilterPill key={source} label={source} href={linkWith('source', source)} active={sp.source === source} count={count} />
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span className="font-medium uppercase tracking-wide text-slate-500">Statut</span>
        <FilterLink label="all" active={!sp.status} href={linkWith('status', undefined)} />
        {STATUSES.map(s => (
          <FilterLink key={s} label={s} active={sp.status === s} href={linkWith('status', s)} />
        ))}
        <span className="ml-4 font-medium uppercase tracking-wide text-slate-500">Langue</span>
        {LOCALES.map(l => (
          <FilterLink key={l} label={l.toUpperCase()} active={sp.locale === l} href={linkWith('locale', l)} />
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucun lead ne correspond aux filtres.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Société</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Langue</th>
                <th className="px-4 py-3">Date</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(lead => {
                const fullName = [lead.first_name, lead.last_name].filter(Boolean).join(' ')
                return (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">
                      {fullName ? (
                        <span className="inline-flex items-center gap-1.5">
                          {fullName}
                          <CopyButton value={fullName} label="Copier le nom" />
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {lead.email ? (
                        <span className="inline-flex items-center gap-1.5">
                          {lead.email}
                          <CopyButton value={lead.email} label="Copier l'email" />
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{lead.company || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800">
                        {lead.source || 'autre'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{lead.status || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.locale?.toUpperCase() || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/dashboard/admin/leads/${lead.id}`} className="text-violet-600 hover:underline">
                        Voir →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

function FilterPill({ label, href, active, count }: { label: string; href: string; active: boolean; count: number }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${active ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
    >
      {label} <span className={active ? 'text-violet-100' : 'text-slate-500'}>{count}</span>
    </Link>
  )
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
    >
      {label}
    </Link>
  )
}
