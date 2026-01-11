'use server';

import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { createStreamableValue } from '@ai-sdk/rsc';

export async function generateText(
  modelId: string,
  apiKey: string,
  prompt: string
) {
  console.log(modelId, apiKey, prompt);
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
      stream.error(error);
    }
  })();

  return { output: stream.value };
}
