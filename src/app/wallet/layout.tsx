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
    <div className="bg-muted flex min-h-screen w-full flex-col items-center justify-between">
      <Header user={session.user} />

      {/* Main Content */}
      <main className="mt-4 mb-20 flex h-full w-4xl flex-1 flex-col gap-4 p-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
