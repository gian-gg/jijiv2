'use client';
import { AiChat, QuickInfo } from '@/components/wallet/home';

export default function Home() {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Chat</h2>
        <p className="text-muted-foreground text-xs">
          Chat with AI to manage your finances
        </p>
      </div>

      <QuickInfo />

      <AiChat />
    </>
  );
}
