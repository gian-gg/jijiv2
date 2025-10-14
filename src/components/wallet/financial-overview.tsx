import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function FinancialOverview() {
  const stats = [
    {
      title: 'Total Balance',
      value: '$24,582.50',
      change: '+12.5%',
      trend: 'up',
      icon: Wallet,
    },
    {
      title: 'Monthly Income',
      value: '$8,420.00',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Monthly Expenses',
      value: '$4,285.30',
      change: '-3.1%',
      trend: 'down',
      icon: TrendingDown,
    },
  ];

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
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
