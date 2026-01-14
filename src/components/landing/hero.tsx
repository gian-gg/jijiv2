'use client';

import { GoogleButton } from '@/components/auth';

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-12">
      {/* Animated gradient background */}
      <div className="gradient-animated absolute inset-0 -z-10 opacity-60" />
      <div className="bg-dot-pattern absolute inset-0 -z-10 opacity-30" />

      {/* Vignette */}
      <div className="to-background absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Headline with decorative border */}
        <div className="relative mb-6">
          <div className="border-primary/20 relative border p-6">
            <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
              Your Financial Co-Pilot{' '}
              <span className="text-primary">Powered by AI</span>
            </h1>

            {/* Decorative corner brackets */}
            <div className="border-primary absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2" />
            <div className="border-primary absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2" />
            <div className="border-primary absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2" />
            <div className="border-primary absolute -right-2 -bottom-2 h-4 w-4 border-r-2 border-b-2" />
          </div>
        </div>

        {/* Subheadline */}
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm leading-relaxed font-medium sm:text-base">
          Query your expenses in plain English. Get instant insights from your
          transaction history.
        </p>

        {/* CTAs */}
        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <GoogleButton />
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] tracking-widest uppercase">
          <div className="text-muted-foreground/60 flex items-center gap-2">
            <span className="bg-primary size-1" />
            <span>100% Open Source</span>
          </div>
          <div className="text-muted-foreground/60 flex items-center gap-2">
            <span className="bg-primary size-1" />
            <span>Bring Your Own Key</span>
          </div>
          <div className="text-muted-foreground/60 flex items-center gap-2">
            <span className="bg-primary size-1" />
            <span>Dual AI Providers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
