# AI Act 2026 Ebook — Design Spec

**Date:** 2026-07-08
**Slug:** `ai-act-2026-europe`
**Title (fr):** Règlement Européen sur l'Intelligence Artificielle
**Status:** Approved by user
**Verification note:** This spec was rewritten after verifying the existing codebase. The first draft assumed no deliverable flexibility existed; the codebase already has it (PDF / page HTML / article URL per locale). The rewrite reflects reality.

## Goal

Add a new lead-magnet ebook ("AI Act 2026") to Mindzy with full fr/en/es content (chapters, points forts, statistiques, testimonial, cover image). Use the **existing** infrastructure for admin editing, lead capture, and the per-locale deliverable choice — do not add new infrastructure.

The user clarified (after the first spec): no HTML preview route, no redirect layer, no `pdfByLocale` indirection. The choice of "PDF" or "Article (redirection)" per locale already exists in the edit page; we just use it.

## Non-Goals

- No new "preview HTML" route.
- No 302 redirect on `/ebook/[slug]`.
- No new translation infra — only fr/en/es populated, matching the existing 2 ebooks.
- No new deliverable types — the existing `pdf` / `page` / `article` enum is fine.
- No DB schema changes — the existing `ebook_catalog.deliverable_types` JSONB column covers the use case.
- No changes to `EbookSettingsForm.tsx` (settings page).
- No new image generation library — built-in `fetch` only.

## What's already in place (verified)

| Component | Location | Notes |
|---|---|---|
| Static ebook config | `src/lib/ebooks.ts` | 2 entries: `lancer-presence-digitale-2026`, `seo-geo-expert-guide`. This is where the new entry goes. |
| Settings page (slug, pricing, promo, upsell, per-locale deliverable type) | `src/app/dashboard/admin/ebooks/[slug]/EbookSettingsForm.tsx` | Already has 3-row per-locale deliverable type selector (lines 286-308). Do NOT modify. |
| Content editor (per-locale tabs: title, chapters, points forts, stats, testimonial, image, PDF, page HTML, article URL) | `src/app/dashboard/admin/ebooks/[slug]/edit/EbookContentEditor.tsx` | Already tabbed FR/EN/ES (lines 134-152). Already exposes `htmlContent` (page) and `articleUrl` (article) fields gated by `deliverableTypes[locale]` (lines 308-358). Do NOT modify the structure — just fill values. |
| Content API PUT | `src/app/api/dashboard/ebooks/[slug]/content/route.ts` | Persists `ebook_content` rows. |
| Translate API | `src/app/api/dashboard/ebooks/[slug]/translate/route.ts` | Auto-translates FR → EN/ES via OpenAI (already wired). |
| Public ebook page | `src/app/[locale]/ebooks/[slug]/page.tsx` | Reads static config + `ebook_content` overrides + `getDeliverableType()`. Renders `htmlContent` inline if `kind === 'page'`, redirects to `article_url` if `kind === 'article'`, triggers PDF download otherwise. |
| Download API | `src/app/api/ebooks/download/route.ts` | Captures lead, returns `{ redirectUrl, pdfUrl, deliverableType }`. Already handles all 3 kinds. |
| Image upload | `/api/dashboard/upload` (used by editor) | Uploads to storage, returns URL. Editor's imageUrl field is just a URL string. |
| `getDeliverableType` helper | `src/lib/db.ts:1468` | Reads `ebook_catalog.deliverable_types[locale]`, falls back to `'pdf'`. |
| `CatalogEntry.deliverable_types` column | `ebook_catalog` table, `JSONB NOT NULL DEFAULT '{}'` | Already exists (migration at `db.ts:297`). No schema change needed. |
| `ebook_content.html_content` column | `ebook_content` table, `TEXT` | Already exists (migration at `db.ts:299`). |
| `ebook_content.article_url` column | `ebook_content` table, `TEXT` | Already exists (migration at `db.ts:301`). |

## What needs to happen

### 1. New ebook entry — `src/lib/ebooks.ts`

Append a third entry to the `ebooks` array. Same shape as the two existing entries. Full fr/en/es content for `chapters`, `features`, `stats`, `testimonial`.

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

**Points forts / Features (6):**

| # | fr label | fr title | fr desc | (en, es mirror) |
|---|---|---|---|---|
| 01 | CADRE | Cadre légal complet | Du règlement (UE) 2024/1689 aux actes d'exécution, chaque article est décrypté avec ses implications opérationnelles. | (mirror) |
| 02 | PYRAMIDE | Pyramide des 4 risques | Risque inacceptable, élevé, limité, minimal — pour chaque niveau, vos obligations concrètes et la liste des cas d'usage interdits. | (mirror) |
| 03 | CAS | Cas d'usage concrets | Recrutement IA, scoring bancaire, santé, éducation, GPAI — 12 cas d'usage commentés par des praticiens du droit. | (mirror) |
| 04 | CHECKLIST | Checklist de conformité | 38 points d'audit rangés par priorité : gouvernance, données, transparence, surveillance humaine, documentation technique. | (mirror) |
| 05 | CALENDRIER | Calendrier 2026-2027 | Les 6 dates clés à anticiper : 2 février 2025 (entrée en vigueur), 2 août 2026 (interdictions + GPAI), 2 août 2027 (haut risque complet). | (mirror) |
| 06 | MODÈLES | Modèles de documents | Fiche d'évaluation du risque, registre des systèmes IA, clause de sous-traitance, politique d'usage IA — prêts à l'emploi. | (mirror) |

**Statistiques (4):**

| value | fr | en | es |
|-------|----|----|----|
| €35M | sanction maximale | max fine | sanción máxima |
| 7% | CA mondial (seuil GPAI) | global revenue (GPAI threshold) | facturación global (umbral GPAI) |
| 2 août 2026 | 1ère date d'application | first application date | 1ª fecha de aplicación |
| 6 | niveaux de risque | risk levels | niveles de riesgo |

**Testimonial (fr/en/es):**

fr: « Le seul guide qui m'a permis de cartographier notre exposition à l'AI Act en moins d'une journée. La pyramide des risques vaut le détour à elle seule. » — Sophie D., DPO, scale-up SaaS

### 2. Initial deliverable config (per locale)

The settings page (`EbookSettingsForm.tsx`) lets the admin pick the deliverable type per locale. To make this admin-controlled from day one, the new ebook's settings row should be created in `ebook_catalog` with:

```json
{
  "fr": "pdf",
  "en": "article",
  "es": "article"
}
```

The first version of the AI Act 2026 only ships as a French PDF. EN/ES redirect to the corresponding blog article (e.g. `/en/blog/ai-act-2026-summary`, `/es/blog/reglamento-ia-2026-resumen`) — those article slugs are public on `/[locale]/blog/[slug]` already.

**Action:** create the catalog row via Neon MCP after the static entry is added. The static `src/lib/ebooks.ts` entry seeds the public page; the catalog row makes it admin-editable.

### 3. Image generation — OpenRouter

- **Provider:** OpenRouter (https://openrouter.ai)
- **Endpoint:** `POST https://openrouter.ai/api/v1/chat/completions`
- **Model:** `google/gemini-2.5-flash-image` (~$0.03/image)
- **Auth:** `Authorization: Bearer ${OPENROUTER_API_KEY}` from `.env.local`
- **No new npm packages** — Node 18+ built-in `fetch` covers it.

**Script:** `scripts/generate-ebook-image.mjs`

1. Read `OPENROUTER_API_KEY` from env. Exit with a clear error if missing.
2. POST to OpenRouter with the multimodal `messages` array asking for the image.
3. Parse the response — extract base64 image from the assistant message.
4. Decode and write to `public/images/ebooks/ai-act-2026-europe.png` (PNG, not webp — no `sharp` dependency, the existing code accepts both `.png` and `.webp` in the `image` field).
5. Print summary to stdout.

**Invocation:**

```bash
OPENROUTER_API_KEY=sk-or-... node scripts/generate-ebook-image.mjs
```

No npm script wrapper. Manual, one-shot.

**Image prompt (final):**

> Editorial flat-lay of the European AI Act: a 2026 EU regulation document with the European flag, a neural network diagram overlay, legal gavel, and gold-accented typography. Clean dark-violet background, premium 3D render, soft studio lighting, 1:1 aspect, 1024x1024, French typography accent. No text on the cover itself.

(The "no text on the cover" prevents the model from garbling "AI Act" into nonsense — the ebook title is rendered by the React component from data, not baked into the image.)

### 4. Adding the entry to the admin list

The admin's ebook list (`src/app/dashboard/admin/ebooks/page.tsx`) reads from `getAllCatalogEntries()`. Once a `ebook_catalog` row exists with the new slug, it appears in the admin list automatically. No new wiring needed.

If the admin's "new ebook" wizard (`src/app/dashboard/admin/ebooks/new/`) doesn't accept the slug from a static entry, the row may need to be created directly via Neon MCP. **Action:** check the wizard during implementation. If it requires a DB-only flow, create the row manually.

## Files to add / modify

| File | Action |
|---|---|
| `src/lib/ebooks.ts` | Add `ai-act-2026-europe` entry (fr/en/es) |
| Neon DB | Create `ebook_catalog` row for `ai-act-2026-europe` with `deliverable_types: { fr: 'pdf', en: 'article', es: 'article' }` and `is_active: true` |
| Neon DB | Create `ebook_content` rows for fr/en/es with `title`, `chapters`, `features`, `stats`, `testimonial`, `image_url`, `pages` (DB overrides the static config) |
| `scripts/generate-ebook-image.mjs` | **New** — OpenRouter image generator |
| `public/images/ebooks/ai-act-2026-europe.png` | Generated cover |
| `.env.example` | Document `OPENROUTER_API_KEY` |

## What's NOT modified (verified)

- `EbookSettingsForm.tsx` — already has per-locale deliverable type selector. Admin uses it as-is.
- `EbookContentEditor.tsx` — already has per-locale tabs, already gates `htmlContent` / `articleUrl` / `pdfUrl` on the deliverable type. Admin uses it as-is.
- `src/app/api/ebooks/download/route.ts` — already handles all 3 deliverable types. No code change.
- `src/app/[locale]/ebooks/[slug]/page.tsx` — already reads from static + DB overrides. No code change.
- `src/lib/db.ts` — no schema change needed; all required columns already exist.

## Risk & ceilings

- **Image quality is mid-tier** — if the cover looks off, swap to `openai/gpt-5-image` (1-line model string change).
- **Manual image step** — script requires `OPENROUTER_API_KEY` in env, runs once. Not part of CI/build.
- **EN/ES articles must exist** at the time EN/ES users hit the form, or the redirect 404s. The download API gracefully returns no `redirectUrl` if `article_url` is empty (verify during smoke test). Action: confirm the EN/ES articles are published before flipping the deliverable type from `pdf` to `article` for those locales.
- **No DB schema migration** — additive data only.

## Implementation order (handed off to writing-plans)

1. Add the static entry to `src/lib/ebooks.ts` (data only).
2. Create the `ebook_catalog` row via Neon MCP (`deliverable_types`, `is_active=true`).
3. Create the `ebook_content` rows via Neon MCP (fr/en/es content + image URL + article URLs).
4. Write `scripts/generate-ebook-image.mjs`.
5. Run the script, commit the generated image.
6. Smoke test: visit `/fr/ebooks/ai-act-2026-europe`, submit form, verify PDF download OR article redirect per locale. Verify the admin edit page loads at `/dashboard/admin/ebooks/ai-act-2026-europe/edit`.
