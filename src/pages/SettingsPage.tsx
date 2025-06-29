import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Key,
  Save,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Camera,
  Upload,
  Check,
  X,
  Smartphone,
  Mail,
  Lock,
  Trash2,
  Plus,
  Copy
} from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { FormInput } from '../components/forms/FormInput'
import { useTheme } from '../providers/ThemeProvider'
import { useToastActions } from '../components/ui/Toast'

interface SettingsSection {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  badge?: string
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile',
    icon: <User className="w-5 h-5" />,
    description: 'Personal information and avatar'
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: <Palette className="w-5 h-5" />,
    description: 'Theme and visual preferences'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <Bell className="w-5 h-5" />,
    description: 'Manage notification settings'
  },
  {
    id: 'security',
    title: 'Security',
    icon: <Shield className="w-5 h-5" />,
    description: 'Password and security options',
    badge: '2FA'
  },
  {
    id: 'api',
    title: 'API Keys',
    icon: <Key className="w-5 h-5" />,
    description: 'Manage API access keys'
  },
  {
    id: 'language',
    title: 'Language',
    icon: <Globe className="w-5 h-5" />,
    description: 'Language and region settings'
  }
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'AI enthusiast and developer passionate about creating innovative solutions',
    website: 'https://johndoe.dev',
    location: 'San Francisco, CA',
    company: 'Tech Innovations Inc.'
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    marketingEmails: false,
    weeklyReports: true,
    securityAlerts: true
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24',
    loginAlerts: true,
    passwordLastChanged: '2024-01-15'
  })
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Primary API Key',
      key: 'sk-1234567890abcdef1234567890abcdef',
      created: '2024-01-01',
      lastUsed: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'sk-abcdef1234567890abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '2024-01-18',
      status: 'active'
    }
  ])
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({})
  const [languageSettings, setLanguageSettings] = useState({
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12'
  })
  
  const { theme, setTheme } = useTheme()
  const toast = useToastActions()

  const handleSaveProfile = () => {
    toast.success('Profile Updated', 'Your profile information has been saved successfully')
  }

  const handleSaveNotifications = () => {
    toast.success('Notifications Updated', 'Your notification preferences have been saved')
  }

  const handleSaveSecurity = () => {
    toast.success('Security Updated', 'Your security settings have been updated')
  }

  const handleSaveLanguage = () => {
    toast.success('Language Settings Updated', 'Your language preferences have been saved')
  }

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('API Key Copied', 'The API key has been copied to your clipboard')
  }

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id))
    toast.success('API Key Deleted', 'The API key has been permanently deleted')
  }

  const handleGenerateApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: 'sk-' + Math.random().toString(36).substring(2, 34),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active' as const
    }
    setApiKeys(prev => [...prev, newKey])
    toast.success('API Key Generated', 'A new API key has been created')
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500 text-white shadow-lg">
              <User className="w-5 h-5" />
            </div>
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                JD
              </div>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">{profileData.name}</h3>
              <p className="text-muted-foreground">{profileData.email}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                  Upload Photo
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<Trash2 className="w-4 h-4" />}>
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              required
            />
            <FormInput
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
            />
            <FormInput
              label="Company"
              value={profileData.company}
              onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your company name"
            />
            <FormInput
              label="Location"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, Country"
            />
            <FormInput
              label="Website"
              value={profileData.website}
              onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://yourwebsite.com"
              className="md:col-span-2"
            />
          </div>
          
          <div className="mt-6">
            <label className="text-sm font-medium mb-2 block">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              className="w-full h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              maxLength={200}
            />
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {profileData.bio.length}/200
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveProfile} leftIcon={<Save className="w-4 h-4" />}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500 text-white shadow-lg">
              <Palette className="w-5 h-5" />
            </div>
            Appearance Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Theme Selection */}
          <div>
            <label className="text-sm font-medium mb-4 block">Theme Preference</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['light', 'dark', 'system'] as const).map((themeOption) => (
                <motion.div
                  key={themeOption}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={theme === themeOption ? 'default' : 'outline'}
                    onClick={() => setTheme(themeOption)}
                    className="w-full flex flex-col items-center gap-3 h-20 relative"
                  >
                    {themeOption === 'light' && <Sun className="w-6 h-6" />}
                    {themeOption === 'dark' && <Moon className="w-6 h-6" />}
                    {themeOption === 'system' && <Monitor className="w-6 h-6" />}
                    <span className="text-sm capitalize font-medium">{themeOption}</span>
                    {theme === themeOption && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Color Scheme */}
          <div>
            <label className="text-sm font-medium mb-4 block">Accent Color</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Blue', color: 'bg-blue-500', active: true },
                { name: 'Green', color: 'bg-green-500', active: false },
                { name: 'Purple', color: 'bg-purple-500', active: false },
                { name: 'Orange', color: 'bg-orange-500', active: false }
              ].map((color) => (
                <motion.div
                  key={color.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={color.active ? 'default' : 'outline'}
                    className="w-full flex flex-col items-center gap-2 h-16 relative"
                  >
                    <div className={`w-6 h-6 rounded-full ${color.color} shadow-lg`} />
                    <span className="text-xs font-medium">{color.name}</span>
                    {color.active && (
                      <div className="absolute top-1 right-1">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Display Options */}
          <div>
            <label className="text-sm font-medium mb-4 block">Display Options</label>
            <div className="space-y-4">
              {[
                { key: 'compactMode', title: 'Compact Mode', description: 'Reduce spacing and padding' },
                { key: 'animations', title: 'Animations', description: 'Enable smooth transitions and effects' },
                { key: 'highContrast', title: 'High Contrast', description: 'Improve accessibility with higher contrast' }
              ].map((option) => (
                <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{option.title}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Toggle
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500 text-white shadow-lg">
              <Bell className="w-5 h-5" />
            </div>
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Notifications
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'emailNotifications', title: 'General Notifications', description: 'Receive important updates via email' },
                  { key: 'weeklyReports', title: 'Weekly Reports', description: 'Get weekly usage and analytics reports' },
                  { key: 'securityAlerts', title: 'Security Alerts', description: 'Important security-related notifications' },
                  { key: 'marketingEmails', title: 'Marketing Emails', description: 'Product updates and promotional content' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{setting.title}</p>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                    <Button
                      variant={notificationSettings[setting.key as keyof typeof notificationSettings] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotificationSettings(prev => ({
                        ...prev,
                        [setting.key]: !prev[setting.key as keyof typeof notificationSettings]
                      }))}
                    >
                      {notificationSettings[setting.key as keyof typeof notificationSettings] ? 'On' : 'Off'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Push Notifications
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'pushNotifications', title: 'Browser Notifications', description: 'Show notifications in your browser' },
                  { key: 'soundEnabled', title: 'Sound Effects', description: 'Play sounds for notifications' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {setting.key === 'soundEnabled' ? (
                        notificationSettings[setting.key as keyof typeof notificationSettings] ? 
                        <Volume2 className="w-4 h-4 text-muted-foreground" /> :
                        <VolumeX className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Bell className="w-4 h-4 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{setting.title}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                    </div>
                    <Button
                      variant={notificationSettings[setting.key as keyof typeof notificationSettings] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotificationSettings(prev => ({
                        ...prev,
                        [setting.key]: !prev[setting.key as keyof typeof notificationSettings]
                      }))}
                    >
                      {notificationSettings[setting.key as keyof typeof notificationSettings] ? 'On' : 'Off'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveNotifications} leftIcon={<Save className="w-4 h-4" />}>
                Save Preferences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500 text-white shadow-lg">
              <Shield className="w-5 h-5" />
            </div>
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Password Section */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Last changed: {new Date(securitySettings.passwordLastChanged).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={securitySettings.twoFactorEnabled ? 'success' : 'secondary'}>
                  {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <Button
                  variant={securitySettings.twoFactorEnabled ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => setSecuritySettings(prev => ({
                    ...prev,
                    twoFactorEnabled: !prev.twoFactorEnabled
                  }))}
                >
                  {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
            {securitySettings.twoFactorEnabled && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Two-factor authentication is active. Your account is protected with an additional security layer.
                </p>
              </div>
            )}
          </div>
          
          {/* Session Management */}
          <div className="p-4 border rounded-lg">
            <label className="text-sm font-medium mb-3 block">Session Timeout</label>
            <select 
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings(prev => ({
                ...prev,
                sessionTimeout: e.target.value
              }))}
              className="w-full p-3 border rounded-lg bg-background"
            >
              <option value="1">1 hour</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
              <option value="168">1 week</option>
              <option value="0">Never</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2">
              Automatically log out after this period of inactivity
            </p>
          </div>
          
          {/* Login Alerts */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Login Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
            </div>
            <Button
              variant={securitySettings.loginAlerts ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSecuritySettings(prev => ({
                ...prev,
                loginAlerts: !prev.loginAlerts
              }))}
            >
              {securitySettings.loginAlerts ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSaveSecurity} leftIcon={<Save className="w-4 h-4" />}>
              Update Security
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderApiSection = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500 text-white shadow-lg">
              <Key className="w-5 h-5" />
            </div>
            API Keys Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Warning */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Security Notice</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Keep your API keys secure. Never share them publicly or commit them to version control.
                  Treat them like passwords and store them securely.
                </p>
              </div>
            </div>
          </div>
          
          {/* API Keys List */}
          <div className="space-y-4 mb-6">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{apiKey.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(apiKey.created).toLocaleDateString()} • 
                        Last used: {apiKey.lastUsed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">{apiKey.status}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteApiKey(apiKey.id)}
                      leftIcon={<Trash2 className="w-4 h-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type={showApiKeys[apiKey.id] ? 'text' : 'password'}
                    value={apiKey.key}
                    readOnly
                    className="font-mono text-sm flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKeys(prev => ({
                      ...prev,
                      [apiKey.id]: !prev[apiKey.id]
                    }))}
                  >
                    {showApiKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopyApiKey(apiKey.key)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleGenerateApiKey}
            leftIcon={<Plus className="w-4 h-4" />}
            className="w-full"
          >
            Generate New API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500 text-white shadow-lg">
              <Globe className="w-5 h-5" />
            </div>
            Language & Region Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Language</label>
              <select 
                value={languageSettings.language}
                onChange={(e) => setLanguageSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-3 border rounded-lg bg-background"
              >
                <option value="en">🇺🇸 English</option>
                <option value="id">🇮🇩 Bahasa Indonesia</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-3 block">Time Zone</label>
              <select 
                value={languageSettings.timezone}
                onChange={(e) => setLanguageSettings(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full p-3 border rounded-lg bg-background"
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai">Shanghai (CST)</option>
                <option value="Asia/Jakarta">Jakarta (WIB)</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-3 block">Date Format</label>
              <select 
                value={languageSettings.dateFormat}
                onChange={(e) => setLanguageSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                className="w-full p-3 border rounded-lg bg-background"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                <option value="DD MMM YYYY">DD MMM YYYY (31 Dec 2024)</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-3 block">Time Format</label>
              <select 
                value={languageSettings.timeFormat}
                onChange={(e) => setLanguageSettings(prev => ({ ...prev, timeFormat: e.target.value }))}
                className="w-full p-3 border rounded-lg bg-background"
              >
                <option value="12">12-hour (2:30 PM)</option>
                <option value="24">24-hour (14:30)</option>
              </select>
            </div>
          </div>
          
          {/* Preview */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Date: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: languageSettings.dateFormat.includes('MMM') ? 'short' : '2-digit',
                day: '2-digit'
              })}</p>
              <p>Time: {new Date().toLocaleTimeString('en-US', { 
                hour12: languageSettings.timeFormat === '12',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p>Timezone: {languageSettings.timezone}</p>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSaveLanguage} leftIcon={<Save className="w-4 h-4" />}>
              Save Language Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection()
      case 'appearance': return renderAppearanceSection()
      case 'notifications': return renderNotificationsSection()
      case 'security': return renderSecuritySection()
      case 'api': return renderApiSection()
      case 'language': return renderLanguageSection()
      default: return renderProfileSection()
    }
  }

  return (
    <PageContainer 
      title="Settings" 
      description="Manage your account preferences and application settings"
    >
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Settings Navigation */}
        <Card className="xl:col-span-1 shadow-lg h-fit sticky top-6">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950 border-b">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200',
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'hover:bg-accent hover:shadow-sm'
                  )}
                >
                  <div className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    activeSection === section.id 
                      ? 'bg-white/20' 
                      : 'bg-muted'
                  )}>
                    {section.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{section.title}</p>
                      {section.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs opacity-70 truncate">{section.description}</p>
                  </div>
                </motion.button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="xl:col-span-4">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </PageContainer>
  )
}