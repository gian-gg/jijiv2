'use server';

import { parseAIError } from '@/types/ai';
import { createStreamableValue } from '@ai-sdk/rsc';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

export async function generateText(
  modelId: string,
  apiKey: string,
  prompt: string
) {
  const stream = createStreamableValue('');

  (async () => {
    try {
      const provider = createOpenRouter({ apiKey });
      const { textStream } = await streamText({
        model: provider(modelId),
        prompt,
        maxOutputTokens: 2048,
      });

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
    } catch (error) {
      console.error('AI Stream Error:', error);
      stream.error(parseAIError(error));
    }
  })();

  return { output: stream.value };
}
