# Getting Started

Complete setup guide for jijiv2.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ or **Bun**
- **PostgreSQL** database (local or hosted)
- **Google Cloud** account for OAuth
- **AI API key** from OpenRouter or Google AI Studio

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/gian-gg/jijiv2.git
cd jijiv2
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jijiv2"

# Authentication (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### 4. Run database migrations

```bash
npm run db:push
```

### 5. Start development server

```bash
npm run dev
```

### 6. Visit `http://localhost:3000`

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (e.g., "jijiv2")
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URI:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env`

## First Run

1. Navigate to `http://localhost:3000`
2. Click **Get Started**
3. Sign in with Google
4. Go to **Settings** (gear icon)
5. Add your AI API key:
   - OpenRouter: [openrouter.ai/keys](https://openrouter.ai/keys)
   - Gemini: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
6. Select a model (e.g., `openai/gpt-4o-mini`)
7. Start chatting!

## Next Steps

- [Architecture Overview](./ARCHITECTURE.md)
- [AI System Guide](./AI_SYSTEM.md)
- [Deployment Guide](./DEPLOYMENT.md)
