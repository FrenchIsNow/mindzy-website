// Seed AI Act 2026 ebook into Neon DB.
// Idempotent — safe to re-run.
//   npx -y tsx scripts/seed-ai-act-2026.ts
import { getEbook } from '../src/lib/ebooks.ts'
import { upsertCatalogEntry, upsertEbookContent } from '../src/lib/db.ts'

const slug = 'ai-act-2026-europe'
const ebook = getEbook(slug)
if (!ebook) {
  console.error(`Static ebook "${slug}" not found in src/lib/ebooks.ts. Run Task 1 first.`)
  process.exit(1)
}

const articleUrls: Record<string, string | null> = {
  fr: null,
  en: '/en/blog/ai-act-2026-summary',
  es: '/es/blog/reglamento-ia-2026-resumen',
}

const locales = ['fr', 'en', 'es']

async function main() {
  await upsertCatalogEntry({
    slug,
    is_free: true,
    is_active: true,
    deliverable_types: { fr: 'pdf', en: 'article', es: 'article' },
  })

  for (const locale of locales) {
    await upsertEbookContent({
      slug,
      locale,
      title: ebook.title[locale],
      subtitle: ebook.subtitle[locale],
      excerpt: ebook.excerpt[locale],
      category: ebook.category,
      tags: ebook.tags,
      imageUrl: ebook.image,
      pages: ebook.pages,
      chapters: ebook.chapters[locale],
      features: ebook.features[locale],
      stats: ebook.stats[locale],
      testimonial: ebook.testimonial[locale],
      articleUrl: articleUrls[locale],
    })
    console.log(`  upserted ${locale}`)
  }

  console.log(`Seeded ${slug}: catalog row + ${locales.length} content rows.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
