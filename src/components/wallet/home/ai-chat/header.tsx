import { Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  isConfigured: boolean;
  selectedModel: string | null;
}

export function ChatHeader({ isConfigured, selectedModel }: ChatHeaderProps) {
  return (
    <div className="border-border flex items-center gap-3 border-b p-3">
      <div className="bg-primary/10 border-primary/20 flex size-8 items-center justify-center border">
        <Sparkles className="text-primary size-4" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium">jiji</h3>
        <p className="text-muted-foreground text-xs">
          {isConfigured
            ? selectedModel
            : 'Configure API key & model in Settings'}
        </p>
      </div>
    </div>
  );
}
