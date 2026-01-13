import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Square } from 'lucide-react';
import { useMemo } from 'react';
import { useSettingsStore } from '@/stores';
import { getDynamicSuggestions } from '@/lib/helpers/suggestions';

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
  const currency = useSettingsStore((state) => state.currency);

  // Generate dynamic suggestions based on time and currency
  const suggestions = useMemo(
    () => getDynamicSuggestions(currency),
    [currency]
  );

  return (
    <div className="border-border border-t p-3">
      {/* Quick Actions */}
      <div className="mb-3 flex flex-wrap gap-2">
        {suggestions.map((action) => (
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
