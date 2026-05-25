import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { getBlogPosts, getBlogCategories } from '@/lib/blog'

const SITE_URL = 'https://mindzy.me'

// Per-page lastMod — update these when the page content materially changes.
// Search engines distrust pages whose lastMod is always "now".
const staticPages = [
  { path: '',              priority: 1.0, changeFrequency: 'weekly' as const,  lastMod: '2026-05-25' },
  { path: '/process',      priority: 0.8, changeFrequency: 'monthly' as const, lastMod: '2026-05-25' },
  { path: '/portfolio',    priority: 0.8, changeFrequency: 'weekly' as const,  lastMod: '2026-05-25' },
  { path: '/about',        priority: 0.7, changeFrequency: 'monthly' as const, lastMod: '2026-05-25' },
  { path: '/blog',         priority: 0.7, changeFrequency: 'daily' as const,   lastMod: '2026-05-25' },
  { path: '/faq',          priority: 0.6, changeFrequency: 'monthly' as const, lastMod: '2026-05-25' },
  { path: '/ai-employee',  priority: 0.8, changeFrequency: 'monthly' as const, lastMod: '2026-05-25' },
  { path: '/waiting-list', priority: 0.5, changeFrequency: 'monthly' as const, lastMod: '2026-05-25' },
]

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
        lastModified: new Date(page.lastMod),
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
        lastModified: new Date('2026-05-25'),
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: { languages: alternates },
      })
    }
  }

  return entries
}
