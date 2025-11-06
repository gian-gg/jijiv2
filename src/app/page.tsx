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
    <div className="bg-background relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* Hero gradient background */}
      <div className="gradient-purple-mesh pointer-events-none absolute inset-0 opacity-40" />
      <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-30" />
      <div className="to-background pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
        <MadeWith />
      </div>
    </div>
  );
}
