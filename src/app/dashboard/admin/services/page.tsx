import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { listServices } from '@/lib/db'
import ServicesTable from './ServicesTable'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const services = await listServices()

  return (
    <Shell role="admin" userName="Admin">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Services & produits</h1>
          <p className="mt-1 text-sm text-slate-600">
            Catalogue utilisé pour les upsells d&apos;ebooks.
          </p>
        </div>
        <Link
          href="/dashboard/admin/services/new"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Nouveau service
        </Link>
      </div>
      <ServicesTable initial={services} />
    </Shell>
  )
}
