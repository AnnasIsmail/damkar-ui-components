import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Flame, FileText, Code, CheckCircle } from 'lucide-react'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'conversation' | 'model' | 'command' | 'page'
  icon: React.ReactNode
  url?: string
  action?: () => void
}

interface SearchBarProps {
  onSearch?: (query: string) => void
  onResultSelect?: (result: SearchResult) => void
  placeholder?: string
  className?: string
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'LLM Chat',
    description: 'Start a new conversation with AI models',
    type: 'page',
    icon: <Flame className="w-4 h-4" />,
    url: '/llm'
  },
  {
    id: '2',
    title: 'Code Assistant',
    description: 'Get help with programming tasks',
    type: 'page',
    icon: <Code className="w-4 h-4" />,
    url: '/code'
  },
  {
    id: '3',
    title: 'Paraphrase Tool',
    description: 'Rewrite and improve your text',
    type: 'page',
    icon: <FileText className="w-4 h-4" />,
    url: '/paraphrase'
  },
  {
    id: '4',
    title: 'Grammar Check',
    description: 'Check and correct grammar mistakes',
    type: 'page',
    icon: <CheckCircle className="w-4 h-4" />,
    url: '/grammar'
  },
  {
    id: '5',
    title: 'GPT-4 Turbo',
    description: 'OpenAI\'s most capable model',
    type: 'model',
    icon: <Flame className="w-4 h-4" />
  }
]

const typeColors = {
  conversation: 'info',
  model: 'success',
  command: 'warning',
  page: 'secondary'
} as const

export function SearchBar({ 
  onSearch, 
  onResultSelect, 
  placeholder = "Search conversations, models, or commands...",
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter results based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(-1)
    } else {
      setResults([])
    }
  }, [query])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleResultSelect(results[selectedIndex])
        } else if (query.trim()) {
          onSearch?.(query)
          setIsOpen(false)
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleResultSelect = (result: SearchResult) => {
    onResultSelect?.(result)
    setQuery('')
    setIsOpen(false)
    
    // Navigate to URL if provided
    if (result.url) {
      console.log(`Navigating to: ${result.url}`)
      // In a real app, you would use your router here
      // router.push(result.url)
    }
    
    // Execute action if provided
    if (result.action) {
      result.action()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(true)
    onSearch?.(value)
  }

  return (
    <div ref={searchRef} className={cn('relative w-full max-w-md', className)}>
      <Input
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        leftIcon={<Search className="h-4 w-4" />}
        className="w-full"
      />

      <AnimatePresence>
        {isOpen && (query.trim() || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
                    onClick={() => handleResultSelect(result)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors',
                      selectedIndex === index && 'bg-accent'
                    )}
                  >
                    <div className="flex-shrink-0 text-muted-foreground">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium truncate">{result.title}</span>
                        <Badge 
                          variant={typeColors[result.type]} 
                          className="text-xs"
                        >
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{query}"</p>
                <p className="text-xs mt-1">Try searching for conversations, models, or commands</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Recent searches</span>
                </div>
                <div className="space-y-1">
                  {mockResults.slice(0, 3).map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultSelect(result)}
                      className="w-full flex items-center gap-3 p-2 rounded-md text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex-shrink-0 text-muted-foreground">
                        {result.icon}
                      </div>
                      <span className="text-sm">{result.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}