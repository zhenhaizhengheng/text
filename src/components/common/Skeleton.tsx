import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, ...props }, ref) => {
    const variants = {
      text: 'h-4 w-full rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-xl',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden bg-white/5',
          variants[variant],
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        {...props}
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
}

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            className={i === lines - 1 && lines > 1 ? 'w-3/4' : ''}
          />
        ))}
      </div>
    )
  }
)

SkeletonText.displayName = 'SkeletonText'

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4',
          className
        )}
        {...props}
      >
        <Skeleton variant="rectangular" height={120} />
        <Skeleton variant="text" height={20} width="60%" />
        <SkeletonText lines={2} />
        <div className="flex gap-2 pt-2">
          <Skeleton variant="text" height={32} width={80} />
          <Skeleton variant="text" height={32} width={100} />
        </div>
      </div>
    )
  }
)

SkeletonCard.displayName = 'SkeletonCard'

export { Skeleton, SkeletonText, SkeletonCard }
