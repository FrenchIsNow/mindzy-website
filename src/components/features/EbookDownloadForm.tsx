'use client'

import { useState } from 'react'
import Link from 'next/link'

interface EbookDownloadFormProps {
  slug: string
  locale: string
  ctaLink?: string
  labels: {
    badge: string
    title: string
    subtitle: string
    namePlaceholder: string
    nameLabel: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    submitBtn: string
    gdpr: string
    trustPdf: string
    trustInstant: string
    trustFree: string
    successTitle: string
    successBody: string
    successCta: string
    nameError: string
    emailError: string
  }
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function EbookDownloadForm({ slug, locale, ctaLink, labels }: EbookDownloadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validName = !!name.trim()
    const validEmail = isValidEmail(email.trim())
    setNameErr(!validName)
    setEmailErr(!validEmail)
    if (!validName || !validEmail) return

    setLoading(true)
    // Submit to leads API
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileType: 'ebook',
          fullName: name.trim(),
          email: email.trim(),
          phone: phone.trim() || 'N/A',
          message: `Téléchargement ebook: ${slug}`,
          sheetName: 'EBOOK_DOWNLOADS',
          locale,
          ebookSlug: slug,
          company: company.trim(),
          recaptchaToken: 'ebook-download',
        }),
      })
    } catch {
      // Silent fail — still show success
    }
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="text-center py-4">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-sage-50 border-2 border-sage-400 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-anthracite mb-3">{labels.successTitle}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: labels.successBody }}
        />
        {ctaLink && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-violet text-violet font-semibold text-sm hover:bg-violet hover:text-white transition-all duration-200 cursor-pointer"
          >
            {labels.successCta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Live badge */}
      <div className="inline-flex items-center gap-2 bg-sage-50 border border-sage-200 text-sage-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
        {labels.badge}
      </div>

      <h2 className="font-display text-xl font-semibold text-anthracite leading-snug mb-2">{labels.title}</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{labels.subtitle}</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">{labels.nameLabel} *</label>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); if (nameErr) setNameErr(false) }}
            placeholder={labels.namePlaceholder}
            autoComplete="name"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-anthracite placeholder-gray-300 bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-violet/20 focus:border-violet ${
              nameErr ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200'
            }`}
          />
          {nameErr && <p className="text-xs text-rose-500 mt-1">{labels.nameError}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">{labels.emailLabel} *</label>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr(false) }}
            placeholder={labels.emailPlaceholder}
            autoComplete="email"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-anthracite placeholder-gray-300 bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-violet/20 focus:border-violet ${
              emailErr ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200'
            }`}
          />
          {emailErr && <p className="text-xs text-rose-500 mt-1">{labels.emailError}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            {labels.phoneLabel} <span className="text-gray-400 font-normal">(optionnel)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder={labels.phonePlaceholder}
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-anthracite placeholder-gray-300 bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-violet/20 focus:border-violet"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            {labels.companyLabel} <span className="text-gray-400 font-normal">(optionnel)</span>
          </label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder={labels.companyPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-anthracite placeholder-gray-300 bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-violet/20 focus:border-violet"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 bg-violet text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Envoi en cours…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {labels.submitBtn}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </button>
      </form>

      {/* GDPR */}
      <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">{labels.gdpr}</p>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
        {[labels.trustPdf, labels.trustInstant, labels.trustFree].map(badge => (
          <span key={badge} className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </>
  )
}
