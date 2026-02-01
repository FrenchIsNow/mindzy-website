import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gold' | 'outline' | 'violet'
  size?: 'sm' | 'md'
  dot?: boolean
  icon?: React.ReactNode
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    primary: 'bg-violet-50 text-violet-700 border-violet-100',
    violet: 'bg-violet-100 text-violet-700 border-violet-200',
    success: 'bg-sage-50 text-sage-700 border-sage-100',
    warning: 'bg-gold-light/30 text-gold-dark border-gold-light',
    error: 'bg-rose-50 text-rose-500 border-rose-100',
    gold: 'bg-gradient-to-r from-gold-light/30 via-gold/10 to-gold-light/30 text-gold-dark border-gold/20',
    outline: 'bg-transparent text-gray-600 border-gray-300',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'success' && 'bg-sage-500',
          variant === 'error' && 'bg-rose-500',
          variant === 'warning' && 'bg-gold',
          variant === 'primary' && 'bg-violet',
          variant === 'violet' && 'bg-violet',
          variant === 'default' && 'bg-gray-500',
          variant === 'gold' && 'bg-gold',
        )} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

// Pill variant for tags and categories
export function Pill({
  className,
  active = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200',
        active
          ? 'bg-violet text-white border-violet shadow-sm'
          : 'bg-white text-gray-600 border-gray-200 hover:border-violet hover:text-violet',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Status badge with animated pulse
export function StatusBadge({
  status,
  label,
  className,
}: {
  status: 'online' | 'offline' | 'busy' | 'away'
  label?: string
  className?: string
}) {
  const statusColors = {
    online: 'bg-sage-500',
    offline: 'bg-gray-400',
    busy: 'bg-rose-500',
    away: 'bg-gold',
  }

  return (
    <span className={cn('inline-flex items-center gap-2 text-sm text-gray-600', className)}>
      <span className="relative flex h-2.5 w-2.5">
        {status === 'online' && (
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', statusColors[status])} />
        )}
        <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', statusColors[status])} />
      </span>
      {label}
    </span>
  )
}
