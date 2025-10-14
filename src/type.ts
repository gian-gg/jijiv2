export interface Transaction {
  id: number;
  type: 'income' | 'expense' | 'debt' | 'reminder';
  category: string;
  amount: number;
  description: string;
  date: string;
  payment_method: string | null;
}
