import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/types/transactions';
import { DollarSign } from 'lucide-react';

export function RecentTransactions(props: { transactions: Transaction[] }) {
  return (
    <div className="bg-background/40 border-border flex h-full w-full flex-1 flex-col overflow-hidden border">
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b px-3 py-2">
        <h3 className="text-sm font-semibold">Recent Transactions</h3>
        {props.transactions.length > 0 && (
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            View All
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="h-full w-full">
        {props.transactions.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center py-6">
            <div className="bg-muted/50 border-border mb-2 flex h-10 w-10 items-center justify-center border">
              <DollarSign className="text-muted-foreground h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-xs">No transactions yet</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Use AI input to add one
            </p>
          </div>
        ) : (
          <div className="divide-border divide-y">
            {props.transactions.map((transaction) => {
              return (
                <div
                  key={transaction.id}
                  className="hover:bg-muted/50 flex items-center gap-2 px-3 py-2 transition-colors"
                >
                  {/* Icon */}
                  <div className="bg-primary/5 border-primary/10 flex h-7 w-7 flex-shrink-0 items-center justify-center border">
                    <DollarSign className="text-primary h-3.5 w-3.5" />
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-col">
                      <p className="truncate text-xs leading-tight font-semibold">
                        {transaction.description}
                      </p>
                      <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                        <Badge
                          variant="secondary"
                          className="h-3.5 px-1 text-xs leading-none capitalize"
                        >
                          {transaction.type}
                        </Badge>
                        {transaction.category && (
                          <span className="text-xs">
                            {transaction.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Amount and Date */}
                    <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          transaction.amount > 0
                            ? 'text-green-600 dark:text-green-500'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : '-'}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      <span className="text-muted-foreground text-xs leading-none tabular-nums">
                        {transaction.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
