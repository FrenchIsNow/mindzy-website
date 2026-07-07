'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mindzy_lead_profile'

type LeadProfile = {
  email?: string
  firstName?: string
  lastName?: string
  company?: string
  role?: string
  phone?: string
}

function readProfile(): LeadProfile {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? (parsed as LeadProfile) : {}
  } catch {
    return {}
  }
}

function writeProfile(profile: LeadProfile) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // localStorage may be unavailable (private mode, quota); autofill is best-effort.
  }
}

const FIELD_LABELS: Record<string, { label: string; type: string }> = {
  email: { label: 'Email', type: 'email' },
  firstName: { label: 'Prénom', type: 'text' },
  lastName: { label: 'Nom', type: 'text' },
  company: { label: 'Entreprise', type: 'text' },
  role: { label: 'Poste', type: 'text' },
  phone: { label: 'Téléphone', type: 'tel' },
}

export default function DownloadForm({
  slug,
  locale,
  fields = ['email', 'firstName', 'lastName', 'company', 'role'],
}: {
  slug: string
  locale: string
  fields?: string[]
}) {
  const [values, setValues] = useState<LeadProfile>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  // Autofill from localStorage on mount.
  useEffect(() => {
    setValues(readProfile())
  }, [])

  const orderedFields = fields.filter(f => f in FIELD_LABELS)
  const fieldIsRequired = (key: string) => key === 'email' // email is always required; others are admin-controlled and validated server-side.

  const set = <K extends keyof LeadProfile>(k: K, v: LeadProfile[K]) =>
    setValues(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const payload: Record<string, string> = { slug, locale }
    for (const key of orderedFields) {
      payload[key] = (values[key as keyof LeadProfile] ?? '').toString()
    }

    try {
      const res = await fetch('/api/ebooks/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) {
        setStatus('error')
        setError(json.error || 'Une erreur est survenue.')
        return
      }

      setStatus('success')
      writeProfile(values)

      if (json.pdfUrl) {
        const a = document.createElement('a')
        a.href = json.pdfUrl
        a.download = `${slug}.pdf`
        document.body.appendChild(a)
        a.click()
        a.remove()
      }

      if (json.redirectUrl) {
        window.location.href = json.redirectUrl
      }
    } catch {
      setStatus('error')
      setError('Impossible de soumettre le formulaire.')
    }
  }

  const inputCls = 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {orderedFields.includes('firstName') && (
          <div>
            <label htmlFor="firstName" className="mb-1 block text-xs font-medium text-slate-700">Prénom</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required={fieldIsRequired('firstName')}
              value={values.firstName ?? ''}
              onChange={e => set('firstName', e.target.value)}
              className={inputCls}
            />
          </div>
        )}
        {orderedFields.includes('lastName') && (
          <div>
            <label htmlFor="lastName" className="mb-1 block text-xs font-medium text-slate-700">Nom</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required={fieldIsRequired('lastName')}
              value={values.lastName ?? ''}
              onChange={e => set('lastName', e.target.value)}
              className={inputCls}
            />
          </div>
        )}
      </div>
      {orderedFields.includes('email') && (
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-medium text-slate-700">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email ?? ''}
            onChange={e => set('email', e.target.value)}
            className={inputCls}
          />
        </div>
      )}
      {orderedFields.includes('company') && (
        <div>
          <label htmlFor="company" className="mb-1 block text-xs font-medium text-slate-700">Entreprise</label>
          <input
            id="company"
            name="company"
            type="text"
            required={fieldIsRequired('company')}
            value={values.company ?? ''}
            onChange={e => set('company', e.target.value)}
            className={inputCls}
          />
        </div>
      )}
      {orderedFields.includes('role') && (
        <div>
          <label htmlFor="role" className="mb-1 block text-xs font-medium text-slate-700">Poste</label>
          <input
            id="role"
            name="role"
            type="text"
            required={fieldIsRequired('role')}
            value={values.role ?? ''}
            onChange={e => set('role', e.target.value)}
            className={inputCls}
          />
        </div>
      )}
      {orderedFields.includes('phone') && (
        <div>
          <label htmlFor="phone" className="mb-1 block text-xs font-medium text-slate-700">Téléphone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required={fieldIsRequired('phone')}
            value={values.phone ?? ''}
            onChange={e => set('phone', e.target.value)}
            className={inputCls}
          />
        </div>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
      >
        {status === 'loading' ? 'Envoi...' : 'Télécharger le guide'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-emerald-600">Merci ! Le téléchargement démarre...</p>
      )}
      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
