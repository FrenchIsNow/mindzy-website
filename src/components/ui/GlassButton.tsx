// Server component — no 'use client'
import Link from 'next/link'

interface GlassButtonProps {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

export function GlassButton({ href, children, external = false, className = '' }: GlassButtonProps) {
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <div style={{ position: 'relative', display: 'inline-block', borderRadius: '9999px', verticalAlign: 'middle' }}>
      <Link
        href={href}
        {...linkProps}
        className={className}
        style={{
          all: 'unset' as React.CSSProperties['all'],
          position: 'relative',
          isolation: 'isolate',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '9999px',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'rgba(20,20,40,0.88)',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(14px) saturate(180%)',
          WebkitBackdropFilter: 'blur(14px) saturate(180%)',
          border: '1px solid rgba(20,20,40,0.12)',
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.90), inset 0 -1px 0 rgba(0,0,0,0.05)',
          transition: 'background 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease',
          textDecoration: 'none',
        }}
      >
        <span style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          userSelect: 'none',
          letterSpacing: '-0.03em',
          padding: '14px 26px',
          whiteSpace: 'nowrap',
        }}>
          {children}
        </span>
      </Link>
      {/* Shadow layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '9999px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.10), 0 3px 8px rgba(0,0,0,0.06)',
        pointerEvents: 'none',
        zIndex: -1,
      }} />
    </div>
  )
}

export default GlassButton
