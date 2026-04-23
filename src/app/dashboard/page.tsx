import { redirect } from 'next/navigation'
import { getSession } from '@/lib/dashboard-auth'

export default async function DashboardRoot() {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role === 'admin') redirect('/dashboard/admin')
  redirect('/dashboard/client')
}
