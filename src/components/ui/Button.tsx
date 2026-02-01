import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, iconPosition = 'right', children, ...props }, ref) => {
    const base = 'btn-base relative overflow-hidden group'

    const variants = {
      primary: 'bg-violet text-white shadow-soft hover:bg-violet-700 hover:shadow-glow active:scale-[0.98]',
      secondary: 'bg-cream-100 text-anthracite border border-cream-300 hover:bg-cream-200 hover:border-cream-400 active:scale-[0.98]',
      ghost: 'text-anthracite hover:bg-cream-100 active:bg-cream-200',
      outline: 'border-2 border-violet text-violet hover:bg-violet hover:text-white active:scale-[0.98]',
      gold: 'bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white shadow-soft hover:shadow-glow-gold active:scale-[0.98]',
      dark: 'bg-anthracite text-white hover:bg-gray-800 active:scale-[0.98]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-2.5 text-sm gap-2',
      lg: 'px-8 py-3.5 text-base gap-2',
      xl: 'px-10 py-4 text-lg gap-3',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <span className="relative flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform">{icon}</span>}
        </span>
      </button>
    )
  }
)
Button.displayName = 'Button'

// Arrow icon component for common use
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-4 h-4', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

// Check icon for lists
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-5 h-5', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
