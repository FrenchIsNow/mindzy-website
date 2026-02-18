'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'

interface FAQItem {
  q: string
  a: string
}

export function SiteWebFAQ({ items }: { items: FAQItem[] }) {
  return (
    <Accordion type="single" defaultValue="faq-0" className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={`faq-${i}`}
          value={`faq-${i}`}
          className="border border-gray-200 rounded-xl bg-white overflow-hidden"
        >
          <AccordionTrigger value={`faq-${i}`} className="px-6 py-5 text-left font-medium text-anthracite hover:bg-gray-50">
            {item.q}
          </AccordionTrigger>
          <AccordionContent value={`faq-${i}`} className="px-6 pb-5 text-gray-500 leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
