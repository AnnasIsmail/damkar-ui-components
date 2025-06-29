import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Brain, 
  FileText, 
  Code, 
  CheckCircle, 
  Settings, 
  CreditCard,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { cn } from '@/lib/utils'
import type { AIDomain } from '@/types'

interface SidebarItem {
  id: AIDomain | 'settings' | 'billing' | 'analytics'
  label: string
  icon: React.ReactNode
  href: string
  badge?: string | number
  isActive?: boolean
}

interface AppSidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeItem?: string
  onItemClick?: (id: string) => void
  className?: string
}

const sidebarItems: SidebarItem[] = [
  { id: 'main', label: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/main' },
  { id: 'llm', label: 'LLM Chat', icon: <Brain className="w-5 h-5" />, href: '/llm', badge: 'Pro' },
  { id: 'paraphrase', label: 'Paraphrase', icon: <FileText className="w-5 h-5" />, href: '/paraphrase' },
  { id: 'code', label: 'Code Assistant', icon: <Code className="w-5 h-5" />, href: '/code', badge: 'Beta' },
  { id: 'grammar', label: 'Grammar Check', icon: <CheckCircle className="w-5 h-5" />, href: '/grammar' },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, href: '/analytics' },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" />, href: '/billing' },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings' }
]

export function AppSidebar({ 
  isOpen, 
  onToggle, 
  activeItem = 'main', 
  onItemClick,
  className 
}: AppSidebarProps) {
  const handleItemClick = (item: SidebarItem) => {
    console.log(`Navigating to: ${item.href}`)
    onItemClick?.(item.id)
  }

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 80,
          x: 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] glass-effect border-r lg:relative lg:top-0 lg:h-screen',
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Toggle button */}
          <div className="flex justify-end p-4 border-b border-border/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 hover:bg-accent/50"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 space-y-2 p-4">
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={activeItem === item.id ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-12 transition-all duration-200',
                    !isOpen && 'px-3',
                    activeItem === item.id && 'shadow-lg'
                  )}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex items-center justify-between flex-1 min-w-0"
                      >
                        <span className="truncate font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-t border-border/50 p-4"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg elegant-gradient text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-foreground">Damkar UI v0.1.0</p>
                    <p className="text-muted-foreground">Component Library</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  )
}