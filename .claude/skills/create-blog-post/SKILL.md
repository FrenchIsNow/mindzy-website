---
name: create-blog-post
description: Create a blog post or article on a Mindzy client blog via the agent API. Use when the user asks to publish a new article, a translated version of an article, or a piece of content from a blog-idea.
argument-hint: "<article brief: client, title, locale, content, idea id>"
---

# Create Blog Post

Implement `$ARGUMENTS` by creating a blog article through the agent API.

<objective>
Ship a published-ready blog article scoped to the right client + blog site + locale, optionally linked to a source idea.
</objective>

<required_paths>
- Agent API: `src/app/api/agent/route.ts` (action: `create-blog-post`)
- DB layer: `src/lib/db.ts` (`createBlogArticle`)
- Admin form: `src/app/dashboard/admin/blogs/new/NewBlogArticleForm.tsx`
- Public articles (per client blog): routed through the client blog surface
- Auth: `AGENT_API_TOKEN` env var (or admin/editor session)
</required_paths>

<workflow>
1. Resolve **clientId** (required). Get it from the client/blog site list or pass a slug if you also have the ID.
2. POST to `/api/agent` with body:
   ```json
   {
     "action": "create-blog-post",
     "input": {
       "clientId": 1,
       "blogSiteSlug": "mindzy",
       "title": "Mon article",
       "slug": "mon-article",
       "excerpt": "Chapô",
       "contentHtml": "<p>...</p>",
       "locale": "fr",
       "status": "pending_review",
       "category": "AI",
       "keywords": ["ai infrastructure"],
       "readingTime": 6,
       "ideaId": 12
     }
   }
   ```
3. Authenticate via `x-agent-token: $AGENT_API_TOKEN` header **or** an active admin/editor session.
4. Response: `{ ok: true, article }` with the inserted `id` and the `slug` you'll use for translations.
5. For translated variants of the same article, pass the same `slug` and a different `locale` — `canonical_slug` is auto-set to the slug.
</workflow>

<copy_defaults>
- Default `status: "pending_review"`. Editors promote to `"published"` from the admin UI.
- Always set `locale` explicitly. Default to `"fr"` only if the user did not specify.
- `contentHtml` may be empty for a stub article that will be edited in the UI.
- `keywords` is `string[]`, kept between 3 and 8.
</copy_defaults>

<minimal_object_skeleton>
```json
{
  "action": "create-blog-post",
  "input": {
    "clientId": 1,
    "blogSiteSlug": "mindzy",
    "title": "Titre de l'article",
    "slug": "mon-article",
    "excerpt": "Chapô court qui résume l'angle.",
    "contentHtml": "<h2>Introduction</h2><p>...</p>",
    "locale": "fr",
    "status": "pending_review",
    "category": "AI infrastructure",
    "keywords": ["ai", "rag", "agent"],
    "readingTime": 6,
    "ideaId": 12
  }
}
```
</minimal_object_skeleton>

<completion_checklist>
- [ ] `clientId` resolved (existing client)
- [ ] Slug is unique within the client+locale
- [ ] `contentHtml` is non-empty or marked for follow-up editing
- [ ] If linked to an idea, idea status should move to `in_progress`
- [ ] Build passes (`npm run build`)
- [ ] Article visible in `/dashboard/admin/blogs`
</completion_checklist>
