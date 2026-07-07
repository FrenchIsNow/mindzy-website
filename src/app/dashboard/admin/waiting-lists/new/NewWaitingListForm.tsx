'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ALL_FORM_FIELDS = [
  { key: 'email', label: 'Email' },
  { key: 'firstName', label: 'Prénom' },
  { key: 'lastName', label: 'Nom' },
  { key: 'company', label: 'Entreprise' },
  { key: 'role', label: 'Poste' },
  { key: 'phone', label: 'Téléphone' },
] as const

export default function NewWaitingListForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    locale: 'fr',
    status: 'active' as 'active' | 'paused' | 'archived',
    heroTitle: '',
    heroSubtitle: '',
    benefits: '',
    formFields: ['email', 'firstName', 'lastName', 'company'] as string[],
    thankYouMessage: '',
    redirectUrl: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))

  function toggleField(key: string) {
    set('formFields', form.formFields.includes(key) ? form.formFields.filter(k => k !== key) : [...form.formFields, key])
  }

  const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none'
  const labelCls = 'mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500'

  function slugify(input: string) {
    return input.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 80)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const slug = form.slug ? slugify(form.slug) : slugify(form.name)
    if (!slug) {
      setError('Slug ou nom requis')
      return
    }
    if (!form.name.trim()) {
      setError('Nom requis')
      return
    }
    setSaving(true)
    const res = await fetch('/api/dashboard/waiting-lists', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        slug,
        name: form.name.trim(),
        description: form.description || null,
        locale: form.locale,
        status: form.status,
        hero_title: form.heroTitle || null,
        hero_subtitle: form.heroSubtitle || null,
        benefits: form.benefits ? form.benefits.split('\n').map(s => s.trim()).filter(Boolean) : null,
        form_fields: form.formFields,
        thank_you_message: form.thankYouMessage || null,
        redirect_url: form.redirectUrl || null,
      }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Échec de la création')
      setSaving(false)
      return
    }
    const { list } = await res.json()
    router.push(`/dashboard/admin/waiting-lists/${list.slug}`)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6">
      {error && <div className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Identité</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Nom interne</label>
            <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Slug (URL)</label>
            <input className={inputCls} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="ex: ai-employee-launch" />
          </div>
          <div>
            <label className={labelCls}>Locale</label>
            <select className={inputCls} value={form.locale} onChange={e => set('locale', e.target.value)}>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Statut</label>
            <select className={inputCls} value={form.status} onChange={e => set('status', e.target.value as typeof form.status)}>
              <option value="active">Active</option>
              <option value="paused">En pause</option>
              <option value="archived">Archivée</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls}>Description (interne)</label>
          <textarea className={inputCls} rows={2} value={form.description} onChange={e => set('description', e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Hero (page publique)</h2>
        <div>
          <label className={labelCls}>Titre principal</label>
          <input className={inputCls} value={form.heroTitle} onChange={e => set('heroTitle', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Sous-titre</label>
          <textarea className={inputCls} rows={2} value={form.heroSubtitle} onChange={e => set('heroSubtitle', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Bénéfices (1 par ligne)</label>
          <textarea className={inputCls} rows={3} value={form.benefits} onChange={e => set('benefits', e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Formulaire & redirection</h2>
        <div>
          <label className={labelCls}>Champs à collecter</label>
          <div className="flex flex-wrap gap-2">
            {ALL_FORM_FIELDS.map(f => (
              <label key={f.key} className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs">
                <input type="checkbox" checked={form.formFields.includes(f.key)} onChange={() => toggleField(f.key)} />
                {f.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>Message de remerciement</label>
          <textarea className={inputCls} rows={2} value={form.thankYouMessage} onChange={e => set('thankYouMessage', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>URL de redirection post-inscription</label>
          <input className={inputCls} value={form.redirectUrl} onChange={e => set('redirectUrl', e.target.value)} placeholder="https://calendly.com/..." />
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Annuler</button>
        <button type="submit" disabled={saving} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
          {saving ? 'Création…' : 'Créer la liste'}
        </button>
      </div>
    </form>
  )
}
