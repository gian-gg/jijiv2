import { Header, Navigation } from '@/components/wallet/core';
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
    <div className="border-primary/20 bg-card flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden border">
      {/* Subtle gradient background */}
      <div className="gradient-purple-radial pointer-events-none absolute inset-0 opacity-20" />

      <Header user={session.user} />

      <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
        {children}
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
