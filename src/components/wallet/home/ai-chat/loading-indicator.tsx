export function LoadingIndicator() {
  return (
    <div className="flex flex-col items-start gap-1">
      {/* Role label */}
      <span className="text-muted-foreground px-1 text-[10px] font-medium tracking-wider uppercase">
        jijiv2
      </span>

      <div className="bg-card border-border max-w-[80%] border p-3">
        <div className="flex items-center gap-3">
          {/* Animated dots with wave effect */}
          <div className="flex gap-1.5">
            <span
              className="bg-primary size-2 animate-bounce rounded-full"
              style={{ animationDelay: '0ms', animationDuration: '1s' }}
            />
            <span
              className="bg-primary size-2 animate-bounce rounded-full"
              style={{ animationDelay: '150ms', animationDuration: '1s' }}
            />
            <span
              className="bg-primary size-2 animate-bounce rounded-full"
              style={{ animationDelay: '300ms', animationDuration: '1s' }}
            />
          </div>

          {/* Shimmer text */}
          <span className="text-muted-foreground animate-pulse text-sm">
            Thinking...
          </span>
        </div>
      </div>
    </div>
  );
}
