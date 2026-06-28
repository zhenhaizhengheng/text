import { forwardRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open,
      onClose,
      title,
      description,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      children,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose()
        }
      },
      [closeOnEscape, onClose]
    )

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
      } else {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }, [open, handleKeyDown])

    if (!open) return null

    const handleOverlayClick = () => {
      if (closeOnOverlayClick) {
        onClose()
      }
    }

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={handleOverlayClick}
        />
        <div
          ref={ref}
          className={cn(
            'relative z-50 w-full max-w-lg mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 animate-scale-in',
            className
          )}
          onClick={handleContentClick}
          {...props}
        >
          {(title || description || showCloseButton) && (
            <div className="flex items-start justify-between p-6 pb-4 border-b border-white/5">
              <div className="space-y-1">
                {title && (
                  <h2 className="text-xl font-semibold text-white font-display tracking-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-sm text-white/60">{description}</p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors -mr-2 -mt-2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'

const ModalHeader = forwardRef<
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
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-xl font-semibold text-white font-display tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h2>
))
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = forwardRef<
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
ModalDescription.displayName = 'ModalDescription'

const ModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props}>
    {children}
  </div>
))
ModalContent.displayName = 'ModalContent'

const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-6 pt-4 border-t border-white/5 flex items-center justify-end gap-3',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ModalFooter.displayName = 'ModalFooter'

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter }
