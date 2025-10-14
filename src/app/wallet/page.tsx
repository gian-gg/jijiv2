'use client';
import React, { useState } from 'react';
import { AiInput } from '@/components/wallet/ai-input';
import { FinancialOverview } from '@/components/wallet/financial-overview';
import { RecentTransactions } from '@/components/wallet/recent-transactions';
import type { Transaction } from '@/type';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
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
