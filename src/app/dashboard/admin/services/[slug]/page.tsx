import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { getServiceBySlug } from '@/lib/db'
import ServiceForm from '../ServiceForm'

export const dynamic = 'force-dynamic'

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <Shell role="admin" userName="Admin">
      <Link href="/dashboard/admin/services" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Services
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">{service.name}</h1>
      <p className="mb-6 text-sm text-slate-600">/{service.slug}</p>
      <ServiceForm mode="edit" initial={service} />
    </Shell>
  )
}
