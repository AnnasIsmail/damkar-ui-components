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

## 📦 Updating Existing Package

If you've already published this package before, here are your options:

### Option 1: Update Version (Recommended)

```bash
# Check current package status
node scripts/check-package.js

# Update version and publish
npm run publish:patch  # for bug fixes (1.0.0 → 1.0.1)
npm run publish:minor  # for new features (1.0.0 → 1.1.0)
npm run publish:major  # for breaking changes (1.0.0 → 2.0.0)
```

### Option 2: Manual Version Update

```bash
# Update version manually
npm version patch|minor|major

# Build and publish
npm run build:lib
npm publish
```

### Option 3: Change Package Name

If you want a different package name, update `package.json`:

```json
{
  "name": "@your-org/ui-components",
  // or
  "name": "damkar-ui-components",
  // or
  "name": "@damkar/design-system"
}
```

## 🎨 Components

### Basic Usage

```tsx
import { Button, Card, Badge, Alert } from '@damkar/ui'
import { AlertTriangle } from 'lucide-react'

function MyComponent() {
  return (
    <div className="space-y-4">
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

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>
          This is a warning alert message.
        </Alert.Description>
      </Alert>
    </div>
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

## 📋 Available Components

### Core UI Components
- **Button** - Versatile button with multiple variants and loading states
- **Card** - Flexible container with header, content, and footer sections
- **Badge** - Small status indicators and labels
- **Input** - Enhanced input with icons and validation states
- **Textarea** - Multi-line text input
- **Alert** - Contextual feedback messages with variants
- **DropdownMenu** - Accessible dropdown menu system
- **Toast** - Non-intrusive notification system

### AI-Specific Components
- **ModelSelector** - Advanced AI model selection with pricing information
- **TokenCounter** - Real-time token counting and cost estimation

### Form Components
- **FormInput** - Complete form input with label, validation, and helper text

### Data Components
- **StatusBadge** - Status indicators with optional pulse animation

### Layout Components
- **LoadingSpinner** - Elegant loading indicators
- **PageContainer** - Consistent page layout wrapper

### Navigation Components
- **SearchBar** - Advanced search with autocomplete functionality

## 📋 Migration Guide

### From v1.0.x to v1.1.x

#### Breaking Changes

1. **Input Component**: `size` prop renamed to `inputSize`
   ```tsx
   // Before
   <Input size="lg" />
   
   // After
   <Input inputSize="lg" />
   ```

2. **Badge Component**: `error` variant renamed to `destructive`
   ```tsx
   // Before
   <Badge variant="error" />
   
   // After
   <Badge variant="destructive" />
   ```

#### New Features

- ✨ AI-specific components (ModelSelector, TokenCounter)
- 🚨 Alert component with multiple variants
- 🎨 Enhanced theming system
- 📱 Better responsive design
- ⚡ Improved animations

## 🔧 Development

### Local Development

```bash
# Clone repository
git clone https://github.com/damkar/ui.git
cd damkar-ui

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build library
npm run build:lib
```

### Release Process

```bash
# Check package status
node scripts/check-package.js

# Create release (automatically runs tests, builds, and publishes)
node scripts/release.js patch|minor|major
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the Damkar Team**

⭐ Star this repo if you find it helpful!

</div>