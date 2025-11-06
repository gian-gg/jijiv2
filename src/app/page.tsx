import { LoginForm } from '@/components/auth/form';
import { getSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import MadeWith from '@/components/core/made-with';
import ROUTES from '@/constants/ROUTES';

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect(ROUTES.WALLET.ROOT);
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
        <MadeWith />
      </div>
    </div>
  );
}
