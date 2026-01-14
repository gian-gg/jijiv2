import { getFinancialStats } from '@/lib/db/transactions';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { CurrencyAmount } from '@/components/wallet/ui';

export async function QuickInfo() {
  const statsRes = await getFinancialStats();
  const data =
    statsRes.success && statsRes.data
      ? statsRes.data
      : { income: 0, expenses: 0, balance: 0, transactionCount: 0 };
  const { income, expenses, balance, transactionCount } = data;

  const stats = [
    {
      title: 'Balance',
      amount: balance,
      description: `${transactionCount} transactions`,
      icon: Wallet,
      iconBg: balance >= 0 ? 'bg-success/10' : 'bg-destructive/10',
      iconBorder: balance >= 0 ? 'border-success/20' : 'border-destructive/20',
      iconColor: balance >= 0 ? 'text-success' : 'text-destructive',
    },
    {
      title: 'Income',
      amount: income,
      description: 'total earned',
      icon: TrendingUp,
      iconBg: 'bg-success/10',
      iconBorder: 'border-success/20',
      iconColor: 'text-success',
    },
    {
      title: 'Expenses',
      amount: expenses,
      description: 'total spent',
      icon: TrendingDown,
      iconBg: 'bg-destructive/10',
      iconBorder: 'border-destructive/20',
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-background/40 border-border relative overflow-hidden border p-2 md:p-3"
          >
            <div className="relative flex flex-col gap-1 md:gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase md:text-xs">
                  {stat.title}
                </span>
                <div
                  className={`flex size-6 items-center justify-center border md:size-8 ${stat.iconBg} ${stat.iconBorder}`}
                >
                  <Icon className={`size-3 md:size-4 ${stat.iconColor}`} />
                </div>
              </div>

              <div className="text-sm leading-none font-bold tabular-nums md:text-lg">
                <CurrencyAmount amount={stat.amount} />
              </div>

              <div className="text-muted-foreground hidden text-[10px] md:block md:text-xs">
                {stat.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
