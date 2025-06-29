import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles, Zap, Copy } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { ModelSelector } from '../components/ai/ModelSelector'
import { TokenCounter } from '../components/ai/TokenCounter'
import { LoadingSpinner } from '../components/layout/LoadingSpinner'
import { useToastActions } from '../components/ui/Toast'
import type { AIModel, Message } from '@/types'

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

export function LLMChatPage() {
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      tokens: 12,
      timestamp: new Date().toISOString()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastActions()

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      tokens: Math.ceil(inputValue.length / 4),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${inputValue}". This is a demo response from the ${mockModels.find(m => m.id === selectedModel)?.name} model. In a real implementation, this would be connected to the actual AI service with advanced natural language processing capabilities.`,
        tokens: Math.ceil(inputValue.length / 2),
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Copied!', 'Message copied to clipboard')
  }

  const selectedModelData = mockModels.find(m => m.id === selectedModel)

  return (
    <PageContainer 
      title="LLM Chat" 
      description="Engage in conversations with advanced AI language models"
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Chat Area */}
        <div className="xl:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col shadow-lg">
            <CardHeader className="border-b border-border/50 bg-accent/30">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-lg">AI Conversation</span>
                    <p className="text-sm text-muted-foreground font-normal">
                      Powered by {selectedModelData?.name}
                    </p>
                  </div>
                </CardTitle>
                <Badge variant="success" className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent border border-border'
                      }`}>
                        {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className={`rounded-2xl p-4 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent/50 border border-border/50'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/20">
                          <div className="flex items-center gap-2 text-xs opacity-70">
                            <Zap className="w-3 h-3" />
                            <span>{message.tokens} tokens</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyMessage(message.content)}
                            className="h-6 w-6 p-0 hover:bg-white/20 dark:hover:bg-black/20"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-accent/50 border border-border/50 rounded-2xl p-4">
                      <LoadingSpinner size="sm" text="Thinking..." />
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="border-t border-border/50 p-6 bg-accent/20">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="px-6"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Model Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ModelSelector
                models={mockModels}
                selectedModel={selectedModel}
                onModelSelect={setSelectedModel}
              />
              
              <TokenCounter
                text={inputValue}
                modelPricing={selectedModelData ? {
                  input: selectedModelData.inputPricing,
                  output: selectedModelData.outputPricing
                } : { input: 0.01, output: 0.03 }}
                maxTokens={selectedModelData?.contextWindow || 4000}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Conversation Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="font-semibold text-lg">{messages.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                  <span className="text-sm text-muted-foreground">Total Tokens</span>
                  <span className="font-semibold text-lg">
                    {messages.reduce((sum, msg) => sum + msg.tokens, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10">
                  <span className="text-sm text-muted-foreground">Est. Cost</span>
                  <span className="font-semibold text-lg text-green-600">
                    ${(messages.reduce((sum, msg) => sum + msg.tokens, 0) * 0.01 / 1000).toFixed(4)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}