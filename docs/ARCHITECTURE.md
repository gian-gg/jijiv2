# Architecture

Technical overview of jijiv2's architecture and design decisions.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better Auth (Google OAuth)
- **State Management**: Zustand
- **AI**: Vercel AI SDK + OpenRouter/Gemini

## Project Structure

```
jijiv2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (legal)/           # About & Privacy pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Better Auth endpoints
│   │   │   └── chat/          # AI chat endpoint
│   │   ├── wallet/            # Main application
│   │   │   ├── analytics/     # Analytics page
│   │   │   ├── settings/      # Settings page
│   │   │   └── transactions/  # Transactions page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   │
│   ├── components/            # React components
│   │   ├── landing/          # Landing page sections
│   │   ├── wallet/           # Wallet UI
│   │   │   ├── core/         # Header, sidebar
│   │   │   └── home/         # AI chat, quick info
│   │   └── ui/               # shadcn/ui components
│   │
│   ├── constants/            # Constants & config
│   │   ├── AI.ts             # AI prompts & models
│   │   ├── ROUTES.ts         # App routes
│   │   ├── SETTINGS.ts       # Currencies
│   │   └── TRANSACTIONS.ts   # Categories
│   │
│   ├── lib/                  # Core logic
│   │   ├── ai-tools/        # AI tool definitions
│   │   ├── auth/            # Auth helpers
│   │   ├── db/              # Database queries
│   │   └── helpers/         # Utilities
│   │
│   ├── stores/              # Zustand stores
│   │   ├── useChatStore.ts
│   │   └── useSettingsStore.ts
│   │
│   └── globals.css          # Global styles
│
├── docs/                    # Documentation
├── drizzle.config.ts       # Drizzle ORM config
└── package.json
```

## Data Flow

```
User Input → AI Chat Component
    ↓
Chat API (/api/chat)
    ↓
AI Provider (OpenRouter/Gemini)
    ↓
Tool Execution (extractTransaction/queryTransactions)
    ↓
Database (PostgreSQL)
    ↓
User Interface (Updated State)
```

## State Management

### Zustand Stores

**1. useSettingsStore** (LocalStorage)

- API key (encrypted in browser)
- Selected model
- Currency preference
- AI provider

**2. useChatStore** (LocalStorage)

- Last 5 messages only (token optimization)
- Persisted across sessions

## Design Philosophy

**Brutalist Minimalism**

- Sharp corners, no rounded borders
- Monospace typography (JetBrains Mono)
- Matte black & pastel purple color scheme
- No unnecessary decorations
- Function over form

## Key Features

- **Privacy First**: API keys never touch the server
- **Cost Efficient**: Optimized for free-tier AI models
- **User Scoped**: All data isolated by user ID
- **Token Optimized**: ~1,200 tokens/request average
- **Responsive**: Mobile-first design

## Security

- **Authentication**: Google OAuth via Better Auth
- **Authorization**: User ID in session, enforced in SQL
- **API Keys**: Client-side only (LocalStorage)
- **SQL Injection**: Parameterized queries only
- **CORS**: Next.js default (same-origin)

## Related Docs

- [AI System Details](./AI_SYSTEM.md)
- [Database Schema](./DATABASE.md)
- [API Reference](./API.md)
