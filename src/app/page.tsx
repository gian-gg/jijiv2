import { LoginForm } from '@/components/auth';
import { Watermark } from '@/components/core';
import ROUTES from '@/constants/ROUTES';
import { getSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect(ROUTES.WALLET.ROOT);
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <LoginForm />
      <Watermark />
    </div>
  );
}
