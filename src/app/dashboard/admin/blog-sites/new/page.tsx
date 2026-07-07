import Link from 'next/link'
import NewBlogSiteForm from './NewBlogSiteForm'

export const dynamic = 'force-dynamic'

export default async function NewBlogSitePage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/blog-sites" className="text-sm text-violet-600 hover:underline">
          ← Blog Sites
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Nouveau blog site</h1>
      </div>
      <NewBlogSiteForm />
    </>
  )
}
