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
