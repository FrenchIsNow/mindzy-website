import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import NewClientForm from './NewClientForm'

export const dynamic = 'force-dynamic'

export default async function NewClientPage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  return (
    <Shell role="admin" userName="Admin">
      <Link href="/dashboard/admin" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Retour
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Ajouter un client</h1>
      <p className="mb-6 text-sm text-slate-600">
        Créez le profil client, puis importez ou générez sa liste d&apos;idées d&apos;articles.
      </p>
      <NewClientForm />
    </Shell>
  )
}
