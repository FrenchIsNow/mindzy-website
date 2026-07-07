import Link from 'next/link'
import ProfileForm from '../ProfileForm'

export const dynamic = 'force-dynamic'

export default async function NewProfilePage() {

  return (
<>      <Link href="/dashboard/admin/profiles" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Profils
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Nouveau profil</h1>
      <p className="mb-6 text-sm text-slate-600">La page publique sera disponible à <code className="rounded bg-slate-100 px-1.5 py-0.5">/p/votre-slug</code>.</p>
      <ProfileForm mode="create" />
</>  )
}
