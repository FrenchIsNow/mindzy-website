'use client'

import { useState } from 'react'

const FIELD_LABELS: Record<string, { label: string; required: boolean; type: string }> = {
  email: { label: 'Email', required: true, type: 'email' },
  firstName: { label: 'Prénom', required: true, type: 'text' },
  lastName: { label: 'Nom', required: true, type: 'text' },
  company: { label: 'Entreprise', required: true, type: 'text' },
  role: { label: 'Poste', required: true, type: 'text' },
  phone: { label: 'Téléphone', required: true, type: 'tel' },
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const orderedFields = fields.filter(f => f in FIELD_LABELS)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = { slug, locale, email: data.get('email') as string }
    for (const key of orderedFields) {
      if (key !== 'email') payload[key] = (data.get(key) as string) || ''
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
    } catch (err) {
      setStatus('error')
      setError('Impossible de soumettre le formulaire.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {orderedFields.includes('firstName') && (
          <div>
            <label htmlFor="firstName" className="mb-1 block text-xs font-medium text-slate-700">Prénom</label>
            <input id="firstName" name="firstName" type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
          </div>
        )}
        {orderedFields.includes('lastName') && (
          <div>
            <label htmlFor="lastName" className="mb-1 block text-xs font-medium text-slate-700">Nom</label>
            <input id="lastName" name="lastName" type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
          </div>
        )}
      </div>
      {orderedFields.includes('email') && (
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-medium text-slate-700">Email *</label>
          <input id="email" name="email" type="email" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
        </div>
      )}
      {orderedFields.includes('company') && (
        <div>
          <label htmlFor="company" className="mb-1 block text-xs font-medium text-slate-700">Entreprise</label>
          <input id="company" name="company" type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
        </div>
      )}
      {orderedFields.includes('role') && (
        <div>
          <label htmlFor="role" className="mb-1 block text-xs font-medium text-slate-700">Poste</label>
          <input id="role" name="role" type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
        </div>
      )}
      {orderedFields.includes('phone') && (
        <div>
          <label htmlFor="phone" className="mb-1 block text-xs font-medium text-slate-700">Téléphone</label>
          <input id="phone" name="phone" type="tel" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
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
