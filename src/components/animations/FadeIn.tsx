'use client'

import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: React.ElementType
  threshold?: number
}

export function FadeIn({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0.12,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Apply delay via inline style before revealing
    if (delay > 0) el.style.transitionDelay = `${delay}ms`

    // Check prefers-reduced-motion — show immediately if needed
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay, threshold])

  return (
    <Tag ref={ref} className={`ai-fade-in${className ? ' ' + className : ''}`}>
      {children}
    </Tag>
  )
}

export default FadeIn
