import type { Transaction } from '@/types/transactions';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

function getStats(transactions: Transaction[]) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // For demo, change and trend are placeholders.
  return [
    {
      title: 'Total Balance',
      value: `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '', // You can calculate change if you have previous month data
      trend: balance >= 0 ? 'up' : 'down',
      icon: Wallet,
    },
    {
      title: 'Monthly Income',
      value: `$${income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Monthly Expenses',
      value: `$${expenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '',
      trend: 'down',
      icon: TrendingDown,
    },
  ];
}

export function FinancialOverview({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const stats = getStats(transactions);

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-background/40 border-border relative overflow-hidden border p-3"
          >
            <div className="relative flex flex-col gap-2">
              {/* Icon and Label */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase md:text-xs">
                  {stat.title}
                </span>
                <div className="flex size-6 items-center justify-center">
                  <Icon className="text-muted-foreground size-3" />
                </div>
              </div>

              {/* Value */}
              <div className="text-lg leading-none font-bold tabular-nums">
                {stat.value}
              </div>

              {/* Optional Change Indicator */}
              {stat.change && (
                <div className="text-muted-foreground text-xs">
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
