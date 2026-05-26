import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { deleteWaitlistEntry } from '@/lib/db'

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const num = Number(id)
  if (!Number.isFinite(num)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  await deleteWaitlistEntry(num)
  return NextResponse.json({ success: true })
}
