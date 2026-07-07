import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogSiteBySlug,
  getDashboardClientBySlug,
  listBlogArticlesForClient,
  listBlogIdeas,
} from '@/lib/db'
import BlogSiteDetailView from './BlogSiteDetailView'

export const dynamic = 'force-dynamic'

export default async function BlogSiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const site = await getBlogSiteBySlug(slug)
  if (!site) notFound()

  // blog_sites doesn't carry client_id yet; fall back to dashboard_clients.slug
  // so the site can still drive the legacy article/idea tables.
  const mirror = await getDashboardClientBySlug(slug)
  if (!mirror) notFound()
  const clientId = mirror.id

  const sourceLocale = (site.settings as { source_locale?: string })?.source_locale ?? 'fr'

  const [articles, ideas] = await Promise.all([
    listBlogArticlesForClient(clientId, sourceLocale),
    listBlogIdeas(clientId),
  ])

  return (
    <>
      <Link href="/dashboard/admin/blogs" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Tous les blogs
      </Link>
      <BlogSiteDetailView
        site={site}
        clientId={clientId}
        sourceLocale={sourceLocale}
        initialArticles={articles}
        initialIdeas={ideas}
      />
    </>
  )
}
