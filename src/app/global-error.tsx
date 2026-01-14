'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ROUTES from '@/constants/ROUTES';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
          <div className="flex max-w-md flex-col items-center gap-8 text-center">
            {/* Error Visual */}
            <div className="relative">
              {/* Large error code */}
              <div className="border-primary/20 relative border p-8">
                <h1 className="text-primary font-mono text-6xl font-bold tracking-tighter tabular-nums">
                  500
                </h1>

                {/* Decorative corner brackets */}
                <div className="border-primary absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2" />
                <div className="border-primary absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2" />
                <div className="border-primary absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2" />
                <div className="border-primary absolute -right-2 -bottom-2 h-4 w-4 border-r-2 border-b-2" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <h2 className="text-foreground text-2xl font-bold tracking-tight">
                Critical Error
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A critical error occurred. Please try refreshing the page.
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={reset} className="w-full sm:w-auto">
                Try Again
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={ROUTES.ROOT}>Go Home</Link>
              </Button>
            </div>

            {/* Error code detail */}
            {error.digest && (
              <div className="bg-muted/30 border-border mt-4 border p-3">
                <code className="text-muted-foreground font-mono text-xs">
                  ERROR_DIGEST: {error.digest}
                </code>
              </div>
            )}
          </div>

          {/* Background decorative elements */}
          <div className="border-primary/10 pointer-events-none absolute top-20 left-10 h-32 w-32 border opacity-30" />
          <div className="border-primary/10 pointer-events-none absolute right-10 bottom-20 h-24 w-24 border opacity-30" />
        </div>
      </body>
    </html>
  );
}
