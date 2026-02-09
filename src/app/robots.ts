import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/legal/'],
      },
    ],
    sitemap: 'https://mindzy.me/sitemap.xml',
    host: 'https://mindzy.me',
  }
}
