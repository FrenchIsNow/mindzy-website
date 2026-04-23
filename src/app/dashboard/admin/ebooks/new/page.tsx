import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import NewEbookWizard from './NewEbookWizard'

export const dynamic = 'force-dynamic'

export default async function NewEbookPage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  return (
    <Shell role="admin" userName="Admin">
      <Link href="/dashboard/admin/ebooks" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Ebooks
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Nouveau ebook gratuit</h1>
      <p className="mb-6 text-sm text-slate-600">
        Remplissez le contenu FR, uploadez le PDF et la couverture. Vous pourrez ensuite traduire en EN/ES en un clic.
      </p>
      <NewEbookWizard />
    </Shell>
  )
}
