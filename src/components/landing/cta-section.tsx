'use client';

import { GoogleButton } from '@/components/auth';

export function CtaSection() {
  return (
    <section className="relative w-full px-6 py-24 md:py-32">
      {/* Gradient accent background */}
      <div className="gradient-purple-mesh absolute inset-0 -z-10 opacity-40" />
      <div className="bg-dot-pattern absolute inset-0 -z-10 opacity-20" />

      <div className="mx-auto w-full max-w-3xl text-center">
        {/* Headline */}
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Take Control?
        </h2>

        {/* Subheadline */}
        <p className="text-muted-foreground mb-8 text-base sm:text-lg">
          Start using jijiv2 today. No credit card required.
        </p>

        {/* CTA */}
        <div className="mb-8 flex justify-center">
          <GoogleButton />
        </div>

        {/* Trust badges */}
        <div className="text-muted-foreground/60 flex flex-wrap items-center justify-center gap-4 text-xs tracking-widest uppercase">
          <span>Open Source</span>
          <span className="bg-muted-foreground/60 size-1" />
          <span>Bring Your Own Key</span>
          <span className="bg-muted-foreground/60 size-1" />
          <span>AI Powered</span>
        </div>
      </div>
    </section>
  );
}
