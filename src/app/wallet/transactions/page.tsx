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
import { useState } from 'react';

// Mock data for demonstration
const mockTransactions = [
  {
    id: '1',
    description: 'Starbucks Coffee',
    amount: -5.99,
    category: 'Food & Drink',
    date: '2025-11-08',
    time: '09:30 AM',
    status: 'completed',
  },
  {
    id: '2',
    description: 'Salary Deposit',
    amount: 3500.0,
    category: 'Income',
    date: '2025-11-07',
    time: '12:00 PM',
    status: 'completed',
  },
  {
    id: '3',
    description: 'Amazon Purchase',
    amount: -89.99,
    category: 'Shopping',
    date: '2025-11-06',
    time: '03:45 PM',
    status: 'completed',
  },
  {
    id: '4',
    description: 'Netflix Subscription',
    amount: -15.99,
    category: 'Entertainment',
    date: '2025-11-05',
    time: '08:00 AM',
    status: 'completed',
  },
  {
    id: '5',
    description: 'Uber Ride',
    amount: -24.5,
    category: 'Transportation',
    date: '2025-11-04',
    time: '06:15 PM',
    status: 'completed',
  },
  {
    id: '6',
    description: 'Freelance Payment',
    amount: 850.0,
    category: 'Income',
    date: '2025-11-03',
    time: '10:30 AM',
    status: 'pending',
  },
  {
    id: '7',
    description: 'Grocery Store',
    amount: -127.43,
    category: 'Food & Drink',
    date: '2025-11-02',
    time: '05:20 PM',
    status: 'completed',
  },
  {
    id: '8',
    description: 'Gym Membership',
    amount: -49.99,
    category: 'Health & Fitness',
    date: '2025-11-01',
    time: '07:00 AM',
    status: 'completed',
  },
  {
    id: '9',
    description: 'Spotify Subscription',
    amount: -9.99,
    category: 'Entertainment',
    date: '2025-10-31',
    time: '06:00 PM',
    status: 'completed',
  },
];

export default function Transactions() {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'income' && transaction.amount > 0) ||
      (filter === 'expense' && transaction.amount < 0);

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
                ({filteredTransactions.length} / {mockTransactions.length})
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
                        transaction.amount > 0
                          ? 'border-success/20 bg-success/10'
                          : 'border-destructive/20 bg-destructive/10'
                      }`}
                    >
                      {transaction.amount > 0 ? (
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
                        <span>{transaction.time}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <p
                      className={`text-sm font-bold ${
                        transaction.amount > 0
                          ? 'text-success'
                          : 'text-foreground'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    {transaction.status === 'pending' && (
                      <Badge variant="secondary" className="text-xs">
                        Pending
                      </Badge>
                    )}
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
