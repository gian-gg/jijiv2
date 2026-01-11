'use server';

import { sessionGuard } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { transaction } from '@/lib/db/schema';
import { and, asc, desc, eq, ilike, or, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import type { Transaction } from '@/types/transactions';

export async function createTransaction(data: Transaction) {
  try {
    const session = await sessionGuard();

    const result = await db
      .insert(transaction)
      .values({
        id: data.id ?? crypto.randomUUID(),
        type: data.type,
        category: data.category,
        amount: String(data.amount),
        description: data.description,
        date: data.date,
        paymentMethod: data.paymentMethod,
        userId: session.user.id,
      })
      .returning();

    revalidatePath('/wallet');
    revalidatePath('/wallet/transactions');

    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating transaction:', error);

    return { success: false, error };
  }
}

export async function getFinancialStats() {
  try {
    const session = await sessionGuard();

    const transactions = await db
      .select()
      .from(transaction)
      .where(eq(transaction.userId, session.user.id));

    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      success: true,
      data: {
        income,
        expenses,
        balance: income - expenses,
        transactionCount: transactions.length,
      },
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { success: false, error };
  }
}

export async function getTransactions(
  params: {
    search?: string;
    sort?: string; // 'date-desc', 'date-asc', 'amount-desc', 'amount-asc'
    filter?: string; // 'all', 'income', 'expense'
    page?: number;
    limit?: number;
  } = {}
) {
  try {
    const session = await sessionGuard();
    const {
      search,
      sort = 'date-desc',
      filter = 'all',
      page = 1,
      limit = 50,
    } = params;

    // Build conditions
    const conditions = [eq(transaction.userId, session.user.id)];

    if (search) {
      conditions.push(
        or(
          ilike(transaction.description, `%${search}%`),
          ilike(transaction.category, `%${search}%`)
        )!
      );
    }

    if (filter !== 'all') {
      conditions.push(eq(transaction.type, filter as 'income' | 'expense'));
    }

    // Build order by
    let orderBy;
    switch (sort) {
      case 'date-asc':
        orderBy = asc(transaction.date);
        break;
      case 'amount-desc':
        orderBy = desc(sql`CAST(${transaction.amount} AS DECIMAL)`);
        break;
      case 'amount-asc':
        orderBy = asc(sql`CAST(${transaction.amount} AS DECIMAL)`);
        break;
      case 'date-desc':
      default:
        orderBy = desc(transaction.date);
    }

    // Calculate total count for pagination
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(transaction)
      .where(and(...conditions));

    const totalCount = Number(totalCountResult[0]?.count || 0);

    const data = await db
      .select()
      .from(transaction)
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset((page - 1) * limit);

    const formattedData = data.map((t) => ({
      ...t,
      amount: Number(t.amount),
      paymentMethod: t.paymentMethod || 'Cash', // Default to 'Cash' if null
    }));

    return {
      success: true,
      data: formattedData,
      pagination: {
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        page,
        limit,
      },
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { success: false, error };
  }
}
