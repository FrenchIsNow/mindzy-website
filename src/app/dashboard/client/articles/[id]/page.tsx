import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import ArticleEditor from '@/components/dashboard/ArticleEditor'
import { getBlogArticle, getDashboardClientById, getArticleTranslations } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ClientArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'client') redirect('/dashboard/admin')

  const { id } = await params
  const article = await getBlogArticle(Number(id))
  if (!article) notFound()
  if (article.client_id !== session.clientId) notFound()

  const [client, translations] = await Promise.all([
    getDashboardClientById(article.client_id),
    article.canonical_slug
      ? getArticleTranslations(article.canonical_slug, article.client_id)
      : Promise.resolve([article]),
  ])

  return (
    <Shell role="client" userName={client?.name} clientSlug={client?.slug}>
      <Link href="/dashboard/client" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Retour à mes articles
      </Link>
      <ArticleEditor article={article} role="client" translations={translations} />
    </Shell>
  )
}
