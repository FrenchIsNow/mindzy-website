'use client'

import { useEffect, useState, useCallback } from 'react'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  content: string
  label: string
}

function extractHeadings(content: string): TocItem[] {
  const lines = content.split('\n')
  const items: TocItem[] = []
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/)
    const h3 = line.match(/^###\s+(.+)/)
    if (h2) {
      const text = h2[1].trim()
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      items.push({ id, text, level: 2 })
    } else if (h3) {
      const text = h3[1].trim()
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      items.push({ id, text, level: 3 })
    }
  }
  return items
}

export function TableOfContents({ content, label }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const items = extractHeadings(content)

  const onScroll = useCallback(() => {
    const article = document.querySelector('article')
    if (!article) return
    const rect = article.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    const scrolled = -rect.top
    setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)))
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  if (items.length < 3) return null

  const activeItem = items.find(i => i.id === activeId)

  return (
    <>
      {/* Desktop: sticky right sidebar */}
      <nav className="hidden xl:block sticky top-28 self-start w-56 shrink-0" aria-label={label}>
        <div className="relative pl-4 border-l-2 border-gray-100">
          {/* Progress track */}
          <div
            className="absolute left-[-2px] top-0 w-0.5 bg-violet transition-all duration-150 rounded-full"
            style={{ height: `${progress}%` }}
          />

          <p className="font-semibold text-anthracite mb-4 text-xs uppercase tracking-widest">{label}</p>
          <ul className="space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1.5 text-[13px] leading-snug transition-all duration-200 hover:text-violet ${
                    item.level === 3 ? 'pl-3' : ''
                  } ${
                    activeId === item.id
                      ? 'text-violet font-medium'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile/Tablet: sticky bottom bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Expanded panel */}
        {mobileOpen && (
          <div className="bg-white border-t border-gray-200 shadow-lg max-h-[60vh] overflow-y-auto px-5 pt-4 pb-20">
            <p className="font-semibold text-anthracite mb-3 text-xs uppercase tracking-widest">{label}</p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-sm transition-colors cursor-pointer ${
                      item.level === 3 ? 'pl-4 text-gray-400' : 'text-gray-600 font-medium'
                    } ${activeId === item.id ? 'text-violet' : 'hover:text-violet'}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom bar */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-5 py-3 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <svg className="w-4 h-4 text-violet shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span className="text-sm text-gray-600 truncate">
              {activeItem ? activeItem.text : label}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-gray-400 tabular-nums">{Math.round(progress)}%</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      </div>
    </>
  )
}

/** Reading progress bar for top of page */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const article = document.querySelector('article')
      if (!article) return
      const rect = article.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-violet transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
