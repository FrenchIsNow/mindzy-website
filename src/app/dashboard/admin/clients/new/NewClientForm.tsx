'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Form = {
  slug: string
  name: string
  email: string
  domain: string
  personality: string
  targetAudience: string
  siteUrl: string
  locale: string
  frequency: string
  postsPerCycle: number
  ingestUrl: string
  ingestToken: string
  password: string
  personaPrompt: string
}

const EMPTY: Form = {
  slug: '', name: '', email: '', domain: '', personality: '', targetAudience: '',
  siteUrl: '', locale: 'fr', frequency: 'monthly', postsPerCycle: 4,
  ingestUrl: '', ingestToken: '', password: '', personaPrompt: '',
}

export default function NewClientForm() {
  const router = useRouter()
  const [form, setForm] = useState<Form>(EMPTY)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/dashboard/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data.error || 'Erreur')
      return
    }
    router.push(`/dashboard/admin/clients/${form.slug}`)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug (unique)" required>
          <input
            value={form.slug}
            onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="maryse"
            className={inputCls}
            required
          />
        </Field>
        <Field label="Nom affiché" required>
          <input value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} required />
        </Field>
        <Field label="Email (identifiant de connexion)" required>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} required />
        </Field>
        <Field label="Site web">
          <input value={form.siteUrl} onChange={e => set('siteUrl', e.target.value)} placeholder="https://..." className={inputCls} />
        </Field>
        <Field label="Domaine d'activité">
          <input value={form.domain} onChange={e => set('domain', e.target.value)} placeholder="naturopathie, bien-être" className={inputCls} />
        </Field>
        <Field label="Personnalité éditoriale">
          <input value={form.personality} onChange={e => set('personality', e.target.value)} placeholder="chaleureuse, experte" className={inputCls} />
        </Field>
        <Field label="Audience cible" className="col-span-2">
          <input value={form.targetAudience} onChange={e => set('targetAudience', e.target.value)} placeholder="femmes 40-60 ans..." className={inputCls} />
        </Field>
        <Field label="Locale" required>
          <select value={form.locale} onChange={e => set('locale', e.target.value)} className={inputCls}>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </Field>
        <Field label="Fréquence" required>
          <select value={form.frequency} onChange={e => set('frequency', e.target.value)} className={inputCls}>
            <option value="daily">Quotidienne</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuelle</option>
          </select>
        </Field>
        <Field label="Articles par cycle" required>
          <input type="number" min={1} value={form.postsPerCycle} onChange={e => set('postsPerCycle', Number(e.target.value))} className={inputCls} required />
        </Field>
        <Field label="Mot de passe client" required>
          <input type="text" value={form.password} onChange={e => set('password', e.target.value)} className={inputCls} required />
        </Field>
        <Field label="URL d'ingest (site client)" className="col-span-2">
          <input value={form.ingestUrl} onChange={e => set('ingestUrl', e.target.value)} placeholder="https://client.com/api/blog/ingest" className={inputCls} />
        </Field>
        <Field label="Token d'ingest (Bearer)" className="col-span-2">
          <input value={form.ingestToken} onChange={e => set('ingestToken', e.target.value)} className={inputCls} />
        </Field>
        <Field label="Persona prompt (IA)" className="col-span-2">
          <textarea
            value={form.personaPrompt}
            onChange={e => set('personaPrompt', e.target.value)}
            rows={4}
            placeholder="You are a content writer for..."
            className={inputCls}
          />
        </Field>
      </div>

      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? 'Création…' : 'Créer le client'}
        </button>
      </div>
    </form>
  )
}

const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500'

function Field({ label, children, required, className = '' }: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}
