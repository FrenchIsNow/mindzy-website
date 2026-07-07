import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLeadById, updateLead } from '@/lib/db'
import { ebooks as staticEbooks } from '@/lib/ebooks'
import type { Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

async function updateStatus(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  const status = String(formData.get('status') || '')
  if (Number.isFinite(id) && status) {
    await updateLead(id, { status })
  }
}

function resolveSourceLabel(source: string | null, sourceDetail: unknown, locale: string): string {
  if (!source) return '—'
  if (source === 'ebook') {
    const slug = (sourceDetail as { ebook_slug?: string } | null)?.ebook_slug
    const ebook = slug ? staticEbooks.find(e => e.slug === slug) : undefined
    if (ebook) {
      const title = ebook.title[locale as Locale] ?? ebook.title.fr ?? Object.values(ebook.title)[0]
      return title ? `${title} (ebook)` : 'ebook'
    }
    return slug ? `ebook · ${slug}` : 'ebook'
  }
  return source
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number(idStr)
  if (!Number.isFinite(id)) notFound()
  const lead = await getLeadById(id)
  if (!lead) notFound()

  const sourceLabel = resolveSourceLabel(lead.source, lead.source_detail, lead.locale ?? 'fr')

  return (
    <>
      <div className="mb-6">
        <Link href="/dashboard/admin/leads" className="text-sm text-violet-600 hover:underline">
          ← Prospects
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {lead.first_name || lead.last_name ? `${lead.first_name ?? ''} ${lead.last_name ?? ''}`.trim() : lead.email}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{lead.email}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Identité">
            <Row k="Prénom" v={lead.first_name} />
            <Row k="Nom" v={lead.last_name} />
            <Row k="Email" v={lead.email} mono />
            <Row k="Société" v={lead.company} />
            <Row k="Poste" v={lead.role} />
            <Row k="Téléphone" v={lead.phone} mono />
          </Card>

          <Card title="Acquisition">
            <Row k="Source" v={sourceLabel} />
            <Row k="Source détail" v={lead.source_detail as unknown as string} />
            <Row k="Locale" v={lead.locale} />
            <Row k="Tags" v={Array.isArray(lead.tags) ? (lead.tags as string[]).join(', ') : null} />
            <Row k="Consentement RGPD" v={lead.gdpr_consent ? 'oui' : 'non'} />
            <Row k="Créé le" v={new Date(lead.created_at).toLocaleString('fr-FR')} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Statut">
            <form action={updateStatus} className="space-y-3">
              <input type="hidden" name="id" value={lead.id} />
              <select name="status" defaultValue={lead.status || 'new'} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="new">Nouveau</option>
                <option value="contacted">Contacté</option>
                <option value="qualified">Qualifié</option>
                <option value="won">Gagné</option>
                <option value="lost">Perdu</option>
              </select>
              <button type="submit" className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white">
                Mettre à jour
              </button>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  )
}

function Row({ k, v, mono }: { k: string; v: unknown; mono?: boolean }) {
  const display = v === null || v === undefined || v === '' ? '—' : typeof v === 'string' ? v : JSON.stringify(v)
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs uppercase tracking-wide text-slate-500">{k}</span>
      <span className={mono ? 'font-mono text-slate-700' : 'text-slate-700'}>{display}</span>
    </div>
  )
}
