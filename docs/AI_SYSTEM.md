# AI System

Complete guide to jijiv2's AI integration and optimization strategies.

## Overview

jijiv2 uses the **Vercel AI SDK** to support multiple AI providers with a unified interface.

## Supported Providers

| Provider       | Models                      | Setup                                                            |
| -------------- | --------------------------- | ---------------------------------------------------------------- |
| **OpenRouter** | GPT-4o, Claude, Llama, etc. | [openrouter.ai/keys](https://openrouter.ai/keys)                 |
| **Gemini**     | Gemini 2.5 Flash, 1.5 Pro   | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

## AI Tools

The AI has access to two tools:

### 1. extractTransaction

Extracts transaction details from natural language.

**Input**: User message (e.g., "coffee for $5")

**Output**:

```typescript
{
  type: 'expense',
  category: 'Food & Dining',
  amount: 5,
  description: 'coffee',
  date: '2026-01-14',
  paymentMethod: 'Cash'
}
```

**Flow**:

1. User sends message
2. AI identifies transaction intent
3. AI calls `extractTransaction` tool
4. Frontend shows confirmation dialog
5. User confirms → saved to database

### 2. queryTransactions

Executes SQL queries on user's transactions.

**Input**: Natural language question (e.g., "food expenses last month?")

**Output**: SQL query + results

**Security**:

- Only SELECT statements allowed
- Auto-injects `WHERE user_id = '...'`
- Limited to 10 results
- Server-side validation

**Example**:

```sql
SELECT SUM(CAST(amount AS DECIMAL)) as total
FROM transaction
WHERE user_id = 'user_123'
  AND type = 'expense'
  AND category = 'Food & Dining'
  AND date >= '2026-01-01'
LIMIT 10
```

## System Prompt

The AI uses an optimized system prompt (~300 tokens) that:

- Defines available categories and payment methods
- Explains when to use each tool
- Redirects broad queries to UI features
- Enforces security rules for SQL queries
- Provides current date context

### Key Guidelines

**UI-First Approach**:

- Balance/totals → Quick Info section
- View all transactions → Transactions Tab
- Specific analysis → Query tool

**Query Restrictions**:

- No broad "list all" queries
- Maximum 10 results
- Must include `WHERE user_id`
- SELECT only

## Token Optimization

### Strategies Used

1. **Short system prompt** (~300 tokens, down from ~500)
2. **Simplified tools** (~200 tokens, down from ~700)
3. **Message history limit** (last 5 messages only)
4. **Smart redirects** (UI-first, query-last)

### Results

**Average request**: ~1,200 tokens (vs ~3,000+ unoptimized)

**Breakdown**:

- System prompt: ~300 tokens
- Tools: ~200 tokens
- Message history: ~300-400 tokens
- Current message: ~20-100 tokens
- Overhead: ~100-200 tokens

### Cost Estimates

Using GPT-4o mini @ $0.15/1M input tokens:

- **100 messages**: ~$0.018 (2¢)
- **With caching**: ~$0.002 (⅕¢)
- **1000 messages**: ~$0.18 (18¢)

## Adding New Providers

### 1. Install SDK

```bash
npm install @ai-sdk/[provider]
```

### 2. Update Chat Route

Edit `/src/app/api/chat/route.ts`:

```typescript
import { createProvider } from '@ai-sdk/[provider]';

const model =
  apiProvider === 'newProvider'
    ? createProvider({ apiKey })(modelId)
    : // existing logic
```

### 3. Add Models

Update `/src/constants/AI.ts`:

```typescript
export const AVAILABLE_MODELS = [
  // ... existing
  { id: 'provider/model', name: 'Model Name', provider: 'Provider' },
];
```

### 4. Update Settings UI

Add provider option in settings dialog.

## Best Practices

### For Users

1. **Be specific** in queries ("food last month" vs "show all")
2. **Check Quick Info** before asking for balance/totals
3. **Use Transactions Tab** for viewing all data
4. **Keep API keys secure** (stored in browser only)

### For Developers

1. **Monitor token usage** in production
2. **Test with different models** (behavior varies)
3. **Add error boundaries** for AI failures
4. **Implement rate limiting** for production use
5. **Cache system prompts** when possible

## Troubleshooting

**Q: AI doesn't extract transactions correctly**

A: Try a more capable model (GPT-4o, Claude 3.5)

**Q: Token usage too high**

A: Check message history limit, optimize prompts further

**Q: "Invalid API key" errors**

A: User needs to update key in Settings

**Q: SQL injection concerns?**

A: Server validates, user can only query their own data

## Related Docs

- [API Reference](./API.md)
- [Database Schema](./DATABASE.md)
- [Architecture](./ARCHITECTURE.md)
