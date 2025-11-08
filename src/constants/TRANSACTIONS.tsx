import type { Transaction } from '@/types/transactions';
import type { Message } from '@/types/home';
import { TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react';

/**
 * Transaction categories for expense and income classification
 */
export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Groceries',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
] as const;

/**
 * Available payment methods for transactions
 */
export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'E-Wallet',
  'Other',
] as const;

/**
 * Transaction types with labels and icons
 */
export const TRANSACTION_TYPES: Array<{
  value: Transaction['type'];
  label: string;
  icon: React.ReactNode;
}> = [
  {
    value: 'income',
    label: 'Income',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    value: 'expense',
    label: 'Expense',
    icon: <TrendingDown className="h-4 w-4" />,
  },
  {
    value: 'debt',
    label: 'Debt',
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    value: 'reminder',
    label: 'Reminder',
    icon: <Clock className="h-4 w-4" />,
  },
];

/**
 * Quick action suggestions for AI chat
 */
export const QUICK_ACTIONS = [
  'coffee $5',
  'lunch $15',
  'groceries $50',
  'salary $3000',
] as const;

/**
 * Default transaction values
 */
export const DEFAULT_TRANSACTION = {
  type: 'expense' as const,
  category: 'Other',
  payment_method: 'Unknown',
};

export const AI_CONSTANT_MESSAGES: Record<string, Message> = {
  FIRST_MESSAGE: {
    id: 1,
    role: 'assistant',
    content:
      'Hello! I\'m your financial assistant. You can tell me about your transactions like "coffee $5" or ask me questions about your finances.',
    timestamp: new Date(),
  },
  CANT_PARSE: {
    id: 2,
    role: 'assistant',
    content:
      'I understood your message, but I couldn\'t extract transaction details. Try something like "lunch $25" or "salary $3000".',
    timestamp: new Date(),
  },
  ERROR_MESSAGE: {
    id: 3,
    role: 'assistant',
    content:
      'Oops! Something went wrong while processing your request. Please try again later.',
    timestamp: new Date(),
  },
  CANCELLED_MESSAGE: {
    id: 4,
    role: 'assistant',
    content: 'No worries! Transaction cancelled.',
    timestamp: new Date(),
  },
};
