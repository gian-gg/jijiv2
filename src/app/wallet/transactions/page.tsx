'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/wallet/core';
import { EmptyState, FilterButtons } from '@/components/wallet/ui';

import { getTransactions } from '@/lib/db/transactions';
import type { Transaction } from '@/types/transactions';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  ArrowUpDown,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  // Search state
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination & Sort state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState('date-desc');

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactions({
          filter,
          search: searchQuery,
          sort,
          limit: 20,
          page,
        });
        if (result.success && result.data) {
          setTransactions(result.data);
          if (result.pagination) {
            setTotalPages(result.pagination.totalPages);
            setTotalCount(result.pagination.total);
          }
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [filter, searchQuery, page, sort]);

  // Reset page when filter or search changes
  useEffect(() => {
    setPage(1);
  }, [filter, searchQuery, sort]);

  const handleSearch = () => {
    if (inputValue !== searchQuery) {
      setSearchQuery(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <PageHeader
        title="Transactions"
        description="View and manage your transaction history"
      />

      {/* Filters and Search */}
      <Card className="py-0 pb-2">
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

          <div className="flex w-full flex-1 gap-2">
            <div className="relative w-full flex-1 sm:w-64">
              <Input
                placeholder="Search transactions..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pr-10 text-sm"
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground absolute top-0 right-0 h-full w-10"
                onClick={handleSearch}
              >
                <Search className="size-4" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="date-desc">
                    Newest Date
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date-asc">
                    Oldest Date
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="amount-desc">
                    Highest Amount
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="amount-asc">
                    Lowest Amount
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="flex flex-1 flex-col overflow-hidden p-0!">
        <CardHeader className="flex flex-row items-center justify-between p-3">
          <CardTitle className="text-sm">
            Transactions{' '}
            {!isLoading && (
              <span className="text-accent text-xs">({totalCount})</span>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-0 pt-0">
          <div className="divide-border divide-y">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="text-muted-foreground animate-spin" />
              </div>
            ) : transactions.length === 0 ? (
              <EmptyState message="No transactions found" />
            ) : (
              transactions.map((transaction) => (
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
                        {transaction.paymentMethod && (
                          <>
                            <span>•</span>
                            <span>{transaction.paymentMethod}</span>
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

        {/* Pagination Controls - Fixed at bottom */}
        <div className="border-border flex items-center justify-between border-t p-2">
          <span className="text-muted-foreground text-xs">
            Page {page} of {totalPages || 1}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || isLoading}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
