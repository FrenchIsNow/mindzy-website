import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import ServiceForm from '../ServiceForm'

export const dynamic = 'force-dynamic'

export default async function NewServicePage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  return (
    <Shell role="admin" userName="Admin">
      <Link href="/dashboard/admin/services" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Services
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Nouveau service</h1>
      <p className="mb-6 text-sm text-slate-600">Ce service pourra être utilisé comme upsell d&apos;ebook.</p>
      <ServiceForm mode="create" />
    </Shell>
  )
}
