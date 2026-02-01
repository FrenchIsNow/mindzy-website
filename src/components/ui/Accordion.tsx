'use client'

import { useState, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

const AccordionContext = createContext<{ openItems: string[]; toggle: (v: string) => void; type: 'single' | 'multiple' } | null>(null)

export function Accordion({ children, type = 'single', defaultValue, className }: { children: React.ReactNode; type?: 'single' | 'multiple'; defaultValue?: string | string[]; className?: string }) {
  const [openItems, setOpenItems] = useState<string[]>(() => (defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []))
  const toggle = (value: string) => setOpenItems((prev) => (type === 'single' ? (prev.includes(value) ? [] : [value]) : prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]))
  return <AccordionContext.Provider value={{ openItems, toggle, type }}><div className={cn('space-y-2', className)}>{children}</div></AccordionContext.Provider>
}

export function AccordionItem({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  return <div className={cn('border border-gray-200 rounded-xl overflow-hidden', className)} data-value={value}>{children}</div>
}

export function AccordionTrigger({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('AccordionTrigger must be inside Accordion')
  const isOpen = ctx.openItems.includes(value)
  return <button type="button" onClick={() => ctx.toggle(value)} className={cn('flex items-center justify-between w-full px-6 py-4 text-left font-medium text-anthracite hover:bg-gray-50', className)} aria-expanded={isOpen}>{children}<svg className={cn('w-5 h-5 text-gray-500 transition-transform', isOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
}

export function AccordionContent({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  const ctx = useContext(AccordionContext)
  if (!ctx || !ctx.openItems.includes(value)) return null
  return <div className={cn('px-6 pb-4 text-gray-600 animate-slide-down', className)}>{children}</div>
}
