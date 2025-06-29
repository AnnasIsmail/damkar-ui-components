# 🔥 Damkar UI Components

<div align="center">

![Damkar UI](https://img.shields.io/badge/Damkar-UI%20Components-orange?style=for-the-badge&logo=react)
![NPM Version](https://img.shields.io/npm/v/damkar-ui-components?style=for-the-badge&color=blue)
![NPM Downloads](https://img.shields.io/npm/dm/damkar-ui-components?style=for-the-badge&color=green)
![License](https://img.shields.io/npm/l/damkar-ui-components?style=for-the-badge&color=purple)

**A modern, production-ready React component library for AI platforms**

[📦 NPM Package](https://www.npmjs.com/package/damkar-ui-components) • [🔗 GitHub](https://github.com/AnnasIsmail/damkar-ui-components) • [📖 Documentation](#documentation)

</div>

---

## ✨ Features

- 🎨 **Beautiful Design System** - Elegant, consistent design with light/dark mode support
- 🚀 **Production Ready** - Fully tested components with TypeScript support
- 🤖 **AI-Focused Components** - Specialized components for AI model interaction
- 📱 **Responsive Design** - Mobile-first approach with modern breakpoints
- ⚡ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🎯 **Accessibility First** - WCAG compliant with keyboard navigation
- 🔧 **Developer Experience** - Excellent TypeScript support and documentation
- 🎭 **Themeable** - Customizable design tokens and CSS variables

## 🚀 Quick Start

### Installation

```bash
# npm
npm install damkar-ui-components

# yarn
yarn add damkar-ui-components

# pnpm
pnpm add damkar-ui-components
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom framer-motion lucide-react clsx tailwind-merge class-variance-authority
```

### Setup

1. **Import CSS** - Add the component styles to your app:

```tsx
import 'damkar-ui-components/dist/style.css'
```

2. **Configure Tailwind** - Extend your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/damkar-ui-components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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

3. **Add CSS Variables** - Include in your global CSS:

```css
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

### Basic Usage

```tsx
import React from 'react'
import { Button, Card, Badge, ThemeProvider } from 'damkar-ui-components'

function App() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Damkar UI</h1>
          <div className="flex gap-4">
            <Button variant="default">Primary Button</Button>
            <Button variant="outline">Secondary Button</Button>
            <Badge variant="success">Success Badge</Badge>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default App
```

## 📚 Component Categories

### 🎨 UI Components

#### Button
Versatile button component with multiple variants and states.

```tsx
import { Button } from 'damkar-ui-components'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>

// With icons
<Button leftIcon={<Download />}>Download</Button>
<Button rightIcon={<ArrowRight />}>Continue</Button>

// Loading state
<Button loading>Processing...</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

#### Card
Flexible container component for content organization.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from 'damkar-ui-components'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>

// Animated card
<Card animated>
  <CardContent>Animated content</CardContent>
</Card>
```

#### Badge
Small status indicators and labels.

```tsx
import { Badge } from 'damkar-ui-components'

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>

// With icons
<Badge variant="info" icon={<Star />}>Featured</Badge>
```

#### Input
Enhanced input component with validation states.

```tsx
import { Input } from 'damkar-ui-components'

// Basic input
<Input placeholder="Enter text..." />

// With icons
<Input 
  leftIcon={<Search />} 
  placeholder="Search..." 
/>

// Validation states
<Input variant="error" />
<Input variant="success" />
```

### 🤖 AI Components

#### ModelSelector
Specialized component for AI model selection.

```tsx
import { ModelSelector } from 'damkar-ui-components'

const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable model',
    inputPricing: 0.01,
    outputPricing: 0.03,
    contextWindow: 128000,
    capabilities: ['Text', 'Code'],
    status: 'active'
  }
]

<ModelSelector
  models={models}
  selectedModel="gpt-4"
  onModelSelect={(modelId) => console.log(modelId)}
/>
```

#### TokenCounter
Real-time token counting and cost estimation.

```tsx
import { TokenCounter } from 'damkar-ui-components'

<TokenCounter
  text="Your input text"
  modelPricing={{ input: 0.01, output: 0.03 }}
  maxTokens={4000}
/>
```

### 📝 Form Components

#### FormInput
Enhanced input with label, validation, and helper text.

```tsx
import { FormInput } from 'damkar-ui-components'

<FormInput
  label="Email Address"
  placeholder="Enter your email"
  required
  error="Please enter a valid email"
  helperText="We'll never share your email"
/>

// Success state
<FormInput
  label="Username"
  value="john_doe"
  success
/>
```

### 🎯 Data Components

#### StatusBadge
Status indicators with pulse animation.

```tsx
import { StatusBadge } from 'damkar-ui-components'

<StatusBadge status="active" pulse />
<StatusBadge status="pending" />
<StatusBadge status="error" />
```

### 🏗️ Layout Components

#### LoadingSpinner
Elegant loading indicators.

```tsx
import { LoadingSpinner } from 'damkar-ui-components'

<LoadingSpinner size="sm" />
<LoadingSpinner size="lg" text="Loading..." />
```

#### PageContainer
Consistent page layout wrapper.

```tsx
import { PageContainer } from 'damkar-ui-components'

<PageContainer 
  title="Page Title"
  description="Page description"
>
  <div>Page content</div>
</PageContainer>
```

### 🔔 Notification System

#### Toast Provider
Modern toast notification system.

```tsx
import { ToastProvider, useToastActions } from 'damkar-ui-components'

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  )
}

function YourComponent() {
  const toast = useToastActions()
  
  const handleClick = () => {
    toast.success('Success!', 'Operation completed successfully')
    toast.error('Error!', 'Something went wrong')
    toast.warning('Warning!', 'Please check your input')
    toast.info('Info', 'Here\'s some information')
  }
  
  return <Button onClick={handleClick}>Show Toast</Button>
}
```

### 🎨 Theme System

#### ThemeProvider
Comprehensive theme management.

```tsx
import { ThemeProvider, useTheme } from 'damkar-ui-components'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </Button>
  )
}
```

## 🎨 Styling & Customization

### CSS Variables

Customize the design system by overriding CSS variables:

```css
:root {
  --primary: 220 100% 50%;        /* Custom primary color */
  --radius: 12px;                 /* Custom border radius */
  --font-sans: 'Custom Font';     /* Custom font family */
}
```

### Component Variants

Most components support variant customization:

```tsx
// Button variants
<Button variant="default | destructive | outline | secondary | ghost | link" />

// Badge variants  
<Badge variant="default | secondary | destructive | outline | success | warning | info" />

// Card variants
<Card variant="default | elevated | outline | ghost" />
```

### Animation Control

Disable animations globally or per component:

```tsx
// Disable animations for a specific component
<Button animated={false}>No Animation</Button>

// Or use CSS
.no-animations * {
  animation: none !important;
  transition: none !important;
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

```tsx
// Responsive grid example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols</Card>
</div>

// Responsive text
<h1 className="text-xl md:text-2xl lg:text-3xl">
  Responsive heading
</h1>
```

## ♿ Accessibility

Components follow WCAG 2.1 guidelines:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets AA standards
- **Semantic HTML**: Proper HTML structure

```tsx
// Accessibility features
<Button 
  aria-label="Close dialog"
  aria-describedby="close-description"
>
  <X />
</Button>

<Input 
  aria-invalid={hasError}
  aria-describedby="error-message"
/>
```

## 🔧 Advanced Usage

### Custom Hooks

```tsx
import { useNotifications, useTheme } from 'damkar-ui-components'

function MyComponent() {
  const { addNotification } = useNotifications()
  const { theme, setTheme } = useTheme()
  
  // Use the hooks...
}
```

### Utility Functions

```tsx
import { cn, formatCurrency, debounce } from 'damkar-ui-components/utils'

// Combine classes
const className = cn('base-class', condition && 'conditional-class')

// Format currency
const price = formatCurrency(29.99) // "$29.99"

// Debounce function
const debouncedSearch = debounce(searchFunction, 300)
```

### Type Definitions

```tsx
import type { 
  ButtonProps, 
  CardProps, 
  AIModel, 
  User,
  ThemeConfig 
} from 'damkar-ui-components'

// Use types in your components
interface MyComponentProps {
  user: User
  onModelSelect: (model: AIModel) => void
}
```

## 🛠️ Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/AnnasIsmail/damkar-ui-components.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
```

### Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Requirements

- React 18.0.0 or higher
- TypeScript 4.9.0 or higher (optional but recommended)
- Tailwind CSS 3.0.0 or higher

## 🤝 Community

- 🐛 [Report Issues](https://github.com/AnnasIsmail/damkar-ui-components/issues)
- 💡 [Request Features](https://github.com/AnnasIsmail/damkar-ui-components/issues/new)
- 📧 [Contact Author](mailto:annasismailmuhammad@gmail.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Radix UI](https://www.radix-ui.com/) for accessibility primitives inspiration

---

<div align="center">

**Made with ❤️ by [Annas Ismail](https://github.com/AnnasIsmail)**

⭐ Star this repo if you find it helpful!

</div>