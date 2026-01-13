import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ACTIONS } from '@/constants/TRANSACTIONS';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  isConfigured: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
}

export function ChatInput({
  input,
  setInput,
  isLoading,
  isConfigured,
  onSubmit,
  onStop,
}: ChatInputProps) {
  return (
    <div className="border-border border-t p-3">
      {/* Quick Actions */}
      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <Button
            key={action}
            variant="outline"
            size="sm"
            onClick={() => setInput(action)}
            disabled={!isConfigured || isLoading}
            className="text-muted-foreground hover:text-foreground hover:border-primary/30 h-7 text-xs transition-all"
          >
            {action}
          </Button>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={
              isConfigured
                ? 'e.g. "coffee for $5"'
                : 'Configure API key & model first...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !isConfigured}
            className="flex-1 text-sm"
          />
          {isLoading ? (
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={onStop}
              title="Stop generating"
            >
              <Square className="size-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || !isConfigured}
            >
              <Send className="size-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
