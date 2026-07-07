import Link from 'next/link'
import NewClientForm from './NewClientForm'

export const dynamic = 'force-dynamic'

export default async function NewClientPage() {

  return (
<>      <Link href="/dashboard/admin" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Retour
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Ajouter un client</h1>
      <p className="mb-6 text-sm text-slate-600">
        Créez le profil client, puis importez ou générez sa liste d&apos;idées d&apos;articles.
      </p>
      <NewClientForm />
</>  )
}
