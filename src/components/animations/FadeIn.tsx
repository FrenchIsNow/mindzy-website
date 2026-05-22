import type { JSX } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function FadeIn({ children, delay, className, as: Tag = 'div' }: FadeInProps) {
  const style: React.CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined
  const Element = Tag as React.ElementType
  return <Element className={`ai-fade-in${className ? ' ' + className : ''}`} style={style}>{children}</Element>
}

export default FadeIn
