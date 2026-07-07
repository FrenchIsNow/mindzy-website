import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-600">
          Administration de la plateforme Mindzy.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/admin/settings/organization"
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm"
        >
          <div className="mb-1 text-sm font-medium text-slate-900">Organisation</div>
          <div className="text-xs text-slate-500">Nom, domaine, intitulé du dashboard.</div>
        </Link>

        <Link
          href="/dashboard/admin/settings/integrations"
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm"
        >
          <div className="mb-1 text-sm font-medium text-slate-900">Intégrations</div>
          <div className="text-xs text-slate-500">Clés API, Stripe, Calendly, email.</div>
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 opacity-60">
          <div className="mb-1 text-sm font-medium text-slate-900">Utilisateurs & RBAC</div>
          <div className="text-xs text-slate-500">Gestion des rôles à venir.</div>
        </div>
      </div>
    </>
  )
}
