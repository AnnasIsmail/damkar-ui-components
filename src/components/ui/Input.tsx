import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { inputVariants, type InputVariants } from '@/lib/variants'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, Omit<InputVariants, 'size'> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  inputSize?: InputVariants['size']
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size: inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size: inputSize }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input, type InputProps }