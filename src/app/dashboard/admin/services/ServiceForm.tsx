'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Service } from '@/lib/db'

type Props =
  | { mode: 'create'; initial?: undefined }
  | { mode: 'edit'; initial: Service }

export default function ServiceForm(props: Props) {
  const router = useRouter()
  const initial = props.initial
  const [form, setForm] = useState({
    slug: initial?.slug ?? '',
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    priceEuros: initial ? (initial.price_cents / 100).toFixed(2) : '',
    currency: initial?.currency ?? 'eur',
    is_active: initial?.is_active ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500'

  async function save() {
    setSaving(true)
    setError('')
    setMsg('')
    const priceCents = Math.round(parseFloat(form.priceEuros || '0') * 100)
    if (Number.isNaN(priceCents) || priceCents < 0) {
      setError('Prix invalide')
      setSaving(false)
      return
    }

    if (props.mode === 'create') {
      const res = await fetch('/api/dashboard/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug,
          name: form.name,
          description: form.description || undefined,
          priceCents,
          currency: form.currency,
        }),
      })
      setSaving(false)
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error || 'Erreur')
        return
      }
      router.push(`/dashboard/admin/services/${form.slug}`)
      router.refresh()
    } else {
      const res = await fetch(`/api/dashboard/services/${form.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          price_cents: priceCents,
          currency: form.currency,
          is_active: form.is_active,
        }),
      })
      setSaving(false)
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error || 'Erreur')
        return
      }
      setMsg('Enregistré.')
      router.refresh()
    }
  }

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            value={form.slug}
            onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            disabled={props.mode === 'edit'}
            className={`${cls} ${props.mode === 'edit' ? 'bg-slate-50 text-slate-500' : ''}`}
            placeholder="audit-seo-premium"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nom <span className="text-red-500">*</span>
          </label>
          <input value={form.name} onChange={e => set('name', e.target.value)} className={cls} placeholder="Audit SEO Premium" required />
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={cls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Prix <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={form.priceEuros}
              onChange={e => set('priceEuros', e.target.value.replace(',', '.').replace(/[^0-9.]/g, ''))}
              placeholder="97.00"
              className={`${cls} pr-12`}
              required
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              {form.currency.toUpperCase()}
            </span>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Devise</label>
          <select value={form.currency} onChange={e => set('currency', e.target.value)} className={cls}>
            <option value="eur">EUR</option>
            <option value="usd">USD</option>
          </select>
        </div>
        {props.mode === 'edit' && (
          <div className="col-span-2">
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
              <span className="text-sm font-medium">Actif (disponible comme upsell)</span>
            </label>
          </div>
        )}
      </div>

      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      {msg && <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{msg}</div>}

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? 'Enregistrement…' : props.mode === 'create' ? 'Créer' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}
