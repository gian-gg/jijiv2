import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  valueClassName?: string;
  icon?: ReactNode;
}

export function StatCard({
  label,
  value,
  description,
  badge,
  valueClassName,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-background/40 border-border relative overflow-hidden border p-3">
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase md:text-xs">
            {label}
          </span>
          {icon && (
            <div className="flex size-6 items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        <div
          className={`text-lg leading-none font-bold tabular-nums ${valueClassName || ''}`}
        >
          {value}
        </div>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
        {badge && (
          <div className="flex items-center gap-1">
            <Badge
              variant={badge.variant || 'secondary'}
              className={`text-xs ${badge.className || ''}`}
            >
              {badge.text}
            </Badge>
            <span className="text-muted-foreground text-xs">
              vs last period
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
