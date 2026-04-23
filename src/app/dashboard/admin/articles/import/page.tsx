import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { getDashboardClientBySlug } from '@/lib/db'
import { Shell } from '@/components/dashboard/Sidebar'
import BulkImportForm from '@/components/dashboard/BulkImportForm'

export const dynamic = 'force-dynamic'

export default async function ImportPage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const mindzy = await getDashboardClientBySlug('mindzy')
  if (!mindzy) {
    return (
      <Shell role="admin" userName="Admin">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-900">Erreur: Client Mindzy non trouvé</p>
        </div>
      </Shell>
    )
  }

  return (
    <Shell role="admin" userName="Admin">
      <div className="mb-6">
        <Link href="/dashboard/admin/clients/mindzy" className="text-sm text-violet-600 hover:underline">
          ← Retour à Mon blog
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Importer des articles</h1>
        <p className="mt-1 text-sm text-slate-600">Importez en masse des articles en markdown pour Mindzy</p>
      </div>

      <BulkImportForm clientId={mindzy.id} />
    </Shell>
  )
}
