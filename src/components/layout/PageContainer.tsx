import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  animated?: boolean
}

export function PageContainer({ 
  children, 
  title, 
  description, 
  className,
  animated = true 
}: PageContainerProps) {
  const Component = animated ? motion.div : 'div'
  
  return (
    <Component
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={animated ? { duration: 0.3 } : undefined}
      className={cn('h-full overflow-y-auto', className)}
    >
      <div className="container mx-auto px-4 py-6">
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-display font-bold mb-2">{title}</h1>
            )}
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </Component>
  )
}