import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Input, type InputProps } from '../ui/Input'
import { cn } from '@/lib/utils'

interface FormInputProps extends Omit<InputProps, 'variant'> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  success?: boolean
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, required, success, className, ...props }, ref) => {
    const variant = error ? 'error' : success ? 'success' : 'default'
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <Input
            ref={ref}
            variant={variant}
            className={cn(className)}
            rightIcon={
              error ? (
                <AlertCircle className="h-4 w-4 text-error-500" />
              ) : success ? (
                <CheckCircle className="h-4 w-4 text-success-500" />
              ) : undefined
            }
            {...props}
          />
        </div>
        
        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-1"
          >
            {error && (
              <p className="text-sm text-error-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
          </motion.div>
        )}
      </motion.div>
    )
  }
)

FormInput.displayName = 'FormInput'

export { FormInput, type FormInputProps }