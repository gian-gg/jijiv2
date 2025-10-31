import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/types/transactions';

export function RecentTransactions(props: { transactions: Transaction[] }) {
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
          {props.transactions.map((transaction) => {
            const Icon = DollarSign;
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">
                    <Icon className="text-muted-foreground h-6 w-6" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <p className="truncate font-semibold">
                        {transaction.description}
                      </p>
                      <span
                        className={`ml-4 font-semibold tabular-nums ${transaction.amount > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {transaction.amount > 0 ? '+' : '-'}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {transaction.type}
                      </Badge>
                      {transaction.category && (
                        <span className="bg-muted text-muted-foreground rounded px-2 py-0.5">
                          {transaction.category}
                        </span>
                      )}
                      <span className="ml-auto">{transaction.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
