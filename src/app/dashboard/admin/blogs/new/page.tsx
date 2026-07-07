import Link from 'next/link'
import { listDashboardClients, listBlogSites, listAllBlogIdeas } from '@/lib/db'
import NewBlogArticleForm from './NewBlogArticleForm'

export const dynamic = 'force-dynamic'

export default async function NewBlogArticlePage() {
  const [clients, sites, ideas] = await Promise.all([listDashboardClients(), listBlogSites(), listAllBlogIdeas()])
  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/blogs" className="text-sm text-violet-600 hover:underline">
          ← Blogs
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Nouvel article</h1>
      </div>
      <NewBlogArticleForm
        clients={clients.map(c => ({ id: c.id, name: c.name, slug: c.slug }))}
        sites={sites.map(s => ({ id: s.id, slug: s.slug, name: s.name }))}
        ideas={ideas.map(i => ({ id: i.id, question: i.question, locale: i.locale }))}
      />
    </>
  )
}
