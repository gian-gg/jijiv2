interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
