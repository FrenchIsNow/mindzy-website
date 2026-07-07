import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function BlogSitesIndex() {
  redirect('/dashboard/admin/blogs')
}
