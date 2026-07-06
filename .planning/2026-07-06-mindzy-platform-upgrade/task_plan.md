# Mindzy Platform Upgrade — Implementation Plan

## Goal

Replace the custom dashboard session/auth layer with Better Auth + RBAC, restructure the admin around six clear modules (Ebooks, Waiting Lists, Blogs, Blog Sites, Leads/Prospects, Blog Ideas/Content Pipeline), and make every content entity AI-agent addressable through typed API surfaces and reusable agent skills.

## Current Phase

**Phase 1 — Foundation & Auth**  
Status: `completed`. Better Auth integrated, RBAC schema in place, default admin seeded, dashboard middleware protects `/dashboard/*` (legacy client portal stays on `/dashboard/client/*`), login/logout wired, admin sidebar restructured.

**Next: Phase 2 — Database migrations & data model for Blog Sites, Waiting Lists v2, and Unified Leads.**

---

## 1. Context & Existing State

| Area | Current State |
|------|---------------|
| Framework | Next.js 16 App Router, React 19, Tailwind CSS, 10-locale routing (`/[locale]/...`), French default. |
| Auth | Custom HMAC cookie + scrypt in `src/lib/dashboard-auth.ts`; login route validates env `DASHBOARD_ADMIN_EMAIL`/`DASHBOARD_ADMIN_PASSWORD`. |
| Database | Neon Postgres via `@neondatabase/serverless`. Idempotent schema init in `src/lib/db.ts`. |
| Ebooks | `ebook_catalog`, `ebook_content`, `ebook_leads`, `ebook_orders` exist. Static catalog in `src/lib/ebooks.ts` is still used as fallback. No public `/[locale]/ebooks/[slug]` route exists today. |
| Waiting list | `waitlist_entries` and `ai_waitlist` tables. Public pages `/[locale]/waiting-list` and `/[locale]/ai-waitlist`. Admin is a single global table. |
| Blogs / clients | `dashboard_clients` drives multi-tenant articles. `blog_ideas` + `blog_articles` reference `dashboard_clients`. Markdown posts in `content/blog/[locale]/*.md` merge with DB articles in `src/lib/blog-resolver.ts`. |
| Leads | No unified `leads` table; data lives in `ebook_leads`, `waitlist_entries`, and `audit_requests`. |
| Admin UX | Sidebar in `src/components/dashboard/Sidebar.tsx`: Mon blog, Clients, Ebooks, Services, Profils, Liste d'attente, Importer articles. |
| Skills | Existing skill format at `.claude/skills/add-free-guide/SKILL.md`; lock file `skills-lock.json`. |

---

## 2. Non-Negotiables

1. **No data loss.** All migrations are additive. Old columns/tables stay until explicitly deprecated in a later phase.
2. **Better Auth.** Email/password with RBAC. Default admin `contact@mindzy.me`, seeded safely, password must be changed on first login or injected via env.
3. **Server-side authorization.** Every admin API/server action validates role; public routes remain accessible without auth.
4. **i18n preserved.** All user-facing strings support fr/en/es and fall back to French.
5. **GEO/llms.txt kept current.** New public surfaces (ebooks, waiting lists, blog sites) feed into `public/llms.txt`.
6. **Agent-ready.** Every module exposes a typed API + a corresponding `.claude/skills/*/SKILL.md`.

---

## 3. Target Information Architecture

### Admin Sidebar (new)

```
Dashboard
├── Overview
Ebooks
├── All ebooks         (card list, default view)
├── New ebook          (guided wizard)
Waiting Lists
├── All waiting lists  (card list)
├── New waiting list
Blogs
├── Articles           (all sites, filterable)
├── New article
├── Blog Ideas         (content pipeline)
├── New idea
Blog Sites
├── All sites
├── New site
Leads & Prospects
├── All leads
├── Import / sync
Settings
├── Users & RBAC
├── Organization
├── Integrations
```

### Public Routes to Add/Restore

- `/[locale]/ebooks` — ebook directory.
- `/[locale]/ebooks/[slug]` — ebook landing + download form.
- `/[locale]/wl/[slug]` — product-specific waiting list page (replaces `/waiting-list` eventually; keep redirects).
- `/[locale]/blog` and `/[locale]/blog/[slug]` already exist; enhance with site-scoped metadata.

---

## 4. Data Model Changes

### 4.1 Auth & Users (Better Auth)

- Add package `better-auth` + optional Drizzle adapter. Use the existing `@neondatabase/serverless` driver.
- Better Auth will create its own tables (`user`, `session`, `account`, `verification`).
- Extend the generated `user` table with:
  - `role TEXT NOT NULL DEFAULT 'editor'` — `admin | editor | viewer`
  - `is_active BOOLEAN NOT NULL DEFAULT TRUE`
  - `created_at`, `updated_at` mirrors.
- Seed: on first init, if no active admin exists, create user `contact@mindzy.me`, role `admin`, password from env `ADMIN_INITIAL_PASSWORD` or a generated secure value printed once to logs. Force a password change via UI.

### 4.2 Blog Sites

New table `blog_sites`:

```sql
CREATE TABLE IF NOT EXISTS blog_sites (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  domain      TEXT,
  is_default  BOOLEAN NOT NULL DEFAULT FALSE,
  settings    JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Migration actions:
- Insert default site `mindzy` (`is_default = TRUE`).
- Add `blog_site_id INTEGER REFERENCES blog_sites(id)` to `blog_ideas` and `blog_articles`.
- Map existing `mindzy` client rows to the default site; map other clients to implicit sites created from `dashboard_clients`.

### 4.3 Unified Leads

New table `leads`:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id              SERIAL PRIMARY KEY,
  email           TEXT NOT NULL,
  first_name      TEXT,
  last_name       TEXT,
  company         TEXT,
  role            TEXT,
  phone           TEXT,
  locale          TEXT NOT NULL DEFAULT 'fr',
  source          TEXT NOT NULL,           -- ebook | waitlist | audit | manual | import
  source_detail   JSONB,                   -- { ebook_slug, waiting_list_slug, original_id, url }
  status          TEXT NOT NULL DEFAULT 'new', -- new | contacted | qualified | converted | archived
  tags            TEXT[],
  notes           JSONB DEFAULT '[]',
  gdpr_consent    BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_leads_email ON leads(LOWER(email));
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

- Add `lead_id INTEGER REFERENCES leads(id)` to `ebook_leads` and `waitlist_entries`.
- Backfill: insert every existing `ebook_leads` and `waitlist_entries` row into `leads`, then update foreign keys.

### 4.4 Ebooks

Add to `ebook_catalog`:

```sql
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft'
  CHECK (status IN ('draft','scheduled','published','archived'));
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS author_id INTEGER;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS geo_keywords TEXT[];
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS canonical_slug TEXT;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS form_fields JSONB DEFAULT '["email","firstName","lastName","company","role"]';
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS thank_you_redirect_url TEXT;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS calendly_url TEXT;
ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS download_count INTEGER NOT NULL DEFAULT 0;
```

`ebook_content` (locale-specific landing content):

```sql
ALTER TABLE ebook_content ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE ebook_content ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE ebook_content ADD COLUMN IF NOT EXISTS geo_metadata JSONB DEFAULT '{}';
```

### 4.5 Waiting Lists

New table `waiting_lists`:

```sql
CREATE TABLE IF NOT EXISTS waiting_lists (
  id                  SERIAL PRIMARY KEY,
  slug                TEXT UNIQUE NOT NULL,
  name                TEXT NOT NULL,
  description         TEXT,
  locale              TEXT NOT NULL DEFAULT 'fr',
  status              TEXT NOT NULL DEFAULT 'active', -- active | paused | archived
  form_fields         JSONB DEFAULT '["firstName","lastName","email","company","role","companySize","useCase"]',
  hero_title          TEXT,
  hero_subtitle       TEXT,
  benefits            JSONB DEFAULT '[]',
  thank_you_message   TEXT,
  redirect_url        TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

- Add `waiting_list_id INTEGER REFERENCES waiting_lists(id)` to `waitlist_entries`.
- The existing `/api/waitlist` route continues to default to the legacy `ai-employee` list.

### 4.6 Blog Articles & Ideas

`blog_articles`:

```sql
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS blog_site_id INTEGER REFERENCES blog_sites(id);
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS author_id INTEGER;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS blocks JSONB DEFAULT '[]';         -- block-based body
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS geo_keywords TEXT[];
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS related_article_slugs TEXT[];
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS internal_links JSONB DEFAULT '[]';
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
-- status already exists; migrate values and add CHECK
ALTER TABLE blog_articles DROP CONSTRAINT IF EXISTS blog_articles_status_check;
ALTER TABLE blog_articles ADD CONSTRAINT blog_articles_status_check
  CHECK (status IN ('draft','scheduled','published','archived','pending_review','approved','rejected'));
```

`blog_ideas`:

```sql
ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS blog_site_id INTEGER REFERENCES blog_sites(id);
ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS assigned_to INTEGER;
ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS target_keyword TEXT;
ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual'; -- manual | agent | import
ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium'; -- low | medium | high
ALTER TABLE blog_ideas DROP CONSTRAINT IF EXISTS blog_ideas_status_check;
ALTER TABLE blog_ideas ADD CONSTRAINT blog_ideas_status_check
  CHECK (status IN ('waiting','in_progress','done','archived','idea','planned'));
```

- Migration maps old statuses: `idea`/`planned` → `waiting`, `in_progress` stays, `done` stays, `generating`/`pending_review`/`approved`/`published`/`rejected` belong to articles.

---

## 5. Phase-by-Phase Implementation

> Each phase ends with a reviewable diff, a build, and a progress update in `progress.md`.

### Phase 0 — Foundation & Auth (this approval step + first implementation)

**Deliverables**
- Install `better-auth` and configure Next.js API route `/api/auth/[...all]`.
- Replace `src/lib/dashboard-auth.ts` with a thin wrapper around Better Auth server client.
- Update `src/middleware.ts` to validate Better Auth session for `/dashboard/*`.
- Add RBAC helpers: `requireAdmin()`, `requireRole('editor')`.
- Seed default admin `contact@mindzy.me` safely via `src/lib/db.ts` init.
- Update `src/components/dashboard/Sidebar.tsx` with the new module grouping (placeholder links).

**Acceptance**
- `/dashboard/login` uses Better Auth.
- Non-authenticated users hitting `/dashboard/*` are redirected to login.
- `admin` role can access everything; `editor` cannot manage users; `viewer` is read-only.

### Phase 1 — Database Migrations & Data Model

**Deliverables**
- Extend `initDB()` in `src/lib/db.ts` with all new tables/columns in idempotent form (`CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`).
- Add migration scripts under `src/lib/migrations/` (or SQL files in `scripts/migrations/`) for backfills:
  - Create `blog_sites` and map `dashboard_clients`.
  - Create default `mindzy` site.
  - Backfill `leads` from `ebook_leads` + `waitlist_entries` and set foreign keys.
  - Migrate article/idea statuses.
- Update TypeScript types in `src/lib/db.ts` and `src/lib/types.ts`.
- Write unit-like smoke tests that run `initDB()` and assert tables exist.

**Acceptance**
- `npm run build` passes.
- `initDB()` runs idempotently without errors on an existing production-like dump.
- All old rows remain reachable.

### Phase 2 — Admin Information Architecture

**Deliverables**
- Implement new sidebar with sections and active-state logic.
- Create empty but routed module index pages:
  - `/dashboard/admin/ebooks`
  - `/dashboard/admin/waiting-lists`
  - `/dashboard/admin/blogs`
  - `/dashboard/admin/blog-sites`
  - `/dashboard/admin/leads`
  - `/dashboard/admin/blog-ideas`
  - `/dashboard/admin/settings`
- Move old `/dashboard/admin/clients/[slug]` article/idea UI into `/dashboard/admin/blogs` and `/dashboard/admin/blog-ideas`.
- Retire the old `Clients` index; replace with `Blog Sites` + `Settings`.

**Acceptance**
- Sidebar navigation matches the target architecture.
- All previous admin URLs either redirect or still render content.

### Phase 3 — Ebook Builder

**Deliverables**
- Admin list: card grid at `/dashboard/admin/ebooks` (status badges, filters, search).
- Admin wizard: refactor `/dashboard/admin/ebooks/new/NewEbookWizard.tsx` into a multi-step form:
  1. Identity (slug, title, subtitle, locale, status, schedule)
  2. Content (cover, chapters, features, stats, testimonial)
  3. SEO/GEO (meta title/description, keywords, canonical, OG image)
  4. Form & redirect (form fields, thank-you redirect, Calendly)
  5. Preview + publish
- Admin detail: `/dashboard/admin/ebooks/[slug]` with KPIs, leads table, settings, content editor.
- Public routes: `/[locale]/ebooks` and `/[locale]/ebooks/[slug]`; download form posts to `/api/ebooks/download` and records a lead.
- Migrate static `src/lib/ebooks.ts` entries into DB rows on init.
- Update `public/llms.txt` with ebook URLs.

**Acceptance**
- An admin can create, schedule, publish, and archive an ebook.
- Public landing pages render for all 10 locales (fallback to FR).
- Submissions create both an `ebook_leads` row and a unified `leads` row.

### Phase 4 — Waiting List Module

**Deliverables**
- Admin: `/dashboard/admin/waiting-lists` card list; `/dashboard/admin/waiting-lists/new` creation wizard; `/dashboard/admin/waiting-lists/[slug]` detail with submissions, filters, CSV export.
- Public: `/[locale]/wl/[slug]` renders the waiting-list page from DB. Keep `/[locale]/ai-waitlist` as a redirect to `/[locale]/wl/ai-employee`.
- Update `/api/waitlist` to accept `waitingListSlug`, validate, and write to both `waitlist_entries` and `leads`.
- Admin submissions table shows source, locale, and lead status.

**Acceptance**
- Product-specific waiting list pages exist.
- Admin card list is the default view.
- CSV export works.

### Phase 5 — Leads / Prospects Module

**Deliverables**
- `/dashboard/admin/leads`: table with filters (source, status, locale, date), search, tags, bulk actions.
- Lead detail page `/dashboard/admin/leads/[id]` showing full history (ebook downloads, waitlist signups, notes).
- `/api/leads` CRUD with server-side validation and role checks.
- Merge duplicate leads by email on import.
- CSV export and optional CSV import.

**Acceptance**
- All `ebook_leads` and `waitlist_entries` appear as leads with source tags.
- Filtering and export work server-side.

### Phase 6 — Blogs & Blog Sites Overhaul

**Deliverables**
- Admin: `/dashboard/admin/blog-sites` CRUD; `/dashboard/admin/blogs` filterable by site; article editor with block-based content (start with a small set: hero/heading/paragraph/quote/image/cta).
- Public: enhance `/[locale]/blog` and `/[locale]/blog/[slug]` to respect `blog_sites` metadata (default site = `mindzy`).
- Internal linking suggestions stored in `internal_links` JSONB; related posts from `related_article_slugs`.
- SEO/GEO controls: meta title/description, keywords, canonical, OG image.
- Migration: convert existing `content_html` articles to a single `paragraph` block; preserve content.

**Acceptance**
- Multi-site support works: articles belong to a site.
- Existing blog still renders unchanged.
- New block editor saves and renders articles.

### Phase 7 — Blog Ideas / Content Pipeline

**Deliverables**
- `/dashboard/admin/blog-ideas` pipeline board (waiting | in_progress | done | archived).
- Idea detail with assignee, due date, target keyword, linked article.
- `/api/dashboard/blog-ideas` CRUD.
- Bulk import from CSV/Google Sheet retained and moved to this module.
- Automation-ready: ideas can be created via API with `source = 'agent'`.

**Acceptance**
- Status transitions work.
- Ideas can be promoted into a draft article in one click.

### Phase 8 — Agent Skills & Automation Hooks

**Deliverables**
- Create skill `.claude/skills/create-ebook/SKILL.md` using `create-skill` format:
  - Inputs: title, target audience, key takeaways, locale.
  - Output: DB insert into `ebook_catalog` + `ebook_content` as `draft`.
- Create skill `.claude/skills/create-blog-post/SKILL.md`:
  - Inputs: blog site slug, idea/title, target keyword, tone, locale.
  - Output: `blog_ideas` row or `blog_articles` draft with blocks.
- Update `skills-lock.json` if the skills are external/registered.
- Add lightweight webhook/API surface for agent-initiated actions (`/api/agent/ebooks`, `/api/agent/articles`) protected by an `AGENT_API_TOKEN` env secret + role check.

**Acceptance**
- Skills validate inputs and write to the correct tables.
- Agent endpoints return structured JSON and log to a new `agent_events` table (optional).

### Phase 9 — Testing, GEO, & Handoff

**Deliverables**
- Run `npm run build` and `npm run lint`.
- Verify all admin routes with role matrix.
- Update `public/llms.txt` with new public URLs (ebooks, waiting lists, blog sites).
- Add at least one basic E2E smoke test for auth + ebook creation flow.
- Document new env vars in a `.env.example` update.

**Acceptance**
- Build and lint pass.
- Admin smoke tests pass.
- `llms.txt` is accurate.

---

## 6. New/Updated Files (High-Level)

| Path | Purpose |
|------|---------|
| `src/lib/auth.ts` | Better Auth server/client wrapper (replaces `dashboard-auth.ts`). |
| `src/lib/db.ts` | Extended schema init + types. |
| `src/lib/migrations/*.sql` or inline migration helpers | Backfills and status migrations. |
| `src/lib/leads.ts` | Unified lead data access. |
| `src/lib/blog-sites.ts` | Blog site helpers. |
| `src/middleware.ts` | Better Auth session checks for `/dashboard/*`. |
| `src/app/api/auth/[...all]/route.ts` | Better Auth handler. |
| `src/app/api/ebooks/download/route.ts` | Download + lead capture. |
| `src/app/api/waitlist/route.ts` | Product-aware waitlist signup. |
| `src/app/api/leads/route.ts` | Lead CRUD + export. |
| `src/app/api/agent/**/*.ts` | Agent-facing endpoints. |
| `src/app/dashboard/admin/**/*` | New module pages. |
| `src/components/dashboard/Sidebar.tsx` | Reorganized navigation. |
| `src/app/[locale]/ebooks/**/*` | Public ebook directory + landing. |
| `src/app/[locale]/wl/[slug]/page.tsx` | Public waiting-list pages. |
| `.claude/skills/create-ebook/SKILL.md` | Agent skill. |
| `.claude/skills/create-blog-post/SKILL.md` | Agent skill. |
| `public/llms.txt` | Updated GEO manifest. |

---

## 7. Environment Variables

Add to `.env.example`:

```bash
# Better Auth
BETTER_AUTH_SECRET=            # openssl rand -base64 32
BETTER_AUTH_URL=https://mindzy.me
ADMIN_INITIAL_PASSWORD=        # one-time seed password for contact@mindzy.me

# Agent API
AGENT_API_TOKEN=               # long random secret for agent skills / webhooks

# Existing (keep)
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=https://mindzy.me
```

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Better Auth schema conflicts with existing custom auth | Run Better Auth migration in a temporary branch; verify with a fresh Neon branch. |
| Data migration fails on production rows | Backups via `pg_dump` before first deploy; migrations tested on a copy. |
| Public ebook pages missing static fallback | Keep `src/lib/ebooks.ts` as read-only fallback until DB rows are fully populated. |
| Admin users locked out during cutover | Keep old `/api/dashboard/login` disabled only after verifying Better Auth login works; provide a recovery seed flow. |
| Large blog content_html → blocks migration | Convert lazily: if `blocks` is empty, render `content_html` as a single paragraph block. |

---

## 9. Open Questions

1. Should the existing `dashboard_clients` concept be fully replaced by `blog_sites`, or should clients remain as billing/ingest owners that own many sites? **Proposal:** keep `dashboard_clients` as a billing/persona entity; blogs move to `blog_sites`. One client can own many sites later.
2. Do you want the public waiting-list pages to replace `/[locale]/waiting-list` and `/[locale]/ai-waitlist`, or just add `/wl/[slug]` alongside them? **Proposal:** keep old URLs as 308 redirects to `/wl/ai-employee`.
3. Do you want Stripe/ebook payment flow preserved, or can `ebook_orders` be left untouched? **Proposal:** leave `ebook_orders` untouched in this phase; focus on lead capture and free/scheduled ebooks.
4. Should agent skills live in this repo or in the external skills repo referenced by `skills-lock.json`? **Proposal:** create them in this repo under `.claude/skills/` and reference them in `skills-lock.json` if a registry is used.

---

## 10. Acceptance Criteria (overall)

- [ ] Better Auth login works; default admin seeded with `contact@mindzy.me`.
- [ ] Admin sidebar shows Ebooks, Waiting Lists, Blogs, Blog Sites, Leads/Prospects, Blog Ideas, Settings.
- [ ] Ebooks can be created via wizard, scheduled/published/archived, previewed, and downloaded publicly.
- [ ] Waiting lists are product-specific with card list admin and detail submissions.
- [ ] All lead magnets feed the unified `leads` table with source tracking, filtering, and export.
- [ ] Blogs support multiple sites, block content, SEO/GEO metadata, related posts, and internal links.
- [ ] Blog ideas pipeline supports `waiting | in_progress | done | archived`.
- [ ] Two agent skills exist for ebook creation and blog post creation.
- [ ] `npm run build` and `npm run lint` pass; `public/llms.txt` is updated.

---

## 11. Next Step

Approve this plan so implementation can begin with **Phase 0 — Foundation & Auth**.
