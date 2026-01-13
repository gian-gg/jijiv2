import { tool } from 'ai';
import { z } from 'zod';
import { CATEGORIES, PAYMENT_METHODS } from '@/constants/TRANSACTIONS';

export const extractTransactionTool = tool({
  description:
    'Extract transaction details from user input like "coffee for $5"',
  inputSchema: z.object({
    type: z.enum(['income', 'expense']),
    category: z.enum(CATEGORIES),
    amount: z.number().positive(),
    description: z.string(),
    date: z.string(),
    paymentMethod: z.enum(PAYMENT_METHODS),
  }),
});
