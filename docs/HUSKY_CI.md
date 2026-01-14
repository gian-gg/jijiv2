# Husky & CI Configuration

## Summary

Enhanced Husky pre-commit/pre-push hooks and comprehensive GitHub Actions CI pipeline.

## Husky Hooks

### Pre-commit

- Runs `lint-staged` on staged files
- Auto-fixes ESLint issues
- Formats code with Prettier

### Commit-msg

- Validates commit message format (Conventional Commits)
- Enforces: `feat:`, `fix:`, `docs:`, etc.

### Pre-push

- Runs ESLint on all files
- Runs TypeScript type checking
- Prevents pushing broken code

## CI Workflow

### Triggers

- Push to `main` or `develop`
- Pull requests (open, sync, reopen)

### Jobs

**1. Code Quality**

- Formatting check (Prettier)
- Linting (ESLint)
- Type checking (TypeScript)
- Caches dependencies for speed

**2. Build Check**

- Full Next.js build
- Uses dummy env vars for CI
- Runs after quality checks pass
- Validates production build

**3. Commit Lint (PR only)**

- Validates all commits in PR
- Ensures conventional commits format

### Optimizations

- Dependency caching (~30s faster)
- Concurrency controls (cancels outdated runs)
- Parallel quality checks where possible

## Local Development

```bash
# Run all checks locally
bun run format:check
bun run lint
bun run type-check
bun run build
```

## Skip Hooks (Emergency)

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

Use sparingly!
