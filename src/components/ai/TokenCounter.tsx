import { motion } from 'framer-motion'
import { Zap, AlertTriangle, DollarSign } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn, formatCurrency, calculateTokens, estimateCost } from '@/lib/utils'

interface TokenCounterProps {
  text: string
  modelPricing?: {
    input: number
    output: number
  }
  maxTokens?: number
  className?: string
}

export function TokenCounter({ 
  text, 
  modelPricing = { input: 0.001, output: 0.002 }, 
  maxTokens = 4000,
  className 
}: TokenCounterProps) {
  const tokenCount = calculateTokens(text)
  const estimatedCost = estimateCost(tokenCount, modelPricing.input)
  const percentage = (tokenCount / maxTokens) * 100
  
  const getStatusColor = (): 'destructive' | 'warning' | 'success' => {
    if (percentage >= 90) return 'destructive'
    if (percentage >= 75) return 'warning'
    return 'success'
  }

  const statusColor = getStatusColor()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-center gap-3 p-3 bg-muted rounded-lg', className)}
    >
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary-500" />
        <span className="text-sm font-medium">Tokens:</span>
        <Badge variant={statusColor} className="font-mono">
          {tokenCount.toLocaleString()} / {maxTokens.toLocaleString()}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-success-500" />
        <span className="text-sm font-medium">Est. Cost:</span>
        <span className="font-mono text-sm">
          {formatCurrency(estimatedCost)}
        </span>
      </div>

      {percentage >= 75 && (
        <div className="flex items-center gap-1 text-warning-600">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">
            {percentage >= 90 ? 'Near limit' : 'High usage'}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="flex-1 ml-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.5 }}
            className={cn(
              'h-2 rounded-full transition-colors',
              statusColor === 'destructive' ? 'bg-red-500' :
              statusColor === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
            )}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span>
          <span>{percentage.toFixed(1)}%</span>
          <span>{maxTokens.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  )
}