'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { CatalogEntry, Service } from '@/lib/db'

type UpsellOption = { value: string; label: string; kind: 'service' | 'ebook'; priceCents: number | null }

export default function EbookSettingsForm({
  slug,
  initial,
  ebookOptions = [],
}: {
  slug: string
  initial: CatalogEntry | null
  ebookOptions?: Array<{ slug: string; name: string; priceCents: number | null }>
}) {
  const router = useRouter()
  const [form, setForm] = useState({
    is_free: initial?.is_free ?? true,
    priceEuros: initial?.price_cents ? (initial.price_cents / 100).toFixed(2) : '',
    originalPriceEuros: initial?.original_price_cents ? (initial.original_price_cents / 100).toFixed(2) : '',
    currency: initial?.currency ?? 'eur',
    promo_code: initial?.promo_code ?? '',
    promo_discount_pct: initial?.promo_discount_pct ?? 0,
    promo_expires_at: initial?.promo_expires_at?.slice(0, 10) ?? '',
    is_active: initial?.is_active ?? true,
    has_upsell: initial?.has_upsell ?? false,
    upsell_slug: initial?.upsell_slug ?? '',
    upsellPriceEuros: initial?.upsell_price_cents ? (initial.upsell_price_cents / 100).toFixed(2) : '',
  })
  const [services, setServices] = useState<Service[]>([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/dashboard/services')
      .then(r => r.ok ? r.json() : { services: [] })
      .then(d => setServices((d.services as Service[]).filter(s => s.is_active)))
      .catch(() => setServices([]))
  }, [])

  const upsellOptions: UpsellOption[] = [
    ...services.map(s => ({
      value: `service:${s.slug}`,
      label: `${s.name} — ${(s.price_cents / 100).toFixed(0)} ${s.currency.toUpperCase()}`,
      kind: 'service' as const,
      priceCents: s.price_cents,
    })),
    ...ebookOptions.map(e => ({
      value: `ebook:${e.slug}`,
      label: `Ebook · ${e.name}${e.priceCents ? ` — ${(e.priceCents / 100).toFixed(0)} €` : ''}`,
      kind: 'ebook' as const,
      priceCents: e.priceCents,
    })),
  ]

  // Map existing upsell_slug to a known option if possible.
  const currentUpsellValue =
    upsellOptions.find(o => o.value.endsWith(`:${form.upsell_slug}`))?.value ?? ''

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'

  function onUpsellChange(value: string) {
    const opt = upsellOptions.find(o => o.value === value)
    if (!opt) {
      set('upsell_slug', '')
      return
    }
    const slugOnly = opt.value.split(':')[1]
    set('upsell_slug', slugOnly)
    if (opt.priceCents) set('upsellPriceEuros', (opt.priceCents / 100).toFixed(2))
  }

  async function save() {
    setSaving(true)
    setMsg('')
    const priceCents = form.is_free ? null : Math.round(parseFloat(form.priceEuros || '0') * 100)
    const originalCents = form.is_free ? null : (form.originalPriceEuros ? Math.round(parseFloat(form.originalPriceEuros) * 100) : null)
    const upsellCents = form.has_upsell ? Math.round(parseFloat(form.upsellPriceEuros || '0') * 100) : null

    const res = await fetch(`/api/dashboard/ebooks/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        is_free: form.is_free,
        price_cents: priceCents,
        original_price_cents: originalCents,
        currency: form.currency,
        promo_code: form.promo_code || null,
        promo_discount_pct: form.promo_code ? form.promo_discount_pct || null : null,
        promo_expires_at: form.promo_expires_at ? new Date(form.promo_expires_at).toISOString() : null,
        is_active: form.is_active,
        has_upsell: form.has_upsell,
        upsell_price_cents: upsellCents,
        upsell_slug: form.has_upsell ? form.upsell_slug : null,
      }),
    })
    setSaving(false)
    if (res.ok) {
      setMsg('Enregistré.')
      router.refresh()
    } else {
      const d = await res.json().catch(() => ({}))
      setMsg(d.error || 'Erreur')
    }
  }

  const euroInput = (value: string, onChange: (v: string) => void, placeholder?: string) => (
    <div className="relative">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={e => onChange(e.target.value.replace(',', '.').replace(/[^0-9.]/g, ''))}
        placeholder={placeholder ?? '0.00'}
        className={`${cls} pr-12`}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
        {form.currency.toUpperCase()}
      </span>
    </div>
  )

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
          <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
          <span className="text-sm font-medium">Actif (visible publiquement)</span>
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
          <input type="checkbox" checked={form.is_free} onChange={e => set('is_free', e.target.checked)} />
          <span className="text-sm font-medium">Gratuit (lead magnet)</span>
        </label>
      </div>

      {!form.is_free && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Prix</label>
            {euroInput(form.priceEuros, v => set('priceEuros', v))}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Prix barré</label>
            {euroInput(form.originalPriceEuros, v => set('originalPriceEuros', v))}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Devise</label>
            <select value={form.currency} onChange={e => set('currency', e.target.value)} className={cls}>
              <option value="eur">EUR</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
      )}

      <div className="border-t border-slate-200 pt-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Code promo</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Code</label>
            <input value={form.promo_code} onChange={e => set('promo_code', e.target.value)} placeholder="WELCOME20" className={cls} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Réduction (%)</label>
            <input type="number" min={0} max={100} value={form.promo_discount_pct} onChange={e => set('promo_discount_pct', Number(e.target.value))} className={cls} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Expire le</label>
            <input type="date" value={form.promo_expires_at} onChange={e => set('promo_expires_at', e.target.value)} className={cls} />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <label className="mb-3 flex items-center gap-3">
          <input type="checkbox" checked={form.has_upsell} onChange={e => set('has_upsell', e.target.checked)} />
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Activer l&apos;upsell</span>
        </label>
        {form.has_upsell && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Produit proposé en upsell</label>
              <select
                value={currentUpsellValue}
                onChange={e => onUpsellChange(e.target.value)}
                className={cls}
              >
                <option value="">— Choisir un service ou un ebook —</option>
                {upsellOptions.length === 0 && <option disabled>Aucun service disponible</option>}
                {services.length > 0 && (
                  <optgroup label="Services">
                    {upsellOptions.filter(o => o.kind === 'service').map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </optgroup>
                )}
                {ebookOptions.length > 0 && (
                  <optgroup label="Ebooks">
                    {upsellOptions.filter(o => o.kind === 'ebook').map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </optgroup>
                )}
              </select>
              {form.upsell_slug && (
                <div className="mt-1 text-xs text-slate-500">
                  Pour modifier son prix, éditez le{' '}
                  <Link href={currentUpsellValue.startsWith('service:') ? `/dashboard/admin/services/${form.upsell_slug}` : `/dashboard/admin/ebooks/${form.upsell_slug}`} className="text-violet-600 hover:underline">
                    produit lui-même
                  </Link>
                  .
                </div>
              )}
            </div>

            {/* Pricing breakdown: ebook + upsell = total if accepted */}
            {form.upsell_slug && !form.is_free && form.priceEuros && form.upsellPriceEuros && (
              <div className="rounded-lg border border-violet-200 bg-violet-50/40 p-4 text-sm">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-700">Si l&apos;upsell est accepté</div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Prix ebook</span>
                  <span className="tabular-nums">{Number(form.priceEuros).toFixed(2)} {form.currency.toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>+ Upsell</span>
                  <span className="tabular-nums">{Number(form.upsellPriceEuros).toFixed(2)} {form.currency.toUpperCase()}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-violet-200 pt-2 font-semibold text-violet-900">
                  <span>Total client</span>
                  <span className="tabular-nums">
                    {(Number(form.priceEuros || 0) + Number(form.upsellPriceEuros || 0)).toFixed(2)} {form.currency.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {msg && <div className="text-sm text-emerald-700">{msg}</div>}

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}
