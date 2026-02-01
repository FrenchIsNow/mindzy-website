import type { Metadata } from 'next'
import { Outfit, Sora } from 'next/font/google'
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
  title: { default: 'Mindzy | Création de sites web professionnels', template: '%s | Mindzy' },
  description: 'Mindzy crée des sites web élégants et performants pour les entrepreneurs et professionnels. Réservation en ligne, SEO optimisé, design raffiné.',
  metadataBase: new URL('https://mindzy.me'),
  keywords: ['création site web', 'site professionnel', 'agence web', 'web design', 'SEO', 'site vitrine'],
  authors: [{ name: 'Mindzy' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mindzy.me',
    siteName: 'Mindzy',
    title: 'Mindzy | Création de sites web professionnels',
    description: 'Sites web élégants pour entrepreneurs et professionnels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mindzy | Création de sites web professionnels',
    description: 'Sites web élégants pour entrepreneurs et professionnels',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-cream-50">{children}</body>
    </html>
  )
}
