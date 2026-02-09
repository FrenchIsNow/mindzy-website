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
  image: string
  readingTime: number
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
      image: data.image || '/images/blog/default.svg',
      readingTime: data.readingTime || 5,
      relatedPosts: data.relatedPosts || [],
    } as BlogPostMeta
  })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(locale: Locale, slug: string): BlogPostFull | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug: data.slug || slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    category: data.category || 'general',
    author: data.author || 'Mindzy',
    date: data.date || new Date().toISOString().split('T')[0],
    image: data.image || '/images/blog/default.svg',
    readingTime: data.readingTime || 5,
    relatedPosts: data.relatedPosts || [],
    content,
  }
}

/**
 * Get all unique categories
 */
export function getBlogCategories(locale: Locale): string[] {
  const posts = getBlogPosts(locale)
  const categories = [...new Set(posts.map(p => p.category))]
  return categories.sort()
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
