import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Play, Copy, Download, Terminal, FileCode } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { LoadingSpinner } from '../components/layout/LoadingSpinner'
import { useToastActions } from '../components/ui/Toast'

const languages = [
  { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
  { id: 'python', name: 'Python', color: 'bg-blue-500' },
  { id: 'typescript', name: 'TypeScript', color: 'bg-blue-600' },
  { id: 'react', name: 'React', color: 'bg-cyan-500' },
  { id: 'nodejs', name: 'Node.js', color: 'bg-green-600' },
  { id: 'html', name: 'HTML', color: 'bg-orange-500' },
  { id: 'css', name: 'CSS', color: 'bg-blue-400' },
  { id: 'sql', name: 'SQL', color: 'bg-gray-600' }
]

const codeTemplates = [
  {
    id: 'function',
    name: 'Function',
    description: 'Create a reusable function',
    template: 'Create a function that...'
  },
  {
    id: 'api',
    name: 'API Call',
    description: 'Make HTTP requests',
    template: 'Create an API call to...'
  },
  {
    id: 'component',
    name: 'Component',
    description: 'React component',
    template: 'Create a React component that...'
  },
  {
    id: 'algorithm',
    name: 'Algorithm',
    description: 'Solve a problem',
    template: 'Write an algorithm to...'
  }
]

export function CodeAssistantPage() {
  const [prompt, setPrompt] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastActions()

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      toast.warning('Prompt Required', 'Please describe what code you want to generate')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const language = languages.find(l => l.id === selectedLanguage)
      const sampleCode = `// Generated ${language?.name} code for: ${prompt}
${selectedLanguage === 'javascript' ? `
function sampleFunction() {
  // This is a demo implementation
  console.log('Hello from ${prompt}');
  return 'Generated code based on your prompt';
}

// Usage example
const result = sampleFunction();
console.log(result);
` : selectedLanguage === 'python' ? `
def sample_function():
    """This is a demo implementation"""
    print(f'Hello from ${prompt}')
    return 'Generated code based on your prompt'

# Usage example
result = sample_function()
print(result)
` : selectedLanguage === 'react' ? `
import React, { useState } from 'react';

function SampleComponent() {
  const [data, setData] = useState('${prompt}');
  
  return (
    <div>
      <h1>Generated Component</h1>
      <p>{data}</p>
    </div>
  );
}

export default SampleComponent;
` : `
// Generated code for: ${prompt}
// This is a demo implementation
console.log('Code generated successfully');
`}`

      setGeneratedCode(sampleCode)
      setIsLoading(false)
      
      toast.success('Code Generated', 'Your code has been successfully generated')
    }, 2500)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success('Copied!', 'Code copied to clipboard')
  }

  const handleDownloadCode = () => {
    const extension = selectedLanguage === 'python' ? 'py' : 
                     selectedLanguage === 'react' ? 'jsx' : 'js'
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-code.${extension}`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Downloaded!', 'Code saved as file')
  }

  const handleTemplateSelect = (template: typeof codeTemplates[0]) => {
    setPrompt(template.template)
  }

  return (
    <div className="h-full overflow-y-auto">
      <PageContainer 
        title="Code Assistant" 
        description="Generate, debug, and optimize code with AI assistance"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Input Section */}
          <Card className="lg:col-span-3 shadow-lg">
            <CardHeader className="bg-accent/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                Code Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {/* Language Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Programming Language
                </label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedLanguage === lang.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${lang.color}`} />
                        {lang.name}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Describe what you want to build
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Create a function that validates email addresses..."
                  className="w-full h-32 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>

              <Button 
                onClick={handleGenerateCode}
                disabled={!prompt.trim() || isLoading}
                loading={isLoading}
                leftIcon={<Code className="w-4 h-4" />}
                className="w-full"
              >
                {isLoading ? 'Generating Code...' : 'Generate Code'}
              </Button>
            </CardContent>
          </Card>

          {/* Templates Sidebar */}
          <Card className="shadow-lg">
            <CardHeader className="bg-accent/30 border-b border-border/50">
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {codeTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTemplateSelect(template)}
                    className="w-full p-3 text-left rounded-md border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileCode className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">{template.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generated Code */}
          <Card className="lg:col-span-4 shadow-lg">
            <CardHeader className="bg-accent/30 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-success-500" />
                  Generated Code
                  {generatedCode && (
                    <Badge variant="success" className="ml-2">
                      {languages.find(l => l.id === selectedLanguage)?.name}
                    </Badge>
                  )}
                </CardTitle>
                {generatedCode && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCode}
                      leftIcon={<Copy className="w-4 h-4" />}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadCode}
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
                <div className="flex items-center justify-center h-64">
                  <LoadingSpinner text="Generating your code..." />
                </div>
              ) : generatedCode ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{generatedCode}</code>
                  </pre>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{generatedCode.split('\n').length} lines</span>
                    <span>{generatedCode.length} characters</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground py-16">
                  <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Ready to generate code</p>
                  <p className="text-sm">Describe what you want to build and select a programming language</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  )
}