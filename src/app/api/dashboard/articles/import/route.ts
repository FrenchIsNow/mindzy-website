import { getSession } from '@/lib/dashboard-auth'
import { createBlogArticle, listBlogArticlesForClient } from '@/lib/db'
import type { BlogArticle } from '@/lib/db'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { clientId, locale, articles } = body
  if (!clientId || !locale || !Array.isArray(articles)) {
    return Response.json({ error: 'Missing required fields: clientId, locale, articles' }, { status: 400 })
  }

  const existing = await listBlogArticlesForClient(clientId)
  const existingMap = new Set(existing.map(a => `${a.slug}|${a.locale}`))

  let inserted = 0
  let skipped = 0
  const errors: string[] = []

  for (const article of articles) {
    try {
      const key = `${article.slug}|${locale}`
      if (existingMap.has(key)) {
        skipped++
        continue
      }

      await createBlogArticle({
        clientId,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        contentHtml: article.contentHtml,
        coverImageUrl: article.coverImageUrl,
        coverAlt: article.coverAlt,
        category: article.category,
        readingTime: article.readingTime,
        locale,
        status: article.status || 'pending_review',
      })
      inserted++
    } catch (err) {
      errors.push(`${article.title}: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  return Response.json({ inserted, skipped, errors })
}
