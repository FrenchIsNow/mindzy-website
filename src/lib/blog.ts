import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Locale } from './i18n'

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  modifiedDate?: string
  image: string
  readingTime: number
  wordCount?: number
  tags?: string[]
  keywords?: string
  relatedPosts?: string[]
}

export interface BlogPostFull extends BlogPostMeta {
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

/**
 * Get all blog posts for a given locale
 */
export function getBlogPosts(locale: Locale): BlogPostMeta[] {
  const dir = path.join(BLOG_DIR, locale)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: data.slug || filename.replace('.md', ''),
      title: data.title || '',
      excerpt: data.excerpt || '',
      category: data.category || 'general',
      author: data.author || 'Mindzy',
      date: data.date || new Date().toISOString().split('T')[0],
      modifiedDate: data.modifiedDate || data.date || undefined,
      image: data.image || '/images/blog/default.svg',
      readingTime: data.readingTime || 5,
      wordCount: data.wordCount || undefined,
      tags: data.tags || [],
      keywords: data.keywords || '',
      relatedPosts: data.relatedPosts || [],
    } as BlogPostMeta
  })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single blog post by slug.
 * First tries an exact filename match ({slug}.md), then falls back to scanning
 * frontmatter slugs — needed when the filename and the slug: field differ.
 */
export function getBlogPost(locale: Locale, slug: string): BlogPostFull | null {
  const dir = path.join(BLOG_DIR, locale)

  // Fast path: filename matches slug exactly
  const directPath = path.join(dir, `${slug}.md`)
  let resolvedPath = fs.existsSync(directPath) ? directPath : null

  // Slow path: scan all files for a matching frontmatter slug
  if (!resolvedPath && fs.existsSync(dir)) {
    for (const filename of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
      const fp = path.join(dir, filename)
      const raw = fs.readFileSync(fp, 'utf-8')
      const { data } = matter(raw)
      if ((data.slug || filename.replace('.md', '')) === slug) {
        resolvedPath = fp
        break
      }
    }
  }

  if (!resolvedPath) return null

  const fileContent = fs.readFileSync(resolvedPath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug: data.slug || slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    category: data.category || 'general',
    author: data.author || 'Mindzy',
    date: data.date || new Date().toISOString().split('T')[0],
    modifiedDate: data.modifiedDate || data.date || undefined,
    image: data.image || '/images/blog/default.svg',
    readingTime: data.readingTime || 5,
    wordCount: data.wordCount || undefined,
    tags: data.tags || [],
    keywords: data.keywords || '',
    relatedPosts: data.relatedPosts || [],
    content,
  }
}

/**
 * Get all unique categories with post counts
 */
export function getBlogCategories(locale: Locale): { name: string; count: number }[] {
  const posts = getBlogPosts(locale)
  const counts: Record<string, number> = {}
  for (const post of posts) {
    counts[post.category] = (counts[post.category] || 0) + 1
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Get posts filtered by category
 */
export function getBlogPostsByCategory(locale: Locale, category: string): BlogPostMeta[] {
  return getBlogPosts(locale).filter(p => p.category === category)
}

/**
 * Get all unique tags across all posts
 */
export function getBlogTags(locale: Locale): string[] {
  const posts = getBlogPosts(locale)
  const tags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags || []) tags.add(tag)
  }
  return [...tags].sort()
}

/**
 * Get related posts based on relatedPosts array
 */
export function getRelatedPosts(locale: Locale, currentSlug: string, limit = 3): BlogPostMeta[] {
  const currentPost = getBlogPost(locale, currentSlug)
  if (!currentPost || !currentPost.relatedPosts?.length) {
    // Fallback: get posts from same category
    const allPosts = getBlogPosts(locale)
    return allPosts
      .filter(p => p.slug !== currentSlug && p.category === currentPost?.category)
      .slice(0, limit)
  }

  const allPosts = getBlogPosts(locale)
  const related = currentPost.relatedPosts
    .map(slug => allPosts.find(p => p.slug === slug))
    .filter((p): p is BlogPostMeta => p !== undefined)
    .slice(0, limit)

  return related
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): { locale: Locale; slug: string }[] {
  const locales: Locale[] = ['fr', 'en', 'es']
  const slugs: { locale: Locale; slug: string }[] = []

  for (const locale of locales) {
    const posts = getBlogPosts(locale)
    for (const post of posts) {
      slugs.push({ locale, slug: post.slug })
    }
  }

  return slugs
}
