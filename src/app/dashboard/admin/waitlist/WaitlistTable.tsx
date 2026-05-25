'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { WaitlistEntry } from '@/lib/db'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function toCsv(entries: WaitlistEntry[]): string {
  const headers = [
    'id', 'created_at', 'first_name', 'last_name', 'email',
    'role', 'company', 'company_size', 'use_case', 'locale',
  ]
  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v)
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const rows = entries.map(e => headers.map(h => escape((e as unknown as Record<string, unknown>)[h])).join(','))
  return [headers.join(','), ...rows].join('\n')
}

export function WaitlistTable({ entries }: { entries: WaitlistEntry[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [pending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(e =>
      `${e.first_name} ${e.last_name} ${e.email} ${e.company ?? ''} ${e.role ?? ''} ${e.use_case ?? ''}`
        .toLowerCase()
        .includes(q),
    )
  }, [entries, query])

  function downloadCsv() {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function deleteEntry(id: number) {
    if (!confirm('Supprimer cette inscription ?')) return
    setDeletingId(id)
    const res = await fetch(`/api/dashboard/waitlist/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    if (res.ok) {
      startTransition(() => router.refresh())
    } else {
      alert('Suppression impossible')
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher par nom, email, entreprise…"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
        <button
          onClick={downloadCsv}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Exporter CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Poste</th>
                <th className="px-4 py-3">Entreprise</th>
                <th className="px-4 py-3">Taille</th>
                <th className="px-4 py-3">Locale</th>
                <th className="px-4 py-3">Use case</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(e => (
                <tr key={e.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(e.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {e.first_name} {e.last_name}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${e.email}`} className="text-violet-600 hover:underline">{e.email}</a>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{e.role ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-700">{e.company ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-700">{e.company_size ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-500">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium uppercase">{e.locale}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="max-w-xs truncate" title={e.use_case ?? ''}>{e.use_case ?? '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteEntry(e.id)}
                      disabled={deletingId === e.id || pending}
                      className="text-xs font-medium text-rose-600 hover:underline disabled:opacity-50"
                    >
                      {deletingId === e.id ? '…' : 'Supprimer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mt-4 text-center text-sm text-slate-500">Aucun résultat pour cette recherche.</p>
      )}
    </div>
  )
}
