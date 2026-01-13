import { GoogleButton } from '@/components/auth';
import ROUTES from '@/constants/ROUTES';
import { getSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const session = await getSession();
  if (session) {
    redirect(ROUTES.WALLET.ROOT);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {/* Content - centered and ultra-minimal */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <h1 className="text-primary mb-4 text-6xl font-bold tracking-tight sm:text-7xl">
          jijiv2
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground mb-8 text-lg font-medium tracking-wide">
          The financial co-pilot.
        </p>

        {/* CTA Button */}
        <div className="mb-4 flex w-full justify-center">
          <GoogleButton />
        </div>

        {/* Legal/info text */}
        <p className="text-muted-foreground/50 mb-12 max-w-xs text-[10px] tracking-wider">
          another thing by{' '}
          <a
            href="https://github.com/gian-gg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary cursor-pointer underline"
          >
            gian-gg
          </a>
        </p>

        {/* Project Badge */}
        <div className="border-border bg-card/20 mb-10 flex flex-col items-center gap-2 border px-8 py-4 text-center">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Core Capabilities
          </span>
          <div className="text-muted-foreground/70 flex flex-col gap-1 text-left text-[10px]">
            <p>• Natural Language Transaction Querying (NL2SQL)</p>
            <p>• Intelligent Expense Extraction & Categorization</p>
            <p>• Dual-Provider Support (OpenRouter + Gemini)</p>
            <p>• Bring Your Own Key (BYOK) Support</p>
            <p>• Privacy-First Local Storage Architecture</p>
          </div>
        </div>

        {/* Credits Pill */}
        <a
          href="https://github.com/gian-gg/jijiv2"
          target="_blank"
          rel="noopener noreferrer"
          className="border-border hover:bg-muted text-muted-foreground flex items-center gap-2 border px-4 py-1.5 text-xs transition-colors"
        >
          <span className="bg-primary size-1.5 rounded-full" />
          Open Source!
        </a>
      </div>
    </div>
  );
}
