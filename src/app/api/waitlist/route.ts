import { NextResponse } from 'next/server'
import { saveWaitlistEntry, getWaitingListBySlug, createLead } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      role,
      company,
      phone,
      locale,
      waitingListSlug,
    } = body ?? {}

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    let waitingListId: number | null = null
    let listSource = 'waitlist'
    if (typeof waitingListSlug === 'string' && waitingListSlug) {
      const list = await getWaitingListBySlug(waitingListSlug)
      if (list) {
        waitingListId = list.id
        listSource = `waitlist:${list.slug}`
      }
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const id = await saveWaitlistEntry({
      firstName: firstName ? String(firstName).trim() : '',
      lastName: lastName ? String(lastName).trim() : '',
      email: normalizedEmail,
      role: role ? String(role).trim() : null,
      company: company ? String(company).trim() : null,
      companySize: null,
      useCase: null,
      locale: locale ? String(locale) : 'fr',
      source: listSource,
      waitingListId,
    })

    // Dual-write to unified leads (best-effort; existing email does not error)
    try {
      await createLead({
        email: normalizedEmail,
        first_name: firstName ? String(firstName).trim() : null,
        last_name: lastName ? String(lastName).trim() : null,
        company: company ? String(company).trim() : null,
        role: role ? String(role).trim() : null,
        phone: phone ? String(phone).trim() : null,
        locale: locale ? String(locale) : 'fr',
        source: listSource,
        source_detail: { waiting_list_id: waitingListId, waitlist_entry_id: id },
        gdpr_consent: true,
      })
    } catch (leadErr) {
      console.log('[Waitlist API] lead dual-write skipped:', leadErr)
    }

    const redirectUrl = waitingListId
      ? (await getWaitingListBySlug(waitingListSlug))?.redirect_url ?? null
      : null
    return NextResponse.json({ success: true, id, redirectUrl })
  } catch (error) {
    console.log('[Waitlist API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
