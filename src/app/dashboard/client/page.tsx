import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import {
  getDashboardClientById,
  listBlogArticlesForClient,
  listBlogIdeas,
} from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ClientHome() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'client') redirect('/dashboard/admin')

  const client = await getDashboardClientById(session.clientId)
  if (!client) redirect('/dashboard/login')

  const [articles, ideas] = await Promise.all([
    listBlogArticlesForClient(client.id),
    listBlogIdeas(client.id),
  ])

  const pending = articles.filter(a => a.status === 'pending_review')
  const approved = articles.filter(a => a.status === 'approved')
  const published = articles.filter(a => a.status === 'published')

  return (
    <Shell role="client" userName={client.name} clientSlug={client.slug}>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Bonjour {client.name.split(' ')[0]}</h1>
      <p className="mb-8 text-sm text-slate-600">
        {articles.length} article(s) — {pending.length} en attente de votre validation.
      </p>

      {pending.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-700">
            À valider ({pending.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {pending.map(a => <ArticleCard key={a.id} article={a} highlight />)}
          </div>
        </section>
      )}

      {approved.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Approuvés ({approved.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {approved.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      {published.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
            Publiés ({published.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {published.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucun article pour le moment.</p>
          <p className="mt-2 text-sm text-slate-500">Vos articles apparaîtront ici dès qu&apos;ils seront prêts à relire.</p>
        </div>
      )}

      <section className="mt-12">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Idées d&apos;articles ({ideas.length})
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {ideas.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">Aucune idée planifiée.</div>
          ) : (
            <ul className="divide-y divide-slate-100 text-sm">
              {ideas.slice(0, 50).map(i => (
                <li key={i.id} className="flex items-center justify-between px-4 py-3">
                  <span className="text-slate-700">{i.question}</span>
                  <StatusBadge status={i.status} />
                </li>
              ))}
              {ideas.length > 50 && (
                <li className="px-4 py-3 text-center text-xs text-slate-500">
                  + {ideas.length - 50} autres idées…
                </li>
              )}
            </ul>
          )}
        </div>
      </section>
    </Shell>
  )
}

function ArticleCard({ article, highlight }: { article: { id: number; title: string; excerpt: string | null; status: string; created_at: string }; highlight?: boolean }) {
  return (
    <Link
      href={`/dashboard/client/articles/${article.id}`}
      className={`block rounded-2xl border bg-white p-4 transition hover:shadow-md ${highlight ? 'border-amber-300' : 'border-slate-200'}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-medium text-slate-900">{article.title}</h3>
        <StatusBadge status={article.status} />
      </div>
      {article.excerpt && <p className="line-clamp-2 text-sm text-slate-600">{article.excerpt}</p>}
      <div className="mt-3 text-xs text-slate-500">{new Date(article.created_at).toLocaleDateString('fr-FR')}</div>
    </Link>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    idea: { cls: 'bg-slate-100 text-slate-700', label: 'Idée' },
    generating: { cls: 'bg-blue-100 text-blue-800', label: 'Génération…' },
    pending_review: { cls: 'bg-amber-100 text-amber-800', label: 'À valider' },
    approved: { cls: 'bg-emerald-100 text-emerald-800', label: 'Approuvé' },
    published: { cls: 'bg-violet-100 text-violet-800', label: 'Publié' },
    rejected: { cls: 'bg-red-100 text-red-800', label: 'Rejeté' },
  }
  const s = map[status] || { cls: 'bg-slate-100 text-slate-700', label: status }
  return <span className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span>
}
