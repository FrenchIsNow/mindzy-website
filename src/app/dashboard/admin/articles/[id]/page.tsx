import { notFound } from 'next/navigation'
import Link from 'next/link'
import ArticleEditor from '@/components/dashboard/ArticleEditor'
import { getBlogArticle, getDashboardClientById, getArticleTranslations, getBlogSiteBySlug } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminArticlePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const article = await getBlogArticle(Number(id))
  if (!article) notFound()

  const [client, translations] = await Promise.all([
    getDashboardClientById(article.client_id),
    article.canonical_slug
      ? getArticleTranslations(article.canonical_slug, article.client_id)
      : Promise.resolve([article]),
  ])

  // blog_sites mirrors dashboard_clients by slug; resolve the site slug for the editor.
  const site = client ? await getBlogSiteBySlug(client.slug) : null
  const siteSlug = site?.slug ?? client?.slug

  return (
<>      <Link
        href={siteSlug ? `/dashboard/admin/blogs/${siteSlug}` : '/dashboard/admin'}
        className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600"
      >
        ← Retour
      </Link>
      <ArticleEditor article={article} role="admin" translations={translations} siteSlug={siteSlug} />
</>  )
}
