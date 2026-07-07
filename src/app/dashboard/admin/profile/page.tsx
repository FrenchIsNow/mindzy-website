import ProfileForm from './ProfileForm'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await getSession()
  const user = session?.user

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Mon profil</h1>
        <p className="mt-1 text-sm text-slate-600">Compte et sécurité.</p>
      </div>

      <div className="max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-slate-900">Informations du compte</h2>
            <p className="mt-1 text-xs text-slate-500">Lecture seule — contactez un administrateur pour modifier votre rôle.</p>
          </div>

          {user ? (
            <ProfileForm email={user.email} name={user.name || user.email} />
          ) : (
            <p className="text-sm text-slate-500">Session introuvable. Reconnectez-vous.</p>
          )}
        </div>
      </div>
    </>
  )
}
