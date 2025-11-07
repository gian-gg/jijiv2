import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  className?: string;
}

export function EmptyState({ icon, message, className }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${className || ''}`}
    >
      {icon || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground mb-4"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )}
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
