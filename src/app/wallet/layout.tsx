import { getSession } from '@/lib/auth/server';
import React from 'react';
import { redirect } from 'next/navigation';
import { Footer, Header } from '@/components/core';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center">
      <Header />

      {/* Main Content */}
      <main className="mt-4 mb-20 flex flex-col gap-4">{children}</main>

      <Footer />
    </div>
  );
}
