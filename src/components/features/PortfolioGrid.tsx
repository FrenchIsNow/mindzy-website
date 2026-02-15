'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import type { PortfolioItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

const ITEMS_PER_PAGE = 12

interface PortfolioGridProps {
  locale: Locale
  items: PortfolioItem[]
}

export function PortfolioGrid({ locale, items }: PortfolioGridProps) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(ITEMS_PER_PAGE)
  const t = getMessages(locale).portfolio
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [items])
  const filtered = useMemo(() => items.filter((item) => {
    const matchTag = filter === 'all' || item.tags.includes(filter)
    const matchSearch = !search || item.title[locale].toLowerCase().includes(search.toLowerCase()) || item.profession.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  }), [filter, search, locale, items])
  const visibleItems = filtered.slice(0, visible)
  const hasMore = visible < filtered.length
  const tagLabels: Record<string, string> = t.filter ?? {}
  const filters = [
    { value: 'all', label: tagLabels.all ?? 'All' },
    ...allTags.map((tag) => ({ value: tag, label: tagLabels[tag] ?? tag })),
  ]
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f.value} type="button" onClick={() => { setFilter(f.value); setVisible(ITEMS_PER_PAGE); analytics.portfolio.filter('tag', f.value) }} className={cn('px-4 py-2 rounded-full text-sm font-medium transition-colors', filter === f.value ? 'bg-violet text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>{f.label}</button>
          ))}
        </div>
        <div className="flex-1 max-w-xs"><Input type="search" placeholder={t.search} value={search} onChange={(e) => { setSearch(e.target.value); setVisible(ITEMS_PER_PAGE); }} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((item) => (
          <Card key={item.id} variant="outline" hover className="overflow-hidden group">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {item.image && item.image !== '/images/portfolio/placeholder-1.jpg' ? (
                <Image
                  src={item.image}
                  alt={item.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-anthracite mb-1">{item.title[locale]}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description[locale]}</p>
              <div className="flex items-center justify-between"><Badge variant="default" size="sm">{item.profession}</Badge>{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-violet font-medium hover:underline" onClick={() => { analytics.portfolio.view(item.id, item.tags.join(',')); analytics.external.linkClick(item.url!, item.title[locale], 'portfolio') }}>{t.viewSite} →</a>}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-500">Aucun résultat</div>}
      {hasMore && <div className="text-center mt-8"><Button variant="secondary" size="lg" onClick={() => setVisible((v) => v + ITEMS_PER_PAGE)}>{t.loadMore}</Button></div>}
    </div>
  )
}
