import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { getBlogPosts, getBlogCategories } from '@/lib/blog'
import { getAllEbookSlugs } from '@/lib/ebooks'

const SITE_URL = 'https://mindzy.me'

const staticPages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/solutions/site-web', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/solutions/branding', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/solutions/formations', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/solutions/sur-mesure', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/pourquoi-nous', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/diagnostic', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/process', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
  { path: '/avis-clients', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
]

const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    for (const locale of locales) {
      const alternates: Record<string, string> = {}
      for (const l of locales) {
        alternates[l] = `${SITE_URL}/${l}${page.path}`
      }
      alternates['x-default'] = `${SITE_URL}/fr${page.path}`

      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: NOW,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: alternates },
      })
    }
  }

  for (const locale of locales) {
    const posts = getBlogPosts(locale)
    for (const post of posts) {
      const alternates: Record<string, string> = {}
      for (const l of locales) {
        alternates[l] = `${SITE_URL}/${l}/blog/${post.slug}`
      }
      alternates['x-default'] = `${SITE_URL}/fr/blog/${post.slug}`

      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages: alternates },
      })
    }
  }

  // Blog category pages
  const frCategories = getBlogCategories('fr')
  for (const { name: category } of frCategories) {
    for (const locale of locales) {
      const alternates: Record<string, string> = {}
      for (const l of locales) {
        alternates[l] = `${SITE_URL}/${l}/blog/category/${category}`
      }
      alternates['x-default'] = `${SITE_URL}/fr/blog/category/${category}`

      entries.push({
        url: `${SITE_URL}/${locale}/blog/category/${category}`,
        lastModified: NOW,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: { languages: alternates },
      })
    }
  }

  // Ebook pages
  const ebookSlugs = getAllEbookSlugs()
  for (const slug of ebookSlugs) {
    for (const locale of locales) {
      const alternates: Record<string, string> = {}
      for (const l of locales) {
        alternates[l] = `${SITE_URL}/${l}/ebooks/${slug}`
      }
      alternates['x-default'] = `${SITE_URL}/fr/ebooks/${slug}`

      entries.push({
        url: `${SITE_URL}/${locale}/ebooks/${slug}`,
        lastModified: NOW,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages: alternates },
      })
    }
  }

  // Ebook listing
  for (const locale of locales) {
    const alternates: Record<string, string> = {}
    for (const l of locales) {
      alternates[l] = `${SITE_URL}/${l}/ebooks`
    }
    alternates['x-default'] = `${SITE_URL}/fr/ebooks`
    entries.push({
      url: `${SITE_URL}/${locale}/ebooks`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: alternates },
    })
  }

  return entries
}
