import { Loader2, Check, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolStatusProps {
  state: 'loading' | 'success' | 'error' | 'cancelled';
  message: string;
  icon?: LucideIcon;
  className?: string;
}

export function ToolStatus({
  state,
  message,
  icon: Icon,
  className,
}: ToolStatusProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all duration-300 md:gap-2.5 md:px-3 md:py-2 md:text-xs',
        state === 'loading' && 'bg-muted/50 text-muted-foreground',
        state === 'success' &&
          'bg-green-500/10 text-green-600 dark:text-green-400',
        state === 'error' && 'bg-red-500/10 text-red-600 dark:text-red-400',
        state === 'cancelled' && 'bg-muted text-muted-foreground opacity-70',
        className
      )}
    >
      {state === 'loading' ? (
        <Loader2 className="size-3 animate-spin md:size-3.5" />
      ) : Icon ? (
        <Icon className="size-3 md:size-3.5" />
      ) : state === 'success' ? (
        <Check className="size-3 md:size-3.5" />
      ) : null}

      <span className="truncate">{message}</span>
    </div>
  );
}
