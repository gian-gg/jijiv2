import { getSession } from '@/lib/auth/server';
import React from 'react';
import { redirect } from 'next/navigation';
import { Footer, Header } from '@/components/core';
import ROUTES from '@/constants/ROUTES';

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
    <div className="bg-background relative flex min-h-screen w-full flex-col items-center justify-between">
      {/* Subtle background gradient */}
      <div className="gradient-purple-mesh pointer-events-none absolute inset-0 opacity-30" />
      <div className="bg-dot-pattern-sm pointer-events-none absolute inset-0 opacity-20" />

      <Header user={session.user} />

      {/* Main Content */}
      <main className="relative z-10 mt-6 mb-20 flex h-full w-full max-w-7xl flex-1 flex-col gap-8 px-6 md:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
