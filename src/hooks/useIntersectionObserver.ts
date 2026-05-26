import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options?: UseIntersectionObserverOptions
): { ref: React.RefObject<T | null>; isIntersecting: boolean } {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const {
    threshold = 0.12,
    rootMargin = '0px',
    triggerOnce = true,
  } = options ?? {}

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current)
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isIntersecting }
}

export default useIntersectionObserver
