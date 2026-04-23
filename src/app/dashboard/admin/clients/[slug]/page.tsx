import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { getDashboardClientBySlug, listBlogIdeas, listBlogArticlesForClient } from '@/lib/db'
import ClientDetailView from './ClientDetailView'

export const dynamic = 'force-dynamic'

export default async function ClientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) notFound()

  const [ideas, articles] = await Promise.all([listBlogIdeas(client.id), listBlogArticlesForClient(client.id)])

  const { password_hash: _ph, ...safeClient } = client
  const isSelfBlog = client.slug === 'mindzy'

  return (
    <Shell role="admin" userName="Admin">
      {!isSelfBlog && (
        <Link href="/dashboard/admin" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
          ← Tous les clients
        </Link>
      )}
      <ClientDetailView client={safeClient} initialIdeas={ideas} initialArticles={articles} />
    </Shell>
  )
}
