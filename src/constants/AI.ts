export const AVAILABLE_MODELS = [
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
  },
  {
    id: 'xiaomi/mimo-v2-flash:free',
    name: 'Mimo V2 Flash',
    provider: 'Xiaomi',
  },
] as const;

export type ModelId = (typeof AVAILABLE_MODELS)[number]['id'];

// Error types for parsing in AI chat
export const AI_ERROR_TYPES = {
  RATE_LIMITED: 'RATE_LIMITED',
  INVALID_API_KEY: 'INVALID_API_KEY',
  INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
  MODEL_UNAVAILABLE: 'MODEL_UNAVAILABLE',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AIErrorType = (typeof AI_ERROR_TYPES)[keyof typeof AI_ERROR_TYPES];

// AI Chat message generators
export const AI_MESSAGES = {
  FIRST_MESSAGE: () => ({
    id: Date.now(),
    role: 'assistant' as const,
    content:
      'Hello! I\'m your financial assistant. You can tell me about your transactions like "coffee $5" or ask me questions about your finances.',
    timestamp: new Date(),
  }),
  RATE_LIMITED: () => ({
    id: Date.now(),
    role: 'assistant' as const,
    content:
      "You've been rate limited. Please wait a moment before sending another message, or consider upgrading your OpenRouter plan.",
    timestamp: new Date(),
  }),
  INVALID_API_KEY: () => ({
    id: Date.now(),
    role: 'assistant' as const,
    content:
      'Your API key appears to be invalid. Please check your API key in Settings and try again.',
    timestamp: new Date(),
  }),
  INSUFFICIENT_CREDITS: () => ({
    id: Date.now(),
    role: 'assistant' as const,
    content:
      'Insufficient credits on your OpenRouter account. Please add credits at openrouter.ai/credits or switch to a free model.',
    timestamp: new Date(),
  }),
  MODEL_UNAVAILABLE: () => ({
    id: Date.now(),
    role: 'assistant' as const,
    content:
      'The selected model is currently unavailable. Please try a different model in Settings.',
    timestamp: new Date(),
  }),
  ERROR: () => ({
    id: Date.now(),
    role: 'assistant' as const,
    content:
      'Oops! Something went wrong while processing your request. Please try again later.',
    timestamp: new Date(),
  }),
};

import { CATEGORIES, PAYMENT_METHODS } from './TRANSACTIONS';

// AI Prompts for various actions
export const AI_PROMPTS = {
  EXTRACT_TRANSACTION: (currentDate: string) =>
    `
You are a financial assistant that extracts transaction details from natural language.
Extract the following fields:
- type: Must be exactly "income" or "expense" (spending money = expense, receiving money = income)
- category: Choose from: ${CATEGORIES.join(', ')}
- amount: The numeric amount (positive number, no currency symbols)
- description: Brief description of what the transaction is for. It should be short and concise. Something meaningful and coherent.
- date: Date in YYYY-MM-DD format. Use today's date (${currentDate}) if not specified.
- paymentMethod: Choose from: ${PAYMENT_METHODS.join(', ')}. Use "Cash" if not specified.
`.trim(),
  SYSTEM_PROMPT: (
    userId: string
  ) => `You are jiji, a helpful financial assistant. Your job is to help users track their transactions.

When a user mentions spending or earning money (like "coffee for $5", "lunch $15", "salary $3000"), you MUST use the extractTransaction tool to extract the transaction details.

Guidelines for extracting transactions:
- "coffee for $5" → expense, Food & Dining, $5
- "lunch $15" → expense, Food & Dining, $15
- "groceries $50" → expense, Groceries, $50
- "salary $3000" → income, Salary, $3000
- "uber $20" → expense, Transportation, $20
- Default date to today (${new Date().toISOString().split('T')[0]})
- Default payment method to "Cash" unless specified

When a user likely asks a question about their transactions (like "how much did I spend?", "show me expenses", "what is my balance"), use the queryTransactions tool to execute a READ-ONLY SQL query.

DATABASE SCHEMA:
Table "transaction" with columns:
- id (uuid)
- type (text): 'income' or 'expense'
- category (text)
- amount (text): stored as text! Cast to decimal for calculations, e.g. CAST(amount AS DECIMAL)
- description (text)
- date (text): ISO date string 'YYYY-MM-DD'
- payment_method (text)
- user_id (text): The user's ID

CRITICAL RULES FOR SQL:
1. You MUST include "WHERE user_id = '${userId}'" in every query to ensure the user only sees their own data.
2. Use "CAST(amount AS DECIMAL)" for any aggregation (SUM, AVG, etc.).
3. Only use SELECT statements. No INSERT, UPDATE, DELETE.
4. Current year is ${new Date().getFullYear()}.
5. After executing the tool, you MUST provide a concise natural language answer based on the result. Do not stop.

Be concise. If the tool returns data, summarize it naturally for the user.`,
};

// Predefined feedback messages to save tokens
export const AI_FEEDBACK = {
  SUCCESS: [
    "Got it! I've recorded your transaction.",
    'Done! Transaction saved.',
    "All set! I've added that for you.",
    'Noted! Transaction recorded.',
    "Perfect! I've logged that.",
  ],
  CANCEL: [
    'No problem, transaction cancelled.',
    "Okay, I won't save that.",
    'Cancelled! Let me know if you need anything else.',
    'Got it, transaction discarded.',
  ],
  EXTRACTING: [
    'Let me get the details...',
    'Extracting transaction info...',
    'Just a moment...',
  ],
  QUERYING: [
    'Checking your transactions...',
    'Querying the database...',
    'Looking that up for you...',
    'Searching your history...',
  ],
} as const;
