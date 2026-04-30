'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile, ProfileLink } from '@/lib/db'

type Props =
  | { mode: 'create'; initial?: undefined }
  | { mode: 'edit'; initial: Profile }

const PLATFORM_PRESETS: Record<string, { label: string; color: string; icon: ProfileLink['icon']; hrefFormat: string }> = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', icon: 'whatsapp', hrefFormat: 'https://wa.me/' },
  linkedin: { label: 'LinkedIn', color: '#0A66C2', icon: 'linkedin', hrefFormat: 'https://linkedin.com/in/' },
  wechat:   { label: 'WeChat',   color: '#07C160', icon: 'wechat',   hrefFormat: 'weixin://dl/chat?' },
  email:    { label: 'Email',    color: '#A78BFA', icon: 'email',    hrefFormat: 'mailto:' },
  phone:    { label: 'Téléphone', color: '#94A3B8', icon: 'phone',   hrefFormat: 'tel:' },
  instagram:{ label: 'Instagram', color: '#E1306C', icon: 'instagram', hrefFormat: 'https://instagram.com/' },
  web:      { label: 'Site web', color: '#7C3AED',  icon: 'web',     hrefFormat: 'https://' },
}

export default function ProfileForm(props: Props) {
  const router = useRouter()
  const initial = props.initial
  const [form, setForm] = useState({
    slug: initial?.slug ?? '',
    name: initial?.name ?? '',
    title: initial?.title ?? '',
    subtitle: initial?.subtitle ?? '',
    company: initial?.company ?? 'Mindzy',
    initials: initial?.initials ?? '',
    seoTitle: initial?.seo_title ?? '',
    seoDesc: initial?.seo_desc ?? '',
    isActive: initial?.is_active ?? true,
  })
  const [photoUrl, setPhotoUrl] = useState<string>(initial?.photo_url ?? '')
  const [photoLoading, setPhotoLoading] = useState(false)
  const [links, setLinks] = useState<ProfileLink[]>(initial?.links ?? [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500'

  function handlePhotoFile(file: File) {
    if (!file.type.startsWith('image/')) { setError('Fichier image requis (JPG, PNG, WebP)'); return }
    if (file.size > 10 * 1024 * 1024) { setError('Image trop lourde (max 10 Mo)'); return }
    setPhotoLoading(true)
    setError('')
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const MAX = 400
        const scale = Math.min(1, MAX / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        setPhotoUrl(canvas.toDataURL('image/jpeg', 0.85))
        setPhotoLoading(false)
      }
      img.onerror = () => { setError('Impossible de lire l\'image'); setPhotoLoading(false) }
      img.src = e.target?.result as string
    }
    reader.onerror = () => { setError('Erreur de lecture du fichier'); setPhotoLoading(false) }
    reader.readAsDataURL(file)
  }

  function addLink(platform: keyof typeof PLATFORM_PRESETS) {
    const preset = PLATFORM_PRESETS[platform]
    setLinks(prev => [
      ...prev,
      { platform, label: preset.label, href: preset.hrefFormat, icon: preset.icon, color: preset.color },
    ])
  }

  function updateLink(i: number, patch: Partial<ProfileLink>) {
    setLinks(prev => {
      const next = [...prev]
      next[i] = { ...next[i], ...patch }
      return next
    })
  }

  function removeLink(i: number) {
    setLinks(prev => prev.filter((_, j) => j !== i))
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= links.length) return
    setLinks(prev => {
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  async function save() {
    setError('')
    setMsg('')
    if (!form.slug || !form.name) {
      setError('Slug et nom requis')
      return
    }
    setSaving(true)

    if (props.mode === 'create') {
      const res = await fetch('/api/dashboard/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, links }),
      })
      setSaving(false)
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error || 'Erreur')
        return
      }
      router.push(`/dashboard/admin/profiles/${form.slug}`)
      router.refresh()
    } else {
      const res = await fetch(`/api/dashboard/profiles/${form.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          title: form.title,
          subtitle: form.subtitle,
          company: form.company,
          initials: form.initials,
          photo_url: photoUrl || null,
          seo_title: form.seoTitle,
          seo_desc: form.seoDesc,
          is_active: form.isActive,
          links,
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

  async function remove() {
    if (props.mode !== 'edit') return
    if (!confirm(`Supprimer "${form.name}" ?`)) return
    const res = await fetch(`/api/dashboard/profiles/${form.slug}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/dashboard/admin/profiles')
      router.refresh()
    }
  }

  const publicUrl = form.slug === 'cocotier' || form.slug === 'martel' ? `/${form.slug}` : `/p/${form.slug}`

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Identité</h3>

        {/* Photo upload */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative shrink-0">
            {photoUrl ? (
              <img src={photoUrl} alt="Photo" className="h-20 w-20 rounded-full object-cover border-2 border-violet-200" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-violet-100 flex items-center justify-center text-2xl font-bold text-violet-400 border-2 border-dashed border-violet-300">
                {form.initials || '?'}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {photoLoading ? 'Traitement…' : 'Choisir une photo'}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={photoLoading}
                onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoFile(f) }}
              />
            </label>
            {photoUrl && (
              <button
                onClick={() => setPhotoUrl('')}
                className="text-xs text-red-500 hover:underline text-left"
              >
                Supprimer la photo
              </button>
            )}
            <p className="text-xs text-slate-400">JPG, PNG, WebP — redimensionné 400px, sauvegardé avec le profil</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" required>
            <input
              value={form.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              disabled={props.mode === 'edit'}
              className={`${cls} ${props.mode === 'edit' ? 'bg-slate-50 text-slate-500' : ''}`}
              required
            />
            {form.slug && (
              <p className="mt-1 text-xs text-slate-500">URL publique : <code className="rounded bg-slate-100 px-1.5 py-0.5">{publicUrl}</code></p>
            )}
          </Field>
          <Field label="Initiales (avatar)">
            <input value={form.initials} onChange={e => set('initials', e.target.value.slice(0, 3).toUpperCase())} className={cls} placeholder="RC" />
          </Field>
          <Field label="Nom complet" required>
            <input value={form.name} onChange={e => set('name', e.target.value)} className={cls} required />
          </Field>
          <Field label="Entreprise">
            <input value={form.company} onChange={e => set('company', e.target.value)} className={cls} />
          </Field>
          <Field label="Titre principal">
            <input value={form.title} onChange={e => set('title', e.target.value)} className={cls} placeholder="CEO & Co-Founder" />
          </Field>
          <Field label="Sous-titre">
            <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={cls} placeholder="AI Expert" />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Liens</h3>
          <div className="flex flex-wrap gap-1">
            {(Object.keys(PLATFORM_PRESETS) as (keyof typeof PLATFORM_PRESETS)[]).map(p => (
              <button
                key={p}
                onClick={() => addLink(p)}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium hover:bg-slate-50"
              >
                + {PLATFORM_PRESETS[p].label}
              </button>
            ))}
          </div>
        </div>

        {links.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun lien. Ajoutez-en depuis les presets ci-dessus.</p>
        ) : (
          <div className="space-y-2">
            {links.map((l, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-3">
                <div className="grid grid-cols-[auto_1fr_1fr_auto_auto_auto] items-center gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-lg" style={{ background: l.color }} />
                  <input value={l.label} onChange={e => updateLink(i, { label: e.target.value })} placeholder="Label" className={cls} />
                  <input value={l.href} onChange={e => updateLink(i, { href: e.target.value })} placeholder="URL ou identifiant" className={cls} />
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30">↑</button>
                  <button onClick={() => move(i, 1)} disabled={i === links.length - 1} className="rounded px-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30">↓</button>
                  <button onClick={() => removeLink(i)} className="rounded px-2 text-red-600 hover:bg-red-50">✕</button>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <span>Couleur :</span>
                  <input
                    type="color"
                    value={l.color}
                    onChange={e => updateLink(i, { color: e.target.value })}
                    className="h-6 w-10 cursor-pointer rounded border border-slate-300"
                  />
                  <span>Icône :</span>
                  <select
                    value={l.icon}
                    onChange={e => updateLink(i, { icon: e.target.value as ProfileLink['icon'] })}
                    className="rounded border border-slate-300 px-2 py-1"
                  >
                    {(['whatsapp', 'linkedin', 'wechat', 'email', 'web', 'phone', 'instagram'] as const).map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">SEO</h3>
        <div className="space-y-3">
          <Field label="Titre de page (tab, Google)" full>
            <input value={form.seoTitle} onChange={e => set('seoTitle', e.target.value)} className={cls} />
          </Field>
          <Field label="Meta description" full>
            <textarea value={form.seoDesc} onChange={e => set('seoDesc', e.target.value)} rows={2} className={cls} />
          </Field>
          {props.mode === 'edit' && (
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} />
              <span className="text-sm">Actif (page publique accessible)</span>
            </label>
          )}
        </div>
      </div>

      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      {msg && <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{msg}</div>}

      <div className="flex items-center justify-between">
        {props.mode === 'edit' ? (
          <button onClick={remove} className="text-sm text-red-600 hover:underline">Supprimer ce profil</button>
        ) : <span />}
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? 'Enregistrement…' : props.mode === 'create' ? 'Créer' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, full, required, children }: { label: string; full?: boolean; required?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}
