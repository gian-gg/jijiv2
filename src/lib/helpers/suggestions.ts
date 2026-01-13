import { getCurrencySymbol, type CurrencyCode } from '@/constants/SETTINGS';
import {
  SUGGESTIONS_BY_TIME,
  WEEKEND_SUGGESTIONS,
  ANALYTICAL_QUESTIONS,
  type TimeOfDay,
} from '@/constants/SUGGESTIONS';

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'lunch';
  if (hour >= 14 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

const isWeekend = (): boolean => {
  const day = new Date().getDay();
  return day === 0 || day === 6;
};

export const getDynamicSuggestions = (currency: CurrencyCode): string[] => {
  const symbol = getCurrencySymbol(currency);
  const time = getTimeOfDay();
  const weekend = isWeekend();

  let suggestions = SUGGESTIONS_BY_TIME[time].slice(0, 2);

  if (weekend) {
    const weekendSuggestion =
      WEEKEND_SUGGESTIONS[
        Math.floor(Math.random() * WEEKEND_SUGGESTIONS.length)
      ];
    suggestions = [suggestions[0], weekendSuggestion];
  }

  const formatted = suggestions.map((s) => `${s.text} ${symbol}${s.amount}`);

  const questionIndex =
    Math.floor(Date.now() / 60000) % ANALYTICAL_QUESTIONS.length;
  formatted.push(ANALYTICAL_QUESTIONS[questionIndex]);

  return formatted;
};
