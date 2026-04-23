import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import ArticleEditor from '@/components/dashboard/ArticleEditor'
import { getBlogArticle, getDashboardClientById, getArticleTranslations } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const { id } = await params
  const article = await getBlogArticle(Number(id))
  if (!article) notFound()

  const [client, translations] = await Promise.all([
    getDashboardClientById(article.client_id),
    article.canonical_slug
      ? getArticleTranslations(article.canonical_slug, article.client_id)
      : Promise.resolve([article]),
  ])

  return (
    <Shell role="admin" userName="Admin">
      <Link
        href={client ? `/dashboard/admin/clients/${client.slug}` : '/dashboard/admin'}
        className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600"
      >
        ← Retour
      </Link>
      <ArticleEditor article={article} role="admin" translations={translations} />
    </Shell>
  )
}
