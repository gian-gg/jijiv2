import type { Transaction } from '@/types/transactions';
import { create } from 'zustand';

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
};

const useTransactionStore = create<TransactionStore>()((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === updatedTransaction.id ? updatedTransaction : tx
      ),
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
}));

export default useTransactionStore;
