import { forwardRef, createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const activeTab = value ?? internalValue

    const setActiveTab = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl',
          className
        )}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsList.displayName = 'TabsList'

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext()
    const isActive = activeTab === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
            : 'text-white/60 hover:text-white hover:bg-white/5',
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext()
    const isActive = activeTab === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          'mt-4 animate-fade-in',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
