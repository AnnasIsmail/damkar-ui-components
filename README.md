# 🔥 Damkar UI

<div align="center">

![Damkar UI](https://img.shields.io/badge/Damkar-UI%20Components-orange?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue?style=for-the-badge&logo=tailwindcss)

**A modern, production-ready React component library for AI platforms**

[📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🎨 Components](#components) • [🔧 API Reference](#api-reference)

</div>

---

## ✨ Features

- 🎨 **Beautiful Design System** - Elegant, consistent design with light/dark mode support
- 🚀 **Production Ready** - Fully tested components with TypeScript support
- 🤖 **AI-Focused Components** - Specialized components for AI model interaction
- 📱 **Responsive Design** - Mobile-first approach with modern breakpoints
- ⚡ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🎯 **Accessibility First** - WCAG compliant with keyboard navigation
- 🔧 **Developer Experience** - Excellent TypeScript support and tree-shaking
- 🎭 **Themeable** - Customizable design tokens and CSS variables

## 🚀 Quick Start

### Installation

```bash
npm install @damkar/ui
# or
yarn add @damkar/ui
# or
pnpm add @damkar/ui
```

### Setup

1. **Install Tailwind CSS** (if not already installed):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure Tailwind** to include Damkar UI styles in your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@damkar/ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        // ... other color variables
      }
    }
  },
  plugins: []
}
```

3. **Add CSS variables** to your main CSS file:

```css
@import '@damkar/ui/styles';

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    /* ... other variables */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... dark mode variables */
  }
}
```

4. **Wrap your app** with the ThemeProvider:

```tsx
import { ThemeProvider } from '@damkar/ui'

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  )
}
```

## 🎨 Components

### Basic Usage

```tsx
import { Button, Card, Badge } from '@damkar/ui'

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome to Damkar UI</Card.Title>
        <Card.Description>
          Beautiful components for modern applications
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex gap-2">
          <Button>Primary Button</Button>
          <Button variant="outline">Secondary</Button>
          <Badge variant="success">Active</Badge>
        </div>
      </Card.Content>
    </Card>
  )
}
```

### AI Components

```tsx
import { ModelSelector, TokenCounter } from '@damkar/ui'

const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable model',
    inputPricing: 0.01,
    outputPricing: 0.03,
    contextWindow: 128000,
    capabilities: ['Text Generation', 'Code'],
    status: 'active'
  }
]

function AIInterface() {
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [text, setText] = useState('')

  return (
    <div className="space-y-4">
      <ModelSelector
        models={models}
        selectedModel={selectedModel}
        onModelSelect={setSelectedModel}
      />
      
      <TokenCounter
        text={text}
        modelPricing={{ input: 0.01, output: 0.03 }}
        maxTokens={4000}
      />
    </div>
  )
}
```

### Form Components

```tsx
import { FormInput, Button } from '@damkar/ui'

function LoginForm() {
  return (
    <form className="space-y-4">
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      
      <FormInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
      />
      
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )
}
```

## 📚 Component Categories

### 🎨 UI Components
- **Button** - Versatile button with multiple variants and loading states
- **Card** - Flexible container with header, content, and footer sections
- **Badge** - Status indicators and labels with color variants
- **Input** - Enhanced input with icons and validation states
- **Textarea** - Multi-line text input with validation

### 🤖 AI Components
- **ModelSelector** - Dropdown for selecting AI models with pricing info
- **TokenCounter** - Real-time token counting and cost estimation

### 📝 Form Components
- **FormInput** - Complete form input with label, validation, and helper text

### 🎯 Data Components
- **StatusBadge** - Status indicators with optional pulse animation

### 🏗️ Layout Components
- **LoadingSpinner** - Elegant loading indicators in multiple sizes
- **PageContainer** - Consistent page layout wrapper

### 🧭 Navigation Components
- **SearchBar** - Advanced search with autocomplete and filtering

## 🔧 API Reference

### Button

```tsx
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  animated?: boolean
}
```

### Card

```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost'
  padding?: 'none' | 'sm' | 'default' | 'lg'
  animated?: boolean
}
```

### ModelSelector

```tsx
interface ModelSelectorProps {
  models: AIModel[]
  selectedModel?: string
  onModelSelect: (modelId: string) => void
}

interface AIModel {
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
```

## 🎭 Theming

### Custom Theme

```tsx
import { ThemeProvider } from '@damkar/ui'

const customTheme = {
  theme: 'dark',
  primaryColor: '#f97316',
  borderRadius: 8
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Your app */}
    </ThemeProvider>
  )
}
```

### CSS Variables

Customize the design system by overriding CSS variables:

```css
:root {
  --primary: 24 100% 50%;        /* Orange primary */
  --radius: 0.75rem;             /* Border radius */
  --font-sans: 'Inter', sans-serif;
}
```

## 🧪 Testing

Components are thoroughly tested with Vitest and Testing Library:

```bash
npm test
```

## 📖 Storybook

Explore components interactively:

```bash
npm run storybook
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Radix UI](https://www.radix-ui.com/) for accessibility primitives inspiration

---

<div align="center">

**Made with ❤️ by the Damkar Team**

⭐ Star this repo if you find it helpful!

</div>