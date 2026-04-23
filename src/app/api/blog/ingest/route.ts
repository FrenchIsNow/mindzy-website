import { NextResponse } from 'next/server'
import { getDashboardClientBySlug, createBlogArticle, updateBlogIdea, getBlogIdea } from '@/lib/db'

export const runtime = 'nodejs'

/**
 * Converts a markdown string to minimal HTML for Tiptap.
 * Handles: headings (##, ###), bold (**), italic (*), links [x](url), paragraphs.
 * Complex markdown should be converted client-side; this is a baseline.
 */
function mdToHtml(md: string): string {
  const lines = md.split(/\r?\n/)
  const out: string[] = []
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    const text = paragraph.join(' ').trim()
    if (text) out.push(`<p>${inline(text)}</p>`)
    paragraph = []
  }

  const inline = (s: string): string =>
    s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')

  for (const line of lines) {
    if (/^###\s+/.test(line)) { flushParagraph(); out.push(`<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`) }
    else if (/^##\s+/.test(line)) { flushParagraph(); out.push(`<h2>${inline(line.replace(/^##\s+/, ''))}</h2>`) }
    else if (/^#\s+/.test(line)) { flushParagraph(); out.push(`<h1>${inline(line.replace(/^#\s+/, ''))}</h1>`) }
    else if (line.trim() === '') { flushParagraph() }
    else paragraph.push(line.trim())
  }
  flushParagraph()
  return out.join('\n')
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    title?: string
    slug?: string
    excerpt?: string
    content?: string         // markdown (n8n format)
    contentHtml?: string     // pre-rendered HTML
    coverImageUrl?: string
    coverAlt?: string
    readingTime?: number
    keywords?: string[]
    category?: string
    locale?: string
    clientId?: string        // slug, per n8n spec
    clientSlug?: string
    ideaId?: number
    sheetRowId?: string
    driveMdUrl?: string
    driveImageUrl?: string
  } | null

  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const clientSlug = body.clientSlug ?? body.clientId
  if (!clientSlug || !body.title || !body.slug) {
    return NextResponse.json({ error: 'clientSlug, title, and slug required' }, { status: 400 })
  }

  const client = await getDashboardClientBySlug(clientSlug)
  if (!client) return NextResponse.json({ error: 'Unknown client' }, { status: 404 })

  // Bearer token check (per-client token)
  const auth = req.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!client.ingest_token || token !== client.ingest_token) {
    return NextResponse.json({ error: 'Invalid ingest token' }, { status: 401 })
  }

  const contentHtml = body.contentHtml || (body.content ? mdToHtml(body.content) : '')

  const article = await createBlogArticle({
    clientId: client.id,
    ideaId: body.ideaId ?? null,
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    contentHtml,
    coverImageUrl: body.coverImageUrl,
    coverAlt: body.coverAlt,
    keywords: body.keywords,
    category: body.category,
    readingTime: body.readingTime,
    locale: body.locale ?? client.locale,
    status: 'pending_review',
    driveMdUrl: body.driveMdUrl,
    driveImageUrl: body.driveImageUrl,
    sheetRowId: body.sheetRowId,
  })

  if (body.ideaId) {
    const idea = await getBlogIdea(body.ideaId)
    if (idea && idea.client_id === client.id) {
      await updateBlogIdea(body.ideaId, { status: 'pending_review' })
    }
  }

  return NextResponse.json({ ok: true, articleId: article.id })
}
