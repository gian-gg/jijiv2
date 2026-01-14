interface ChatHeaderProps {
  isConfigured: boolean;
  selectedModel: string | null;
}

export function ChatHeader({ isConfigured, selectedModel }: ChatHeaderProps) {
  return (
    <div className="border-border flex items-center gap-3 border-b p-3">
      <div className="flex-1">
        <h3 className="text-sm font-medium">jijiv2</h3>
        <p className="text-muted-foreground text-xs">
          {isConfigured
            ? selectedModel
            : 'Configure API key & model in Settings'}
        </p>
      </div>
    </div>
  );
}
