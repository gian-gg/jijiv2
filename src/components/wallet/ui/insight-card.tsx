interface InsightCardProps {
  title: string;
  description: string;
  variant?: 'success' | 'warning' | 'accent' | 'destructive';
}

export function InsightCard({
  title,
  description,
  variant = 'accent',
}: InsightCardProps) {
  const borderColorMap = {
    success: 'border-success/20 bg-success/5',
    warning: 'border-warning/20 bg-warning/5',
    accent: 'border-accent/20 bg-accent/5',
    destructive: 'border-destructive/20 bg-destructive/5',
  };

  return (
    <div className={`border-l-4 p-3 ${borderColorMap[variant]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 text-xs">{description}</p>
    </div>
  );
}
