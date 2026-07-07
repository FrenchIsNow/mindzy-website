import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogSiteBySlug } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function BlogSiteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const site = await getBlogSiteBySlug(slug)
  if (!site) notFound()

  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/blog-sites" className="text-sm text-violet-600 hover:underline">
          ← Blog Sites
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{site.name}</h1>
        <p className="mt-1 text-sm text-slate-600">/{site.slug}{site.domain ? ` · ${site.domain}` : ''}</p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-slate-600">Gestion détaillée du site en cours de construction.</p>
      </div>
    </>
  )
}
