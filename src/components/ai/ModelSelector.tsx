import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Clock, DollarSign, CheckCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { cn } from '@/lib/utils'
import type { AIModel } from '@/types'

interface ModelSelectorProps {
  models: AIModel[]
  selectedModel?: string
  onModelSelect: (modelId: string) => void
  className?: string
}

export function ModelSelector({ 
  models, 
  selectedModel, 
  onModelSelect,
  className 
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = models.find(model => model.id === selectedModel)

  return (
    <div className={cn('relative w-full', className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-auto p-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={cn(
            'w-3 h-3 rounded-full flex-shrink-0',
            selected?.status === 'active' ? 'bg-green-500' :
            selected?.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
          )} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm truncate">
                {selected?.name || 'Select Model'}
              </span>
              {selected && (
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  {selected.provider}
                </Badge>
              )}
            </div>
            {selected && (
              <p className="text-xs text-muted-foreground truncate">
                ${selected.inputPricing}/1K tokens
              </p>
            )}
          </div>
        </div>
        <ChevronDown className={cn(
          'h-4 w-4 transition-transform flex-shrink-0',
          isOpen && 'rotate-180'
        )} />
      </Button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="absolute top-full left-0 w-full mt-2 overflow-hidden bg-popover border rounded-xl shadow-lg z-50"
      >
        <div className="max-h-80 overflow-y-auto">
          {models.map((model) => (
            <motion.button
              key={model.id}
              whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
              onClick={() => {
                onModelSelect(model.id)
                setIsOpen(false)
              }}
              className="w-full p-4 text-left hover:bg-accent transition-colors border-b border-border/50 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={cn(
                    'w-3 h-3 rounded-full flex-shrink-0',
                    model.status === 'active' ? 'bg-green-500' :
                    model.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  )} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{model.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {model.provider}
                      </Badge>
                    </div>
                    {selectedModel === model.id && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs">Selected</span>
                      </div>
                    )}
                  </div>
                </div>
                {model.status !== 'active' && (
                  <Badge variant="warning" className="text-xs flex-shrink-0">
                    {model.status}
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {model.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{model.contextWindow.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">${model.inputPricing}/1K</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{model.capabilities.length} features</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selected model details - responsive */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-4 bg-muted/50 rounded-xl border border-border/50"
        >
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium block mb-2">Capabilities:</span>
              <div className="flex flex-wrap gap-1">
                {selected.capabilities.slice(0, 4).map((capability) => (
                  <Badge key={capability} variant="outline" className="text-xs">
                    {capability}
                  </Badge>
                ))}
                {selected.capabilities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{selected.capabilities.length - 4}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium">Input:</span>
                <span>${selected.inputPricing}/1K</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Output:</span>
                <span>${selected.outputPricing}/1K</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Context:</span>
                <span>{selected.contextWindow.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}