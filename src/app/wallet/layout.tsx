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
    <div className="border-border bg-card flex h-full w-full flex-1 flex-col overflow-hidden border md:h-[90vh] md:max-w-2xl">
      <div className="border-border flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 border-primary/20 flex h-10 w-10 items-center justify-center border">
            <span className="text-primary text-lg font-bold">j</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">jiji</h1>
        </div>

        <Header user={session.user} />
      </div>

      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
