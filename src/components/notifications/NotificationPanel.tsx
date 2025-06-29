import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  Settings, 
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Zap,
  User,
  CreditCard,
  Shield,
  Clock,
  Filter
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { cn, formatRelativeTime } from '@/lib/utils'
import { useToastActions } from '../ui/Toast'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  category: 'general' | 'security' | 'billing' | 'system' | 'ai'
  actionUrl?: string
  actionLabel?: string
}

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (id: string) => void
  onClearAll: () => void
  className?: string
}

const notificationIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  system: Zap
}

const categoryIcons = {
  general: Bell,
  security: Shield,
  billing: CreditCard,
  system: Settings,
  ai: Zap
}

const typeColors = {
  info: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  system: 'text-purple-600 dark:text-purple-400'
}

const categoryColors = {
  general: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  security: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  billing: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  system: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  ai: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
}

export function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
  className
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const toast = useToastActions()

  const filteredNotifications = notifications.filter(notification => {
    const matchesReadFilter = filter === 'all' || (filter === 'unread' && !notification.read)
    const matchesCategoryFilter = categoryFilter === 'all' || notification.category === categoryFilter
    return matchesReadFilter && matchesCategoryFilter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead(id)
    toast.success('Marked as Read', 'Notification has been marked as read')
  }

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead()
    toast.success('All Read', 'All notifications marked as read')
  }

  const handleDelete = (id: string) => {
    onDeleteNotification(id)
    toast.success('Deleted', 'Notification has been removed')
  }

  const handleClearAll = () => {
    onClearAll()
    toast.success('Cleared', 'All notifications have been cleared')
  }

  const categories = ['all', 'general', 'security', 'billing', 'system', 'ai']

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              'fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] h-[calc(100vh-5rem)] bg-background border rounded-xl shadow-2xl z-50 flex flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-accent/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Notifications</h2>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread of {notifications.length} total
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters */}
            <div className="p-4 border-b space-y-3">
              {/* Read/Unread Filter */}
              <div className="flex rounded-lg border p-1">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="flex-1 h-8"
                >
                  All
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                  className="flex-1 h-8"
                >
                  Unread {unreadCount > 0 && <Badge variant="destructive" className="ml-1 text-xs">{unreadCount}</Badge>}
                </Button>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((category) => {
                  const Icon = category === 'all' ? Filter : categoryIcons[category as keyof typeof categoryIcons]
                  return (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(category)}
                      className="flex-shrink-0 h-8 text-xs"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  leftIcon={<Check className="w-4 h-4" />}
                >
                  Mark All Read
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                disabled={notifications.length === 0}
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                Clear All
              </Button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-1 p-2">
                  {filteredNotifications.map((notification, index) => {
                    const Icon = notificationIcons[notification.type]
                    const CategoryIcon = categoryIcons[notification.category]
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          'group relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md',
                          notification.read 
                            ? 'bg-background hover:bg-accent/50' 
                            : 'bg-accent/30 border-primary/20 hover:bg-accent/50'
                        )}
                      >
                        {/* Unread indicator */}
                        {!notification.read && (
                          <div className="absolute top-3 left-2 w-2 h-2 bg-primary rounded-full" />
                        )}

                        <div className="flex items-start gap-3 ml-2">
                          {/* Icon */}
                          <div className={cn('flex-shrink-0 mt-0.5', typeColors[notification.type])}>
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={cn(
                                'text-sm font-medium line-clamp-1',
                                !notification.read && 'font-semibold'
                              )}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Badge 
                                  variant="outline" 
                                  className={cn('text-xs', categoryColors[notification.category])}
                                >
                                  <CategoryIcon className="w-3 h-3 mr-1" />
                                  {notification.category}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {formatRelativeTime(notification.timestamp)}
                              </div>
                              
                              {notification.actionUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-6 text-xs"
                                >
                                  {notification.actionLabel || 'View'}
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="h-6 w-6"
                                title="Mark as read"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(notification.id)}
                              className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                              title="Delete notification"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Bell className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {filter === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-accent/20">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                leftIcon={<Settings className="w-4 h-4" />}
              >
                Notification Settings
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}