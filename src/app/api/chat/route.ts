import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

export async function POST(req: Request) {
  const {
    messages,
    apiKey,
    modelId,
  }: { messages: UIMessage[]; apiKey: string; modelId: string } =
    await req.json();

  if (!apiKey) return new Response('API key missing', { status: 400 });

  const provider = createOpenRouter({ apiKey });

  const result = streamText({
    model: provider(modelId),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
