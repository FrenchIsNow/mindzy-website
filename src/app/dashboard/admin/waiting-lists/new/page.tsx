import Link from 'next/link'
import NewWaitingListForm from './NewWaitingListForm'

export const dynamic = 'force-dynamic'

export default async function NewWaitingListPage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/waiting-lists" className="text-sm text-violet-600 hover:underline">
          ← Listes d&apos;attente
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Nouvelle liste d&apos;attente</h1>
      </div>
      <NewWaitingListForm />
    </>
  )
}
