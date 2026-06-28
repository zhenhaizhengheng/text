import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type RingProgressVariant =
  | 'default'
  | 'purple'
  | 'blue'
  | 'green'
  | 'gold'
  | 'pink'
type RingProgressSize = 'sm' | 'md' | 'lg' | 'xl'

export interface RingProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: RingProgressVariant
  size?: RingProgressSize
  showLabel?: boolean
  label?: string
  strokeWidth?: number
  counterClockwise?: boolean
}

const RingProgress = forwardRef<HTMLDivElement, RingProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'purple',
      size = 'md',
      showLabel = true,
      label,
      strokeWidth,
      counterClockwise = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizes: Record<RingProgressSize, { container: number; stroke: number }> = {
      sm: { container: 48, stroke: 4 },
      md: { container: 64, stroke: 6 },
      lg: { container: 96, stroke: 8 },
      xl: { container: 128, stroke: 10 },
    }

    const gradients: Record<RingProgressVariant, { from: string; to: string }> = {
      default: { from: '#8b5cf6', to: '#ec4899' },
      purple: { from: '#8b5cf6', to: '#a78bfa' },
      blue: { from: '#06b6d4', to: '#3b82f6' },
      green: { from: '#10b981', to: '#34d399' },
      gold: { from: '#f59e0b', to: '#fbbf24' },
      pink: { from: '#ec4899', to: '#f472b6' },
    }

    const { container, stroke } = sizes[size]
    const finalStrokeWidth = strokeWidth || stroke
    const radius = (container - finalStrokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference
    const gradientId = `ring-gradient-${variant}-${Math.random().toString(36).substring(2, 9)}`

    const gradient = gradients[variant]

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: container, height: container }}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width={container}
          height={container}
          style={{
            transform: counterClockwise ? 'rotate(90deg) scaleX(-1)' : 'rotate(-90deg)',
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient.from} />
              <stop offset="100%" stopColor={gradient.to} />
            </linearGradient>
          </defs>
          <circle
            className="text-white/10"
            stroke="currentColor"
            fill="transparent"
            strokeWidth={finalStrokeWidth}
            r={radius}
            cx={container / 2}
            cy={container / 2}
          />
          <circle
            stroke={`url(#${gradientId})`}
            fill="transparent"
            strokeWidth={finalStrokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx={container / 2}
            cy={container / 2}
            className="transition-all duration-500 ease-out drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                'font-bold text-white',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-xl',
                size === 'xl' && 'text-2xl'
              )}
            >
              {label || `${Math.round(percentage)}%`}
            </span>
          </div>
        )}
      </div>
    )
  }
)

RingProgress.displayName = 'RingProgress'

export { RingProgress }
