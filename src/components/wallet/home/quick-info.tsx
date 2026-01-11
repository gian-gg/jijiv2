'use client';

import useTransactionStore from '@/stores/useTransactionsStore';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export function QuickInfo() {
  const { transactions } = useTransactionStore();

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;

  const stats = [
    {
      title: 'Balance',
      value: `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: `${transactions.length} transactions`,
      icon: Wallet,
      iconBg: balance >= 0 ? 'bg-success/10' : 'bg-destructive/10',
      iconBorder: balance >= 0 ? 'border-success/20' : 'border-destructive/20',
      iconColor: balance >= 0 ? 'text-success' : 'text-destructive',
    },
    {
      title: 'Income',
      value: `$${income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'total earned',
      icon: TrendingUp,
      iconBg: 'bg-success/10',
      iconBorder: 'border-success/20',
      iconColor: 'text-success',
    },
    {
      title: 'Expenses',
      value: `$${expenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'total spent',
      icon: TrendingDown,
      iconBg: 'bg-destructive/10',
      iconBorder: 'border-destructive/20',
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-background/40 border-border relative overflow-hidden border p-3"
          >
            <div className="relative flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase md:text-xs">
                  {stat.title}
                </span>
                <div
                  className={`flex size-6 items-center justify-center border ${stat.iconBg} ${stat.iconBorder}`}
                >
                  <Icon className={`size-3 ${stat.iconColor}`} />
                </div>
              </div>

              <div className="text-lg leading-none font-bold tabular-nums">
                {stat.value}
              </div>

              <div className="text-muted-foreground text-xs">
                {stat.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
