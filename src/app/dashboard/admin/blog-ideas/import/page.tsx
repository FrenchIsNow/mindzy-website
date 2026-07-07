import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogIdeasImportPage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/blog-ideas" className="text-sm text-violet-600 hover:underline">
          ← Idées & pipeline
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Importer des idées</h1>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-slate-600">L’import bulk d’idées est en cours de migration vers ce module.</p>
        <Link href="/dashboard/admin/blog-ideas" className="mt-4 inline-block text-violet-600 hover:underline">
          Retour au pipeline →
        </Link>
      </div>
    </>
  )
}
