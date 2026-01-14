import { getSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import ROUTES from '@/constants/ROUTES';
import { Hero, Features, HowItWorks, Footer } from '@/components/landing';

export default async function LandingPage() {
  const session = await getSession();
  if (session) {
    redirect(ROUTES.WALLET.ROOT);
  }

  return (
    <main className="relative w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
