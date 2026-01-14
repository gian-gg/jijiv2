# jijiv2 API Documentation

Complete API reference for jijiv2's backend endpoints and AI integration.

## Table of Contents

- [Authentication](#authentication)
- [Chat API](#chat-api)
- [Database Schema](#database-schema)
- [AI Tools](#ai-tools)
- [Environment Variables](#environment-variables)

---

## Authentication

jijiv2 uses **Better Auth** with Google OAuth for authentication.

### Endpoints

#### `POST /api/auth/sign-in/google`

Initiates Google OAuth flow.

**Response**: Redirects to Google OAuth consent screen

#### `GET /api/auth/callback/google`

OAuth callback endpoint.

**Response**: Redirects to `/wallet` on success

#### `POST /api/auth/sign-out`

Signs out the current user.

**Response**: Redirects to `/`

### Session Management

Sessions are managed via HTTP-only cookies. The session includes:

```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}
```

---

## Chat API

### `POST /api/chat`

Streams AI responses for financial queries and transaction extraction.

#### Request Headers

```
Content-Type: application/json
Cookie: better-auth.session_token=<session_token>
```

#### Request Body

```typescript
{
  messages: UIMessage[];        // Conversation history
  apiKey: string;               // User's AI provider API key
  modelId: string;              // Model identifier
  apiProvider?: 'openrouter' | 'gemini';  // Default: 'openrouter'
  currency?: string;            // Default: 'USD'
}
```

#### Response

Server-Sent Events (SSE) stream with AI responses.

**Stream format**: `text/event-stream`

#### Example

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'coffee for $5' }],
    apiKey: 'sk-or-...',
    modelId: 'openai/gpt-4o-mini',
    apiProvider: 'openrouter',
    currency: 'USD',
  }),
});
```

#### Error Responses

| Status | Description                  |
| ------ | ---------------------------- |
| 401    | Unauthorized (not logged in) |
| 400    | Missing API key or model ID  |
| 500    | AI provider error            |

---

## Database Schema

### Tables

#### `transaction`

Stores user transactions.

```sql
CREATE TABLE transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,              -- 'income' or 'expense'
  category TEXT NOT NULL,
  amount TEXT NOT NULL,             -- Stored as text, cast to DECIMAL for calculations
  description TEXT NOT NULL,
  date TEXT NOT NULL,               -- ISO 8601 format (YYYY-MM-DD)
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `user` (Better Auth)

Managed by Better Auth. Includes Google OAuth data.

---

## AI Tools

The AI has access to two tools for transaction management:

### 1. `extractTransaction`

Extracts transaction details from natural language.

#### Input Schema

```typescript
{
  type: 'income' | 'expense',
  category: string,
  amount: number,              // Positive number
  description: string,
  date: string,                // YYYY-MM-DD
 paymentMethod: string
}
```

#### Example

**User**: "coffee for $5"

**AI extracts**:

```json
{
  "type": "expense",
  "category": "Food & Dining",
  "amount": 5,
  "description": "coffee",
  "date": "2026-01-14",
  "paymentMethod": "Cash"
}
```

#### Categories

- Food & Dining
- Groceries
- Transportation
- Entertainment
- Shopping
- Bills & Utilities
- Healthcare
- Travel
- Education
- Salary
- Freelance
- Investment
- Other

#### Payment Methods

- Cash
- Credit Card
- Debit Card
- Bank Transfer
- Digital Wallet
- Other

---

### 2. `queryTransactions`

Executes read-only SQL queries on transactions.

#### Input Schema

```typescript
{
  sqlQuery: string; // SELECT statement only
}
```

#### Security Rules

1. **User isolation**: Query MUST include `WHERE user_id = '<user_id>'`
2. **Read-only**: Only SELECT statements allowed
3. **Result limit**: Maximum 10 rows (enforced by AI)
4. **Amount casting**: Use `CAST(amount AS DECIMAL)` for calculations

#### Example Queries

**Total food expenses this month**:

```sql
SELECT SUM(CAST(amount AS DECIMAL)) as total
FROM transaction
WHERE user_id = 'user_123'
  AND type = 'expense'
  AND category = 'Food & Dining'
  AND date >= '2026-01-01'
  AND date < '2026-02-01'
```

**Average transportation cost**:

```sql
SELECT AVG(CAST(amount AS DECIMAL)) as avg_cost
FROM transaction
WHERE user_id = 'user_123'
  AND category = 'Transportation'
```

---

## Environment Variables

### Required

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

### Optional

```env
# Node environment
NODE_ENV="development"  # or "production"
```

---

## AI Configuration

### System Prompt

The AI uses a token-optimized system prompt (~300 tokens) that includes:

- Transaction extraction guidelines
- Query rules (redirect broad queries to UI)
- Database schema
- SQL security requirements
- UI feature awareness (Quick Info, Transactions Tab)

### Token Optimization Strategies

1. **Message History Limit**: Last 5 messages only (~300-400 tokens)
2. **Simplified Tools**: Minimal descriptions (~200 tokens)
3. **Concise Prompts**: No redundant examples
4. **Smart Redirects**: Prevents expensive queries

**Average request**: ~1,200 tokens (system + tools + history + message)

### Prompt Caching

When available, repeated system prompts are cached:

- OpenAI: Automatic caching (90% discount on repeated tokens)
- Anthropic: Automatic caching
- Gemini: Natural caching behavior

---

## Rate Limiting

**Current implementation**: None (relies on AI provider's rate limits)

**Recommendation for production**:

- Implement per-user rate limiting (e.g., 60 requests/minute)
- Add request cooldown for expensive queries
- Monitor token usage per user

---

## Error Handling

### AI Error Types

| Error Type             | User Message                                        |
| ---------------------- | --------------------------------------------------- |
| `RATE_LIMITED`         | "You've been rate limited. Please wait a moment..." |
| `INVALID_API_KEY`      | "Your API key appears to be invalid..."             |
| `INSUFFICIENT_CREDITS` | "Insufficient credits or quota exceeded..."         |
| `MODEL_UNAVAILABLE`    | "The selected model is currently unavailable..."    |
| `UNKNOWN`              | "Oops! Something went wrong..."                     |

Errors are parsed from AI provider responses and displayed in-chat.

---

## Best Practices

### For Developers

1. **Always validate user input** before sending to AI
2. **Use TypeScript types** for all API requests/responses
3. **Test with different AI models** (some behave differently)
4. **Monitor token usage** in production
5. **Implement proper error boundaries**

### For Users

1. **Use specific queries** ("food expenses last month" vs "show everything")
2. **Check Quick Info** before asking for balance/totals
3. **Use Transactions Tab** for viewing all transactions
4. **Keep API keys secure** (stored in browser only)

---

## Future Enhancements

- [ ] Webhook support for real-time updates
- [ ] Batch transaction import API
- [ ] Export transactions to CSV/JSON
- [ ] Analytics API endpoints
- [ ] Custom category management
- [ ] Recurring transactions

---

**Version**: 2.0  
**Last Updated**: January 2026  
**Maintained by**: [gian-gg](https://github.com/gian-gg)
