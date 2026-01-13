import { UIMessage } from 'ai';
import { User, Sparkles, Loader2, Check, X } from 'lucide-react';
import { AI_FEEDBACK } from '@/constants/AI';
import { useSettingsStore } from '@/stores';
import { getCurrencySymbol } from '@/constants/SETTINGS';

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message: m }: ChatMessageProps) {
  const currency = useSettingsStore((state) => state.currency);

  return (
    <div
      className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {m.role === 'assistant' && (
        <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
          <Sparkles className="text-primary size-3" />
        </div>
      )}
      <div
        className={`max-w-[80%] space-y-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
      >
        <div
          className={`border p-3 text-sm whitespace-pre-wrap ${
            m.role === 'user'
              ? 'bg-primary border-primary text-primary-foreground'
              : 'bg-card border-border'
          }`}
        >
          {m.parts?.map((part, i) => {
            if (part.type === 'text') {
              return <span key={i}>{part.text}</span>;
            }
            // Skip step-start parts
            if (part.type === 'step-start') {
              return null;
            }
            // Tool invocation parts - type is "tool-{toolName}"
            if (part.type === 'tool-extractTransaction') {
              const toolPart = part as {
                type: string;
                toolCallId: string;
                state?: string;
                input?: {
                  type: string;
                  amount: number;
                  description: string;
                  category: string;
                };
                output?: { success: boolean; message: string };
              };

              // Get a consistent random message based on toolCallId
              const msgIndex = toolPart.toolCallId.charCodeAt(
                toolPart.toolCallId.length - 1
              );

              // Show extracting state when tool is called but no output yet
              if (toolPart.state !== 'output-available' || !toolPart.output) {
                const extractMsg =
                  AI_FEEDBACK.EXTRACTING[
                    msgIndex % AI_FEEDBACK.EXTRACTING.length
                  ];
                return (
                  <span
                    key={i}
                    className="text-muted-foreground flex items-center gap-2"
                  >
                    <Loader2 className="size-3 animate-spin" />
                    {extractMsg}
                  </span>
                );
              }

              // Show result with transaction details
              const { success } = toolPart.output;
              const tx = toolPart.input;

              if (success && tx) {
                const successMsg =
                  AI_FEEDBACK.SUCCESS[msgIndex % AI_FEEDBACK.SUCCESS.length];
                const currencySymbol = getCurrencySymbol(currency);
                const isExpense = tx.type === 'expense';

                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="size-3" />
                      <span>{successMsg}</span>
                    </div>
                    <div className="bg-muted/50 space-y-1 rounded p-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {tx.description}
                        </span>
                        <span
                          className={
                            isExpense ? 'text-red-500' : 'text-green-500'
                          }
                        >
                          {isExpense ? '-' : '+'}
                          {currencySymbol}
                          {tx.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-muted-foreground">{tx.category}</div>
                    </div>
                  </div>
                );
              }

              // Cancelled
              const cancelMsg =
                AI_FEEDBACK.CANCEL[msgIndex % AI_FEEDBACK.CANCEL.length];
              return (
                <div
                  key={i}
                  className="text-muted-foreground flex items-center gap-2"
                >
                  <X className="size-3" />
                  <span>{cancelMsg}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      {m.role === 'user' && (
        <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
          <User className="text-primary size-3" />
        </div>
      )}
    </div>
  );
}
