import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

type StatCardTrend = 'up' | 'down' | 'neutral'
type StatCardVariant = 'default' | 'purple' | 'blue' | 'green' | 'gold'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  value: string | number
  label: string
  trend?: StatCardTrend
  trendValue?: string
  variant?: StatCardVariant
  iconPosition?: 'left' | 'top'
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      icon,
      value,
      label,
      trend,
      trendValue,
      variant = 'default',
      iconPosition = 'top',
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<StatCardVariant, string> = {
      default: 'from-purple-500/20 to-pink-500/20 text-purple-300',
      purple: 'from-purple-500/20 to-purple-600/20 text-purple-300',
      blue: 'from-cyan-500/20 to-blue-500/20 text-cyan-300',
      green: 'from-emerald-500/20 to-green-500/20 text-emerald-300',
      gold: 'from-amber-500/20 to-yellow-500/20 text-amber-300',
    }

    const trendIcons = {
      up: TrendingUp,
      down: TrendingDown,
      neutral: Minus,
    }

    const trendColors = {
      up: 'text-emerald-400',
      down: 'text-red-400',
      neutral: 'text-white/60',
    }

    const TrendIcon = trend ? trendIcons[trend] : null

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
          iconPosition === 'top' ? 'text-center' : '',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 bg-gradient-to-br',
            variantStyles[variant]
          )}
        />

        <div
          className={cn(
            'relative z-10',
            iconPosition === 'top' ? 'space-y-3' : 'flex items-start gap-4'
          )}
        >
          {icon && (
            <div
              className={cn(
                'inline-flex items-center justify-center rounded-xl bg-gradient-to-br',
                variantStyles[variant],
                iconPosition === 'top' ? 'w-12 h-12 mx-auto' : 'w-12 h-12 shrink-0'
              )}
            >
              {icon}
            </div>
          )}

          <div className={iconPosition === 'left' ? 'flex-1 min-w-0' : ''}>
            <p className="text-sm text-white/60 font-medium">{label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span
                className={cn(
                  'text-3xl font-bold text-white font-display',
                  iconPosition === 'left' && 'text-2xl'
                )}
              >
                {value}
              </span>
              {trend && trendValue && TrendIcon && (
                <div
                  className={cn(
                    'inline-flex items-center gap-1 text-sm font-medium',
                    trendColors[trend]
                  )}
                >
                  <TrendIcon className="w-4 h-4" />
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

StatCard.displayName = 'StatCard'

export { StatCard }
