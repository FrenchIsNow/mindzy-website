import type { Metadata } from 'next'
import './globals.css'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mindzy | Sites web premium pour entrepreneurs',
    description: 'Sites web élégants et performants pour entrepreneurs. Livraison en 2 semaines.',
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

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
