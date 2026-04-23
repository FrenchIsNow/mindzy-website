'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type NavItem = { href: string; label: string; icon: React.ReactNode }

type Props = {
  role: 'admin' | 'client'
  userName?: string
  clientSlug?: string
}

export default function Sidebar({ role, userName, clientSlug }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/dashboard/logout', { method: 'POST' })
    router.push('/dashboard/login')
    router.refresh()
  }

  const adminNav: NavItem[] = [
    { href: '/dashboard/admin/clients/mindzy', label: 'Mon blog', icon: <IconSparkle /> },
    { href: '/dashboard/admin', label: 'Clients', icon: <IconUsers /> },
    { href: '/dashboard/admin/ebooks', label: 'Ebooks', icon: <IconBook /> },
    { href: '/dashboard/admin/services', label: 'Services', icon: <IconTag /> },
    { href: '/dashboard/admin/profiles', label: 'Profils', icon: <IconUser /> },
    { href: '/dashboard/admin/articles/import', label: 'Importer articles', icon: <IconUpload /> },
  ]
  const clientNav: NavItem[] = [
    { href: '/dashboard/client', label: 'Mes articles', icon: <IconDoc /> },
  ]

  const nav = role === 'admin' ? adminNav : clientNav
  const isActive = (href: string) => {
    if (href === '/dashboard/admin') {
      return pathname === '/dashboard/admin' || pathname.startsWith('/dashboard/admin/clients/')
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">M</div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Mindzy</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {nav.map(item => {
          const active = isActive(item.href)
          // For admin, highlight "Clients" only on the index/non-mindzy client pages.
          const realActive =
            role === 'admin' && item.href === '/dashboard/admin'
              ? pathname === '/dashboard/admin' ||
                (pathname.startsWith('/dashboard/admin/clients/') && !pathname.startsWith('/dashboard/admin/clients/mindzy'))
              : item.href === '/dashboard/admin/clients/mindzy'
                ? pathname.startsWith('/dashboard/admin/clients/mindzy')
                : active

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                realActive
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className={realActive ? 'text-violet-600' : 'text-slate-400'}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}

        {role === 'admin' && (
          <Link
            href="/dashboard/admin/clients/new"
            className="mt-2 flex items-center gap-2.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:border-violet-400 hover:text-violet-700"
          >
            <IconPlus />
            Nouveau client
          </Link>
        )}
      </nav>

      <div className="border-t border-slate-200 p-3">
        {userName && (
          <div className="mb-2 px-3 py-2 text-xs">
            <div className="font-medium text-slate-900">{userName}</div>
            <div className="text-slate-500">{role === 'admin' ? 'Administrateur' : clientSlug ? `/${clientSlug}` : 'Client'}</div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <IconLogout />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

export function Shell({
  role,
  userName,
  clientSlug,
  children,
}: {
  role: 'admin' | 'client'
  userName?: string
  clientSlug?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} userName={userName} clientSlug={clientSlug} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}

// ─── Icons ──────────────────────────────────────────────────────────────────

const iconCls = 'h-4 w-4'

function IconSparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
function IconTag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}
