'use server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function sessionGuard() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return session;
}
