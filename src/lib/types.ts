// Re-export CMS v2 types from the database layer so components can import from a single surface.
export type {
  BlogSite,
  BlogIdea,
  BlogArticle,
  CatalogEntry,
  EbookContent,
  Lead,
  WaitingList,
  WaitlistEntry,
  DashboardClient,
} from './db'

export type { UserRole, Session } from './auth'
