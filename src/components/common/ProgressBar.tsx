import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ProgressBarVariant = 'default' | 'purple' | 'blue' | 'green' | 'gold'
type ProgressBarSize = 'sm' | 'md' | 'lg'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: ProgressBarVariant
  size?: ProgressBarSize
  showLabel?: boolean
  animated?: boolean
  striped?: boolean
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'purple',
      size = 'md',
      showLabel = false,
      animated = true,
      striped = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const variants: Record<ProgressBarVariant, string> = {
      default:
        'bg-gradient-to-r from-purple-500 to-pink-500',
      purple:
        'bg-gradient-to-r from-purple-600 to-purple-400',
      blue:
        'bg-gradient-to-r from-cyan-500 to-blue-500',
      green:
        'bg-gradient-to-r from-emerald-500 to-green-400',
      gold:
        'bg-gradient-to-r from-yellow-500 to-amber-400',
    }

    const sizes: Record<ProgressBarSize, string> = {
      sm: 'h-1.5',
      md: 'h-3',
      lg: 'h-4',
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className="flex justify-between mb-1.5">
          {showLabel && (
            <span className="text-xs font-medium text-white/70">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm',
            sizes[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variants[variant],
              animated && 'animate-pulse-glow',
              striped &&
                'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_2s_linear_infinite]'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
