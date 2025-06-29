# 🔥 Damkar UI Components Website

<div align="center">

![Damkar UI](https://img.shields.io/badge/Damkar-UI%20Components-orange?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue?style=for-the-badge&logo=tailwindcss)

**A modern, production-ready React component library showcase website**

[🌐 Live Demo](#) • [🔗 GitHub](https://github.com/AnnasIsmail/damkar-ui-components) • [📖 Documentation](#documentation)

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

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/AnnasIsmail/damkar-ui-components.git
cd damkar-ui-components

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests with Vitest

# Storybook
npm run storybook    # Start Storybook development server
npm run build-storybook  # Build Storybook for production
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── ai/             # AI-specific components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   └── notifications/  # Notification components
├── pages/              # Page components
├── providers/          # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles and CSS
```

## 📚 Component Categories

### 🎨 UI Components

- **Button** - Versatile button component with multiple variants
- **Card** - Flexible container component for content organization
- **Badge** - Small status indicators and labels
- **Input** - Enhanced input component with validation states
- **Textarea** - Multi-line text input component

### 🤖 AI Components

- **ModelSelector** - Specialized component for AI model selection
- **TokenCounter** - Real-time token counting and cost estimation

### 📝 Form Components

- **FormInput** - Enhanced input with label, validation, and helper text

### 🎯 Data Components

- **StatusBadge** - Status indicators with pulse animation

### 🏗️ Layout Components

- **LoadingSpinner** - Elegant loading indicators
- **PageContainer** - Consistent page layout wrapper
- **AppHeader** - Application header with navigation
- **AppSidebar** - Collapsible sidebar navigation

### 🔔 Notification System

- **Toast Provider** - Modern toast notification system
- **NotificationPanel** - Comprehensive notification management

### 🎨 Theme System

- **ThemeProvider** - Comprehensive theme management

## 🎨 Styling & Customization

### CSS Variables

The design system uses CSS custom properties for easy customization:

```css
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
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with design tokens:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        // ... other color mappings
      }
    }
  }
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## ♿ Accessibility

Components follow WCAG 2.1 guidelines:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets AA standards
- **Semantic HTML**: Proper HTML structure

## 🧪 Testing

The project uses Vitest for testing:

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📖 Storybook

Interactive component documentation is available via Storybook:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new components
- Update documentation as needed
- Ensure accessibility compliance
- Test in multiple browsers

## 📋 Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 11.0.0
- **Icons**: Lucide React 0.344.0
- **Build Tool**: Vite 5.4.2
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook 8.0.0

## 🐛 Known Issues

- None at the moment! 🎉

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