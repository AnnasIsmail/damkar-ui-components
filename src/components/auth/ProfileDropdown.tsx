import { useState } from 'react'
import { 
  User, 
  Settings, 
  CreditCard, 
  BarChart3, 
  LogOut, 
  Moon, 
  Sun, 
  Monitor,
  Crown,
  Wallet
} from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/DropdownMenu'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useTheme } from '@/providers/ThemeProvider'
import { cn, formatCurrency } from '@/lib/utils'
import type { User as UserType } from '@/types'

interface ProfileDropdownProps {
  user: UserType
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onBillingClick?: () => void
  onAnalyticsClick?: () => void
  onLogout?: () => void
  className?: string
}

export function ProfileDropdown({
  user,
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onAnalyticsClick,
  onLogout,
  className
}: ProfileDropdownProps) {
  const { theme, setTheme } = useTheme()

  const getSubscriptionBadge = () => {
    switch (user.subscription) {
      case 'pro':
        return <Badge variant="info" className="text-xs">Pro</Badge>
      case 'enterprise':
        return <Badge variant="success" className="text-xs">Enterprise</Badge>
      default:
        return <Badge variant="secondary" className="text-xs">Free</Badge>
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn('rounded-full relative', className)}
        >
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
          {user.subscription !== 'free' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
              <Crown className="w-2 h-2 text-white" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <div className="relative">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              {user.subscription !== 'free' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                  <Crown className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium truncate">{user.name}</p>
                {getSubscriptionBadge()}
              </div>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Balance */}
        <div className="px-2 py-2">
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-success-500" />
              <span className="text-sm font-medium">Balance</span>
            </div>
            <span className="text-sm font-mono font-bold text-success-600">
              {formatCurrency(user.balance)}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onProfileClick}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onAnalyticsClick}>
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onBillingClick}>
          <CreditCard className="w-4 h-4 mr-2" />
          Billing & Usage
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onSettingsClick}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Theme Selector */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Theme
        </DropdownMenuLabel>
        
        <div className="px-2 pb-2">
          <div className="flex rounded-md border p-1">
            {(['light', 'dark', 'system'] as const).map((themeOption) => (
              <Button
                key={themeOption}
                variant={theme === themeOption ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme(themeOption)}
                className="flex-1 h-8 text-xs"
              >
                {themeOption === 'light' && <Sun className="w-3 h-3 mr-1" />}
                {themeOption === 'dark' && <Moon className="w-3 h-3 mr-1" />}
                {themeOption === 'system' && <Monitor className="w-3 h-3 mr-1" />}
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout} className="text-error-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}