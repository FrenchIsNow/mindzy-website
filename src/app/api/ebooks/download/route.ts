import { NextResponse } from 'next/server'
import { createEbookLead, getCatalogEntry, getEbookContent } from '@/lib/db'
import { getEbook } from '@/lib/ebooks'
import { defaultLocale } from '@/lib/i18n'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const DEFAULT_FORM_FIELDS = ['email', 'firstName', 'lastName', 'company', 'role']

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const slug = typeof body.slug === 'string' ? body.slug.trim() : ''
  const locale = typeof body.locale === 'string' ? body.locale.trim() : defaultLocale
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : undefined
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : undefined
  const company = typeof body.company === 'string' ? body.company.trim() : undefined
  const role = typeof body.role === 'string' ? body.role.trim() : undefined
  const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined

  if (!slug || !email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Slug et email valides requis.' }, { status: 400 })
  }

  const staticEbook = getEbook(slug)
  const dbContent = !staticEbook ? await getEbookContent(slug, locale) : null
  const entry = await getCatalogEntry(slug)

  if (!staticEbook && !dbContent) {
    return NextResponse.json({ error: 'Ebook introuvable.' }, { status: 404 })
  }

  const formFields = Array.isArray(entry?.form_fields)
    ? (entry.form_fields as string[])
    : DEFAULT_FORM_FIELDS

  const missing: string[] = []
  if (formFields.includes('firstName') && !firstName) missing.push('firstName')
  if (formFields.includes('lastName') && !lastName) missing.push('lastName')
  if (formFields.includes('company') && !company) missing.push('company')
  if (formFields.includes('role') && !role) missing.push('role')
  if (formFields.includes('phone') && !phone) missing.push('phone')
  if (missing.length > 0) {
    return NextResponse.json({ error: `Champs requis manquants: ${missing.join(', ')}` }, { status: 400 })
  }

  try {
    await createEbookLead({
      email,
      firstName,
      lastName,
      company,
      role,
      phone,
      ebookSlug: slug,
      locale,
    })
  } catch (err) {
    console.error('Failed to save ebook lead', err)
    return NextResponse.json({ error: "Impossible de sauvegarder l'inscription." }, { status: 500 })
  }

  const redirectUrl =
    entry?.thank_you_redirect_url ||
    entry?.calendly_url ||
    staticEbook?.ctaLink ||
    null

  const pdfUrl = staticEbook
    ? `/ebooks/${staticEbook.pdfByLocale?.[locale as import('@/lib/i18n').Locale] || staticEbook.pdfByLocale?.[defaultLocale] || ''}`
    : dbContent?.pdf_url || null

  return NextResponse.json({
    ok: true,
    redirectUrl,
    pdfUrl,
  })
}
