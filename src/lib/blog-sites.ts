import { createBlogSite, updateBlogSite, deleteBlogSite, getBlogSiteBySlug, listBlogSites, type BlogSiteInput } from './db'

export type { BlogSiteInput }

export async function addBlogSite(data: BlogSiteInput) {
  return createBlogSite(data)
}

export async function editBlogSite(id: number, data: Partial<BlogSiteInput>) {
  return updateBlogSite(id, data)
}

export async function removeBlogSite(id: number) {
  return deleteBlogSite(id)
}

export async function getSite(slug: string) {
  return getBlogSiteBySlug(slug)
}

export async function listSites() {
  return listBlogSites()
}
