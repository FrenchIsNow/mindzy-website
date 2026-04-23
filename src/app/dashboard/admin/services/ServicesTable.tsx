'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Service } from '@/lib/db'

export default function ServicesTable({ initial }: { initial: Service[] }) {
  const router = useRouter()

  async function remove(slug: string, name: string) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    const res = await fetch(`/api/dashboard/services/${slug}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
  }

  if (initial.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-slate-600">Aucun service pour le moment.</p>
        <Link href="/dashboard/admin/services/new" className="mt-4 inline-block text-violet-600 hover:underline">
          Créer le premier service →
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Prix</th>
            <th className="px-4 py-3">Statut</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {initial.map(s => (
            <tr key={s.id}>
              <td className="px-4 py-3">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-slate-500">/{s.slug}{s.description ? ` · ${s.description.slice(0, 60)}${s.description.length > 60 ? '…' : ''}` : ''}</div>
              </td>
              <td className="px-4 py-3 font-medium">
                {(s.price_cents / 100).toFixed(2)} {s.currency.toUpperCase()}
              </td>
              <td className="px-4 py-3">
                {s.is_active ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Actif</span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Inactif</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <Link href={`/dashboard/admin/services/${s.slug}`} className="mr-3 text-violet-600 hover:underline">Éditer</Link>
                <button onClick={() => remove(s.slug, s.name)} className="text-xs text-red-600 hover:underline">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
