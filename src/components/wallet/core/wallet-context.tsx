'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Wallet {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface WalletContextType {
  wallets: Wallet[];
  activeWallet: Wallet;
  setActiveWallet: (wallet: Wallet) => void;
  addWallet: (wallet: Wallet) => void;
  removeWallet: (walletId: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const defaultWallets: Wallet[] = [
  {
    id: '1',
    name: 'Personal',
    icon: '💰',
    color: 'oklch(0.78 0.14 285)',
  },
  {
    id: '2',
    name: 'Business',
    icon: '💼',
    color: 'oklch(0.72 0.12 210)',
  },
  {
    id: '3',
    name: 'Savings',
    icon: '🏦',
    color: 'oklch(0.68 0.14 160)',
  },
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallets, setWallets] = useState<Wallet[]>(defaultWallets);
  const [activeWallet, setActiveWallet] = useState<Wallet>(wallets[0]);

  const addWallet = (wallet: Wallet) => {
    setWallets((prev) => [...prev, wallet]);
  };

  const removeWallet = (walletId: string) => {
    setWallets((prev) => prev.filter((w) => w.id !== walletId));
    if (activeWallet.id === walletId && wallets.length > 1) {
      setActiveWallet(wallets[0]);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallets,
        activeWallet,
        setActiveWallet,
        addWallet,
        removeWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
