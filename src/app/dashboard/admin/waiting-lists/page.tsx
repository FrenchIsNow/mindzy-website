import Link from 'next/link'
import { listWaitingLists } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function WaitingListsPage() {
  const lists = await listWaitingLists()

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Listes d&apos;attente</h1>
          <p className="mt-1 text-sm text-slate-600">Gérez les listes d&apos;attente par produit.</p>
        </div>
        <Link
          href="/dashboard/admin/waiting-lists/new"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Nouvelle liste
        </Link>
      </div>

      {lists.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucune liste d&apos;attente pour le moment.</p>
          <Link href="/dashboard/admin/waiting-lists/new" className="mt-4 inline-block text-violet-600 hover:underline">
            Créer la première liste →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map(list => (
            <Link
              key={list.id}
              href={`/dashboard/admin/waiting-lists/${list.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm"
            >
              <div className="mb-1 text-sm font-medium text-slate-900">{list.name}</div>
              <div className="text-xs text-slate-500">/{list.slug}</div>
              <div className="mt-3 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                {list.status}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
