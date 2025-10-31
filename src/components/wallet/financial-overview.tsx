import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import type { Transaction } from '@/types/transactions';

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
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground mt-1 text-xs">
                {stat.change ? `${stat.change} from last month` : ''}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
