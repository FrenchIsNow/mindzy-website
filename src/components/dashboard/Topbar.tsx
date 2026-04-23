'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Topbar({ role, clientName }: { role: 'admin' | 'client'; clientName?: string }) {
  const router = useRouter()

  async function logout() {
    await fetch('/api/dashboard/logout', { method: 'POST' })
    router.push('/dashboard/login')
    router.refresh()
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href={role === 'admin' ? '/dashboard/admin' : '/dashboard/client'} className="flex items-center gap-2">
          <span className="text-lg font-semibold">Mindzy</span>
          <span className="text-xs uppercase tracking-wide text-slate-500">{role}</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {clientName && <span className="text-slate-600">{clientName}</span>}
          <button
            onClick={logout}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  )
}
