const stats = [
  {
    label: 'BYOK',
    description: 'Bring Your Own Key',
  },
  {
    label: 'Dual Providers',
    description: 'OpenRouter + Gemini support',
  },
];

export function Stats() {
  return (
    <section className="relative w-full px-6 py-20">
      {/* Dark background band */}
      <div className="bg-card absolute inset-0 -z-10" />
      <div className="border-border absolute inset-x-0 top-0 border-t" />
      <div className="border-border absolute inset-x-0 bottom-0 border-b" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-primary mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {stat.label}
              </div>
              <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
