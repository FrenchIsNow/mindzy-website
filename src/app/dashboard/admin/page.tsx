import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { listDashboardClients, countArticlesForClient, listBlogIdeas } from '@/lib/db'
import { Shell } from '@/components/dashboard/Sidebar'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const allClients = await listDashboardClients()
  // Hide Mindzy self-blog from the "Clients" table (it's accessible via "Mon blog").
  const clients = allClients.filter(c => c.slug !== 'mindzy')
  const rows = await Promise.all(
    clients.map(async c => {
      const [ideas, counts] = await Promise.all([listBlogIdeas(c.id), countArticlesForClient(c.id)])
      return { client: c, ideasCount: ideas.length, counts }
    }),
  )

  return (
    <Shell role="admin" userName="Admin">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Link
          href="/dashboard/admin/clients/new"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Ajouter un client
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucun client pour le moment.</p>
          <Link href="/dashboard/admin/clients/new" className="mt-4 inline-block text-violet-600 hover:underline">
            Créer le premier client →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Fréquence</th>
                <th className="px-4 py-3 text-center">Idées</th>
                <th className="px-4 py-3 text-center">En attente</th>
                <th className="px-4 py-3 text-center">Approuvés</th>
                <th className="px-4 py-3 text-center">Publiés</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(({ client, ideasCount, counts }) => (
                <tr key={client.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-slate-500">/{client.slug} · {client.locale}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {client.frequency} · {client.posts_per_cycle}/cycle
                  </td>
                  <td className="px-4 py-3 text-center text-slate-700">{ideasCount}</td>
                  <td className="px-4 py-3 text-center">
                    {counts.pending > 0 ? (
                      <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">{counts.pending}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {counts.approved > 0 ? (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">{counts.approved}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-700">{counts.published}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/dashboard/admin/clients/${client.slug}`} className="text-violet-600 hover:underline">
                      Ouvrir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  )
}
