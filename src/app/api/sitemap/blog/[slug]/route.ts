import { getBlogSiteBySlug, getDashboardClientBySlug, listBlogArticlesForClient } from '@/lib/db'

export const runtime = 'nodejs'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const site = await getBlogSiteBySlug(slug)
  if (!site) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><error>Site not found</error>', {
      status: 404,
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  }

  // blog_sites has no client_id yet; mirror via dashboard_clients.slug
  const mirror = await getDashboardClientBySlug(site.slug)
  const clientId = mirror?.id ?? null
  if (!clientId) {
    return xmlResponse(buildUrlset(site.domain, []))
  }

  const articles = await listBlogArticlesForClient(clientId)
  const published = articles.filter(a => a.status === 'published')

  return xmlResponse(buildUrlset(site.domain, published))
}

function buildUrlset(domain: string | null, articles: Array<{ locale: string; slug: string; updated_at?: string; created_at: string }>) {
  const base = `https://${domain || process.env.NEXT_PUBLIC_SITE_URL || 'mindzy.me'}`
  const urls = articles
    .map(a => {
      const loc = `${base}/${a.locale}/${a.slug}`
      const lastmod = (a.updated_at || a.created_at || '').slice(0, 10)
      return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${escapeXml(lastmod)}</lastmod></url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function xmlResponse(body: string) {
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
