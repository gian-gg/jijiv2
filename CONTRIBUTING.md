# Contributing to jijiv2

Thank you for your interest in contributing to jijiv2! This document provides guidelines for contributing to the project.

## Code of Conduct

This project follows a simple principle: **Be respectful and constructive**. We're all here to build something useful together.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/gian-gg/jijiv2/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, Node version, browser)

### Suggesting Features

1. Check [Discussions](https://github.com/gian-gg/jijiv2/discussions) first
2. Create a new discussion with:
   - Clear use case
   - Proposed solution
   - Alternative approaches considered

### Pull Requests

#### Setup

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/jijiv2.git
cd jijiv2
```

3. Install dependencies:

```bash
npm install
```

4. Create a branch:

```bash
git checkout -b feature/my-feature
```

#### Development

1. Make your changes
2. Follow the [code style](#code-style)
3. Test your changes locally
4. Run linter:

```bash
npm run lint
```

5. Format code:

```bash
npm run format
```

#### Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add transaction export feature"
git commit -m "fix: resolve date formatting bug"
git commit -m "docs: update API documentation"
```

**Types**:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, no logic change)
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

#### Submit PR

1. Push to your fork:

```bash
git push origin feature/my-feature
```

2. Create Pull Request on GitHub
3. Fill out the PR template
4. Link related issues
5. Wait for review

### Code Style

- **Formatting**: Prettier (2 spaces, no semicolons)
- **Linting**: ESLint with Next.js config
- **TypeScript**: Strict mode enabled
- **Naming**:
  - Components: PascalCase
  - Files: lowercase or camelCase
  - Constants: UPPERCASE

### Project Structure

```
src/
├── app/          # Next.js pages
├── components/   # React components
├── lib/          # Core logic
├── constants/    # Constants
└── stores/       # Zustand stores
```

### Adding Features

#### New Category

Update `/src/constants/TRANSACTIONS.ts`:

```typescript
export const CATEGORIES = [
  // ... existing
  'Your Category',
] as const;
```

#### New AI Model

Update `/src/constants/AI.ts`:

```typescript
export const AVAILABLE_MODELS = [
  // ... existing
  { id: 'provider/model', name: 'Model Name', provider: 'Provider' },
];
```

#### New Page

1. Create `/src/app/page-name/page.tsx`
2. Add to `/src/constants/ROUTES.ts`
3. Update navigation

### Documentation

- Update relevant docs in `/docs`
- Add JSDoc comments for complex functions
- Include examples for new features

### Testing

Currently no automated tests. Manual testing checklist:

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Accessibility (keyboard navigation)

## Review Process

1. Maintainer reviews PR
2. Request changes if needed
3. Approve and merge
4. Thank you! 🎉

## Questions?

- Open a [Discussion](https://github.com/gian-gg/jijiv2/discussions)
- Tag maintainers in PR/issue comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
