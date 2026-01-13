// Time-based suggestion templates
export type TimeOfDay = 'morning' | 'lunch' | 'afternoon' | 'evening' | 'night';

export const SUGGESTIONS_BY_TIME: Record<
  TimeOfDay,
  { text: string; amount: number }[]
> = {
  morning: [
    { text: 'coffee', amount: 5 },
    { text: 'breakfast', amount: 10 },
    { text: 'commute', amount: 15 },
  ],
  lunch: [
    { text: 'lunch', amount: 15 },
    { text: 'coffee', amount: 5 },
    { text: 'snack', amount: 8 },
  ],
  afternoon: [
    { text: 'snack', amount: 5 },
    { text: 'uber', amount: 20 },
    { text: 'coffee', amount: 5 },
  ],
  evening: [
    { text: 'dinner', amount: 25 },
    { text: 'groceries', amount: 50 },
    { text: 'entertainment', amount: 30 },
  ],
  night: [
    { text: 'late snack', amount: 10 },
    { text: 'delivery', amount: 20 },
    { text: 'uber', amount: 25 },
  ],
};

// Weekend-specific suggestions
export const WEEKEND_SUGGESTIONS: { text: string; amount: number }[] = [
  { text: 'groceries', amount: 50 },
  { text: 'entertainment', amount: 30 },
  { text: 'shopping', amount: 40 },
];

// Analytical questions
export const ANALYTICAL_QUESTIONS = [
  'how much did I spend this week?',
  'show my expenses today',
  'show my expenses this month',
] as const;
