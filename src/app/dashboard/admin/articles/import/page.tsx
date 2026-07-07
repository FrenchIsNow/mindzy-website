import Link from 'next/link'
import { getDashboardClientById, getDashboardClientBySlug } from '@/lib/db'
import BulkImportForm from '@/components/dashboard/BulkImportForm'

export const dynamic = 'force-dynamic'

export default async function ImportPage({ searchParams }: { searchParams: Promise<{ clientId?: string }> }) {
  const { clientId: clientIdStr } = await searchParams
  const clientIdNum = clientIdStr ? Number(clientIdStr) : NaN

  const client = Number.isFinite(clientIdNum)
    ? await getDashboardClientById(clientIdNum)
    : await getDashboardClientBySlug('mindzy')

  if (!client) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-900">Erreur: client introuvable (clientId={clientIdStr || 'mindzy'})</p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <Link href={`/dashboard/admin/blogs/${client.slug}`} className="text-sm text-violet-600 hover:underline">
        ← Retour à {client.name}
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Importer des articles</h1>
      <p className="mt-1 text-sm text-slate-600">Importez en masse des articles en markdown pour {client.name}</p>

      <BulkImportForm clientId={client.id} />
    </div>
  )
}
