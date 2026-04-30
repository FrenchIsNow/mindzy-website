import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProfileCard } from '@/components/features/ProfileCard'
import { getProfile } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getProfile(slug).catch(() => null)
  if (!p) return { title: 'Profil' }
  return {
    title: p.seo_title || `${p.name} — ${p.company || 'Mindzy'}`,
    description: p.seo_desc || `Connectez-vous avec ${p.name}.`,
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getProfile(slug).catch(() => null)
  if (!p || !p.is_active) notFound()

  return (
    <ProfileCard
      name={p.name}
      title={p.title || ''}
      subtitle={p.subtitle || ''}
      company={p.company || 'Mindzy'}
      initials={p.initials || p.name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}
      links={p.links}
      photoUrl={p.photo_url || undefined}
    />
  )
}
