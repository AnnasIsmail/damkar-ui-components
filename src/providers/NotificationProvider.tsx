import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { cn, generateId } from '@/lib/utils'
import type { NotificationOptions } from '@/types'

interface Notification extends NotificationOptions {
  id: string
  createdAt: Date
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: NotificationOptions) => string
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const colors = {
  success: 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 text-green-900 dark:text-green-100',
  error: 'border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 text-red-900 dark:text-red-100',
  warning: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
  info: 'border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 text-blue-900 dark:text-blue-100'
}

const iconColors = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400'
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: NotificationOptions): string => {
    const id = generateId()
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date()
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }

    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      
      {/* Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => {
            const Icon = icons[notification.type as keyof typeof icons]
            
            return (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className={cn(
                  'relative flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm',
                  colors[notification.type as keyof typeof colors]
                )}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColors[notification.type as keyof typeof iconColors])} />
                
                <div className="flex-1 space-y-1 min-w-0">
                  <h4 className="text-sm font-semibold">{notification.title}</h4>
                  {notification.description && (
                    <p className="text-sm opacity-90">{notification.description}</p>
                  )}
                  
                  {notification.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={notification.action.onClick}
                      className="mt-2 h-8"
                    >
                      {notification.action.label}
                    </Button>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0 hover:bg-black/10 dark:hover:bg-white/10"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}