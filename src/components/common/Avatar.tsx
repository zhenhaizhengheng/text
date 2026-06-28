import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: AvatarSize
  status?: AvatarStatus
  fallback?: string
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, src, alt = 'avatar', size = 'md', status, fallback, ...props },
    ref
  ) => {
    const sizes: Record<AvatarSize, string> = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-14 h-14 text-base',
      xl: 'w-20 h-20 text-lg',
    }

    const statusSizes: Record<AvatarSize, string> = {
      sm: 'w-2 h-2 border',
      md: 'w-2.5 h-2.5 border-2',
      lg: 'w-3 h-3 border-2',
      xl: 'w-4 h-4 border-2',
    }

    const statusColors: Record<AvatarStatus, string> = {
      online: 'bg-emerald-500',
      offline: 'bg-gray-500',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    }

    const statusPositions: Record<AvatarSize, string> = {
      sm: 'bottom-0 right-0',
      md: 'bottom-0 right-0',
      lg: 'bottom-0.5 right-0.5',
      xl: 'bottom-1 right-1',
    }

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', className)}
        {...props}
      >
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-white/20 text-white font-medium backdrop-blur-sm',
            sizes[size]
          )}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
            />
          ) : fallback ? (
            <span>{getInitials(fallback)}</span>
          ) : (
            <User className={cn(
              'text-white/60',
              size === 'sm' && 'w-4 h-4',
              size === 'md' && 'w-5 h-5',
              size === 'lg' && 'w-7 h-7',
              size === 'xl' && 'w-10 h-10'
            )} />
          )}
        </div>
        {status && (
          <span
            className={cn(
              'absolute rounded-full border-space-900 shadow-lg',
              statusSizes[size],
              statusColors[status],
              statusPositions[size],
              status === 'online' && 'animate-pulse'
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
