'use client';
import { AiInput } from '@/components/wallet/ai-input';
import { FinancialOverview } from '@/components/wallet/financial-overview';
import { RecentTransactions } from '@/components/wallet/recent-transactions';
import type { Transaction } from '@/types/transactions';
import { useState } from 'react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <>
      {/* Compact Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Wallet</h2>
            <p className="text-muted-foreground text-sm">
              Manage your transactions
            </p>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <FinancialOverview transactions={transactions} />

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />

      {/* AI Input */}
      <AiInput transactions={transactions} setTransactions={setTransactions} />
    </>
  );
}
