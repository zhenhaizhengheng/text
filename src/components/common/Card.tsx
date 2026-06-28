import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  glow?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden',
          hoverable &&
            'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
          glow && 'shadow-lg shadow-purple-500/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pb-4 border-b border-white/5', className)}
    {...props}
  >
    {children}
  </div>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold text-white font-display tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-white/60 mt-1', className)}
    {...props}
  >
    {children}
  </p>
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-4', className)} {...props}>
    {children}
  </div>
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-4 border-t border-white/5 flex items-center', className)}
    {...props}
  >
    {children}
  </div>
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
