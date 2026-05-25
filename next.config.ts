import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    const LOCALES = 'fr|en|es|de|it|pt|ar|zh|ja|ru'
    // Map old (now-deleted) routes → live equivalents on the new business.
    // /ebooks/* is intentionally NOT redirected — it stays as a funnel destination.
    const RETIRED: Array<{ from: string; to: string }> = [
      { from: '/services',              to: '/process' },
      { from: '/pricing',               to: '/process' },
      { from: '/diagnostic',            to: '/process' },
      { from: '/formations',            to: '/ai-employee' },
      { from: '/solutions/site-web',    to: '/process' },
      { from: '/solutions/sur-mesure',  to: '/process' },
      { from: '/solutions/branding',    to: '/' },
      { from: '/solutions/formations',  to: '/ai-employee' },
      { from: '/pourquoi-nous',         to: '/about' },
      { from: '/avis-clients',          to: '/portfolio' },
      { from: '/profil',                to: '/' },
      { from: '/profil/:type',          to: '/' },
      { from: '/funnel/:slug',          to: '/' },
      { from: '/funnel/:slug/checkout', to: '/' },
      { from: '/funnel/:slug/merci',    to: '/' },
    ]

    const rules = RETIRED.flatMap(({ from, to }) => [
      { source: from, destination: `/fr${to}`, permanent: true },
      { source: `/:locale(${LOCALES})${from}`, destination: `/:locale${to}`, permanent: true },
    ])

    // Legacy ebook slug rename — keep ebooks live as a funnel.
    rules.push(
      {
        source: `/:locale(${LOCALES})/ebooks/seo-geo-therapeutes-guide`,
        destination: '/:locale/ebooks/seo-geo-expert-guide',
        permanent: true,
      },
      {
        source: '/ebooks/seo-geo-therapeutes-guide.pdf',
        destination: '/ebooks/seo-geo-expert-guide.pdf',
        permanent: true,
      },
    )

    return rules
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
