import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ThemeConfig } from '@/types'

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  resolvedTheme: 'light' | 'dark'
  config: ThemeConfig
  updateConfig: (config: Partial<ThemeConfig>) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark' | 'system'
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'damkar-ui-theme'
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(defaultTheme)
  const [config, setConfig] = useState<ThemeConfig>({
    theme: defaultTheme,
    primaryColor: '#f97316',
    borderRadius: 8
  })

  const resolvedTheme = React.useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsedConfig = JSON.parse(stored)
        setConfig(parsedConfig)
        setTheme(parsedConfig.theme)
      } catch (error) {
        console.warn('Failed to parse stored theme config')
      }
    }
  }, [storageKey])

  const updateTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const newConfig = { ...config, theme: newTheme }
    setTheme(newTheme)
    setConfig(newConfig)
    localStorage.setItem(storageKey, JSON.stringify(newConfig))
  }

  const updateConfig = (newConfig: Partial<ThemeConfig>) => {
    const updatedConfig = { ...config, ...newConfig }
    setConfig(updatedConfig)
    localStorage.setItem(storageKey, JSON.stringify(updatedConfig))
    
    // Apply CSS custom properties
    const root = window.document.documentElement
    if (newConfig.primaryColor) {
      root.style.setProperty('--primary', newConfig.primaryColor)
    }
    if (newConfig.borderRadius) {
      root.style.setProperty('--radius', `${newConfig.borderRadius}px`)
    }
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: updateTheme,
      resolvedTheme,
      config,
      updateConfig
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}