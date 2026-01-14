import { GlassCard } from '@/components/ui/backgrounds';

const steps = [
  {
    number: '01',
    title: 'Connect Your AI',
    description:
      'Bring your OpenRouter or Gemini API key. Keys are stored securely on your device only.',
  },
  {
    number: '02',
    title: 'Add Transactions',
    description:
      'Describe your transactions in plain English. The AI handles the details.',
  },
  {
    number: '03',
    title: 'Query & Analyze',
    description:
      'Ask questions in plain English. Get instant insights from your spending.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative w-full px-6 py-16 md:py-20">
      <div className="mx-auto w-full max-w-5xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
            Get started in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <GlassCard className="group hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  {/* Step number */}
                  <div className="text-primary/30 shrink-0 text-4xl leading-none font-bold sm:text-5xl">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold tracking-wide sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner brackets */}
                <div className="border-primary/50 absolute -top-1 -left-1 h-3 w-3 border-t border-l opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="border-primary/50 absolute -top-1 -right-1 h-3 w-3 border-t border-r opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="border-primary/50 absolute -bottom-1 -left-1 h-3 w-3 border-b border-l opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="border-primary/50 absolute -right-1 -bottom-1 h-3 w-3 border-r border-b opacity-0 transition-opacity group-hover:opacity-100" />
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
