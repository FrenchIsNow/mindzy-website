import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import './dashboard.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dashboard',
})

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false, nocache: true, noarchive: true },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="dashboard-root min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
