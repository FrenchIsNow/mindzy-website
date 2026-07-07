import Link from 'next/link'
import { listDashboardClients, listBlogIdeas } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function BlogIdeasPage() {
  const clients = await listDashboardClients()
  const rows = await Promise.all(
    clients.map(async client => {
      const ideas = await listBlogIdeas(client.id)
      return { client, ideas }
    }),
  )

  const allIdeas = rows.flatMap(({ client, ideas }) => ideas.map(idea => ({ ...idea, client })))

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Idées & pipeline</h1>
          <p className="mt-1 text-sm text-slate-600">Idées en attente, en cours et terminées.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/admin/blogs"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Articles
          </Link>
          <Link
            href="/dashboard/admin/blog-ideas/import"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            + Importer des idées
          </Link>
        </div>
      </div>

      {allIdeas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucune idée dans le pipeline.</p>
          <Link href="/dashboard/admin/blog-ideas/import" className="mt-4 inline-block text-violet-600 hover:underline">
            Importer des idées →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Idée</th>
                <th className="px-4 py-3">Site</th>
                <th className="px-4 py-3">Langue</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allIdeas.map(idea => (
                <tr key={idea.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{idea.question}</div>
                    {idea.target && <div className="text-xs text-slate-500">{idea.target}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{idea.client.name}</td>
                  <td className="px-4 py-3 text-slate-600">{idea.locale?.toUpperCase() || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        idea.status === 'done'
                          ? 'bg-emerald-100 text-emerald-800'
                          : idea.status === 'in_progress'
                            ? 'bg-violet-100 text-violet-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {idea.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/admin/clients/${idea.client.slug}?idea=${idea.id}`}
                      className="text-violet-600 hover:underline"
                    >
                      Ouvrir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
