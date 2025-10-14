import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Coffee, Home, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      name: 'Grocery Store',
      category: 'Shopping',
      amount: -125.5,
      date: 'Today, 2:30 PM',
      icon: ShoppingBag,
    },
    {
      id: 2,
      name: 'Coffee Shop',
      category: 'Food & Drink',
      amount: -8.5,
      date: 'Today, 9:15 AM',
      icon: Coffee,
    },
    {
      id: 3,
      name: 'Rent Payment',
      category: 'Housing',
      amount: -1850.0,
      date: 'Yesterday',
      icon: Home,
    },
    {
      id: 4,
      name: 'Electricity Bill',
      category: 'Utilities',
      amount: -95.2,
      date: '2 days ago',
      icon: Zap,
    },
    {
      id: 5,
      name: 'Freelance Payment',
      category: 'Income',
      amount: 2500.0,
      date: '3 days ago',
      icon: TrendingUp,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {transaction.date}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`font-semibold tabular-nums ${transaction.amount > 0 ? 'text-green-600 dark:text-green-500' : ''}`}
                >
                  {transaction.amount > 0 ? '+' : ''}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
