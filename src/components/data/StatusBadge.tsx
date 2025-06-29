import { motion } from 'framer-motion'
import { Badge, type BadgeProps } from '../ui/Badge'
import { cn } from '@/lib/utils'

interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning'
  pulse?: boolean
  showIcon?: boolean
}

const statusConfig = {
  active: { variant: 'success' as const, color: 'bg-success-500', label: 'Active' },
  inactive: { variant: 'secondary' as const, color: 'bg-gray-500', label: 'Inactive' },
  pending: { variant: 'warning' as const, color: 'bg-warning-500', label: 'Pending' },
  error: { variant: 'destructive' as const, color: 'bg-error-500', label: 'Error' },
  success: { variant: 'success' as const, color: 'bg-success-500', label: 'Success' },
  warning: { variant: 'warning' as const, color: 'bg-warning-500', label: 'Warning' }
}

export function StatusBadge({ 
  status, 
  pulse = false, 
  showIcon = true, 
  children,
  className,
  ...props 
}: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge
      variant={config.variant}
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    >
      {showIcon && (
        <motion.div
          animate={pulse ? { scale: [1, 1.2, 1] } : {}}
          transition={pulse ? { duration: 2, repeat: Infinity } : {}}
          className={cn('w-2 h-2 rounded-full', config.color)}
        />
      )}
      {children || config.label}
    </Badge>
  )
}