import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DropdownContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

interface DropdownMenuProps {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({ children, onOpenChange }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <DropdownContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export function DropdownMenuTrigger({ children, asChild, className }: DropdownMenuTriggerProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu')

  const { open, setOpen } = context

  const handleClick = () => {
    setOpen(!open)
  }

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': true
    })
  }

  return (
    <button
      onClick={handleClick}
      className={cn('outline-none', className)}
      aria-expanded={open}
      aria-haspopup={true}
    >
      {children}
    </button>
  )
}

interface DropdownMenuContentProps {
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export function DropdownMenuContent({ 
  children, 
  align = 'end', 
  side = 'bottom',
  className 
}: DropdownMenuContentProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu')

  const { open, setOpen } = context
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpen])

  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  }

  const sideClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2 top-0',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-0'
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            alignmentClasses[align],
            sideClasses[side],
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface DropdownMenuItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function DropdownMenuItem({ 
  children, 
  onClick, 
  disabled = false,
  className 
}: DropdownMenuItemProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownMenuItem must be used within DropdownMenu')

  const { setOpen } = context

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
      setOpen(false)
    }
  }

  return (
    <motion.button
      whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
        className
      )}
    >
      {children}
    </motion.button>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <div className={cn('-mx-1 my-1 h-px bg-muted', className)} />
  )
}

export function DropdownMenuLabel({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={cn('px-2 py-1.5 text-sm font-semibold', className)}>
      {children}
    </div>
  )
}