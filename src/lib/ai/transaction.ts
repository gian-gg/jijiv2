'use server';

import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText, Output } from 'ai';
import { z } from 'zod';
import { parseAIError } from '@/types/ai';
import { AI_PROMPTS } from '@/constants/AI';
import { CATEGORIES, PAYMENT_METHODS } from '@/constants/TRANSACTIONS';

const transactionSchema = z.object({
  type: z
    .enum(['income', 'expense'])
    .describe(
      'Transaction type: "income" for money received, "expense" for money spent'
    ),
  category: z
    .enum(CATEGORIES)
    .describe(
      `Category of the transaction. Choose from: ${CATEGORIES.join(', ')}`
    ),
  amount: z
    .number()
    .positive()
    .describe('Transaction amount as a positive number (no currency symbols)'),
  description: z
    .string()
    .min(1)
    .describe(
      'Brief description of the transaction, it should be short and concise.'
    ),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .describe('Transaction date in YYYY-MM-DD format'),
  paymentMethod: z
    .enum(PAYMENT_METHODS)
    .describe(
      `Payment method used. Choose from: ${PAYMENT_METHODS.join(', ')}`
    ),
});

export async function extractTransaction(
  prompt: string,
  apiKey: string,
  modelId: string
) {
  try {
    const provider = createOpenRouter({ apiKey });
    const currentDate = new Date().toISOString().split('T')[0];

    const { output } = await generateText({
      model: provider(modelId),
      output: Output.object({ schema: transactionSchema }),
      system: AI_PROMPTS.EXTRACT_TRANSACTION(currentDate),
      prompt: `Extract the transaction from: "${prompt}"`,
    });

    return { success: true as const, data: output };
  } catch (error) {
    console.error('Extraction Error:', error);
    const aiError = parseAIError(error);
    return {
      success: false as const,
      error: aiError.message,
      type: aiError.type,
    };
  }
}
