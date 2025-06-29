import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Copy, Download, Wand2, Sparkles } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Textarea } from '../components/ui/Textarea'
import { LoadingSpinner } from '../components/layout/LoadingSpinner'
import { useToastActions } from '../components/ui/Toast'

const paraphraseStyles = [
  { id: 'standard', name: 'Standard', description: 'Balanced rewriting', icon: '📝' },
  { id: 'fluency', name: 'Fluency', description: 'Improve readability', icon: '✨' },
  { id: 'formal', name: 'Formal', description: 'Professional tone', icon: '🎩' },
  { id: 'simple', name: 'Simple', description: 'Easy to understand', icon: '🔍' },
  { id: 'creative', name: 'Creative', description: 'More expressive', icon: '🎨' },
  { id: 'expand', name: 'Expand', description: 'Add more details', icon: '📈' },
  { id: 'shorten', name: 'Shorten', description: 'Make it concise', icon: '✂️' }
]

export function ParaphrasePage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('standard')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastActions()

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast.warning('Input Required', 'Please enter some text to paraphrase')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const style = paraphraseStyles.find(s => s.id === selectedStyle)
      setOutputText(`This is a ${style?.name.toLowerCase()} paraphrase of your text: "${inputText}". The AI has carefully rewritten your content while maintaining the original meaning, adjusting the tone and style according to your selected preferences. This demonstrates the power of advanced natural language processing in content transformation.`)
      setIsLoading(false)
      
      toast.success('Paraphrase Complete', 'Your text has been successfully paraphrased')
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
    toast.success('Copied!', 'Paraphrased text copied to clipboard')
  }

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'paraphrased-text.txt'
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Downloaded!', 'Paraphrased text saved as file')
  }

  return (
    <PageContainer 
      title="Paraphrase Tool" 
      description="Rewrite and improve your text with AI-powered paraphrasing"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="xl:col-span-2 shadow-lg">
          <CardHeader className="bg-accent/30 border-b border-border/50">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg">
                <Wand2 className="w-5 h-5" />
              </div>
              Text Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="text-sm font-medium mb-3 block">
                Enter your text to paraphrase
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your text here..."
                className="min-h-[200px]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{inputText.length} characters</span>
                <span>{inputText.split(' ').filter(w => w.length > 0).length} words</span>
              </div>
            </div>

            <Button 
              onClick={handleParaphrase}
              disabled={!inputText.trim() || isLoading}
              loading={isLoading}
              leftIcon={<RefreshCw className="w-4 h-4" />}
              className="w-full h-12"
            >
              {isLoading ? 'Paraphrasing...' : 'Paraphrase Text'}
            </Button>
          </CardContent>
        </Card>

        {/* Style Selection */}
        <Card className="shadow-lg">
          <CardHeader className="bg-accent/30 border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Paraphrase Style
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {paraphraseStyles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                    selectedStyle === style.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{style.icon}</span>
                    <span className="font-medium">{style.name}</span>
                    {selectedStyle === style.id && (
                      <Badge variant="default" className="text-xs ml-auto">Selected</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{style.description}</p>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="xl:col-span-3 shadow-lg">
          <CardHeader className="bg-accent/30 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white shadow-lg">
                  <RefreshCw className="w-5 h-5" />
                </div>
                Paraphrased Result
              </CardTitle>
              {outputText && (
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
              <div className="flex items-center justify-center h-40">
                <LoadingSpinner text="Paraphrasing your text..." />
              </div>
            ) : outputText ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-6 bg-accent/30 rounded-xl border border-border/50">
                  <p className="text-sm leading-relaxed">{outputText}</p>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{outputText.length} characters</span>
                  <span>{outputText.split(' ').filter(w => w.length > 0).length} words</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-muted-foreground py-16">
                <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">Your paraphrased text will appear here</p>
                <p className="text-sm">Enter some text and click "Paraphrase Text" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}