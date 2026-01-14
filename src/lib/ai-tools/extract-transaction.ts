import { tool } from 'ai';
import { z } from 'zod';

export const extractTransactionTool = tool({
  description:
    'Extract transaction: type, category, amount, description, date, payment',
  inputSchema: z.object({
    type: z.enum(['income', 'expense']),
    category: z.string(),
    amount: z.number().positive(),
    description: z.string(),
    date: z.string(),
    paymentMethod: z.string(),
  }),
});
