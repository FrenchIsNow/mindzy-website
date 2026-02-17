import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { getBlogPosts } from '@/lib/blog'

const SITE_URL = 'https://mindzy.me'

const staticPages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/pourquoi-nous', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/process', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/diagnostic', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/onboarding', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
  { path: '/examples-by-profession', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/avis-clients', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/avant-apres', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/legal/mentions', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/legal/cgu', priority: 0.3, changeFrequency: 'yearly' as const },
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
        lastModified: new Date(),
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

  return entries
}
