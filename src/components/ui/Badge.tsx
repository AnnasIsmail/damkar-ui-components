import React, { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { badgeVariants, type BadgeVariants } from '@/lib/variants'

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, BadgeVariants {
  icon?: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, type BadgeProps }