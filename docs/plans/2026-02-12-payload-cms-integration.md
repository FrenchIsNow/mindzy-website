# Payload CMS Integration — Full Content Migration

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all hardcoded static content in `src/lib/config.ts` with Payload CMS 3.x, giving Mindzy a full admin panel at `/admin` with localized content management (fr/en/es).

**Architecture:** Payload CMS 3.x embeds directly into the existing Next.js 16 app using route groups. The `src/app/` directory splits into `(frontend)` (existing site) and `(payload)` (admin panel + API). All content moves from TypeScript files to a PostgreSQL database (Neon), queried via Payload's Local API in server components. Media uploads go to Vercel Blob.

**Tech Stack:** Payload CMS 3.x, PostgreSQL (Neon), Vercel Blob Storage, Lexical rich text editor, Next.js 16, React 19, TypeScript.

**Decisions:**
- Database: PostgreSQL via Neon (serverless, free tier)
- Storage: Vercel Blob
- Content scope: Full migration (blog, portfolio, testimonials, FAQs, pricing, resources, before/after, site settings)
- Admin path: `/admin` (default)

---

## Phase 1: Foundation

### Task 1: Install Payload CMS Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install core Payload packages**

Run:
```bash
npm i --legacy-peer-deps payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql
```

Expected: Packages install successfully.

**Step 2: Install database adapter (Neon PostgreSQL)**

Run:
```bash
npm i --legacy-peer-deps @payloadcms/db-postgres
```

**Step 3: Install storage adapter (Vercel Blob)**

Run:
```bash
npm i --legacy-peer-deps @payloadcms/storage-vercel-blob
```

**Step 4: Install admin panel translations**

Run:
```bash
npm i --legacy-peer-deps @payloadcms/translations
```

**Step 5: Verify installation**

Run:
```bash
npm ls payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/storage-vercel-blob @payloadcms/translations sharp graphql
```

Expected: All packages listed without errors.

**Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Payload CMS 3.x dependencies"
```

---

### Task 2: Create Payload Config and Update Build Config

**Files:**
- Create: `payload.config.ts` (project root)
- Modify: `next.config.ts`
- Modify: `tsconfig.json`

**Step 1: Create `payload.config.ts` at project root**

```typescript
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { fr } from '@payloadcms/translations/languages/fr'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(import.meta.dirname),
    },
  },
  collections: [Users, Media],
  globals: [],
  localization: {
    locales: [
      { label: 'Francais', code: 'fr' },
      { label: 'English', code: 'en', fallbackLocale: 'fr' },
      { label: 'Espanol', code: 'es', fallbackLocale: 'fr' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { fr, en, es },
    fallbackLanguage: 'fr',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  typescript: {
    outputFile: path.resolve(import.meta.dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
```

**Step 2: Update `next.config.ts` to wrap with `withPayload`**

Replace the entire file with:

```typescript
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}

export default withPayload(nextConfig)
```

**Step 3: Add `@payload-config` path alias to `tsconfig.json`**

Add this entry to `compilerOptions.paths`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./payload.config.ts"]
    },
    "target": "ES2017"
  }
}
```

**Step 4: Add environment variables to `.env.local`**

Append these lines to `.env.local`:

```
PAYLOAD_SECRET=<generate-a-random-64-char-string>
DATABASE_URL=<neon-postgres-connection-string>
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
```

> **Note:** Create a Neon project at https://console.neon.tech and copy the connection string. Get a Vercel Blob token from your Vercel project settings > Storage. For local dev, leave `BLOB_READ_WRITE_TOKEN` empty and Payload will use local storage.

**Step 5: Verify config files parse correctly**

Run:
```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: May show errors about missing collection files (created in Task 3). No config-level errors.

**Step 6: Commit**

```bash
git add payload.config.ts next.config.ts tsconfig.json
git commit -m "feat: add Payload CMS config, wrap next.config with withPayload"
```

---

### Task 3: Create Users and Media Collections

**Files:**
- Create: `src/collections/Users.ts`
- Create: `src/collections/Media.ts`

**Step 1: Create `src/collections/Users.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
```

**Step 2: Create `src/collections/Media.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
```

**Step 3: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: Clean or only unrelated warnings.

**Step 4: Commit**

```bash
git add src/collections/
git commit -m "feat: add Users and Media Payload collections"
```

---

### Task 4: Restructure App Directory with Route Groups

This is the most critical structural change. The existing `src/app/` files must be reorganized so Payload can have its own route group.

**Files:**
- Move: `src/app/layout.tsx` → `src/app/(frontend)/layout.tsx`
- Move: `src/app/globals.css` → stays at `src/app/globals.css` (shared)
- Move: `src/app/[locale]/` → `src/app/(frontend)/[locale]/`
- Move: `src/app/robots.ts` → `src/app/(frontend)/robots.ts` (if exists)
- Move: `src/app/sitemap.ts` → `src/app/(frontend)/sitemap.ts` (if exists)
- Create: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- Create: `src/app/(payload)/admin/importMap.js`
- Create: `src/app/(payload)/api/[...slug]/route.ts`
- Create: `src/app/(payload)/api/graphql/route.ts` (optional)
- Create: `src/app/(payload)/layout.tsx`
- Create: `src/app/(payload)/custom.scss` (optional, empty)

**Step 1: Create the `(frontend)` route group and move existing files**

```bash
mkdir -p src/app/\(frontend\)
# Move the root layout into (frontend)
mv src/app/layout.tsx src/app/\(frontend\)/layout.tsx
# Move locale routes
mv src/app/\[locale\] src/app/\(frontend\)/\[locale\]
```

> **IMPORTANT:** Also move any API routes that are NOT Payload's. The existing `src/app/api/` routes (whatsapp, leads) should stay accessible. Check if they need to move into `(frontend)` or stay at `src/app/api/` — routes outside route groups are still accessible. **Leave `src/app/api/` where it is** since Payload's API uses `(payload)/api/[...slug]/` which catches only `/api/{payload-collections}`.

Wait — Payload's catch-all at `(payload)/api/[...slug]/route.ts` will conflict with the existing `src/app/api/whatsapp/` and `src/app/api/leads/` routes. **Next.js route specificity means explicit routes (`api/whatsapp/send`) take precedence over catch-all routes (`api/[...slug]`).** So the existing API routes can stay at `src/app/api/` and Payload's catch-all will only handle routes not matched by explicit routes.

Actually, to be safe and avoid conflicts: **move existing API routes into `(frontend)`:**

```bash
mv src/app/api src/app/\(frontend\)/api
```

Then Payload's `(payload)/api/` routes handle only Payload endpoints.

**Step 2: Create the root layout at `src/app/layout.tsx`**

Since we moved the layout into `(frontend)`, we need a new minimal root layout:

```typescript
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

> **Note:** This is a bare root layout that just passes children through. The `(frontend)/layout.tsx` keeps all the existing metadata, fonts, GA, etc. The `(payload)/layout.tsx` will have Payload's own layout.

Wait — Next.js requires the root layout to render `<html>` and `<body>`. Since both `(frontend)` and `(payload)` need different `<html>` setups, each route group layout must include its own `<html>` and `<body>`. The root layout at `src/app/layout.tsx` should NOT render `<html>/<body>` — actually in Next.js App Router with route groups, if every route group has its own layout with `<html>/<body>`, the root layout is NOT needed. But if a root `layout.tsx` exists, it must render `<html>/<body>`.

**Correct approach:** Delete the root `src/app/layout.tsx` entirely. Each route group has its own root layout with `<html>/<body>`.

```bash
# The (frontend)/layout.tsx already has <html> and <body> from the original layout.tsx. Good.
# We just need to make sure globals.css is imported correctly.
```

Update `(frontend)/layout.tsx` to import globals.css with the correct relative path:

Change `import './globals.css'` to `import '../globals.css'` (since globals.css stays in `src/app/`).

**Step 3: Create Payload route group files**

Create `src/app/(payload)/layout.tsx`:

```tsx
import type React from 'react'
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap.js'
import '../globals.css'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap}>
    {children}
  </RootLayout>
)

export default Layout
```

Create `src/app/(payload)/admin/[[...segments]]/page.tsx`:

```tsx
import type { AdminViewServerProps } from 'payload'
import { RenderServerComponent } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

const Page = async ({ params, searchParams }: Args) => {
  const serverProps: AdminViewServerProps = {
    initPageResult: undefined as any,
    params: await params,
    searchParams: await searchParams,
  }
  return RenderServerComponent({
    Component: undefined,
    Fallback: undefined,
    importMap,
    serverProps,
  })
}

export default Page
```

> **Note on the admin page:** The exact boilerplate may vary depending on the Payload version. After installing, check the [Payload blank template](https://github.com/payloadcms/payload/tree/main/templates/blank) for the latest version of these files. The `importMap.js` is auto-generated by Payload on first build.

Create `src/app/(payload)/admin/[[...segments]]/not-found.tsx`:

```tsx
import type { AdminViewServerProps } from 'payload'
import { RenderServerComponent } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

const NotFound = async ({ params, searchParams }: Args) => {
  const serverProps: AdminViewServerProps = {
    initPageResult: undefined as any,
    params: await params,
    searchParams: await searchParams,
  }
  return RenderServerComponent({
    Component: undefined,
    Fallback: undefined,
    importMap,
    serverProps,
  })
}

export default NotFound
```

Create `src/app/(payload)/admin/importMap.js`:

```javascript
// This file is auto-generated by Payload during the build step.
// DO NOT edit this file manually.
export const importMap = {}
```

Create `src/app/(payload)/api/[...slug]/route.ts`:

```typescript
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
```

Create `src/app/(payload)/api/graphql/route.ts` (optional but recommended):

```typescript
import { GRAPHQL_POST } from '@payloadcms/next/routes'
import config from '@payload-config'

export const POST = GRAPHQL_POST(config)
```

**Step 4: Update middleware to exclude Payload routes**

Modify `src/middleware.ts` — add an early return for `/admin`:

Current line 18:
```typescript
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.') || pathname === '/favicon.ico')
```

Change to:
```typescript
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.') || pathname === '/favicon.ico')
```

This ensures the locale middleware does not redirect `/admin` to `/fr/admin`.

**Step 5: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Server starts. Visit `http://localhost:3000/admin` — you should see the Payload admin login page (or a setup screen to create the first user).

> **Troubleshooting:** If there are import errors in the `(payload)` files, check the [Payload blank template](https://github.com/payloadcms/payload/tree/main/templates/blank) for the exact file contents matching your Payload version. The admin `page.tsx` and `not-found.tsx` boilerplate can change between minor versions.

**Step 6: Create the first admin user**

Visit `http://localhost:3000/admin` and create an admin account.

**Step 7: Commit**

```bash
git add src/app/ src/middleware.ts
git commit -m "feat: restructure app with route groups, add Payload admin panel"
```

---

## Phase 2: Content Collections

### Task 5: Blog Posts Collection

**Files:**
- Create: `src/collections/BlogPosts.ts`
- Modify: `payload.config.ts` (add to collections array)

**Step 1: Create `src/collections/BlogPosts.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedDate', 'status'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Marketing', value: 'marketing' },
        { label: 'SEO', value: 'seo' },
        { label: 'Productivite', value: 'productivite' },
        { label: 'Business', value: 'business' },
        { label: 'Design', value: 'design' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Mindzy',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

Add import and add to collections array:

```typescript
import { BlogPosts } from '@/collections/BlogPosts'

// In buildConfig:
collections: [Users, Media, BlogPosts],
```

**Step 3: Verify in admin panel**

Run: `npm run dev`
Visit: `http://localhost:3000/admin`
Expected: "Blog Posts" appears in the sidebar under "Content" group.

**Step 4: Commit**

```bash
git add src/collections/BlogPosts.ts payload.config.ts
git commit -m "feat: add BlogPosts Payload collection"
```

---

### Task 6: Portfolio Items Collection

**Files:**
- Create: `src/collections/PortfolioItems.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/collections/PortfolioItems.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const PortfolioItems: CollectionConfig = {
  slug: 'portfolio-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'profession', 'featured'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Therapist', value: 'therapist' },
        { label: 'Clinic', value: 'clinic' },
        { label: 'Coach', value: 'coach' },
        { label: 'E-commerce', value: 'ecom' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'profession',
      type: 'select',
      required: true,
      options: [
        { label: 'Consultant', value: 'consultant' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Therapeute', value: 'therapeute' },
        { label: 'Coach', value: 'coach' },
        { label: 'Boutique', value: 'boutique' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Psychologue', value: 'psychologue' },
        { label: 'Coach Sportif', value: 'coach-sportif' },
        { label: 'Artisan', value: 'artisan' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'External URL to the live site (optional)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { PortfolioItems } from '@/collections/PortfolioItems'

collections: [Users, Media, BlogPosts, PortfolioItems],
```

**Step 3: Verify in admin panel**

Expected: "Portfolio Items" appears under "Content" group.

**Step 4: Commit**

```bash
git add src/collections/PortfolioItems.ts payload.config.ts
git commit -m "feat: add PortfolioItems Payload collection"
```

---

### Task 7: Testimonials Collection

**Files:**
- Create: `src/collections/Testimonials.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/collections/Testimonials.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'profession', 'rating'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'profession',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: { position: 'sidebar' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { Testimonials } from '@/collections/Testimonials'

collections: [Users, Media, BlogPosts, PortfolioItems, Testimonials],
```

**Step 3: Commit**

```bash
git add src/collections/Testimonials.ts payload.config.ts
git commit -m "feat: add Testimonials Payload collection"
```

---

### Task 8: FAQ Items Collection

**Files:**
- Create: `src/collections/FAQItems.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/collections/FAQItems.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const FAQItems: CollectionConfig = {
  slug: 'faq-items',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Technical', value: 'technical' },
        { label: 'Support', value: 'support' },
        { label: 'Features', value: 'features' },
        { label: 'Process', value: 'process' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { FAQItems } from '@/collections/FAQItems'

collections: [Users, Media, BlogPosts, PortfolioItems, Testimonials, FAQItems],
```

**Step 3: Commit**

```bash
git add src/collections/FAQItems.ts payload.config.ts
git commit -m "feat: add FAQItems Payload collection"
```

---

### Task 9: Plans (Pricing) Collection

**Files:**
- Create: `src/collections/Plans.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/collections/Plans.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'planId', 'price', 'setup'],
    group: 'Business',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'planId',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Basic', value: 'basic' },
        { label: 'Pro', value: 'pro' },
        { label: 'Business', value: 'business' },
        { label: 'E-commerce', value: 'ecommerce' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: { description: 'Monthly price in EUR' },
    },
    {
      name: 'setup',
      type: 'number',
      required: true,
      admin: { description: 'One-time setup fee in EUR' },
    },
    {
      name: 'pages',
      type: 'number',
      required: true,
    },
    {
      name: 'articles',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'booking',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'payments',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'products',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'gmb',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Google My Business optimization included' },
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
        {
          name: 'included',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
      admin: { description: 'List of features for the pricing card' },
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { Plans } from '@/collections/Plans'

collections: [Users, Media, BlogPosts, PortfolioItems, Testimonials, FAQItems, Plans],
```

**Step 3: Commit**

```bash
git add src/collections/Plans.ts payload.config.ts
git commit -m "feat: add Plans Payload collection"
```

---

### Task 10: Resources Collection

**Files:**
- Create: `src/collections/Resources.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/collections/Resources.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'PDF', value: 'pdf' },
        { label: 'Template', value: 'template' },
        { label: 'Guide', value: 'guide' },
        { label: 'Video', value: 'video' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { Resources } from '@/collections/Resources'

collections: [Users, Media, BlogPosts, PortfolioItems, Testimonials, FAQItems, Plans, Resources],
```

**Step 3: Commit**

```bash
git add src/collections/Resources.ts payload.config.ts
git commit -m "feat: add Resources Payload collection"
```

---

### Task 11: Before/After Examples Collection

**Files:**
- Create: `src/collections/BeforeAfterExamples.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/collections/BeforeAfterExamples.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const BeforeAfterExamples: CollectionConfig = {
  slug: 'before-after-examples',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'profession'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'profession',
      type: 'select',
      required: true,
      options: [
        { label: 'Consultant', value: 'consultant' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Therapeute', value: 'therapeute' },
        { label: 'Coach', value: 'coach' },
        { label: 'Boutique', value: 'boutique' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Psychologue', value: 'psychologue' },
        { label: 'Coach Sportif', value: 'coach-sportif' },
        { label: 'Artisan', value: 'artisan' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'before',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'issues',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'issue',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'after',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'improvements',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'improvement',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { BeforeAfterExamples } from '@/collections/BeforeAfterExamples'

collections: [Users, Media, BlogPosts, PortfolioItems, Testimonials, FAQItems, Plans, Resources, BeforeAfterExamples],
```

**Step 3: Commit**

```bash
git add src/collections/BeforeAfterExamples.ts payload.config.ts
git commit -m "feat: add BeforeAfterExamples Payload collection"
```

---

## Phase 3: Globals (Singleton Data)

### Task 12: Site Settings Global

**Files:**
- Create: `src/globals/SiteSettings.ts`
- Modify: `payload.config.ts`

**Step 1: Create `src/globals/SiteSettings.ts`**

```typescript
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteUrl',
      type: 'text',
      defaultValue: 'https://mindzy.me',
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'contact@mindzy.me',
    },
    {
      name: 'calendlyUrl',
      type: 'text',
      defaultValue: 'https://calendly.com/mindzy/consultation',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'whatsapp',
      type: 'group',
      fields: [
        { name: 'phoneNumber', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
```

**Step 2: Register in `payload.config.ts`**

```typescript
import { SiteSettings } from '@/globals/SiteSettings'

// In buildConfig:
globals: [SiteSettings],
```

**Step 3: Verify in admin panel**

Expected: "Site Settings" appears under "Settings" group in sidebar.

**Step 4: Commit**

```bash
git add src/globals/SiteSettings.ts payload.config.ts
git commit -m "feat: add SiteSettings Payload global"
```

---

## Phase 4: Payload Helper & Data Fetching

### Task 13: Create Payload Data Access Helper

**Files:**
- Create: `src/lib/payload.ts`

**Step 1: Create `src/lib/payload.ts`**

This helper provides a clean interface for fetching Payload data in server components:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from './i18n'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getBlogPosts(locale: Locale, limit = 20) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'blog-posts',
    locale,
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit,
    depth: 1,
  })
}

export async function getBlogPost(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function getPortfolioItems(locale: Locale, options?: { featured?: boolean; category?: string; limit?: number }) {
  const payload = await getPayloadClient()
  const where: Record<string, any> = {}
  if (options?.featured !== undefined) where.featured = { equals: options.featured }
  if (options?.category) where.category = { equals: options.category }
  return payload.find({
    collection: 'portfolio-items',
    locale,
    where,
    limit: options?.limit ?? 100,
    depth: 1,
  })
}

export async function getTestimonials(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'testimonials',
    locale,
    limit: 100,
    depth: 1,
  })
}

export async function getFAQItems(locale: Locale, category?: string) {
  const payload = await getPayloadClient()
  const where: Record<string, any> = {}
  if (category) where.category = { equals: category }
  return payload.find({
    collection: 'faq-items',
    locale,
    where,
    sort: 'sortOrder',
    limit: 100,
  })
}

export async function getPlans(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'plans',
    locale,
    limit: 10,
    sort: 'price',
  })
}

export async function getResources(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'resources',
    locale,
    limit: 100,
    depth: 1,
  })
}

export async function getBeforeAfterExamples(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'before-after-examples',
    locale,
    limit: 100,
    depth: 1,
  })
}

export async function getSiteSettings(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'site-settings',
    locale,
    depth: 1,
  })
}
```

**Step 2: Commit**

```bash
git add src/lib/payload.ts
git commit -m "feat: add Payload data access helper functions"
```

---

## Phase 5: Data Seeding

### Task 14: Create Seed Script

**Files:**
- Create: `src/scripts/seed.ts`

This script migrates all existing static data from `src/lib/config.ts` into the Payload database.

**Step 1: Create `src/scripts/seed.ts`**

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { plans, portfolioItems, testimonials, blogPosts, faqItems, resources, beforeAfterExamples, config as siteConfig } from '../lib/config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Seed Plans
  console.log('Seeding plans...')
  for (const plan of plans) {
    await payload.create({
      collection: 'plans',
      data: {
        planId: plan.id,
        name: plan.id.charAt(0).toUpperCase() + plan.id.slice(1),
        price: plan.price,
        setup: plan.setup,
        pages: plan.pages,
        articles: plan.articles,
        booking: plan.booking,
        payments: plan.payments,
        products: plan.products,
        gmb: plan.gmb,
      },
    })
  }

  // Seed Testimonials
  console.log('Seeding testimonials...')
  for (const t of testimonials) {
    await payload.create({
      collection: 'testimonials',
      data: {
        name: t.name,
        profession: t.profession.fr,
        quote: t.quote.fr,
        rating: t.rating,
      },
      locale: 'fr',
    })
    // Update with other locales
    const created = (await payload.find({
      collection: 'testimonials',
      where: { name: { equals: t.name } },
      limit: 1,
    })).docs[0]
    if (created) {
      for (const loc of ['en', 'es'] as const) {
        await payload.update({
          collection: 'testimonials',
          id: created.id,
          data: {
            profession: t.profession[loc],
            quote: t.quote[loc],
          },
          locale: loc,
        })
      }
    }
  }

  // Seed FAQ Items
  console.log('Seeding FAQ items...')
  for (let i = 0; i < faqItems.length; i++) {
    const faq = faqItems[i]
    await payload.create({
      collection: 'faq-items',
      data: {
        question: faq.question.fr,
        answer: faq.answer.fr,
        category: faq.category,
        sortOrder: i,
      },
      locale: 'fr',
    })
    const created = (await payload.find({
      collection: 'faq-items',
      where: { sortOrder: { equals: i } },
      locale: 'fr',
      limit: 1,
    })).docs[0]
    if (created) {
      for (const loc of ['en', 'es'] as const) {
        await payload.update({
          collection: 'faq-items',
          id: created.id,
          data: {
            question: faq.question[loc],
            answer: faq.answer[loc],
          },
          locale: loc,
        })
      }
    }
  }

  // Seed Blog Posts (metadata only — content is in markdown files)
  console.log('Seeding blog posts...')
  for (const post of blogPosts) {
    await payload.create({
      collection: 'blog-posts',
      data: {
        title: post.title.fr,
        slug: post.slug,
        excerpt: post.excerpt.fr,
        category: post.category,
        author: post.author,
        publishedDate: post.date,
        readingTime: post.readingTime,
        status: 'published',
      },
      locale: 'fr',
    })
    const created = (await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })).docs[0]
    if (created) {
      for (const loc of ['en', 'es'] as const) {
        await payload.update({
          collection: 'blog-posts',
          id: created.id,
          data: {
            title: post.title[loc],
            excerpt: post.excerpt[loc],
          },
          locale: loc,
        })
      }
    }
  }

  // Seed Portfolio Items (first 10 specialized ones, skip generated placeholders)
  console.log('Seeding portfolio items...')
  const specializedPortfolio = portfolioItems.filter(p => p.id.startsWith('portfolio-t') || p.id.startsWith('portfolio-p') || p.id.startsWith('portfolio-cs'))
  for (const item of specializedPortfolio) {
    await payload.create({
      collection: 'portfolio-items',
      data: {
        title: item.title.fr,
        description: item.description.fr,
        category: item.category,
        profession: item.profession,
        featured: item.featured ?? false,
      },
      locale: 'fr',
    })
    const created = (await payload.find({
      collection: 'portfolio-items',
      where: { title: { equals: item.title.fr } },
      locale: 'fr',
      limit: 1,
    })).docs[0]
    if (created) {
      for (const loc of ['en', 'es'] as const) {
        await payload.update({
          collection: 'portfolio-items',
          id: created.id,
          data: {
            title: item.title[loc],
            description: item.description[loc],
          },
          locale: loc,
        })
      }
    }
  }

  // Seed Resources
  console.log('Seeding resources...')
  for (const res of resources) {
    await payload.create({
      collection: 'resources',
      data: {
        title: res.title.fr,
        description: res.description.fr,
        type: res.type,
      },
      locale: 'fr',
    })
    const created = (await payload.find({
      collection: 'resources',
      where: { title: { equals: res.title.fr } },
      locale: 'fr',
      limit: 1,
    })).docs[0]
    if (created) {
      for (const loc of ['en', 'es'] as const) {
        await payload.update({
          collection: 'resources',
          id: created.id,
          data: {
            title: res.title[loc],
            description: res.description[loc],
          },
          locale: loc,
        })
      }
    }
  }

  // Seed Site Settings
  console.log('Seeding site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteUrl: siteConfig.SITE_URL,
      contactEmail: siteConfig.CONTACT_EMAIL,
      calendlyUrl: siteConfig.CALENDLY_URL,
      linkedinUrl: siteConfig.LINKEDIN_URL,
      whatsapp: {
        phoneNumber: siteConfig.WHATSAPP_PHONE_NUMBER,
        link: siteConfig.WHATSAPP_LINK,
      },
    },
  })

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
```

**Step 2: Add a seed script to `package.json`**

Add to `scripts`:

```json
"seed": "PAYLOAD_CONFIG_PATH=payload.config.ts npx tsx src/scripts/seed.ts"
```

> **Note:** You may need to install `tsx` as a dev dependency: `npm i -D tsx`

**Step 3: Run the seed script**

Run:
```bash
npm run seed
```

Expected: All data is inserted into the Neon PostgreSQL database. Check the admin panel at `/admin` to verify content exists.

**Step 4: Commit**

```bash
git add src/scripts/seed.ts package.json
git commit -m "feat: add database seed script for migrating static content"
```

---

## Phase 6: Frontend Migration (Connect Pages to Payload)

### Task 15: Update Homepage Sections to Use Payload Data

**Files:**
- Modify: `src/app/(frontend)/[locale]/page.tsx`
- Modify: `src/components/sections/FeaturedPortfolio.tsx`
- Modify: `src/components/sections/Testimonials.tsx`

**Step 1: Update the homepage to fetch data from Payload**

The homepage currently passes `locale` to sections which internally import from `config.ts`. We need to:

1. Fetch data in the server component (page)
2. Pass the data as props to each section

Update `src/app/(frontend)/[locale]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { UseCaseCards } from '@/components/sections/UseCaseCards'
import { WhyMindzy } from '@/components/sections/WhyMindzy'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { FeaturedPortfolio } from '@/components/sections/FeaturedPortfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getPortfolioItems, getTestimonials } from '@/lib/payload'

// ... existing homeMeta and generateMetadata unchanged ...

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const typedLocale = locale as Locale

  const [portfolioResult, testimonialsResult] = await Promise.all([
    getPortfolioItems(typedLocale, { featured: true, limit: 6 }),
    getTestimonials(typedLocale),
  ])

  return (
    <>
      <Hero locale={typedLocale} />
      <UseCaseCards locale={typedLocale} />
      <WhyMindzy locale={typedLocale} />
      <ProcessTimeline locale={typedLocale} />
      <FeaturedPortfolio locale={typedLocale} items={portfolioResult.docs} />
      <Testimonials locale={typedLocale} items={testimonialsResult.docs} />
      <CTASection locale={typedLocale} variant="gradient" />
    </>
  )
}
```

**Step 2: Update `FeaturedPortfolio` to accept data as props**

Modify the component to accept an `items` prop instead of importing from config. The component should accept a generic array and render it. The exact changes depend on the current component implementation — read the file first, then modify it to accept `items` as a prop and remove the `import { portfolioItems } from '@/lib/config'` line.

**Step 3: Update `Testimonials` similarly**

Same pattern — accept `items` prop, remove config import.

> **Pattern for all section components:** Each section that currently imports from `config.ts` needs to be updated to accept data as props. The page-level server component fetches from Payload and passes data down. This is a repeatable pattern for all pages.

**Step 4: Verify homepage loads correctly**

Run: `npm run dev`
Visit: `http://localhost:3000/fr`
Expected: Homepage renders with data from the database (seeded in Task 14).

**Step 5: Commit**

```bash
git add src/app/\(frontend\)/\[locale\]/page.tsx src/components/sections/FeaturedPortfolio.tsx src/components/sections/Testimonials.tsx
git commit -m "feat: connect homepage sections to Payload CMS data"
```

---

### Task 16: Update Blog Pages to Use Payload Data

**Files:**
- Modify: `src/app/(frontend)/[locale]/blog/page.tsx`
- Modify: `src/app/(frontend)/[locale]/blog/[slug]/page.tsx`

**Step 1: Update blog listing page**

Replace the import from config with Payload fetch:

```typescript
import { getBlogPosts } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const posts = await getBlogPosts(locale as Locale)

  // Render posts.docs instead of static blogPosts array
  // Each post now has: post.title (string, already localized), post.excerpt, post.slug, etc.
}
```

**Step 2: Update blog detail page**

```typescript
import { getBlogPost } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getBlogPost(slug, locale as Locale)
  if (!post) notFound()

  // Render post.title, post.content (rich text from Lexical), post.excerpt, etc.
}
```

> **Important:** Blog post content is currently in markdown files under `/blog-post/`. With Payload, content moves to the Lexical rich text editor. The seed script only migrated metadata. You'll need to manually copy blog content into the admin panel's rich text editor, or write a more sophisticated migration script that reads markdown files and converts them to Lexical format.

**Step 3: Commit**

```bash
git add src/app/\(frontend\)/\[locale\]/blog/
git commit -m "feat: connect blog pages to Payload CMS"
```

---

### Task 17: Update Portfolio Page

**Files:**
- Modify: `src/app/(frontend)/[locale]/portfolio/page.tsx`

**Step 1: Fetch portfolio items from Payload**

```typescript
import { getPortfolioItems } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const result = await getPortfolioItems(locale as Locale)

  // Pass result.docs to PortfolioGrid component
}
```

**Step 2: Update `PortfolioGrid` component to accept Payload data**

The component currently expects the old `PortfolioItem` type with `Record<Locale, string>` fields. With Payload, localized fields are already resolved to strings (since you pass `locale` to the query). Update the component's prop types accordingly.

**Step 3: Commit**

```bash
git add src/app/\(frontend\)/\[locale\]/portfolio/ src/components/features/PortfolioGrid.tsx
git commit -m "feat: connect portfolio page to Payload CMS"
```

---

### Task 18: Update Remaining Pages (FAQ, Pricing, Testimonials, Resources, Before/After)

This task follows the same pattern for each page. For each page:

1. Import the corresponding helper from `src/lib/payload.ts`
2. Fetch data in the page-level server component
3. Pass data as props to section/feature components
4. Update component prop types (localized fields are now `string` instead of `Record<Locale, string>`)

**Pages to update:**

| Page | File | Payload helper |
|------|------|----------------|
| FAQ | `src/app/(frontend)/[locale]/faq/page.tsx` | `getFAQItems()` |
| Pricing | `src/app/(frontend)/[locale]/pricing/page.tsx` | `getPlans()` |
| Testimonials | `src/app/(frontend)/[locale]/avis-clients/page.tsx` | `getTestimonials()` |
| Resources | `src/app/(frontend)/[locale]/ressources/page.tsx` | `getResources()` |
| Before/After | `src/app/(frontend)/[locale]/avant-apres/page.tsx` | `getBeforeAfterExamples()` |
| Examples by profession | `src/app/(frontend)/[locale]/examples-by-profession/page.tsx` | `getPortfolioItems()` |

**Step 1:** Update each page file following the pattern from Tasks 15-17.

**Step 2:** Update each section/feature component to accept the new prop types.

**Step 3: Commit per page or batch**

```bash
git add src/app/\(frontend\)/\[locale\]/ src/components/
git commit -m "feat: connect remaining pages to Payload CMS data"
```

---

### Task 19: Update Layout Components (Header, Footer)

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/StickyCTA.tsx`

**Step 1: Fetch site settings in locale layout and pass to layout components**

Update `src/app/(frontend)/[locale]/layout.tsx`:

```typescript
import { getSiteSettings } from '@/lib/payload'

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()

  const settings = await getSiteSettings(locale as Locale)

  return (
    <>
      <Header locale={locale as Locale} settings={settings} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale as Locale} settings={settings} />
      <StickyCTA locale={locale as Locale} settings={settings} />
      <Chatbot locale={locale as Locale} />
      <CookieConsent locale={locale as Locale} />
    </>
  )
}
```

**Step 2:** Update Header, Footer, StickyCTA to accept and use `settings` prop instead of importing from `config.ts`.

**Step 3: Commit**

```bash
git add src/app/\(frontend\)/\[locale\]/layout.tsx src/components/layout/
git commit -m "feat: connect layout components to Payload site settings"
```

---

## Phase 7: Cleanup & Deployment

### Task 20: Remove Static Data Dependency

**Files:**
- Modify: `src/lib/config.ts` — Remove migrated data exports (plans, portfolioItems, testimonials, blogPosts, faqItems, resources, beforeAfterExamples). **Keep** `config` (site URLs), `professions`, `diagnosticQuestions`, `customDiagnosticQuestions`, `onboardingSteps`, `profileKeys`, `profileQuestions` — these are interactive form data that make more sense in code than in a CMS.

**Step 1: Audit imports**

Run:
```bash
grep -r "from '@/lib/config'" src/ --include="*.ts" --include="*.tsx" | grep -v node_modules
```

Verify no component still imports the removed exports.

**Step 2: Remove exports from config.ts**

Keep only: `config`, `professions`, `diagnosticQuestions`, `customDiagnosticQuestions`, `onboardingSteps`, `profileKeys`, `profileQuestions`, `diagnosticProfessionOptions`.

Remove: `plans`, `portfolioItems`, `testimonials`, `blogPosts`, `faqItems`, `resources`, `beforeAfterExamples`.

**Step 3: Verify build passes**

Run:
```bash
npm run build
```

Expected: Build succeeds with no import errors.

**Step 4: Commit**

```bash
git add src/lib/config.ts
git commit -m "refactor: remove static content data now managed by Payload CMS"
```

---

### Task 21: Generate Payload Types

**Files:**
- Generated: `src/payload-types.ts`

**Step 1: Generate TypeScript types from Payload config**

Run:
```bash
npx payload generate:types
```

Expected: Creates `src/payload-types.ts` with typed interfaces for all collections and globals.

**Step 2: Update `src/lib/payload.ts` return types (optional but recommended)**

Import generated types to provide proper return types:

```typescript
import type { BlogPost, PortfolioItem, Testimonial, FaqItem, Plan, Resource, BeforeAfterExample, SiteSetting } from '@/payload-types'
```

**Step 3: Commit**

```bash
git add src/payload-types.ts src/lib/payload.ts
git commit -m "feat: generate Payload TypeScript types"
```

---

### Task 22: Verify Full Build and Deploy

**Step 1: Run the full build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 2: Run the production server locally**

```bash
npm run start
```

Visit `http://localhost:3000/fr` — site loads with CMS data.
Visit `http://localhost:3000/admin` — admin panel loads.

**Step 3: Verify all pages render**

Check these routes:
- `/fr` (homepage)
- `/fr/blog` (blog listing)
- `/fr/portfolio` (portfolio)
- `/fr/pricing` (pricing)
- `/fr/faq` (FAQ)
- `/fr/avis-clients` (testimonials)
- `/fr/ressources` (resources)
- `/fr/avant-apres` (before/after)
- `/admin` (Payload admin)

**Step 4: Commit and push**

```bash
git add .
git commit -m "feat: complete Payload CMS integration with full content migration"
```

---

## Summary of New Environment Variables

Add these to your Vercel project settings before deploying:

| Variable | Description |
|----------|-------------|
| `PAYLOAD_SECRET` | Random 64+ char secret for Payload auth |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |

---

## Post-Migration Notes

1. **Diagnostic quiz, onboarding wizard, and profile forms** remain as TypeScript-based interactive components. These are form logic, not content, so they stay in `config.ts`.

2. **Copy strings** (`src/lib/copy.ts`) for UI text (button labels, headers, etc.) also remain in code. These are not content that non-developers need to edit.

3. **Blog markdown files** in `/blog-post/` can be removed after manually migrating their content into Payload's Lexical rich text editor via the admin panel.

4. **Images**: Existing images in `/public/images/` continue to work. As you upload new images through the admin panel, they'll go to Vercel Blob. You can gradually migrate old images by re-uploading them through the admin panel.

5. **Database migrations**: Payload auto-manages schema via Drizzle. When you add/modify collection fields, Payload generates and runs migrations automatically on `next dev` or `next build`.
