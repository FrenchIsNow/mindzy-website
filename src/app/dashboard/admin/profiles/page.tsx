import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { listProfiles } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProfilesPage() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const profiles = await listProfiles()

  return (
    <Shell role="admin" userName="Admin">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profils</h1>
          <p className="mt-1 text-sm text-slate-600">Cartes de contact style linktree (ex. /cocotier, /martel).</p>
        </div>
        <Link
          href="/dashboard/admin/profiles/new"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Nouveau profil
        </Link>
      </div>

      {profiles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Aucun profil.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {profiles.map(p => {
            const publicUrl = p.slug === 'cocotier' || p.slug === 'martel' ? `/${p.slug}` : `/p/${p.slug}`
            return (
              <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-500">{p.title} · {p.company}</p>
                  </div>
                  {!p.is_active && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Inactif</span>
                  )}
                </div>
                <div className="mb-3 flex flex-wrap gap-1">
                  {p.links.slice(0, 5).map((l, i) => (
                    <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      {l.label}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <a href={publicUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-violet-600">
                    mindzy.me{publicUrl}
                  </a>
                  <Link href={`/dashboard/admin/profiles/${p.slug}`} className="text-violet-600 hover:underline">
                    Éditer →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Shell>
  )
}
