import { redirect } from 'next/navigation'
import { getSession, type UserRole } from '@/lib/auth'
import { Shell } from '@/components/dashboard/Sidebar'

export const dynamic = 'force-dynamic'

import type { ReactNode } from 'react'

type AdminLayoutProps = {
  children: ReactNode
}

const allowedRoles: UserRole[] = ['admin', 'editor', 'viewer']

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getSession()
  if (!session?.user) {
    redirect('/dashboard/login')
  }

  const role = (session.user.role ?? 'editor') as UserRole
  if (!allowedRoles.includes(role)) {
    redirect('/dashboard/client')
  }

  return (
    <Shell role={role} userName={session.user.name}>
      {children}
    </Shell>
  )
}
