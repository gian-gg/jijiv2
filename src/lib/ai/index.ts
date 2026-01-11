'use server';

import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { createStreamableValue } from '@ai-sdk/rsc';
import { AI_ERROR_TYPES, type AIErrorType } from '@/constants/AI';

// Custom error class for AI errors
class AIError extends Error {
  type: AIErrorType;

  constructor(message: string, type: AIErrorType) {
    super(message);
    this.type = type;
    this.name = 'AIError';
  }
}

function parseErrorType(error: unknown): AIErrorType {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorLower = errorMessage.toLowerCase();

  if (errorLower.includes('rate limit') || errorLower.includes('429')) {
    return AI_ERROR_TYPES.RATE_LIMITED;
  }
  if (
    errorLower.includes('unauthorized') ||
    errorLower.includes('401') ||
    errorLower.includes('invalid api key') ||
    errorLower.includes('invalid_api_key')
  ) {
    return AI_ERROR_TYPES.INVALID_API_KEY;
  }
  if (
    errorLower.includes('insufficient') ||
    errorLower.includes('credits') ||
    errorLower.includes('402')
  ) {
    return AI_ERROR_TYPES.INSUFFICIENT_CREDITS;
  }
  if (
    errorLower.includes('model') ||
    errorLower.includes('unavailable') ||
    errorLower.includes('404') ||
    errorLower.includes('not found')
  ) {
    return AI_ERROR_TYPES.MODEL_UNAVAILABLE;
  }

  return AI_ERROR_TYPES.UNKNOWN;
}

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
      const errorType = parseErrorType(error);
      stream.error(new AIError(`AI Error: ${errorType}`, errorType));
    }
  })();

  return { output: stream.value };
}
