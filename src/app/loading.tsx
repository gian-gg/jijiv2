export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Loading
          </h2>
          <div className="flex gap-1">
            <span className="bg-primary h-1 w-1 animate-bounce [animation-delay:0ms]" />
            <span className="bg-primary h-1 w-1 animate-bounce [animation-delay:150ms]" />
            <span className="bg-primary h-1 w-1 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>

      {/* Background decorative elements matching layout */}
      <div className="border-primary/10 pointer-events-none absolute top-20 left-10 h-32 w-32 border opacity-50" />
      <div className="border-primary/10 pointer-events-none absolute right-10 bottom-20 h-24 w-24 border opacity-50" />
    </div>
  );
}
