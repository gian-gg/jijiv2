'use client';

import type { Transaction } from '@/types/transactions';
import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import useTransactionStore from '@/stores/useTransactionsStore';

export function QuickInfo() {
  const { transactions } = useTransactionStore();
  // Calculate stats
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;

  // Mock data for upcoming payments and budget usage (would come from actual data in production)
  const upcomingPayments = 3;
  const budgetUsed = expenses > 0 ? ((expenses / 1500) * 100).toFixed(0) : '0';

  const stats = [
    {
      title: 'Balance',
      value: `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: `${transactions.length} transactions`,
      icon: TrendingUp,
      iconBg: balance >= 0 ? 'bg-success/10' : 'bg-destructive/10',
      iconBorder: balance >= 0 ? 'border-success/20' : 'border-destructive/20',
      iconColor: balance >= 0 ? 'text-success' : 'text-destructive',
    },
    {
      title: 'Budget Used',
      value: `${budgetUsed}%`,
      description: 'of monthly budget',
      icon: TrendingDown,
      iconBg: 'bg-primary/10',
      iconBorder: 'border-primary/20',
      iconColor: 'text-primary',
    },
    {
      title: 'Upcoming',
      value: `${upcomingPayments}`,
      description: 'payments due soon',
      icon: Calendar,
      iconBg: 'bg-warning/10',
      iconBorder: 'border-warning/20',
      iconColor: 'text-warning',
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
              {/* Icon and Label */}
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

              {/* Value */}
              <div className="text-lg leading-none font-bold tabular-nums">
                {stat.value}
              </div>

              {/* Description */}
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
