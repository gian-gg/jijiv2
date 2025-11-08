'use client';
import { AiChat, QuickInfo } from '@/components/wallet/home';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Wallet</h2>
        <p className="text-muted-foreground text-xs">
          Chat with AI to manage your finances
        </p>
      </div>

      {/* Quick Info Stats */}
      <QuickInfo />

      {/* AI Chat */}
      <AiChat />
    </>
  );
}
