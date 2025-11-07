'use client';
import {
  AiInput,
  FinancialOverview,
  RecentTransactions,
} from '@/components/wallet/transactions';
import type { Transaction } from '@/types/transactions';
import { useState } from 'react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Wallet</h2>
        <p className="text-muted-foreground text-xs">
          Manage your transactions
        </p>
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
