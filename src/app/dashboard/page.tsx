import { redirect } from 'next/navigation'
import { getSession } from '@/lib/dashboard-auth'
import { getSession as getAdminSession } from '@/lib/auth'

export default async function DashboardRoot() {
  const clientSession = await getSession().catch(() => null)
  if (clientSession) {
    if (clientSession.role === 'client') redirect('/dashboard/client')
    redirect('/dashboard/admin')
  }

  const adminSession = await getAdminSession()
  if (adminSession) redirect('/dashboard/admin')

  redirect('/dashboard/login')
}
