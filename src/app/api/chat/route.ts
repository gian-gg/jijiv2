import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';
import { getSession } from '@/lib/auth/server';
import { AI_PROMPTS } from '@/constants/AI';
import type { ApiProvider } from '@/stores/useSettingsStore';

import { extractTransactionTool } from '@/lib/ai-tools/extract-transaction';
import { queryTransactionsTool } from '@/lib/ai-tools/query-transactions';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const {
    messages,
    apiKey,
    modelId,
    apiProvider = 'openrouter',
    currency = 'USD',
  }: {
    messages: UIMessage[];
    apiKey: string;
    modelId: string;
    apiProvider?: ApiProvider;
    currency?: string;
  } = await req.json();

  if (!apiKey || !modelId)
    return new Response('API key or model ID missing', { status: 400 });

  // Create provider based on user selection
  const model =
    apiProvider === 'gemini'
      ? createGoogleGenerativeAI({ apiKey })(modelId)
      : createOpenRouter({ apiKey })(modelId);

  const result = streamText({
    model,
    system: AI_PROMPTS.SYSTEM_PROMPT(session.user.id, currency),
    messages: await convertToModelMessages(messages),
    toolChoice: 'auto',
    maxOutputTokens: 2028,
    temperature: 0,
    stopWhen: stepCountIs(5),
    tools: {
      extractTransaction: extractTransactionTool,
      queryTransactions: queryTransactionsTool,
    },
  });

  return result.toUIMessageStreamResponse();
}
