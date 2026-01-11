'use server';

import { sessionGuard } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { transaction } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';

import type { Transaction } from '@/types/transactions';

export async function createTransaction(data: Transaction) {
  try {
    const session = await sessionGuard();

    const result = await db.insert(transaction).values({
      id: data.id ?? crypto.randomUUID(),
      type: data.type,
      category: data.category,
      amount: String(data.amount),
      description: data.description,
      date: data.date,
      paymentMethod: data.paymentMethod,
      userId: session.user.id,
    });

    revalidatePath('/wallet');
    revalidatePath('/wallet/transactions');

    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating transaction:', error);

    return { success: false, error };
  }
}
