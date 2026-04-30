import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { getProfile } from '@/lib/db'
import ProfileForm from '../ProfileForm'

export const dynamic = 'force-dynamic'

export default async function EditProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const { slug } = await params
  const profile = await getProfile(slug)
  if (!profile) notFound()

  const publicUrl = profile.slug === 'cocotier' || profile.slug === 'martel' ? `/${profile.slug}` : `/p/${profile.slug}`
  const fullUrl = `https://mindzy.me${publicUrl}`
  const qrDataUrl = await QRCode.toDataURL(fullUrl, { width: 200, margin: 2, color: { dark: '#4C1D95', light: '#FFFFFF' } })

  return (
    <Shell role="admin" userName="Admin">
      <Link href="/dashboard/admin/profiles" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Profils
      </Link>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
          <a href={publicUrl} target="_blank" rel="noreferrer" className="text-sm text-violet-600 hover:underline">
            mindzy.me{publicUrl} ↗
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-xl border border-violet-200 bg-white p-2 shadow-sm">
            <img src={qrDataUrl} alt={`QR ${profile.name}`} width={120} height={120} />
          </div>
          <a
            href={qrDataUrl}
            download={`qr-${profile.slug}.png`}
            className="text-xs text-slate-500 hover:text-violet-600"
          >
            ↓ Télécharger
          </a>
        </div>
      </div>
      <ProfileForm mode="edit" initial={profile} />
    </Shell>
  )
}
