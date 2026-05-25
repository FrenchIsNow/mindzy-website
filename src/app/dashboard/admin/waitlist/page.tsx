import { redirect } from 'next/navigation'
import { getSession } from '@/lib/dashboard-auth'
import { listWaitlistEntries } from '@/lib/db'
import { Shell } from '@/components/dashboard/Sidebar'
import { WaitlistTable } from './WaitlistTable'

export const dynamic = 'force-dynamic'

export default async function WaitlistAdminPage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const entries = await listWaitlistEntries()

  return (
    <Shell role="admin" userName="Admin">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Liste d&apos;attente</h1>
          <p className="mt-1 text-sm text-slate-600">
            Inscriptions au programme AI Employee — page <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/[locale]/waiting-list</code>.
          </p>
        </div>
        <div className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800">
          {entries.length} inscription{entries.length > 1 ? 's' : ''}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucune inscription pour le moment.</p>
        </div>
      ) : (
        <WaitlistTable entries={entries} />
      )}
    </Shell>
  )
}
