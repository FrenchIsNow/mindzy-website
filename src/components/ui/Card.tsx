import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'glass' | 'gradient' | 'featured'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  className,
  variant = 'default',
  hover = false,
  padding = 'md',
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-100',
    elevated: 'bg-white shadow-card border border-gray-50',
    outline: 'bg-white/50 border-2 border-gray-200',
    glass: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-soft',
    gradient: 'bg-gradient-to-br from-white via-cream-50 to-violet-50/30 border border-gray-100',
    featured: 'bg-gradient-to-br from-violet-50 via-white to-cream-50 border-2 border-violet/20 shadow-glow',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variants[variant],
        paddings[padding],
        hover && 'hover:shadow-card-hover hover:-translate-y-1 hover:border-gray-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({
  className,
  as: Comp = 'h3',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' }) {
  return <Comp className={cn('font-display text-xl font-semibold text-anthracite tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-gray-500 mt-2 leading-relaxed', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6 pt-4 border-t border-gray-100', className)} {...props} />
}

// Feature card with icon
export function FeatureCard({
  icon,
  title,
  description,
  className,
  ...props
}: {
  icon: React.ReactNode
  title: string
  description: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card variant="default" hover className={cn('group', className)} {...props}>
      <div className="icon-circle-lg bg-violet-50 text-violet mb-5 group-hover:bg-violet group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  )
}

// Stat card for metrics display
export function StatCard({
  value,
  label,
  icon,
  className,
}: {
  value: string
  label: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('text-center', className)}>
      {icon && <div className="icon-circle bg-violet-50 text-violet mx-auto mb-3">{icon}</div>}
      <div className="font-display text-4xl sm:text-5xl font-semibold text-anthracite mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

// Testimonial card
export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating = 5,
  className,
}: {
  quote: string
  author: string
  role: string
  avatar?: string
  rating?: number
  className?: string
}) {
  return (
    <Card variant="glass" padding="lg" className={cn('', className)}>
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn('w-5 h-5', i < rating ? 'text-gold' : 'text-gray-200')}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-display text-xl text-anthracite leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {avatar ? (
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold">
            {author.split(' ').map((n) => n[0]).join('')}
          </div>
        )}
        <div>
          <div className="font-semibold text-anthracite">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </Card>
  )
}
