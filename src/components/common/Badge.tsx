import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant =
  | 'default'
  | 'purple'
  | 'blue'
  | 'green'
  | 'gold'
  | 'red'
  | 'pink'
  | 'outline'
type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      default:
        'bg-purple-500/20 text-purple-300 border-purple-500/30',
      purple:
        'bg-purple-500/20 text-purple-300 border-purple-500/30',
      blue:
        'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      green:
        'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      gold:
        'bg-amber-500/20 text-amber-300 border-amber-500/30',
      red:
        'bg-red-500/20 text-red-300 border-red-500/30',
      pink:
        'bg-pink-500/20 text-pink-300 border-pink-500/30',
      outline:
        'bg-transparent text-white/70 border-white/20',
    }

    const sizes: Record<BadgeSize, string> = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-xs px-2.5 py-1',
      lg: 'text-sm px-3 py-1',
    }

    const dotColors: Record<BadgeVariant, string> = {
      default: 'bg-purple-400',
      purple: 'bg-purple-400',
      blue: 'bg-cyan-400',
      green: 'bg-emerald-400',
      gold: 'bg-amber-400',
      red: 'bg-red-400',
      pink: 'bg-pink-400',
      outline: 'bg-white/60',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full animate-pulse',
              dotColors[variant]
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
