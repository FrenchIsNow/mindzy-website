'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

type NavItem = { href: string; label: string; icon: React.ReactNode }
type NavGroup = { label: string; items: NavItem[] }

type Props = {
  role: 'admin' | 'editor' | 'viewer' | 'client'
  userName?: string
  clientSlug?: string
}

export default function Sidebar({ role, userName, clientSlug }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    // Clear both the Better Auth (admin) and legacy (client) sessions.
    await authClient.signOut().catch(() => null)
    await fetch('/api/dashboard/logout', { method: 'POST' }).catch(() => null)
    router.push('/dashboard/login')
    router.refresh()
  }

  const adminGroups: NavGroup[] = [
    {
      label: 'Dashboard',
      items: [{ href: '/dashboard/admin', label: 'Vue d\'ensemble', icon: <IconOverview /> }],
    },
    {
      label: 'Ebooks',
      items: [
        { href: '/dashboard/admin/ebooks', label: 'Tous les ebooks', icon: <IconBook /> },
        { href: '/dashboard/admin/ebooks/new', label: 'Nouvel ebook', icon: <IconPlus /> },
      ],
    },
    {
      label: 'Listes d\'attente',
      items: [
        { href: '/dashboard/admin/waiting-lists', label: 'Toutes les listes', icon: <IconList /> },
        { href: '/dashboard/admin/waiting-lists/new', label: 'Nouvelle liste', icon: <IconPlus /> },
      ],
    },
    {
      label: 'Blogs',
      items: [
        { href: '/dashboard/admin/blogs', label: 'Tous les sites', icon: <IconGlobe /> },
        { href: '/dashboard/admin/blogs/new', label: 'Nouvel article', icon: <IconPlus /> },
        { href: '/dashboard/admin/blog-sites/new', label: 'Nouveau site', icon: <IconPlus /> },
        { href: '/dashboard/admin/blog-ideas', label: 'Idées & pipeline', icon: <IconLightbulb /> },
      ],
    },
    {
      label: 'Leads',
      items: [{ href: '/dashboard/admin/leads', label: 'Prospects', icon: <IconUsers /> }],
    },
    {
      label: 'Paramètres',
      items: [
        { href: '/dashboard/admin/settings', label: 'Utilisateurs & RBAC', icon: <IconUser /> },
        { href: '/dashboard/admin/settings/organization', label: 'Organisation', icon: <IconBuilding /> },
        { href: '/dashboard/admin/settings/integrations', label: 'Intégrations', icon: <IconPlug /> },
      ],
    },
  ]

  const clientNav: NavItem[] = [{ href: '/dashboard/client', label: 'Mes articles', icon: <IconDoc /> }]

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const groups = role === 'admin' || role === 'editor' || role === 'viewer' ? adminGroups : []

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">M</div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Mindzy</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto p-3">
        {role === 'client' ? (
          <div className="space-y-0.5">
            {clientNav.map(item => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </div>
        ) : (
          groups.map(group => (
            <div key={group.label}>
              <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{group.label}</div>
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <NavLink key={item.href} item={item} active={isActive(item.href)} />
                ))}
              </div>
            </div>
          ))
        )}
      </nav>

      <div className="border-t border-slate-200 p-3">
        {userName && (
          <div className="mb-2 px-3 py-2 text-xs">
            <div className="font-medium text-slate-900">{userName}</div>
            <div className="text-slate-500 capitalize">{role}</div>
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

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active ? 'bg-violet-50 text-violet-700' : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      <span className={active ? 'text-violet-600' : 'text-slate-400'}>{item.icon}</span>
      {item.label}
    </Link>
  )
}

export function Shell({
  role,
  userName,
  clientSlug,
  children,
}: {
  role: 'admin' | 'editor' | 'viewer' | 'client'
  userName?: string
  clientSlug?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role === 'client' ? 'client' : role} userName={userName} clientSlug={clientSlug} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}

const iconCls = 'h-4 w-4'

function IconOverview() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
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

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}

function IconDoc() {
  return <DocIcon />
}

function IconList() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
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

function IconLightbulb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9.01" y2="6" />
      <line x1="15" y1="6" x2="15.01" y2="6" />
      <line x1="9" y1="10" x2="9.01" y2="10" />
      <line x1="15" y1="10" x2="15.01" y2="10" />
      <line x1="9" y1="14" x2="9.01" y2="14" />
      <line x1="15" y1="14" x2="15.01" y2="14" />
      <line x1="9" y1="18" x2="9.01" y2="18" />
      <line x1="15" y1="18" x2="15.01" y2="18" />
    </svg>
  )
}

function IconPlug() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M12 22v-5" />
      <path d="M15 8V2H9v6" />
      <path d="M18 8v10a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8" />
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
