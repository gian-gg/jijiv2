'use client';

import useSettingsStore from '@/stores/useSettingsStore';
import { getCurrencySymbol } from '@/constants/SETTINGS';

interface CurrencyAmountProps {
  amount: number;
  showSign?: boolean;
  type?: 'income' | 'expense';
  className?: string;
}

export function CurrencyAmount({
  amount,
  showSign = false,
  type,
  className,
}: CurrencyAmountProps) {
  const currency = useSettingsStore((state) => state.currency);
  const symbol = getCurrencySymbol(currency);

  const sign = showSign ? (type === 'income' ? '+' : '-') : '';

  return (
    <span className={className}>
      {sign}
      {symbol}
      {Math.abs(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}
