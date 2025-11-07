import { ReactNode } from 'react';

interface ScrollableContentProps {
  children: ReactNode;
  className?: string;
}

export function ScrollableContent({
  children,
  className,
}: ScrollableContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
      <div className={`flex flex-col gap-3 ${className || ''}`}>{children}</div>
    </div>
  );
}
