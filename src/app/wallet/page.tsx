import { AiInput } from '@/components/wallet/ai-input';
import { FinancialOverview } from '@/components/wallet/financial-overview';
import { RecentTransactions } from '@/components/wallet/recent-transactions';
import { NotificationsPopover } from '@/components/wallet/notifications-popover';
import { AccountPopover } from '@/components/wallet/account-popover';

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center">
      {/* Top Navigation */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b px-20 py-2 backdrop-blur">
        <h1 className="text-xl font-semibold">jiji</h1>

        <div className="flex items-center gap-2">
          <NotificationsPopover />
          <AccountPopover />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-4 flex flex-col gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Track and manage your financial transactions
          </p>
        </div>

        {/* AI Input */}
        <AiInput />

        {/* Financial Overview */}
        <FinancialOverview />

        {/* Recent Transactions */}
        <RecentTransactions />
      </main>
    </div>
  );
}
