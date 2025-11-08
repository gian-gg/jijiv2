import { create } from 'zustand';

export interface Wallet {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface WalletStore {
  wallets: Wallet[];
  activeWallet: Wallet;
  setActiveWallet: (wallet: Wallet) => void;
  addWallet: (wallet: Wallet) => void;
  removeWallet: (walletId: string) => void;
}

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

const useWalletStore = create<WalletStore>()((set, get) => ({
  wallets: defaultWallets,
  activeWallet: defaultWallets[0],
  setActiveWallet: (wallet) => set({ activeWallet: wallet }),
  addWallet: (wallet) =>
    set((state) => ({
      wallets: [...state.wallets, wallet],
    })),
  removeWallet: (walletId) =>
    set((state) => {
      const newWallets = state.wallets.filter((w) => w.id !== walletId);
      // If removing the active wallet, set the first available wallet as active
      if (state.activeWallet.id === walletId && newWallets.length > 0) {
        return {
          wallets: newWallets,
          activeWallet: newWallets[0],
        };
      }
      return { wallets: newWallets };
    }),
}));

export default useWalletStore;
