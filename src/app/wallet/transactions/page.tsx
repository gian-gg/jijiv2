'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/wallet/core';
import { EmptyState, FilterButtons } from '@/components/wallet/ui';
import useTransactionStore from '@/stores/useTransactionsStore';
import { useState } from 'react';

export default function Transactions() {
  const { transactions } = useTransactionStore();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by transaction type
    const matchesFilter =
      filter === 'all' ||
      (filter === 'income' && transaction.type === 'income') ||
      (filter === 'expense' && transaction.type === 'expense');

    // Filter by search query
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <PageHeader
        title="Transactions"
        description="View and manage your transaction history"
      />

      {/* Filters and Search */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterButtons
            options={[
              { value: 'all', label: 'All' },
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expenses' },
            ]}
            value={filter}
            onChange={setFilter}
          />

          <div className="flex flex-1 gap-2">
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full flex-1 text-sm sm:w-64"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="2" y1="14" x2="6" y2="14"></line>
                    <line x1="10" y1="8" x2="14" y2="8"></line>
                    <line x1="18" y1="16" x2="22" y2="16"></line>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Sort by Date</DropdownMenuItem>
                <DropdownMenuItem>Sort by Amount</DropdownMenuItem>
                <DropdownMenuItem>Sort by Category</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="flex-1 overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-sm">
            Transactions{' '}
            {filteredTransactions.length > 0 && (
              <span className="text-accent text-xs">
                ({filteredTransactions.length} / {transactions.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto px-0">
          <div className="divide-border divide-y">
            {filteredTransactions.length === 0 ? (
              <EmptyState message="No transactions found" />
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="hover:bg-accent/5 flex items-center justify-between p-4 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex size-10 items-center justify-center border ${
                        transaction.type === 'income'
                          ? 'border-success/20 bg-success/10'
                          : 'border-destructive/20 bg-destructive/10'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-success"
                        >
                          <line x1="12" y1="19" x2="12" y2="5"></line>
                          <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-destructive"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <p className="text-sm font-medium">
                        {transaction.description}
                      </p>
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                        {transaction.payment_method && (
                          <>
                            <span>•</span>
                            <span>{transaction.payment_method}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <p
                      className={`text-sm font-bold ${
                        transaction.type === 'income'
                          ? 'text-success'
                          : 'text-foreground'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
