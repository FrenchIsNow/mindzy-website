import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function IntegrationsSettingsPage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/settings" className="text-sm text-violet-600 hover:underline">
          ← Paramètres
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Intégrations</h1>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-slate-600">Les intégrations arrivent dans la phase 10.</p>
      </div>
    </>
  )
}
