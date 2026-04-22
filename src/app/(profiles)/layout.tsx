import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mindzy.me'),
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
