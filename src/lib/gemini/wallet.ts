'use server';

import geminiClient from '@/lib/gemini';
import { GEMINI_MODEL, WALLET_PROMPT } from '@/constants/GEMINI';
import { parseGeminiResponse } from '@/lib/gemini/utils';
import type { Transaction } from '@/type';

export async function parseFinancePrompt(prompt: string) {
  const ai = await geminiClient();

  const result = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      {
        role: 'user',
        parts: [{ text: WALLET_PROMPT(prompt) }],
      },
    ],
  });

  return parseGeminiResponse<Transaction>(result.text);
}
