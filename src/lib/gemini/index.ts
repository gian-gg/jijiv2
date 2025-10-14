'use server';

import { GoogleGenAI } from '@google/genai';
import { nanoid } from 'nanoid';

const ai = new GoogleGenAI({});

export async function parseFinancePrompt(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `
You are an intelligent finance assistant that analyzes natural language and outputs structured JSON data for expense tracking.

Given the user's message:
"${prompt}"

Your task is to extract key financial details and respond ONLY with a valid JSON object — no explanations, no extra text.

The JSON format must strictly follow this structure:
{
  "type": "income" | "expense" | "debt" | "reminder",
  "category": string,            // e.g. "Food", "Transportation", "Bills", etc.
  "amount": number,              // numeric only, no currency symbols
  "description": string,         // brief summary of the transaction
  "payment_method": string|null  // e.g. "cash", "gcash", "bank transfer"
}

If information is missing, infer from context or leave null.
Make reasonable assumptions — for example:
- “paid”, “bought”, “spent” → expense
- “earned”, “received” → income
- “owe”, “borrowed”, “lent” → debt
- “remind” or future date → reminder

Respond with valid JSON only, no markdown or code fences.
`,
          },
        ],
      },
    ],
  });

  try {
    if (typeof response.text !== 'string') {
      throw new Error('AI response did not return text');
    }
    const json = JSON.parse(response.text);
    return { id: nanoid(), ...json };
  } catch (e) {
    throw new Error('Failed to parse JSON from AI response');
  }
}
