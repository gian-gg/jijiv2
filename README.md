# jijiv2

> **Your AI-powered financial co-pilot** – A proof-of-concept financial tracking app with natural language queries.

## ✨ Features

- 🗣️ **Natural Language Queries** – Ask questions in plain English
- ⚡ **AI-Powered** – Supports OpenRouter & Gemini
- 🔐 **BYOK** – Bring Your Own Key (you control costs)
- 📊 **Smart Insights** – AI-powered spending analysis
- 🔍 **Transaction Management** – Manual entry with filters and search
- 💰 **Cost Efficient** – Optimized for free-tier AI models
- 100% **Open Source** – Self-hostable

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better Auth (Google OAuth)
- **State Management**: Zustand
- **AI**: Vercel AI SDK + OpenRouter/Gemini

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Google OAuth credentials
- API key from [OpenRouter](https://openrouter.ai) or [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/gian-gg/jijiv2.git
cd jijiv2

# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 🔑 Configuration

### Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jijiv2"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add credentials to `.env`

### User API Setup

After logging in, users configure their own AI API key in Settings:

- **OpenRouter**: [openrouter.ai/keys](https://openrouter.ai/keys)
- **Gemini**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

## 📖 Usage

### Adding Transactions

Tell the AI in natural language:

- "coffee for $5"
- "salary $3000 income"
- "uber $20 transport"

### Querying Finances

Ask questions:

- "How much did I spend on food last month?"
- "What's my average transportation cost?"
- "Show me coffee expenses this week"

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Design System](./docs/DESIGN_SYSTEM.md)
- [Quick Reference](./docs/QUICK_REFERENCE.md)

## 🤝 Contributing

Contributions welcome! Please follow [Conventional Commits](https://www.conventionalcommits.org/).

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.
