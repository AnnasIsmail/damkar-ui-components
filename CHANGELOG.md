# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-01-20

### Added
- 🎨 **New AI Components**
  - `ModelSelector` - Advanced AI model selection with pricing info
  - `TokenCounter` - Real-time token counting and cost estimation
- 🔧 **Enhanced Form Components**
  - `FormInput` - Complete form input with validation states
- 📊 **Data Components**
  - `StatusBadge` - Status indicators with pulse animation
- 🧭 **Navigation Components**
  - `SearchBar` - Advanced search with autocomplete
- 🎭 **Theme System**
  - `ThemeProvider` - Comprehensive theme management
  - Dark/Light mode support
  - CSS custom properties for theming

### Improved
- ✨ Better TypeScript support with proper type exports
- 🎯 Enhanced accessibility across all components
- 📱 Improved responsive design
- ⚡ Better tree-shaking support
- 🎨 Refined animation system with Framer Motion

### Fixed
- 🐛 Fixed Button component prop conflicts with Framer Motion
- 🔧 Resolved Input component size prop collision
- 📝 Fixed TypeScript declaration generation
- 🎯 Improved component prop interfaces

### Breaking Changes
- 🔄 Renamed `size` prop to `inputSize` in Input component to avoid conflicts
- 🎨 Updated Badge variants (`error` → `destructive`)
- 📦 Restructured exports for better tree-shaking

## [1.0.0] - 2024-01-01

### Added
- 🎉 Initial release
- 🎨 Core UI components (Button, Card, Badge, Input, Textarea)
- 🎭 Basic theming support
- 📚 Storybook documentation
- 🧪 Testing setup with Vitest