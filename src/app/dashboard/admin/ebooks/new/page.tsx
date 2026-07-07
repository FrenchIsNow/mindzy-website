import Link from 'next/link'
import NewEbookWizard from './NewEbookWizard'

export const dynamic = 'force-dynamic'

export default async function NewEbookPage() {

  return (
<>      <Link href="/dashboard/admin/ebooks" className="mb-4 inline-block text-sm text-slate-600 hover:text-violet-600">
        ← Ebooks
      </Link>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Nouveau ebook gratuit</h1>
      <p className="mb-6 text-sm text-slate-600">
        Remplissez le contenu FR, uploadez le PDF et la couverture. Vous pourrez ensuite traduire en EN/ES en un clic.
      </p>
      <NewEbookWizard />
</>  )
}
