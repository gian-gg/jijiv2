'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ACTIONS } from '@/constants/TRANSACTIONS';
import { AI_ERROR_TYPES, AI_MESSAGES } from '@/constants/AI';
import { getAIErrorMessage } from '@/lib/helpers/ai';
import type { Message } from '@/types/home';
import { Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { extractTransaction } from '@/lib/ai/transaction';
import { useSettingsStore, useChatStore } from '@/stores';
import { NewTransactionDialog } from '@/components/wallet/home';
import { type Transaction } from '@/types/transactions';

export function AiChat() {
  const apiKey = useSettingsStore((state) => state.apiKey);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Transaction dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);

  const isConfigured = Boolean(apiKey && selectedModel);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isConfigured) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const result = await extractTransaction(input, apiKey, selectedModel!);

      if (result.success && result.data) {
        // Open the confirmation dialog
        setCurrentTransaction(result.data);
        setDialogOpen(true);
      } else {
        // Handle error
        const errorType = result.type || AI_ERROR_TYPES.UNKNOWN;
        addMessage(getAIErrorMessage(errorType));
      }
    } catch (error) {
      console.error('Extraction error:', error);
      addMessage(AI_MESSAGES.ERROR());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NewTransactionDialog
        currentTransaction={currentTransaction}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <div className="bg-background/40 border-border flex flex-1 flex-col overflow-hidden border">
        {/* Chat Header */}
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

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
                    <Sparkles className="text-primary size-3" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] space-y-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`border p-3 text-sm whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-card border-border'
                    }`}
                  >
                    {message.content}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
                    <User className="text-primary size-3" />
                  </div>
                )}
              </div>
            ))}
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
                  <Sparkles className="text-primary size-3 animate-pulse" />
                </div>
                <div className="bg-card border-border border p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      Analyzing
                    </span>
                    <div className="flex gap-1">
                      <span
                        className="bg-primary size-1.5 animate-bounce rounded-full"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="bg-primary size-1.5 animate-bounce rounded-full"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="bg-primary size-1.5 animate-bounce rounded-full"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <div className="border-border border-t p-3">
          {/* Quick Actions */}
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((action) => (
              <Button
                key={action}
                variant="outline"
                size="sm"
                onClick={() => setInput(action)}
                disabled={!isConfigured}
                className="text-muted-foreground hover:text-foreground hover:border-primary/30 h-7 text-xs transition-all"
              >
                {action}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !input.trim() || !isConfigured}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
