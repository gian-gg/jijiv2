import { Header } from '@/components/core';
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
    <div className="border-primary/20 bg-card flex h-full w-full flex-1 flex-col overflow-hidden border md:h-[90vh] md:max-w-2xl">
      {/* Subtle gradient background */}
      <div className="gradient-purple-radial pointer-events-none absolute inset-0 opacity-20" />

      <Header user={session.user} />

      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
