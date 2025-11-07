import { Header, Navigation } from '@/components/wallet/core';
import { WalletProvider } from '@/components/wallet/core/wallet-context';
import ROUTES from '@/constants/ROUTES';
import { getSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect(ROUTES.ROOT);
  }

  return (
    <WalletProvider>
      <div className="border-primary/20 bg-card flex h-[98vh] w-full max-w-2xl flex-col overflow-hidden border md:h-[90vh]">
        {/* Subtle gradient background */}
        <div className="gradient-purple-radial pointer-events-none absolute inset-0 opacity-20" />

        <Header user={session.user} />

        <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
          {children}
        </main>

        {/* Navigation */}
        <Navigation />
      </div>
    </WalletProvider>
  );
}
