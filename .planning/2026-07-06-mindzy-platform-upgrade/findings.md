# Findings & Decisions — Mindzy Platform Upgrade

## Requirements

From the original request:

- Replace custom admin auth with Better Auth + email/password + RBAC, default admin `contact@mindzy.me`.
- Restructure admin navigation into modules: Ebooks, Waiting Lists, Blogs, Blog Sites, Leads/Prospects, Blog Ideas/Content Pipeline, Settings.
- Ebook module: guided multi-step creation, preview, statuses `draft | scheduled | published | archived`, submissions, SEO/GEO metadata, agent skill.
- Waiting list module: product-specific waiting-list pages, card list default admin view, detail with submissions.
- Leads/prospects: unified structured capture from all lead magnets, source tracking, filtering, export, dedicated admin area.
- Blogs overhaul: rename to Blogs, multi-site support via `BlogSites`, block-based content, SEO/GEO controls, internal linking, related posts, Blog Ideas pipeline statuses `done | in_progress | waiting`.
- Create reusable agent skills for ebook creation and blog post creation.
- Preserve existing data, add migrations, server-side validation and authorization.

## Research Findings

- **Framework:** Next.js 16 App Router, React 19, Tailwind, 10-locale routing (`/[locale]/...`), French default.
- **Auth:** `src/lib/dashboard-auth.ts` implements custom HMAC cookie + scrypt. Login route at `/api/dashboard/login` validates env `DASHBOARD_ADMIN_EMAIL`/`DASHBOARD_ADMIN_PASSWORD`.
- **Database:** `src/lib/db.ts` uses `@neondatabase/serverless` with idempotent `initDB()`.
- **Existing tables relevant to the upgrade:**
  - `ebook_catalog`, `ebook_content`, `ebook_leads`, `ebook_orders`
  - `waitlist_entries`, `ai_waitlist`
  - `dashboard_clients`, `blog_ideas`, `blog_articles`
  - `services`, `profiles`, `audit_requests`
- **Existing admin UI:** `src/components/dashboard/Sidebar.tsx` with Mon blog, Clients, Ebooks, Services, Profils, Liste d'attente, Importer articles.
- **Existing public surfaces:**
  - `/[locale]/waiting-list` — legacy waiting-list form.
  - `/[locale]/ai-waitlist` — newer AI waitlist landing.
  - No public `/[locale]/ebooks/[slug]` route exists despite DB support (`ebook_content`).
  - Blog uses markdown in `content/blog/[locale]/*.md` merged with DB articles via `src/lib/blog-resolver.ts`.
- **Existing agent-friendly skill format:** `.claude/skills/add-free-guide/SKILL.md` and `skills-lock.json`.

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Use Better Auth with `@neondatabase/serverless` driver | Matches existing DB driver; avoids adding a second pool/connection library. |
| Keep `dashboard_clients` as billing/persona entity; introduce `blog_sites` for multi-site blogs | Minimizes migration risk; clients can own many sites later. |
| Add a unified `leads` table and backfill from `ebook_leads` + `waitlist_entries` | Gives a single source of truth for prospects while preserving original tables. |
| Store block-based article content in `blog_articles.blocks` JSONB | Flexible schema; migration from HTML is lazy/safe. |
| Use `status` enums with `CHECK` constraints | Enforces data integrity at the DB level. |
| Agent skills live in `.claude/skills/` inside this repo | Easiest to maintain and version alongside the data model. |
| All migrations additive | No data loss; old columns remain until explicitly deprecated. |

## Issues Encountered

| Issue | Resolution |
|-------|------------|
| No `.claude/plans/` directory existed | Created it and wrote the plan there; also mirrored to `.planning/2026-07-06-mindzy-platform-upgrade/task_plan.md`. |
| `ebook_content` and `ebook_catalog` are split across tables | Plan keeps `ebook_catalog` for global metadata/status/pricing and `ebook_content` for per-locale landing copy; no merge needed. |
| Existing blog article status values include `generating`, `pending_review`, etc., while ideas use `idea`, `planned`, etc. | Plan migrates article statuses to `draft | scheduled | published | archived | pending_review | approved | rejected` and idea statuses to `waiting | in_progress | done | archived | idea | planned` with value mapping during migration. |

## Resources

- Better Auth docs: https://www.better-auth.com/
- Existing auth file: `src/lib/dashboard-auth.ts`
- Existing DB init: `src/lib/db.ts`
- Existing sidebar: `src/components/dashboard/Sidebar.tsx`
- Existing ebook admin: `src/app/dashboard/admin/ebooks/page.tsx`
- Existing skill template: `.claude/skills/add-free-guide/SKILL.md`

---

*Updated after audit phase — 2026-07-06.*
