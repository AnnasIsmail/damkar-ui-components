import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Copy, Download, FileText } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { LoadingSpinner } from '../components/layout/LoadingSpinner'
import { useToastActions } from '../components/ui/Toast'

interface GrammarError {
  id: string
  type: 'grammar' | 'spelling' | 'punctuation' | 'style'
  message: string
  suggestion: string
  position: { start: number; end: number }
  severity: 'error' | 'warning' | 'suggestion'
}

const mockErrors: GrammarError[] = [
  {
    id: '1',
    type: 'grammar',
    message: 'Subject-verb disagreement',
    suggestion: 'Change "are" to "is"',
    position: { start: 15, end: 18 },
    severity: 'error'
  },
  {
    id: '2',
    type: 'spelling',
    message: 'Possible spelling mistake',
    suggestion: 'Change "recieve" to "receive"',
    position: { start: 45, end: 52 },
    severity: 'error'
  },
  {
    id: '3',
    type: 'style',
    message: 'Consider using active voice',
    suggestion: 'Rewrite in active voice for clarity',
    position: { start: 80, end: 95 },
    severity: 'suggestion'
  }
]

export function GrammarCheckPage() {
  const [inputText, setInputText] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [errors, setErrors] = useState<GrammarError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastActions()

  const handleCheckGrammar = async () => {
    if (!inputText.trim()) {
      toast.warning('Input Required', 'Please enter some text to check')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setErrors(mockErrors)
      setCorrectedText(`This is a corrected version of your text: "${inputText}". In a real implementation, this would be processed by an advanced grammar checking service that identifies and corrects grammar, spelling, punctuation, and style issues.`)
      setIsLoading(false)
      
      toast.success('Grammar Check Complete', `Found ${mockErrors.length} issues in your text`)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText)
    toast.success('Copied!', 'Corrected text copied to clipboard')
  }

  const handleDownload = () => {
    const blob = new Blob([correctedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'corrected-text.txt'
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Downloaded!', 'Corrected text saved as file')
  }

  const getErrorIcon = (severity: GrammarError['severity']) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />
    }
  }

  const getErrorBadge = (type: GrammarError['type']) => {
    const variants = {
      grammar: 'destructive',
      spelling: 'destructive',
      punctuation: 'warning',
      style: 'info'
    } as const
    
    return <Badge variant={variants[type]} className="text-xs">{type}</Badge>
  }

  return (
    <div className="h-full overflow-y-auto">
      <PageContainer 
        title="Grammar Check" 
        description="Check and correct grammar, spelling, and style issues in your text"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader className="bg-accent/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Enter your text to check
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste or type your text here..."
                  className="w-full h-40 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{inputText.length} characters</span>
                  <span>{inputText.split(' ').filter(w => w.length > 0).length} words</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckGrammar}
                disabled={!inputText.trim() || isLoading}
                loading={isLoading}
                leftIcon={<CheckCircle className="w-4 h-4" />}
                className="w-full"
              >
                {isLoading ? 'Checking Grammar...' : 'Check Grammar'}
              </Button>
            </CardContent>
          </Card>

          {/* Issues Panel */}
          <Card className="shadow-lg">
            <CardHeader className="bg-accent/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Issues Found
                {errors.length > 0 && (
                  <Badge variant="destructive">{errors.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {errors.length > 0 ? (
                <div className="space-y-3">
                  {errors.map((error) => (
                    <motion.div
                      key={error.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 border rounded-md space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        {getErrorIcon(error.severity)}
                        {getErrorBadge(error.type)}
                      </div>
                      <p className="text-sm font-medium">{error.message}</p>
                      <p className="text-xs text-muted-foreground">{error.suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No issues found yet</p>
                  <p className="text-xs">Check your text to see results</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Corrected Text */}
          <Card className="lg:col-span-3 shadow-lg">
            <CardHeader className="bg-accent/30 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Corrected Text
                </CardTitle>
                {correctedText && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      leftIcon={<Copy className="w-4 h-4" />}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <LoadingSpinner text="Checking your grammar..." />
                </div>
              ) : correctedText ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-sm leading-relaxed">{correctedText}</p>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{correctedText.length} characters</span>
                    <span>{correctedText.split(' ').filter(w => w.length > 0).length} words</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your corrected text will appear here</p>
                  <p className="text-xs mt-1">Enter some text and click "Check Grammar" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  )
}