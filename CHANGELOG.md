# Changelog

All notable changes to jijiv2 will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-14

### Added

- 🎨 Professional landing page with brutalist design
- 🗣️ Natural language transaction input via AI
- 🔍 AI-powered transaction queries with NL2SQL
- ⚡ Multi-provider AI support (OpenRouter & Gemini)
- 🔐 BYOK (Bring Your Own Key) privacy model
- 📊 Quick Info dashboard (balance, income, expenses)
- 📝 Transaction management with filters and search
- 🎯 Token-optimized AI prompts (~1,200 tokens/request)
- 📱 Fully responsive mobile design
- 🌐 About and Privacy policy pages
- 📚 Comprehensive documentation

### Changed

- Renamed from jiji to jijiv2
- Optimized system prompt (40% reduction)
- Simplified AI tool schemas (65% reduction)
- Limited message history to last 5 messages
- Updated branding to emphasize cost efficiency

### Security

- API keys stored client-side only
- User-scoped database queries
- SQL injection prevention
- Google OAuth integration

## [1.0.0] - Initial Release

### Added

- Basic financial tracking
- PostgreSQL database
- Next.js 15 app structure
- Drizzle ORM setup
- Better Auth integration
- shadcn/ui components
- Tailwind CSS styling

---

## Release Notes

### [2.0.0] - Major Rewrite

This release represents a complete overhaul of jijiv2 with a focus on:

**AI Integration**

- Integrated Vercel AI SDK for flexible provider support
- Added natural language transaction extraction
- Implemented NL2SQL for financial queries
- Optimized for token efficiency (free-tier friendly)

**User Experience**

- Professional landing page
- Brutalist minimalism design language
- Improved mobile responsiveness
- Clear privacy and about pages

**Performance**

- 40% smaller system prompts
- 65% smaller tool definitions
- Message history capping
- Smart query redirects to UI

**Developer Experience**

- Comprehensive documentation
- Modular architecture
- Clear separation of concerns
- Easy deployment to Vercel

---

**Note**: This changelog will be updated with each release. For detailed changes, see the [commit history](https://github.com/gian-gg/jijiv2/commits/main).
