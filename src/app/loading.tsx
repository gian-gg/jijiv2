export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-8 text-center">
        {/* Loading Visual */}
        <div className="relative">
          {/* Bordered container */}
          <div className="border-primary/20 relative border p-8">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-foreground text-2xl font-bold tracking-tight">
                Loading
              </h2>
              <div className="flex gap-2">
                <span className="bg-primary size-2 animate-bounce [animation-delay:0ms]" />
                <span className="bg-primary size-2 animate-bounce [animation-delay:150ms]" />
                <span className="bg-primary size-2 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>

            {/* Decorative corner brackets */}
            <div className="border-primary absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2" />
            <div className="border-primary absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2" />
            <div className="border-primary absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2" />
            <div className="border-primary absolute -right-2 -bottom-2 h-4 w-4 border-r-2 border-b-2" />
          </div>
        </div>

        <p className="text-muted-foreground text-sm">
          Please wait while we load your content...
        </p>
      </div>

      {/* Background decorative elements */}
      <div className="border-primary/10 pointer-events-none absolute top-20 left-10 h-32 w-32 border opacity-30" />
      <div className="border-primary/10 pointer-events-none absolute right-10 bottom-20 h-24 w-24 border opacity-30" />
    </div>
  );
}
