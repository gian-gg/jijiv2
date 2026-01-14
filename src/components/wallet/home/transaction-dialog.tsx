'use client';
import { useEffect, useState } from 'react';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CATEGORIES,
  DEFAULT_TRANSACTION,
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
} from '@/constants/TRANSACTIONS';

import { getCurrencySymbol } from '@/constants/SETTINGS';
import useSettingsStore from '@/stores/useSettingsStore';
import type { Transaction } from '@/types/transactions';
import { Loader2, Trash2 } from 'lucide-react';

export type TransactionDialogMode = 'new' | 'edit';

const TransactionDialog = ({
  open,
  onOpenChange,
  transaction,
  mode,
  onSave,
  onDelete,
  onConfirm,
  onCancel,
  isSaving: externalIsSaving = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null | undefined;
  mode: TransactionDialogMode;
  onSave?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
  onConfirm?: (transaction: Transaction) => void;
  onCancel?: () => void;
  isSaving?: boolean;
}) => {
  const currency = useSettingsStore((state) => state.currency);
  const currencySymbol = getCurrencySymbol(currency);

  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(null);
  const [isInternalSaving, setIsInternalSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [confirmingUpdate, setConfirmingUpdate] = useState(false);

  // Combined saving state (internal or external)
  const isSaving = isInternalSaving || externalIsSaving;

  useEffect(() => {
    if (transaction) setEditedTransaction({ ...transaction });
  }, [transaction]);

  if (!transaction || !editedTransaction) return null;

  const isEditMode = mode === 'edit';
  const hasChanges =
    transaction.type !== editedTransaction.type ||
    transaction.amount !== editedTransaction.amount ||
    transaction.description !== editedTransaction.description ||
    transaction.date !== editedTransaction.date ||
    transaction.category !== editedTransaction.category ||
    transaction.paymentMethod !== editedTransaction.paymentMethod;

  const handleSave = async (res: Transaction) => {
    setIsInternalSaving(true);

    const transactionData: Transaction = {
      description: res.description,
      amount: res.amount,
      date: res.date,
      type: res.type ?? DEFAULT_TRANSACTION.type,
      category: res.category ?? DEFAULT_TRANSACTION.category,
      paymentMethod: res.paymentMethod ?? DEFAULT_TRANSACTION.paymentMethod,
    };

    if (isEditMode) {
      onSave?.(res);
      onOpenChange(false);
    } else if (onConfirm) {
      // Don't close dialog - parent will close after async operation completes
      onConfirm(transactionData);
    }

    setIsInternalSaving(false);
  };

  const handleDelete = () => {
    if (!editedTransaction.id) return;
    setIsDeleting(true);
    onDelete?.(editedTransaction.id);
    setIsDeleting(false);
    setConfirmingDelete(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (confirmingDelete) {
      setConfirmingDelete(false);
      return;
    }
    if (confirmingUpdate) {
      setConfirmingUpdate(false);
      return;
    }
    if (onCancel) onCancel();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            {isEditMode ? 'Edit Transaction' : 'New Transaction'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the transaction details below.'
              : 'Review and adjust the details below.'}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Transaction Type - Tabs Style */}
          <div className="bg-muted grid grid-cols-2 gap-2 rounded-lg p-1">
            {TRANSACTION_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={
                  editedTransaction.type === type.value ? 'default' : 'ghost'
                }
                className={`h-9 shadow-none transition-all ${
                  editedTransaction.type === type.value
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
                onClick={() => updateField('type', type.value)}
                disabled={isSaving || isDeleting}
              >
                {type.icon}
                <span className="ml-2 text-sm">{type.label}</span>
              </Button>
            ))}
          </div>

          {/* Amount and Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                  {currencySymbol}
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editedTransaction.amount || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateField('amount', val === '' ? 0 : parseFloat(val));
                  }}
                  className="text-primary focus-visible:ring-primary pl-7 font-mono text-lg font-semibold"
                  placeholder="0.00"
                  disabled={isSaving || isDeleting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={editedTransaction.date}
                onChange={(e) => updateField('date', e.target.value)}
                disabled={isSaving || isDeleting}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={editedTransaction.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="What is this for?"
              disabled={isSaving || isDeleting}
              className="focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Category Select */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={editedTransaction.category}
                onValueChange={(val) => updateField('category', val)}
                disabled={isSaving || isDeleting}
              >
                <SelectTrigger className="focus:ring-primary w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method Select */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select
                value={editedTransaction.paymentMethod || 'Cash'}
                onValueChange={(val) => updateField('paymentMethod', val)}
                disabled={isSaving || isDeleting}
              >
                <SelectTrigger className="focus:ring-primary w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 flex-col gap-2 sm:flex-row">
          {/* Confirmation mode for delete */}
          {confirmingDelete ? (
            <div className="flex w-full flex-col gap-3">
              <p className="text-destructive text-center text-sm font-medium">
                Are you sure you want to delete this transaction?
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmingDelete(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Confirm Delete
                </Button>
              </div>
            </div>
          ) : confirmingUpdate ? (
            <div className="flex w-full flex-col gap-3">
              <p className="text-primary text-center text-sm font-medium">
                Save changes to this transaction?
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmingUpdate(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSave(editedTransaction)}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Confirm Update
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Delete button - only in edit mode */}
              {isEditMode && onDelete && (
                <Button
                  variant="destructive"
                  onClick={() => setConfirmingDelete(true)}
                  disabled={isSaving || isDeleting}
                  className="order-last w-full sm:order-first sm:mr-auto sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}

              <div className="flex w-full gap-2 sm:w-auto">
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isSaving || isDeleting}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    isEditMode
                      ? setConfirmingUpdate(true)
                      : handleSave(editedTransaction)
                  }
                  className="min-w-[100px] flex-1 sm:flex-none"
                  disabled={
                    isSaving ||
                    isDeleting ||
                    !editedTransaction.description ||
                    editedTransaction.amount === 0 ||
                    (isEditMode && !hasChanges)
                  }
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : isEditMode ? (
                    'Update'
                  ) : (
                    'Add'
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
