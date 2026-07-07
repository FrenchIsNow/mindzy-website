import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDashboardClientBySlug, listBlogIdeas, listBlogArticlesForClient } from '@/lib/db'
import ClientDetailView from './ClientDetailView'

export const dynamic = 'force-dynamic'

export default async function ClientDetailPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) notFound()

  const [ideas, articles] = await Promise.all([listBlogIdeas(client.id), listBlogArticlesForClient(client.id, 'en')])

  const { password_hash: _ph, ...safeClient } = client
  const isSelfBlog = client.slug === 'mindzy'

  return (
<>      {!isSelfBlog && (
        <Link href="/dashboard/admin" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
          ← Tous les clients
        </Link>
      )}
      <ClientDetailView client={safeClient} initialIdeas={ideas} initialArticles={articles} />
</>  )
}
