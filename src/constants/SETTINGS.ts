// Settings Constants

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'PHP'
  | 'JPY'
  | 'CNY'
  | 'KRW'
  | 'INR';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';

// Helper function to get symbol from currency code
export const getCurrencySymbol = (code: CurrencyCode): string => {
  const curr = CURRENCIES.find((c) => c.code === code);
  return curr?.symbol ?? '$';
};
