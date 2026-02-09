import type { Metadata } from 'next'
import { Outfit, Sora } from 'next/font/google'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mindzy.me'),
  title: { default: 'Mindzy | Création de sites web professionnels pour entrepreneurs', template: '%s | Mindzy' },
  description: 'Mindzy crée des sites web premium pour entrepreneurs et professionnels. Réservation en ligne, SEO optimisé, design sur-mesure. Livraison en 2 semaines.',
  keywords: [
    'création site web', 'site professionnel', 'agence web', 'web design', 'SEO',
    'site vitrine', 'réservation en ligne', 'site entrepreneur', 'création site internet',
    'website creation', 'professional website', 'web agency',
    'creación sitio web', 'sitio profesional', 'agencia web',
  ],
  authors: [{ name: 'Mindzy', url: 'https://mindzy.me' }],
  creator: 'Mindzy',
  publisher: 'Mindzy',
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'es_ES'],
    url: 'https://mindzy.me',
    siteName: 'Mindzy',
    title: 'Mindzy | Sites web premium pour entrepreneurs',
    description: 'Sites web élégants et performants pour entrepreneurs. Réservation en ligne, SEO optimisé, design sur-mesure.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Mindzy - Création de sites web professionnels' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mindzy | Sites web premium pour entrepreneurs',
    description: 'Sites web élégants et performants pour entrepreneurs. Livraison en 2 semaines.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_ID',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-cream-50">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
