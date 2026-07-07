import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWaitingListBySlug, listWaitlistEntries } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function WaitingListDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const list = await getWaitingListBySlug(slug)
  if (!list) notFound()

  const allEntries = await listWaitlistEntries()
  const entries = allEntries.filter(e => e.waiting_list_id === list.id)

  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/waiting-lists" className="text-sm text-violet-600 hover:underline">
          ← Listes d&apos;attente
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{list.name}</h1>
        <p className="mt-1 text-sm text-slate-600">/{list.slug} · {entries.length} inscription{entries.length > 1 ? 's' : ''}</p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucune inscription pour cette liste.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Entreprise</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td className="px-4 py-3 font-medium">{[entry.first_name, entry.last_name].filter(Boolean).join(' ') || '—'}</td>
                  <td className="px-4 py-3 text-slate-600">{entry.email}</td>
                  <td className="px-4 py-3 text-slate-600">{entry.company || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(entry.created_at).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
