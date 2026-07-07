import Link from 'next/link'
import {
  listDashboardClients,
  countArticlesForClient,
  listWaitingLists,
  listLeads,
  listBlogSites,
  getAllCatalogEntries,
  listProfiles,
} from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const [clients, waitingLists, leads, sites, ebooks, profiles] = await Promise.all([
    listDashboardClients(),
    listWaitingLists(),
    listLeads(1),
    listBlogSites(),
    getAllCatalogEntries(),
    listProfiles(),
  ])

  const totalPublished = (
    await Promise.all(clients.map(c => countArticlesForClient(c.id)))
  ).reduce((sum, counts) => sum + counts.published, 0)

  const modules = [
    {
      href: '/dashboard/admin/ebooks',
      label: 'Lead magnets',
      description: `${ebooks.length} publication${ebooks.length > 1 ? 's' : ''}`,
    },
    {
      href: '/dashboard/admin/waiting-lists',
      label: 'Listes d\'attente',
      description: `${waitingLists.length} liste${waitingLists.length > 1 ? 's' : ''}`,
    },
    {
      href: '/dashboard/admin/blogs',
      label: 'Blogs',
      description: `${sites.length} site${sites.length > 1 ? 's' : ''} · ${totalPublished} publié${totalPublished > 1 ? 's' : ''}`,
    },
    {
      href: '/dashboard/admin/leads',
      label: 'Prospects',
      description: `${leads.length} lead${leads.length > 1 ? 's' : ''}`,
    },
    {
      href: '/dashboard/admin/profiles',
      label: 'Profils',
      description: `${profiles.length} carte${profiles.length > 1 ? 's' : ''} de contact`,
    },
    {
      href: '/dashboard/admin/settings',
      label: 'Paramètres',
      description: 'RBAC, organisation, intégrations',
    },
  ]

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Vue d'ensemble</h1>
        <p className="mt-1 text-sm text-slate-600">Modules et activité de la plateforme.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map(module => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm"
          >
            <div className="mb-1 text-sm font-medium text-slate-900">{module.label}</div>
            <div className="text-xs text-slate-500">{module.description}</div>
          </Link>
        ))}
      </div>
    </>
  )
}
