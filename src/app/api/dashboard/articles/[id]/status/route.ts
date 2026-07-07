import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import { getBlogArticle, updateBlogArticle, getDashboardClientById } from '@/lib/db'

export const runtime = 'nodejs'

const ADMIN_ALLOWED = new Set(['pending_review', 'approved', 'rejected', 'published'])

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized

  const { id } = await params
  const idNum = Number(id)
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const article = await getBlogArticle(idNum)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await req.json().catch(() => null)) as { status?: string; notes?: string } | null
  if (!body?.status) return NextResponse.json({ error: 'status required' }, { status: 400 })

  if (!ADMIN_ALLOWED.has(body.status)) {
    return NextResponse.json({ error: 'Invalid status transition' }, { status: 400 })
  }

  const update: Record<string, unknown> = { status: body.status }
  if (typeof body.notes === 'string') update.client_notes = body.notes
  if (body.status === 'published') update.published_at = new Date().toISOString()

  await updateBlogArticle(idNum, update)

  // If published and client has ingest URL, forward the article.
  if (body.status === 'published') {
    const client = await getDashboardClientById(article.client_id)
    if (client?.ingest_url) {
      try {
        await fetch(client.ingest_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(client.ingest_token ? { Authorization: `Bearer ${client.ingest_token}` } : {}),
          },
          body: JSON.stringify({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            contentHtml: article.content_html,
            coverImageUrl: article.cover_image_url,
            coverAlt: article.cover_alt,
            keywords: article.keywords,
            category: article.category,
            readingTime: article.reading_time,
            locale: article.locale,
            clientSlug: client.slug,
          }),
        })
      } catch (err) {
        console.error('Ingest forward failed:', err)
      }
    }
  }

  return NextResponse.json({ ok: true })
}
