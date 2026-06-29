import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
  description?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      icon,
      iconPosition = 'left',
      rightIcon,
      onRightIconClick,
      description,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || Math.random().toString(36).substring(2, 9)

    return (
      <div className={cn('w-full space-y-1.5', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-white/80"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200',
              icon && iconPosition === 'left' && 'pl-10',
              (icon && iconPosition === 'right') && 'pr-10',
              rightIcon && 'pr-10',
              error &&
                'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {rightIcon}
            </button>
          )}
        </div>
        {description && !error && (
          <p className="text-xs text-white/50">{description}</p>
        )}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
