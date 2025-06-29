import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Sparkles, Code, FileText, CheckCircle, Brain } from 'lucide-react'
import { Button } from './components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/Card'
import { Badge } from './components/ui/Badge'
import { LoadingSpinner } from './components/layout/LoadingSpinner'
import { AppHeader } from './components/layout/AppHeader'
import { AppSidebar } from './components/layout/AppSidebar'
import { ModelSelector } from './components/ai/ModelSelector'
import { TokenCounter } from './components/ai/TokenCounter'
import { FormInput } from './components/forms/FormInput'
import { StatusBadge } from './components/data/StatusBadge'
import { ThemeProvider } from './providers/ThemeProvider'
import { ToastProvider, useToastActions } from './components/ui/Toast'
import { PageContainer } from './components/layout/PageContainer'

// Import pages
import { LLMChatPage } from './pages/LLMChatPage'
import { ParaphrasePage } from './pages/ParaphrasePage'
import { CodeAssistantPage } from './pages/CodeAssistantPage'
import { GrammarCheckPage } from './pages/GrammarCheckPage'
import { SettingsPage } from './pages/SettingsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'

import type { AIModel } from './types'

const mockModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable model for complex tasks requiring deep understanding',
    inputPricing: 0.01,
    outputPricing: 0.03,
    contextWindow: 128000,
    capabilities: ['Text Generation', 'Code', 'Analysis', 'Math'],
    status: 'active'
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Exceptional performance on highly complex tasks',
    inputPricing: 0.015,
    outputPricing: 0.075,
    contextWindow: 200000,
    capabilities: ['Text Generation', 'Analysis', 'Creative Writing'],
    status: 'active'
  }
]

function DemoContent() {
  const [selectedModel, setSelectedModel] = React.useState('gpt-4')
  const [sampleText, setSampleText] = React.useState('Hello, this is a sample text to demonstrate token counting and cost estimation.')
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [activeItem, setActiveItem] = React.useState('main')
  const toast = useToastActions()

  const handleNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    toast[type](
      `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      `This is a sample ${type} notification to demonstrate the new toast system.`
    )
  }

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    toast.info('Search Performed', `Searching for: "${query}"`)
  }

  const handleSidebarItemClick = (itemId: string) => {
    setActiveItem(itemId)
    toast.success('Navigation', `Navigated to ${itemId}`)
  }

  // Render different pages based on active item
  const renderPage = () => {
    switch (activeItem) {
      case 'llm':
        return <LLMChatPage />
      case 'paraphrase':
        return <ParaphrasePage />
      case 'code':
        return <CodeAssistantPage />
      case 'grammar':
        return <GrammarCheckPage />
      case 'settings':
        return <SettingsPage />
      case 'analytics':
        return <AnalyticsPage />
      default:
        return (
          <PageContainer 
            title="Damkar UI Components" 
            description="Production-ready React component library for AI platforms"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Flame className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Damkar UI Components
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Production-ready React component library for AI platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                  TypeScript Ready
                </Badge>
                <Badge variant="info" icon={<Sparkles className="w-3 h-3" />}>
                  Fully Accessible
                </Badge>
                <Badge variant="warning" icon={<Code className="w-3 h-3" />}>
                  Modern Design
                </Badge>
              </div>
            </motion.div>

            {/* Component Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* AI Components */}
              <Card animated>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Components
                  </CardTitle>
                  <CardDescription>
                    Specialized components for AI model interaction
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ModelSelector
                    models={mockModels}
                    selectedModel={selectedModel}
                    onModelSelect={setSelectedModel}
                  />
                  
                  <TokenCounter
                    text={sampleText}
                    modelPricing={{ input: 0.01, output: 0.03 }}
                    maxTokens={4000}
                  />
                </CardContent>
              </Card>

              {/* Form Components */}
              <Card animated>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Form Components
                  </CardTitle>
                  <CardDescription>
                    Enhanced form inputs with validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormInput
                    label="Sample Input"
                    placeholder="Type something..."
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    helperText="This input demonstrates real-time token counting"
                  />
                  
                  <FormInput
                    label="Error State"
                    placeholder="This shows error state"
                    error="This field has an error"
                    required
                  />
                  
                  <FormInput
                    label="Success State"
                    placeholder="This shows success state"
                    success
                    value="Valid input"
                    onChange={() => {}}
                  />
                </CardContent>
              </Card>

              {/* Status & Notifications */}
              <Card animated>
                <CardHeader>
                  <CardTitle>Status & Notifications</CardTitle>
                  <CardDescription>
                    Status indicators and new toast notification system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="active" pulse />
                    <StatusBadge status="pending" />
                    <StatusBadge status="error" />
                    <StatusBadge status="warning" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleNotification('success')}
                    >
                      Success
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleNotification('error')}
                    >
                      Error
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleNotification('warning')}
                    >
                      Warning
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleNotification('info')}
                    >
                      Info
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Loading States */}
              <Card animated>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>
                    Various loading indicators and states
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="md" />
                    <LoadingSpinner size="lg" />
                  </div>
                  
                  <LoadingSpinner text="Processing your request..." />
                  
                  <div className="flex gap-2">
                    <Button loading>
                      Loading Button
                    </Button>
                    <Button variant="outline" loading>
                      Loading Outline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Flame className="w-8 h-8" />,
                  title: 'Elegant Design System',
                  description: 'Beautiful, consistent design with light and dark mode support'
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: 'Smooth Animations',
                  description: 'Powered by Framer Motion for delightful micro-interactions'
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: 'Production Ready',
                  description: 'Fully tested components with TypeScript support'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </PageContainer>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onSearch={handleSearch}
      />
      
      {/* Main Layout with proper spacing for fixed header */}
      <div className="flex pt-16">
        <AppSidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          activeItem={activeItem}
          onItemClick={handleSidebarItemClick}
        />
        
        <div className="flex-1 min-h-[calc(100vh-4rem)]">
          {renderPage()}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DemoContent />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App