'use client';
import Navigation from '@/components/wallet/navigation';

export default function Transactions() {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Transactions</h2>
        <p className="text-muted-foreground text-xs">
          View and manage your transaction history
        </p>
      </div>

      <div className="bg-background/40 border-border flex h-full w-full flex-1 flex-col overflow-hidden border"></div>

      {/* Navigation */}
      <Navigation />
    </>
  );
}
