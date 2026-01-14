# Development

Guide for developers working on jijiv2.

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Database
npm run db:generate  # Generate migration files
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio GUI

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript check

# Build
npm run build        # Production build
npm run start        # Start production server
```

## Code Style

### Formatting

- **Prettier**: 2 spaces, no semicolons
- **Line length**: 80 characters (soft limit)
- **Quotes**: Single quotes for strings

```typescript
// Good
const message = 'Hello world';

// Bad
const message = 'Hello world';
```

### Linting

ESLint with Next.js recommended config.

**Run linter**:

```bash
npm run lint
```

**Auto-fix**:

```bash
npm run lint -- --fix
```

### Commits

Follow **Conventional Commits**:

```bash
feat: add transaction export feature
fix: resolve date formatting bug
docs: update API documentation
chore: upgrade dependencies
```

**Types**:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance

### Pre-commit Hooks

Husky + lint-staged runs on commit:

- Lints staged files
- Formats code
- Type checks

## Adding Features

### New Transaction Category

1. Update `/src/constants/TRANSACTIONS.ts`:

```typescript
export const CATEGORIES = [
  // ... existing
  'New Category',
] as const;
```

2. Restart dev server - auto-reflected in UI and AI

### New AI Model

1. Add to `/src/constants/AI.ts`:

```typescript
export const AVAILABLE_MODELS = [
  // ... existing
  {
    id: 'provider/model-name',
    name: 'Model Display Name',
    provider: 'Provider',
  },
];
```

2. Model appears in settings dropdown

### New Page

1. Create `/src/app/newpage/page.tsx`:

```typescript
export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add route to `/src/constants/ROUTES.ts`:

```typescript
export default {
  // ... existing
  NEW_PAGE: '/newpage',
} as const;
```

3. Update navigation component

### New Component

1. Create in `/src/components/`:

```typescript
// /src/components/my-component.tsx
interface Props {
  title: string;
}

export function MyComponent({ title }: Props) {
  return <div>{title}</div>;
}
```

2. Export from index (if in subdirectory):

```typescript
// /src/components/index.ts
export { MyComponent } from './my-component';
```

## Testing

Currently no automated tests.

### Recommended Setup

**E2E Testing** (Playwright):

```bash
npm install -D @playwright/test
npx playwright install
```

Create `/tests/e2e/auth.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Get Started');
  // ... assertions
});
```

**Unit Testing** (Vitest):

```bash
npm install -D vitest @testing-library/react
```

Create `/tests/unit/helpers.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/lib/helpers';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100.00');
  });
});
```

## Debugging

### Dev Tools

**React DevTools**:

- Install browser extension
- Inspect component tree
- View state/props

**Next.js DevTools**:

- Automatically included in dev mode
- View routes, components, performance

### Logging

```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug:', data);
}
```

### VS Code

**Recommended extensions**:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense

**Debug configuration** (`.vscode/launch.json`):

```json
{
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

## Common Tasks

### Update Dependencies

```bash
npm update
npm outdated  # Check for newer versions
```

### Add New Dependency

```bash
npm install package-name
npm install -D dev-package  # Dev dependency
```

### Database Reset

```bash
npm run db:drop   # Warning: Deletes all data
npm run db:push
```

### Clear Next.js Cache

```bash
rm -rf .next
npm run dev
```

## Troubleshooting

**Q: Type errors in VS Code but builds fine**

A: Restart TypeScript server (Cmd+Shift+P → "Restart TS Server")

**Q: Port 3000 already in use**

A: Change port in `package.json`:

```json
"dev": "next dev -p 3001"
```

**Q: Drizzle Studio won't connect**

A: Verify `DATABASE_URL` in `.env`

**Q: Hot reload not working**

A: Check file watchers limit (macOS/Linux):

```bash
ulimit -n 10000
```

## Project Conventions

### File Naming

- **Components**: PascalCase (`MyComponent.tsx`)
- **Utils**: camelCase (`formatCurrency.ts`)
- **Constants**: UPPERCASE (`ROUTES.ts`)
- **Pages**: lowercase (`/app/about/page.tsx`)

### Import Order

```typescript
// 1. External packages
import { useState } from 'react';
import { drizzle } from 'drizzle-orm';

// 2. Internal aliases
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';

// 3. Relative imports
import { formatDate } from './helpers';
```

### Folder Structure

```
components/
  feature/           # Feature components
    index.tsx       # Main component
    sub-component.tsx
    types.ts        # Local types
    helpers.ts      # Local helpers
```

## Performance

### Bundle Analysis

```bash
npm run build
npm run analyze  # If configured
```

### Lighthouse

```bash
npm run build
npm start
# Open localhost:3000 in Chrome
# Run Lighthouse audit
```

## Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Run tests (when available)
5. Commit with conventional format
6. Push and create PR

### PR Guidelines

- Clear title and description
- Link related issues
- Include screenshots for UI changes
- Ensure CI passes

## Related Docs

- [Architecture](./ARCHITECTURE.md)
- [Getting Started](./GETTING_STARTED.md)
- [Deployment](./DEPLOYMENT.md)
