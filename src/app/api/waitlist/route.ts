import { NextResponse } from 'next/server'
import { saveWaitlistEntry } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      role,
      company,
      companySize,
      useCase,
      locale,
    } = body ?? {}

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const id = await saveWaitlistEntry({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      role: role ? String(role).trim() : null,
      company: company ? String(company).trim() : null,
      companySize: companySize ? String(companySize).trim() : null,
      useCase: useCase ? String(useCase).trim() : null,
      locale: locale ? String(locale) : 'fr',
      source: 'ai-employee',
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.log('[Waitlist API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
