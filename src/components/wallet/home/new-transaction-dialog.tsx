import React, { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AI_CONSTANT_MESSAGES,
  CATEGORIES,
  DEFAULT_TRANSACTION,
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
} from '@/constants/TRANSACTIONS';
import type { Message } from '@/types/home';
import type { Transaction } from '@/types/transactions';
import { Calendar, CreditCard, DollarSign, FileText, Tag } from 'lucide-react';

const NewTransactionDialog = ({
  open,
  onOpenChange,
  transaction,
  setTransactions,
  setMessages,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(null);

  // Initialize edited transaction when dialog opens
  useEffect(() => {
    if (transaction) {
      setEditedTransaction({ ...transaction });
    }
  }, [transaction]);

  if (!transaction || !editedTransaction) return null;

  const handleAddTransaction = async (res: Transaction) => {
    // Add transaction locally
    setTransactions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: res.description,
        amount: res.amount,
        date: res.date,
        type: res.type ?? DEFAULT_TRANSACTION.type,
        category: res.category ?? DEFAULT_TRANSACTION.category,
        payment_method:
          res.payment_method ?? DEFAULT_TRANSACTION.payment_method,
      },
    ]);

    // UI feedback message
    const assistantMessage: Message = {
      id: Date.now(),
      role: 'assistant',
      content: `Got it! I've added ${res.type === 'income' ? 'income' : 'expense'}: ${res.description} for $${Math.abs(res.amount).toFixed(2)} in ${res.category}.`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    // add to database here later

    // close dialog
    onOpenChange(false);
  };

  const handleCancel = () => {
    // UI feedback message
    setMessages((prev) => [...prev, AI_CONSTANT_MESSAGES['CANCELLED_MESSAGE']]);

    // close dialog
    onOpenChange(false);
  };

  const updateField = <K extends keyof Transaction>(
    field: K,
    value: Transaction[K]
  ) => {
    setEditedTransaction((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl">
            Review & Edit Transaction
          </DialogTitle>
          <DialogDescription className="font-mono">
            AI parsed the details below. You can edit any field before adding.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label className="font-mono text-sm font-medium">Type</Label>
            <div className="grid grid-cols-4 gap-2">
              {TRANSACTION_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant={
                    editedTransaction.type === type.value
                      ? 'default'
                      : 'secondary'
                  }
                  className="h-auto flex-col gap-1 py-3 font-mono"
                  onClick={() => updateField('type', type.value)}
                >
                  {type.icon}
                  <span className="text-xs">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="flex items-center gap-2 font-mono text-sm font-medium"
            >
              <FileText className="h-4 w-4" />
              Description
            </Label>
            <Input
              id="description"
              value={editedTransaction.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="font-mono"
              placeholder="e.g., Lunch at cafe"
            />
          </div>

          {/* Amount & Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="amount"
                className="flex items-center gap-2 font-mono text-sm font-medium"
              >
                <DollarSign className="h-4 w-4" />
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={editedTransaction.amount}
                onChange={(e) =>
                  updateField('amount', parseFloat(e.target.value) || 0)
                }
                className="font-mono"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="flex items-center gap-2 font-mono text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={editedTransaction.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-mono text-sm font-medium">
              <Tag className="h-4 w-4" />
              Category
            </Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Badge
                  key={cat}
                  variant={
                    editedTransaction.category === cat ? 'default' : 'secondary'
                  }
                  className="cursor-pointer font-mono transition-all hover:scale-105"
                  onClick={() => updateField('category', cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-mono text-sm font-medium">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </Label>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => (
                <Badge
                  key={method}
                  variant={
                    editedTransaction.payment_method === method
                      ? 'default'
                      : 'secondary'
                  }
                  className="cursor-pointer font-mono transition-all hover:scale-105"
                  onClick={() => updateField('payment_method', method)}
                >
                  {method}
                </Badge>
              ))}
            </div>
          </div>

          {/* Summary Preview */}
          <div className="bg-muted/50 border-border rounded-none border-2 p-4">
            <p className="text-muted-foreground mb-2 font-mono text-xs font-semibold tracking-wide uppercase">
              Preview
            </p>
            <p className="font-mono text-sm">
              {editedTransaction.type === 'income' ? '+ ' : '- '}
              <span className="font-bold">
                ${Math.abs(editedTransaction.amount).toFixed(2)}
              </span>
              {' • '}
              {editedTransaction.description}
              {' • '}
              <span className="text-muted-foreground">
                {editedTransaction.category}
              </span>
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="secondary"
            onClick={handleCancel}
            className="font-mono"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAddTransaction(editedTransaction)}
            className="font-mono"
            disabled={
              !editedTransaction.description || editedTransaction.amount === 0
            }
          >
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionDialog;
