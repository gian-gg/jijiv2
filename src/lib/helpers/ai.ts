import { AI_ERROR_TYPES, AI_MESSAGES, type AIErrorType } from '@/constants/AI';
import type { Message } from '@/types/home';

export function getAIErrorMessage(errorType: AIErrorType): Message {
  switch (errorType) {
    case AI_ERROR_TYPES.RATE_LIMITED:
      return AI_MESSAGES.RATE_LIMITED();
    case AI_ERROR_TYPES.INVALID_API_KEY:
      return AI_MESSAGES.INVALID_API_KEY();
    case AI_ERROR_TYPES.INSUFFICIENT_CREDITS:
      return AI_MESSAGES.INSUFFICIENT_CREDITS();
    case AI_ERROR_TYPES.MODEL_UNAVAILABLE:
      return AI_MESSAGES.MODEL_UNAVAILABLE();
    default:
      return AI_MESSAGES.ERROR();
  }
}
