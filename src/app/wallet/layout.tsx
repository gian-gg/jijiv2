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
    <>
      {/* Background effects */}
      <div className="gradient-purple-mesh pointer-events-none absolute inset-0 opacity-50" />
      <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="to-background pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />

      {/* Decorative elements */}
      <div className="border-primary/10 pointer-events-none absolute top-20 left-10 h-32 w-32 border" />
      <div className="border-primary/10 pointer-events-none absolute right-10 bottom-20 h-24 w-24 border" />

      {/* Centered content container */}
      <div className="relative z-10 flex min-h-screen min-w-screen flex-col items-center justify-center overflow-hidden p-2 md:p-6">
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
      </div>
    </>
  );
}
