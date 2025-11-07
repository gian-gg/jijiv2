'use client';
import Navigation from '@/components/wallet/navigation';

export default function Analytics() {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Analytics</h2>
        <p className="text-muted-foreground text-xs">
          View and manage your analytics data
        </p>
      </div>

      <div className="bg-background/40 border-border flex h-full w-full flex-1 flex-col overflow-hidden border"></div>

      {/* Navigation */}
      <Navigation />
    </>
  );
}
