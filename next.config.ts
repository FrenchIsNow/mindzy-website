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
    return [
      // Old /services route → /solutions/site-web (with and without locale)
      {
        source: '/services',
        destination: '/fr/solutions/site-web',
        permanent: true,
      },
      {
        source: '/:locale(fr|en|es)/services',
        destination: '/:locale/solutions/site-web',
        permanent: true,
      },
      // Old /formations route → /solutions/formations
      {
        source: '/formations',
        destination: '/fr/solutions/formations',
        permanent: true,
      },
      {
        source: '/:locale(fr|en|es)/formations',
        destination: '/:locale/solutions/formations',
        permanent: true,
      },
      // Old /profil routes → /diagnostic
      {
        source: '/profil',
        destination: '/fr/diagnostic',
        permanent: true,
      },
      {
        source: '/profil/:type',
        destination: '/fr/diagnostic',
        permanent: true,
      },
      {
        source: '/:locale(fr|en|es)/profil',
        destination: '/:locale/diagnostic',
        permanent: true,
      },
      {
        source: '/:locale(fr|en|es)/profil/:type',
        destination: '/:locale/diagnostic',
        permanent: true,
      },
    ]
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
