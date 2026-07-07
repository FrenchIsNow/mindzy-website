import { createLead, listLeadsFiltered, countLeadsBySource, getLeadById, updateLead, type LeadInput, type LeadFilters } from './db'

export type { LeadInput, LeadFilters }

export async function captureLead(input: LeadInput) {
  return createLead(input)
}

export async function fetchLeads(filters: LeadFilters = {}) {
  return listLeadsFiltered(filters)
}

export async function fetchLeadCounts() {
  return countLeadsBySource()
}

export async function fetchLead(id: number) {
  return getLeadById(id)
}

export async function patchLead(id: number, data: Parameters<typeof updateLead>[1]) {
  return updateLead(id, data)
}
