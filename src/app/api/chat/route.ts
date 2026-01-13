import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

import { extractTransactionTool } from '@/lib/ai-tools/extract-transaction';

const SYSTEM_PROMPT = `
You are jiji, a helpful financial assistant. Your job is to help users track their transactions.

When a user mentions spending or earning money (like "coffee for $5", "lunch $15", "salary $3000"), you MUST use the extractTransaction tool to extract the transaction details.

Guidelines for extracting transactions:
- "coffee for $5" → expense, Food & Dining, $5
- "lunch $15" → expense, Food & Dining, $15
- "groceries $50" → expense, Groceries, $50
- "salary $3000" → income, Salary, $3000
- "uber $20" → expense, Transportation, $20
- Default date to today (${new Date().toISOString().split('T')[0]})
- Default payment method to "Cash" unless specified

Be concise in your responses. Always use the extractTransaction tool when the user mentions any financial transaction.`;

export async function POST(req: Request) {
  const {
    messages,
    apiKey,
    modelId,
  }: { messages: UIMessage[]; apiKey: string; modelId: string } =
    await req.json();

  if (!apiKey || !modelId)
    return new Response('API key or model ID missing', { status: 400 });

  const provider = createOpenRouter({ apiKey });

  const result = streamText({
    model: provider(modelId),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    toolChoice: 'auto',
    maxOutputTokens: 2028,
    temperature: 0,
    tools: {
      extractTransaction: extractTransactionTool,
    },
  });

  return result.toUIMessageStreamResponse();
}
