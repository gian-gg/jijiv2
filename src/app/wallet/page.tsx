'use client';
import React, { useState } from 'react';
import { AiInput } from '@/components/wallet/ai-input';
import { FinancialOverview } from '@/components/wallet/financial-overview';
import { RecentTransactions } from '@/components/wallet/recent-transactions';
import type { Transaction } from '@/types/transactions';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Wallet</h2>
        <p className="text-muted-foreground text-lg">
          Track and manage your financial transactions
        </p>
      </div>

      {/* AI Input */}
      <AiInput transactions={transactions} setTransactions={setTransactions} />

      {/* Financial Overview */}
      <FinancialOverview transactions={transactions} />

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />
    </>
  );
}
