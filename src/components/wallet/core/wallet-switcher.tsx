'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, Check } from 'lucide-react';
import useWalletStore from '@/stores/useWalletStore';

export function WalletSwitcher() {
  const { wallets, activeWallet, setActiveWallet } = useWalletStore();

  const handleAddWallet = () => {
    // TODO: Implement add wallet dialog
    console.log('Add new wallet');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent/5 flex items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex size-8 items-center justify-center border"
              style={{
                backgroundColor: `${activeWallet.color}20`,
                borderColor: `${activeWallet.color}40`,
              }}
            >
              <span className="text-sm">{activeWallet.icon}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{activeWallet.name}</span>
              <span className="text-muted-foreground text-xs">Wallet</span>
            </div>
          </div>
          <ChevronDown className="text-muted-foreground size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Your Wallets
          </p>
        </div>
        <DropdownMenuSeparator />
        {wallets.map((wallet) => (
          <DropdownMenuItem
            key={wallet.id}
            onClick={() => setActiveWallet(wallet)}
            className="flex items-center justify-between gap-2 py-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="flex size-6 items-center justify-center border"
                style={{
                  backgroundColor: `${wallet.color}20`,
                  borderColor: `${wallet.color}40`,
                }}
              >
                <span className="text-xs">{wallet.icon}</span>
              </div>
              <span className="text-sm">{wallet.name}</span>
            </div>
            {activeWallet.id === wallet.id && (
              <Check className="text-primary size-4" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAddWallet} className="gap-2 py-2">
          <Plus className="size-4" />
          <span className="text-sm">Add Wallet</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
