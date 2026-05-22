import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  tight?: boolean
  id?: string
  as?: string
}

export function Section({ children, className, tight = false, id, as = 'section' }: SectionProps) {
  const paddingClass = tight ? 'py-12 sm:py-16 lg:py-24' : 'py-16 sm:py-24 lg:py-[120px]'
  const allClasses = [paddingClass, 'relative', className].filter(Boolean).join(' ')
  return React.createElement(as, { id, className: allClasses }, children)
}

export default Section
