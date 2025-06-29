import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Menu, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { SearchBar } from '../navigation/SearchBar'
import { ProfileDropdown } from '../auth/ProfileDropdown'
import { NotificationPanel } from '../notifications/NotificationPanel'
import { useNotifications } from '../../hooks/useNotifications'
import { cn } from '@/lib/utils'
import type { User } from '@/types'

interface AppHeaderProps {
  onMenuToggle?: () => void
  onSearch?: (query: string) => void
  user?: User
  className?: string
}

// Mock user data for demo
const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  role: 'user',
  subscription: 'pro',
  balance: 25.50,
  createdAt: '2024-01-01T00:00:00Z'
}

export function AppHeader({ 
  onMenuToggle, 
  onSearch, 
  user = mockUser,
  className 
}: AppHeaderProps) {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false)
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  } = useNotifications()

  const handleProfileClick = () => {
    console.log('Profile clicked')
  }

  const handleSettingsClick = () => {
    console.log('Settings clicked')
  }

  const handleBillingClick = () => {
    console.log('Billing clicked')
  }

  const handleAnalyticsClick = () => {
    console.log('Analytics clicked')
  }

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'sticky top-0 z-50 w-full glass-effect border-b',
          className
        )}
      >
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Damkar AI
                </h1>
                <p className="text-xs text-muted-foreground">Multi-Domain Platform</p>
              </div>
            </motion.div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <SearchBar 
              onSearch={onSearch}
              onResultSelect={(result) => {
                console.log('Search result selected:', result)
              }}
            />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Notification Button */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleNotificationClick}
                className={cn(
                  'relative transition-colors',
                  isNotificationPanelOpen && 'bg-accent'
                )}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge 
                      variant="destructive" 
                      className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse"
                    >
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

            <ProfileDropdown
              user={user}
              onProfileClick={handleProfileClick}
              onSettingsClick={handleSettingsClick}
              onBillingClick={handleBillingClick}
              onAnalyticsClick={handleAnalyticsClick}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </motion.header>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDeleteNotification={deleteNotification}
        onClearAll={clearAll}
      />
    </>
  )
}