import { ReactNode } from 'react'

// Theme types
export interface ThemeConfig {
  theme: 'light' | 'dark' | 'system'
  primaryColor: string
  borderRadius: number
}

// Auth types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'premium'
  subscription: 'free' | 'pro' | 'enterprise'
  balance: number
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// AI Domain types
export type AIDomain = 'main' | 'llm' | 'paraphrase' | 'code' | 'grammar'

export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  inputPricing: number
  outputPricing: number
  contextWindow: number
  capabilities: string[]
  status: 'active' | 'maintenance' | 'deprecated'
}

export interface Conversation {
  id: string
  title: string
  domain: AIDomain
  model: string
  messages: Message[]
  tokens: number
  cost: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  tokens: number
  timestamp: string
  metadata?: Record<string, any>
}

// Payment types
export interface Transaction {
  id: string
  type: 'topup' | 'usage' | 'refund'
  amount: number
  currency: string
  description: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface UsageMetrics {
  domain: AIDomain
  requests: number
  tokens: number
  cost: number
  period: string
}

// Component props types
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

export interface VariantProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

// Form types
export interface FormFieldProps {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
}

// Table types
export interface Column<T = any> {
  key: keyof T
  title: string
  sortable?: boolean
  filterable?: boolean
  width?: number | string
  render?: (value: any, record: T) => ReactNode
}

export interface TableProps<T = any> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
  selection?: {
    selectedRowKeys: (string | number)[]
    onChange: (selectedRowKeys: (string | number)[]) => void
  }
}

// Notification types
export interface NotificationOptions {
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Config types
export interface AppConfig {
  apiUrl: string
  wsUrl: string
  features: {
    darkMode: boolean
    notifications: boolean
    analytics: boolean
  }
  domains: {
    [key in AIDomain]: {
      enabled: boolean
      models: string[]
      defaultModel: string
    }
  }
}

// Analytics types
export interface AnalyticsEvent {
  name: string
  properties: Record<string, any>
  timestamp: string
}

// Error types
export interface APIError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: any
}