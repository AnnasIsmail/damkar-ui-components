# Contributing to Damkar UI

We love your input! We want to make contributing to Damkar UI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/damkar-ui.git
cd damkar-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build library
npm run build:lib
```

### Component Development Guidelines

1. **TypeScript First**: All components must be written in TypeScript with proper type definitions.

2. **Accessibility**: Components must be accessible and follow WCAG guidelines.

3. **Testing**: Include unit tests for all components using Vitest and Testing Library.

4. **Documentation**: Add Storybook stories for visual documentation.

5. **Styling**: Use Tailwind CSS with our design system tokens.

### Code Style

- Use ESLint and Prettier for code formatting
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Commit Messages

Use conventional commit format:

```
feat: add new Button component
fix: resolve accessibility issue in Modal
docs: update README with new examples
```

## Any contributions you make will be under the MIT Software License

When you submit code changes, your submissions are understood to be under the same [MIT License](LICENSE) that covers the project.

## Report bugs using GitHub's [issue tracker](https://github.com/damkar/ui/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/damkar/ui/issues/new).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.