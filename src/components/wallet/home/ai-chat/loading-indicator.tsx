export function LoadingIndicator() {
  return (
    <div className="flex flex-col items-start gap-1">
      {/* Role label */}
      <span className="text-muted-foreground px-1 text-[10px] font-medium tracking-wider uppercase">
        jijiv2
      </span>

      <div className="bg-card border-border max-w-[80%] border p-2 md:p-3">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Animated dots with wave effect */}
          <div className="flex gap-1">
            <span
              className="bg-primary size-1.5 animate-bounce rounded-full md:size-2"
              style={{ animationDelay: '0ms', animationDuration: '1s' }}
            />
            <span
              className="bg-primary size-1.5 animate-bounce rounded-full md:size-2"
              style={{ animationDelay: '150ms', animationDuration: '1s' }}
            />
            <span
              className="bg-primary size-1.5 animate-bounce rounded-full md:size-2"
              style={{ animationDelay: '300ms', animationDuration: '1s' }}
            />
          </div>

          {/* Shimmer text */}
          <span className="text-muted-foreground animate-pulse text-xs md:text-sm">
            Thinking...
          </span>
        </div>
      </div>
    </div>
  );
}
