import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/dashboard-auth'
import { Shell } from '@/components/dashboard/Sidebar'
import { getEbook } from '@/lib/ebooks'
import { listEbookContentForSlug } from '@/lib/db'
import EbookContentEditor from './EbookContentEditor'

export const dynamic = 'force-dynamic'

export default async function EditEbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session) redirect('/dashboard/login')
  if (session.role !== 'admin') redirect('/dashboard/client')

  const { slug } = await params
  const staticEbook = getEbook(slug)
  const dbRows = await listEbookContentForSlug(slug)

  if (!staticEbook && dbRows.length === 0) notFound()

  // Build initial state for all three locales.
  const initial: Record<string, unknown> = {}
  for (const locale of ['fr', 'en', 'es'] as const) {
    const db = dbRows.find(r => r.locale === locale)
    const s = staticEbook
    initial[locale] = {
      slug,
      locale,
      title: db?.title ?? s?.title[locale] ?? '',
      subtitle: db?.subtitle ?? s?.subtitle?.[locale] ?? '',
      excerpt: db?.excerpt ?? s?.excerpt[locale] ?? '',
      category: db?.category ?? s?.category ?? '',
      tags: db?.tags ?? s?.tags ?? [],
      imageUrl: db?.image_url ?? s?.image ?? '',
      pdfUrl: db?.pdf_url ?? '',
      pages: db?.pages ?? s?.pages ?? null,
      readingTime: db?.reading_time ?? null,
      chapters: db?.chapters ?? s?.chapters?.[locale] ?? [],
      features: db?.features ?? s?.features?.[locale] ?? [],
      stats: db?.stats ?? s?.stats?.[locale] ?? [],
      testimonial: db?.testimonial ?? s?.testimonial?.[locale] ?? { quote: '', author: '', role: '' },
      hasDbOverride: Boolean(db),
    }
  }

  return (
    <Shell role="admin" userName="Admin">
      <Link href={`/dashboard/admin/ebooks/${slug}`} className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Retour à l&apos;ebook
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Édition page ebook · {staticEbook?.title.fr ?? slug}</h1>
      <p className="mb-6 text-sm text-slate-600">
        Modifiez la page publique <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/fr/ebooks/{slug}</code>.
        Éditez en FR puis cliquez <strong>Traduire avec IA</strong> pour générer EN / ES.
      </p>
      <EbookContentEditor slug={slug} initial={initial as never} isDbOnly={!staticEbook} />
    </Shell>
  )
}
