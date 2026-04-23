import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProfileCard } from '@/components/features/ProfileCard'
import { getProfile } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile('martel').catch(() => null)
  return {
    title: p?.seo_title || 'William Martel — Co-Founder @ Mindzy',
    description: p?.seo_desc || 'Connectez-vous avec William Martel, co-fondateur de Mindzy.',
  }
}

export default async function MartelPage() {
  const p = await getProfile('martel').catch(() => null)
  if (!p || !p.is_active) notFound()

  return (
    <ProfileCard
      name={p.name}
      title={p.title || ''}
      subtitle={p.subtitle || ''}
      company={p.company || 'Mindzy'}
      initials={p.initials || p.name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}
      links={p.links}
    />
  )
}
