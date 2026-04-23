
---
name: add-free-guide
description: Add a new free ebook/guide to the Mindzy website using the existing data model. Use when the user asks to add a guide, free ebook, downloadable PDF resource, or update ebook card/detail content.
argument-hint: "<guide brief or requested changes>"
---

# Add Free Guide

Implement `$ARGUMENTS` by adding or updating a free ebook/guide end-to-end in the Mindzy website.

<objective>
Ship a complete and valid free guide update covering data, PDF mapping, and validation.
</objective>

<required_paths>
- Data source: `src/lib/ebooks.ts`
- Listing page: `src/app/[locale]/ebooks/page.tsx`
- Detail page: `src/app/[locale]/ebooks/[slug]/page.tsx`
- PDFs folder: `public/ebooks/`
- PDF validation script: `scripts/validate-ebooks.mjs`
</required_paths>

<workflow>
1. Define slug first (kebab-case) and reuse it everywhere.
2. Add or update the object in `ebooks` inside `src/lib/ebooks.ts`.
3. Ensure required fields exist:
   - `slug`, `title`, `subtitle`, `excerpt`, `pages`, `category`, `tags`, `image`, `publishedDate`, `downloadCount`, `chapters`, `features`, `stats`, `testimonial`, `free`
4. Add optional fields only when requested:
   - `ctaLink`, `cardOverride`, `detailOverride`
5. Ensure PDF exists at `public/ebooks/{slug}.pdf`.
6. Run `npm run validate:ebooks` and resolve all missing PDF/slug issues.
7. If copy customization is requested:
   - Use `cardOverride` for card text/CTA/bullets.
   - Use `detailOverride` for detail hero/features/testimonial/booking/bottom CTA copy.
</workflow>

<copy_defaults>
- Always keep locale-aware data in `fr`, `en`, `es`.
- If custom copy exists for a subset of locales, set only those keys and rely on base fallback.
- Keep preview bullets/chapters concise and consistent with existing patterns.
</copy_defaults>

<minimal_object_skeleton>
```ts
{
  slug: 'your-guide-slug',
  title: { fr: '', en: '', es: '' },
  subtitle: { fr: '', en: '', es: '' },
  excerpt: { fr: '', en: '', es: '' },
  pages: 24,
  category: 'seo',
  tags: ['seo', 'geo'],
  image: '/images/blog/seo-guide.svg',
  publishedDate: '2026-03-01',
  downloadCount: 0,
  free: true,
  chapters: { fr: [], en: [], es: [] },
  features: { fr: [], en: [], es: [] },
  stats: { fr: [], en: [], es: [] },
  testimonial: {
    fr: { quote: '', author: '', role: '' },
    en: { quote: '', author: '', role: '' },
    es: { quote: '', author: '', role: '' },
  },
  cardOverride: {
    title: { en: '' },
    hook: { en: '' },
    description: { en: '' },
    bullets: { en: ['', '', '', ''] },
    ctaLabel: { en: '' },
  },
  detailOverride: {
    title: { en: '' },
    excerpt: { en: '' },
  },
}
```
</minimal_object_skeleton>

<completion_checklist>
- [ ] Ebook object added/updated in `src/lib/ebooks.ts`
- [ ] PDF exists at `public/ebooks/{slug}.pdf`
- [ ] `npm run validate:ebooks` passes
- [ ] Lint is clean for edited files
</completion_checklist>
