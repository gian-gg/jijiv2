import { Sparkles } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
        <Sparkles className="text-primary size-3 animate-pulse" />
      </div>
      <div className="bg-card border-border border p-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Thinking</span>
          <div className="flex gap-1">
            <span
              className="bg-primary size-1.5 animate-bounce rounded-full"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="bg-primary size-1.5 animate-bounce rounded-full"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="bg-primary size-1.5 animate-bounce rounded-full"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
