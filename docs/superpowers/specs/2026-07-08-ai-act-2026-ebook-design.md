# AI Act 2026 Ebook — Design Spec

**Date:** 2026-07-08
**Slug:** `ai-act-2026-europe`
**Title (fr):** Règlement Européen sur l'Intelligence Artificielle
**Status:** Approved by user

## Goal

Add a new lead-magnet ebook ("AI Act 2026") with full fr/en/es content (chapters, features, stats, testimonial) and a cover image generated via OpenRouter. Refactor the existing per-locale deliverable model on the admin edit page so a lead magnet is either a PDF download OR a redirect to a published article — chosen per locale, in the admin UI, on the existing edit page (no separate routing layer, no HTML preview page).

## Non-Goals

- No HTML preview route. No `/preview/[slug].html` file. No 302 redirect from `/ebook/[slug]`.
- No new `page` (Page interne HTML) deliverable kind — removed.
- No new translation infra — only fr/en/es populated, matching the existing 2 ebooks.
- No automated re-generation of the cover — script runs once, manually.
- No permanent URL redirects on slug rename (matches existing behavior).

## Architecture

### 1. New ebook entry — `src/lib/ebooks.ts`

Append a third entry to the `ebooks` array. Full fr/en/es content for `chapters`, `features`, `stats`, `testimonial`. Same shape as the two existing entries.

- **slug:** `ai-act-2026-europe`
- **title (fr):** Règlement Européen sur l'Intelligence Artificielle
- **title (en):** European AI Regulation
- **title (es):** Reglamento Europeo de Inteligencia Artificial
- **category:** `regulation`
- **tags:** `['ai-act', 'règlement', 'ia', 'conformité', 'europe']`
- **image:** `/images/ebooks/ai-act-2026-europe.webp`
- **publishedDate:** `2026-07-08`
- **pages:** 32
- **free:** true
- **ctaLink:** `https://calendar.app.google/JyUKfZ6xMRxKySfM9`

**Chapters (8) — fr / en / es:**

| # | fr | en | es |
|---|----|----|----|
| Intro | L'AI Act en 5 minutes | The AI Act in 5 minutes | La AI Act en 5 minutos |
| 01 | Champ d'application | Scope of application | Ámbito de aplicación |
| 02 | Classification des risques | Risk classification | Clasificación de riesgos |
| 03 | Risque inacceptable | Unacceptable risk | Riesgo inaceptable |
| 04 | Risque élevé | High risk | Riesgo elevado |
| 05 | IA générale (GPAI) | General-purpose AI (GPAI) | IA de uso general (GPAI) |
| 06 | Obligations de transparence | Transparency obligations | Obligaciones de transparencia |
| 07 | Sanctions & gouvernance | Sanctions & governance | Sanciones y gobernanza |
| 08 | Plan d'action 90 jours | 90-day action plan | Plan de acción 90 días |

**Features / Points forts (6) — fr / en / es:**

| # | fr | en | es |
|---|----|----|----|
| 01 CADRE | Cadre légal complet | Complete legal framework | Marco legal completo |
| 02 PYRAMIDE | Pyramide des 4 risques | 4-tier risk pyramid | Pirámide de los 4 riesgos |
| 03 CAS | Cas d'usage concrets | Concrete use cases | Casos de uso concretos |
| 04 CHECKLIST | Checklist de conformité | Compliance checklist | Lista de cumplimiento |
| 05 CALENDRIER | Calendrier 2026-2027 | 2026-2027 timeline | Calendario 2026-2027 |
| 06 MODÈLES | Modèles de documents | Document templates | Plantillas de documentos |

**Stats (4) — fr / en / es:**

| value | fr | en | es |
|-------|----|----|----|
| €35M | sanction max | max fine | sanción máx |
| 7% | CA mondial (seuil GPAI) | global revenue (GPAI threshold) | facturación global (umbral GPAI) |
| 2 août 2026 | 1ère date clé | first key date | 1ª fecha clave |
| 6 | niveaux de risque | risk levels | niveles de riesgo |

**Testimonial — fr / en / es:**

fr: « Le seul guide qui m'a permis de cartographier notre exposition à l'AI Act en moins d'une journée. La pyramide des risques vaut le détour à elle seule. » — Sophie D., DPO, scale-up SaaS

### 2. Lead-magnet data model — collapse to a single per-locale `deliverable` field

**Before (current schema, multiple inconsistent fields):**
- `pdfByLocale: Partial<Record<Locale, string>>` — filename only
- `deliverable_types: Record<'fr'|'en'|'es', 'pdf'|'page'|'article'>` — kind only
- Two sources of truth, the `page` kind is dead.

**After (one field, one source of truth):**

```ts
// New shape on the catalog table (DB)
deliverable: Partial<Record<'fr'|'en'|'es', {
  kind: 'pdf' | 'article',
  file?: string,         // when kind='pdf': filename in public/ebooks/
  articleSlug?: string,  // when kind='article': slug from articles table
}>>
```

**Migration:** add a single nullable `jsonb` column `deliverable` to the `catalog` table. No backfill needed for the 2 existing rows — they default to `pdf` for fr/en/es with their existing `pdfByLocale` filenames copied in. The `pdfByLocale` and `deliverable_types` columns stay in place but are no longer read by the API/download route (kept as historical columns for one release, dropped later).

**Validation rules (server-side, in the admin PUT route):**
- `kind='pdf'` requires a non-empty `file` that ends in `.pdf`.
- `kind='article'` requires a non-empty `articleSlug` that exists in the `articles` table with `status='published'`.
- Either is fine; if neither, that locale silently falls back to the old `pdfByLocale` filename (graceful degradation during rollout).

### 3. Admin edit page — per-locale tabs

`src/app/dashboard/admin/ebooks/[slug]/EbookSettingsForm.tsx` already has a "Type de livrable par locale" section with 3 side-by-side selects. Replace it with a **tabbed UI** — one tab per locale, no separate "type" selector, just two clear choices inside each tab:

```
┌─ [FR] [EN] [ES] ─────────────────────────┐
│ Livrable — Français                       │
│                                            │
│  ( ) PDF    ( ) Article du blog            │
│                                            │
│  ┌─ PDF sélectionné ──────────────────┐   │
│  │ Fichier: [ai-act-2026-europe-fr.pdf]│   │
│  │ Emplacement: /public/ebooks/        │   │
│  │ Aperçu URL: /ebook/ai-act-2026-europe│   │
│  └──────────────────────────────────────┘   │
│                                            │
│  ┌─ Article sélectionné ───────────────┐   │
│  │ Article: [Comprendre l'AI Act 2026 ▾]│   │
│  │ Slug:    [comprendre-ai-act-2026]    │   │
│  │ Aperçu URL: /fr/blog/comprendre-...  │   │
│  └──────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

**Implementation notes:**
- Use the existing shadcn/ui Tabs primitive (or hand-roll a 3-state toggle — whichever is already in the project's component library; check `src/components/ui/` first).
- "Article" dropdown is populated server-side from `GET /api/dashboard/articles?status=published` and filtered to `slug` + `title`. Searchable select if there are >10 articles.
- The old `deliverable_types` state and the 3-row `Local` grid are deleted.
- Form state becomes `deliverable: Record<Loc, { kind, file?, articleSlug? }>` — single state object, clean save.

### 4. Public download behavior

`src/app/api/leads/download/route.ts` (or whatever handles the post-form submission — to be confirmed by reading the existing route, but the contract is the same):

- Receive the lead-magnet slug + the user's locale.
- Resolve the `deliverable[locale]` from the catalog row.
- If `kind: 'pdf'` → stream `public/ebooks/{file}` as an attachment (existing behavior, unchanged).
- If `kind: 'article'` → return `NextResponse.redirect('/{locale}/blog/{articleSlug}', 302)`.
- Email capture happens before either action (unchanged).
- If `deliverable[locale]` is missing OR invalid → log warning, fall back to `pdfByLocale[locale]` (legacy) → if that's also missing, return a generic "Merci, votre guide arrive par email" message (existing fallback).

### 5. fal.ai is out — OpenRouter in

- **Provider:** OpenRouter (https://openrouter.ai)
- **Endpoint:** `POST https://openrouter.ai/api/v1/chat/completions`
- **Model:** `google/gemini-2.5-flash-image` (~$0.03/image)
- **Auth:** `Authorization: Bearer ${OPENROUTER_API_KEY}` from `.env.local` (script reads it via `process.env`).
- **No new npm packages** — Node 18+ built-in `fetch` covers it. Ponytail: stdlib wins.

**Script:** `scripts/generate-ebook-image.mjs`

Behavior:
1. Read `OPENROUTER_API_KEY` from env. Exit with a clear error if missing.
2. Read the prompt + output path from CLI args (or hardcode for this single use; can be parameterized later when needed).
3. POST to OpenRouter with the multimodal `messages` array asking for the image.
4. Parse the response, extract the base64 image (OpenRouter returns it in the assistant message content array as `{ type: 'image', image: { url: 'data:image/png;base64,...' } }` or similar — handle both shapes).
5. Decode and write to `public/images/ebooks/ai-act-2026-europe.webp`.
6. If the source is PNG and the user wants webp, use a tiny `sharp` install OR save as PNG with `.webp` renamed (research showed both work in some pipelines but it's brittle — **save as PNG for now, accept the larger file size** for the one-shot; ~150-300 KB is fine).
7. Print summary to stdout: bytes written, path, time elapsed.

**Invocation:**

```bash
OPENROUTER_API_KEY=sk-or-... node scripts/generate-ebook-image.mjs
```

No npm script wrapper. Manual, one-shot.

**Image prompt (final):**

> Editorial flat-lay of the European AI Act: a 2026 EU regulation document with the European flag, a neural network diagram overlay, legal gavel, and gold-accented typography. Clean dark-violet background, premium 3D render, soft studio lighting, 1:1 aspect, French typography accent. No text on the cover itself.

(The "no text on the cover" prevents the model from garbling "AI Act" into nonsense — the ebook title is rendered by the React component from data, not baked into the image.)

### 6. Database migration

- **Tool:** Neon MCP (`prepare_database_migration` + `complete_database_migration`).
- **Change:** add `deliverable JSONB` to the `catalog` table, nullable, default `NULL`.
- **Backfill:** for the 2 existing rows, copy the `pdfByLocale` value into the new `deliverable` column as `{ fr: { kind: 'pdf', file: '...' }, ... }`. Done in a single `UPDATE` after the column is added.
- **No destructive ops.** Reversible by dropping the new column.

## Files to add / modify

| File | Action |
|---|---|
| `src/lib/ebooks.ts` | Add `ai-act-2026-europe` entry (fr/en/es) |
| DB migration (Neon) | Add `deliverable JSONB` to `catalog`, backfill from `pdfByLocale` |
| `src/app/dashboard/admin/ebooks/[slug]/EbookSettingsForm.tsx` | Replace deliverable-type section with tabbed per-locale UI (PDF / Article) |
| `src/app/api/dashboard/ebooks/[slug]/route.ts` | Accept new `deliverable` shape, validate article slugs |
| `src/app/api/leads/download/route.ts` | Handle `kind: 'article'` → 302 redirect to `/[locale]/blog/{slug}` |
| `scripts/generate-ebook-image.mjs` | **New** — OpenRouter image generator |
| `public/images/ebooks/ai-act-2026-europe.webp` | Generated cover |
| `.env.example` | Document `OPENROUTER_API_KEY` |

## Risk & ceilings

- **DB migration is additive only** — no destructive change, easily reversible.
- **Article slug must exist** at lead-capture time or the redirect returns 404 — server-side validation in the download API guards this. Lead is still captured; we log a warning and fall back to the email-only message.
- **OpenRouter image quality is mid-tier** — if the cover looks off, swap to `openai/gpt-5-image` (1-line model string change).
- **Manual image step** — script needs `OPENROUTER_API_KEY` in env, runs once. Not part of CI/build.
- **No new npm packages** — `@fal-ai/client` and `sharp` both dropped, using Node 18+ built-in `fetch`.

## Implementation order (handed off to writing-plans)

1. DB migration (add `deliverable` column, backfill).
2. Add new ebook entry to `src/lib/ebooks.ts`.
3. Refactor `EbookSettingsForm.tsx` — tabbed per-locale UI.
4. Update admin PUT route to accept the new shape.
5. Update public download route to handle the `article` kind.
6. Write `scripts/generate-ebook-image.mjs`.
7. Run the script, commit the image.
8. Manual smoke test: edit page loads, saves, public route delivers correctly.
