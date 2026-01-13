import { AI_MESSAGES } from '@/constants/AI';

// Parse API error and return appropriate user-friendly message
export const getAIErrorMessage = (error: Error): string => {
  const msg = error.message.toLowerCase();

  if (msg.includes('rate') || msg.includes('429') || msg.includes('too many')) {
    return AI_MESSAGES.RATE_LIMITED().content;
  }
  if (
    (msg.includes('invalid') && msg.includes('key')) ||
    msg.includes('401') ||
    msg.includes('unauthorized')
  ) {
    return AI_MESSAGES.INVALID_API_KEY().content;
  }
  if (
    msg.includes('credit') ||
    msg.includes('insufficient') ||
    msg.includes('payment') ||
    msg.includes('402')
  ) {
    return AI_MESSAGES.INSUFFICIENT_CREDITS().content;
  }
  if (
    (msg.includes('model') &&
      (msg.includes('unavailable') || msg.includes('not found'))) ||
    msg.includes('404')
  ) {
    return AI_MESSAGES.MODEL_UNAVAILABLE().content;
  }

  return AI_MESSAGES.ERROR().content;
};
