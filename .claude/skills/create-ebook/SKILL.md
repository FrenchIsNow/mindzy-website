---
name: create-ebook
description: Create or upsert a Mindzy ebook end-to-end via the agent API. Use when the user asks to publish a new ebook, a new free guide, a paid guide, or update an existing ebook's catalog data.
argument-hint: "<ebook brief: slug, title, status, pricing, content>"
---

# Create Ebook

Implement `$ARGUMENTS` by creating or updating a Mindzy ebook through the agent API.

<objective>
Ship a fully-formed ebook in the catalog (free or paid) with SEO/GEO metadata, content, and form/redirect configuration.
</objective>

<required_paths>
- Agent API: `src/app/api/agent/route.ts` (action: `create-ebook`)
- DB layer: `src/lib/db.ts` (`upsertCatalogEntry`, `upsertEbookContent`)
- Public detail: `src/app/[locale]/ebooks/[slug]/page.tsx`
- Download API: `src/app/api/ebooks/download/route.ts`
- Admin wizard (manual): `src/app/dashboard/admin/ebooks/new/NewEbookWizard.tsx`
- Auth: `AGENT_API_TOKEN` env var (or admin/editor session)
</required_paths>

<workflow>
1. Resolve the **slug** (kebab-case). If updating, reuse the existing slug from the catalog.
2. POST to `/api/agent` with body:
   ```json
   {
     "action": "create-ebook",
     "input": {
       "slug": "my-new-guide",
       "title": "Mon guide",
       "is_free": true,
       "is_active": true,
       "status": "draft",
       "seo_title": "...",
       "seo_description": "...",
       "geo_keywords": ["ai", "rh"],
       "form_fields": ["email","firstName","lastName","company","role"],
       "calendly_url": "https://calendly.com/...",
       "thank_you_redirect_url": "https://calendly.com/...",
       "content": {
         "locale": "fr",
         "title": "Mon guide",
         "subtitle": "...",
         "excerpt": "...",
         "pdf_url": "/ebooks/my-new-guide.pdf",
         "pages": 24,
         "reading_time": 12,
         "category": "marketing"
       }
     }
   }
   ```
3. Authenticate via `x-agent-token: $AGENT_API_TOKEN` header **or** an active admin/editor session.
4. Response: `{ ok: true, slug }`. The slug becomes the public URL `/[locale]/ebooks/{slug}`.
5. For paid ebooks, set `price_cents` and a `currency`. Stripe sync is handled by the admin PUT route.
</workflow>

<copy_defaults>
- Default `status: "draft"`. Bump to `"published"` only after content + PDF are in place.
- Always set `form_fields` to the explicit list of fields the lead capture needs.
- `geo_keywords` is a string[] of topical entities — keep between 3 and 12.
- `redirect_url` is optional; falls back to `calendly_url` if not set.
</copy_defaults>

<minimal_object_skeleton>
```json
{
  "action": "create-ebook",
  "input": {
    "slug": "my-ebook",
    "title": "Titre du guide",
    "is_free": true,
    "is_active": true,
    "status": "draft",
    "seo_title": "Titre SEO (≤60 chars)",
    "seo_description": "Description SEO (≤160 chars)",
    "geo_keywords": ["mot-clé 1", "mot-clé 2"],
    "form_fields": ["email", "firstName", "lastName", "company", "role"],
    "calendly_url": "",
    "content": {
      "locale": "fr",
      "title": "Titre du guide",
      "subtitle": "Sous-titre",
      "excerpt": "Chapô",
      "pdf_url": "/ebooks/my-ebook.pdf",
      "pages": 24,
      "reading_time": 12,
      "category": "marketing"
    }
  }
}
```
</minimal_object_skeleton>

<completion_checklist>
- [ ] Slug chosen (kebab-case, unique, ≤80 chars)
- [ ] Catalog entry upserted via `/api/agent`
- [ ] `form_fields` aligned with the public download form
- [ ] PDF uploaded to `public/ebooks/{slug}.pdf`
- [ ] Public route `/[locale]/ebooks/{slug}` renders
- [ ] `llms.txt` updated if the ebook is strategic
</completion_checklist>
