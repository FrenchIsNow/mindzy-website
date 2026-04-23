import type { Locale } from './i18n'
import { getBlogPosts, getBlogPost, type BlogPostMeta, type BlogPostFull } from './blog'
import { getDashboardClientBySlug } from './db'
import { neon } from '@neondatabase/serverless'

const MINDZY_SLUG = 'mindzy'

/**
 * Dashboard-published articles (client = mindzy, status = published) merged with markdown posts.
 * DB articles win on slug collision; markdown is the fallback.
 */
export async function getAllPublicBlogPosts(locale: Locale): Promise<BlogPostMeta[]> {
  const markdown = getBlogPosts(locale)
  const db = await getMindzyPublishedArticles(locale)

  const bySlug = new Map<string, BlogPostMeta>()
  for (const p of markdown) bySlug.set(p.slug, p)
  for (const p of db) bySlug.set(p.slug, p) // DB overrides markdown for same slug

  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

/** Single post: DB first, markdown fallback. Returns full content. */
export async function getPublicBlogPost(locale: Locale, slug: string): Promise<BlogPostFull | null> {
  const dbArticle = await getMindzyPublishedArticleBySlug(locale, slug)
  if (dbArticle) return dbArticle
  return getBlogPost(locale, slug)
}

/** All slugs across locales for generateStaticParams. */
export async function getAllPublicBlogSlugs(): Promise<{ locale: Locale; slug: string }[]> {
  const locales: Locale[] = ['fr', 'en', 'es']
  const out: { locale: Locale; slug: string }[] = []
  for (const locale of locales) {
    const markdown = getBlogPosts(locale)
    for (const p of markdown) out.push({ locale, slug: p.slug })

    try {
      const db = await getMindzyPublishedArticles(locale)
      for (const p of db) {
        if (!out.find(x => x.locale === locale && x.slug === p.slug)) {
          out.push({ locale, slug: p.slug })
        }
      }
    } catch {
      // DB unreachable at build time — markdown slugs still work
    }
  }
  return out
}

// ─── DB queries (direct, since db.ts functions don't expose what we need) ────

async function getMindzyPublishedArticles(locale: Locale): Promise<BlogPostMeta[]> {
  if (!process.env.DATABASE_URL) return []
  try {
    const client = await getDashboardClientBySlug(MINDZY_SLUG)
    if (!client) return []
    const sql = neon(process.env.DATABASE_URL)
    const rows = await sql`
      SELECT id, title, slug, excerpt, category, keywords, cover_image_url, cover_alt,
             reading_time, published_at, created_at, locale
      FROM blog_articles
      WHERE client_id = ${client.id}
        AND status = 'published'
        AND locale = ${locale}
      ORDER BY COALESCE(published_at, created_at) DESC
    `
    return (rows as Array<{
      id: number
      title: string
      slug: string
      excerpt: string | null
      category: string | null
      keywords: string[] | null
      cover_image_url: string | null
      cover_alt: string | null
      reading_time: number | null
      published_at: string | null
      created_at: string
    }>).map(r => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt || '',
      category: r.category || 'general',
      author: 'Mindzy',
      date: (r.published_at || r.created_at).slice(0, 10),
      modifiedDate: (r.published_at || r.created_at).slice(0, 10),
      image: r.cover_image_url || '/images/blog/default.svg',
      readingTime: r.reading_time || 5,
      tags: r.keywords || [],
      keywords: (r.keywords || []).join(', '),
      relatedPosts: [],
    }))
  } catch {
    return []
  }
}

async function getMindzyPublishedArticleBySlug(locale: Locale, slug: string): Promise<BlogPostFull | null> {
  if (!process.env.DATABASE_URL) return null
  try {
    const client = await getDashboardClientBySlug(MINDZY_SLUG)
    if (!client) return null
    const sql = neon(process.env.DATABASE_URL)
    const rows = await sql`
      SELECT id, title, slug, excerpt, category, keywords, cover_image_url, cover_alt,
             reading_time, published_at, created_at, locale, content_html
      FROM blog_articles
      WHERE client_id = ${client.id}
        AND status = 'published'
        AND locale = ${locale}
        AND slug = ${slug}
      LIMIT 1
    `
    const r = rows[0] as
      | {
          title: string
          slug: string
          excerpt: string | null
          category: string | null
          keywords: string[] | null
          cover_image_url: string | null
          reading_time: number | null
          published_at: string | null
          created_at: string
          content_html: string
        }
      | undefined
    if (!r) return null
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt || '',
      category: r.category || 'general',
      author: 'Mindzy',
      date: (r.published_at || r.created_at).slice(0, 10),
      modifiedDate: (r.published_at || r.created_at).slice(0, 10),
      image: r.cover_image_url || '/images/blog/default.svg',
      readingTime: r.reading_time || 5,
      tags: r.keywords || [],
      keywords: (r.keywords || []).join(', '),
      relatedPosts: [],
      content: r.content_html, // HTML, not markdown — renderer must support both
    }
  } catch {
    return null
  }
}
