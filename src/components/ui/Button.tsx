import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariants } from '@/lib/variants'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'>, ButtonVariants {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  animated?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, animated = true, children, disabled, ...props }, ref) => {
    const Component = animated ? motion.button : 'button'
    
    const motionProps = animated ? {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 }
    } : {}
    
    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps }