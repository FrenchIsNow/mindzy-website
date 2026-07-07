import Link from 'next/link'
import { listDashboardClients, listBlogSites } from '@/lib/db'
import NewBlogIdeaForm from './NewBlogIdeaForm'

export const dynamic = 'force-dynamic'

export default async function NewBlogIdeaPage() {
  const [clients, sites] = await Promise.all([listDashboardClients(), listBlogSites()])
  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/blog-ideas" className="text-sm text-violet-600 hover:underline">
          ← Idées & pipeline
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Nouvelle idée de contenu</h1>
      </div>
      <NewBlogIdeaForm clients={clients.map(c => ({ id: c.id, name: c.name, slug: c.slug }))} sites={sites.map(s => ({ id: s.id, slug: s.slug, name: s.name }))} />
    </>
  )
}
