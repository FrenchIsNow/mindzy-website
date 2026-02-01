import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-anthracite mb-2">{label}</label>}
        <input ref={ref} id={inputId} className={cn('w-full px-4 py-3 rounded-xl border bg-white text-anthracite placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent', error ? 'border-red-500' : 'border-gray-200', className)} {...props} />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
