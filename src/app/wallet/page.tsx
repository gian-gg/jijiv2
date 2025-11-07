'use client';
import { AiChat, QuickInfo } from '@/components/wallet/home';
import type { Transaction } from '@/types/transactions';
import { useState } from 'react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Wallet</h2>
        <p className="text-muted-foreground text-xs">
          Chat with AI to manage your finances
        </p>
      </div>

      {/* Quick Info Stats */}
      <QuickInfo transactions={transactions} />

      {/* AI Chat */}
      <AiChat transactions={transactions} setTransactions={setTransactions} />
    </>
  );
}
