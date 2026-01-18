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

export const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google' },
] as const;

export const AI_ERROR_TYPES = {
  RATE_LIMITED: 'RATE_LIMITED',
  INVALID_API_KEY: 'INVALID_API_KEY',
  INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
  MODEL_UNAVAILABLE: 'MODEL_UNAVAILABLE',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AIErrorType = (typeof AI_ERROR_TYPES)[keyof typeof AI_ERROR_TYPES];

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
      "You've been rate limited. Please wait a moment before sending another message.",
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
      'Insufficient credits or quota exceeded. Please check your API account or try a different model.',
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

import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYMENT_METHODS,
} from './TRANSACTIONS';

// AI Prompts for various actions
export const AI_PROMPTS = {
  EXTRACT_TRANSACTION: (currentDate: string) =>
    `
You are a financial assistant that extracts transaction details from natural language.
Extract the following fields:
- type: Must be exactly "income" or "expense" (spending money = expense, receiving money = income)
- category: Choose from the appropriate list:
  * For expenses: ${EXPENSE_CATEGORIES.join(', ')}
  * For income: ${INCOME_CATEGORIES.join(', ')}
- amount: The numeric amount (positive number, no currency symbols)
- description: Brief description of what the transaction is for. It should be short and concise. Something meaningful and coherent.
- date: Date in YYYY-MM-DD format. Use today's date (${currentDate}) if not specified.
- paymentMethod: Choose from: ${PAYMENT_METHODS.join(', ')}. Use "Cash" if not specified.
`.trim(),
  SYSTEM_PROMPT: (
    userId: string,
    currency: string = 'USD'
  ) => `You are jijiv2, a financial assistant. Help users track transactions using ${currency}.

TRANSACTION EXTRACTION:
When users mention spending/earning (e.g., "coffee $5", "salary $3000"), use extractTransaction tool.
- Type: "income" or "expense"
- Expense Categories: ${EXPENSE_CATEGORIES.join(', ')}
- Income Categories: ${INCOME_CATEGORIES.join(', ')}
- Payment: ${PAYMENT_METHODS.join(', ')} (default: Cash)
- Date: YYYY-MM-DD (default: ${new Date().toISOString().split('T')[0]})

UI FEATURES (check before querying):
1. Quick Info (above chat): Shows balance, total income/expenses
2. Transactions Tab: View all transactions with filters, search, sorting
3. General App information in the landing page

QUERY RULES:
- Direct broad requests ("list all", "show everything") to Transactions Tab
- Only query for specific analysis ("food expenses last month?", "avg transport?")
- Always use LIMIT 10 for multi-row results
- Never query without specific criteria

SQL SCHEMA:
transaction(id, type, category, amount TEXT, description, date TEXT, payment_method, user_id)

SQL REQUIREMENTS:
1. MUST include: WHERE user_id = '${userId}'
2. Amount calculations: CAST(amount AS DECIMAL)
3. SELECT only (no INSERT/UPDATE/DELETE)
4. Current year: ${new Date().getFullYear()}
5. Add LIMIT 10 for lists
6. Provide concise natural language response after query

Be brief. Redirect broad queries to UI.`,
};

// predefined feedback messages to save tokens
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
  STOPPED: [
    'Stopped generating.',
    'Generation stopped.',
    'Alright, I stopped.',
  ],
} as const;
