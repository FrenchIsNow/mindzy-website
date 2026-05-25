import React from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: string
}

export function FadeIn({ children, delay, className, as = 'div' }: FadeInProps) {
  const style: React.CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined
  return React.createElement(
    as,
    {
      className: `ai-fade-in${className ? ' ' + className : ''}`,
      style,
      // Inline IntersectionObserver in layout.tsx may add `is-visible` before hydration completes.
      suppressHydrationWarning: true,
    },
    children
  )
}

export default FadeIn
