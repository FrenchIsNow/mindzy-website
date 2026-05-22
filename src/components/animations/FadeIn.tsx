'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect, useState } from 'react'

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
  const { ref, isIntersecting } = useIntersectionObserver({ threshold })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const isVisible = prefersReducedMotion || isIntersecting
  const baseClasses = 'transition-[opacity,transform] duration-[900ms] ease-out'
  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-3'
  const allClasses = `${baseClasses} ${animationClasses} ${className}`.trim()

  return (
    <Tag
      ref={ref}
      className={allClasses}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default FadeIn
