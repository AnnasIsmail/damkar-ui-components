import { useState, useCallback } from 'react'

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

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payment Successful',
    message: 'Your account has been topped up with $50.00. Your new balance is $125.50.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    read: false,
    category: 'billing',
    actionUrl: '/billing',
    actionLabel: 'View Details'
  },
  {
    id: '2',
    type: 'warning',
    title: 'API Rate Limit Warning',
    message: 'You have used 85% of your monthly API quota. Consider upgrading your plan.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    category: 'ai',
    actionUrl: '/billing',
    actionLabel: 'Upgrade Plan'
  },
  {
    id: '3',
    type: 'info',
    title: 'New Feature Available',
    message: 'Code Assistant now supports Python debugging. Try it out in your next project!',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: true,
    category: 'general',
    actionUrl: '/code',
    actionLabel: 'Try Now'
  },
  {
    id: '4',
    type: 'error',
    title: 'Failed Login Attempt',
    message: 'Someone tried to access your account from an unrecognized device in New York.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    read: false,
    category: 'security',
    actionUrl: '/settings',
    actionLabel: 'Review Security'
  },
  {
    id: '5',
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'We will be performing system maintenance on January 25th from 2:00 AM to 4:00 AM UTC.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
    category: 'system'
  },
  {
    id: '6',
    type: 'success',
    title: 'Model Update Complete',
    message: 'GPT-4 Turbo has been updated with improved performance and accuracy.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    category: 'ai'
  },
  {
    id: '7',
    type: 'info',
    title: 'Weekly Usage Report',
    message: 'Your weekly AI usage report is ready. You saved 15% compared to last week!',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: false,
    category: 'general',
    actionUrl: '/analytics',
    actionLabel: 'View Report'
  }
]

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }, [])

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    addNotification
  }
}