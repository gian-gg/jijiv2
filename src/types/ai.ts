import { AI_ERROR_TYPES, type AIErrorType } from '@/constants/AI';

export class AIError extends Error {
  type: AIErrorType;

  constructor(message: string, type: AIErrorType) {
    super(message);
    this.type = type;
    this.name = 'AIError';
  }
}

export function parseAIError(error: unknown): AIError {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorLower = errorMessage.toLowerCase();

  let type: AIErrorType = AI_ERROR_TYPES.UNKNOWN;

  if (errorLower.includes('rate limit') || errorLower.includes('429')) {
    type = AI_ERROR_TYPES.RATE_LIMITED;
  } else if (
    errorLower.includes('unauthorized') ||
    errorLower.includes('401') ||
    errorLower.includes('invalid api key') ||
    errorLower.includes('invalid_api_key')
  ) {
    type = AI_ERROR_TYPES.INVALID_API_KEY;
  } else if (
    errorLower.includes('insufficient') ||
    errorLower.includes('credits') ||
    errorLower.includes('402')
  ) {
    type = AI_ERROR_TYPES.INSUFFICIENT_CREDITS;
  } else if (
    errorLower.includes('model') ||
    errorLower.includes('unavailable') ||
    errorLower.includes('404') ||
    errorLower.includes('not found')
  ) {
    type = AI_ERROR_TYPES.MODEL_UNAVAILABLE;
  }

  return new AIError(errorMessage, type);
}

export type { AIErrorType };
