'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ACTIONS } from '@/constants/TRANSACTIONS';
import { useSettingsStore } from '@/stores';
import { Send, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export function AiChat() {
  const apiKey = useSettingsStore((state) => state.apiKey);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const [input, setInput] = useState('');

  const apiKeyRef = useRef(apiKey);
  const modelRef = useRef(selectedModel);

  useEffect(() => {
    apiKeyRef.current = apiKey;
    modelRef.current = selectedModel;
  }, [apiKey, selectedModel]);

  const { messages, status, error, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: () => ({
        apiKey: apiKeyRef.current,
        modelId: modelRef.current,
      }),
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const isConfigured = Boolean(apiKey && selectedModel);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !isConfigured) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <>
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
            {messages.map((m) => (
              <div key={m.id}>
                <strong>{m.role}:</strong>
                {m.parts.map((part, i) =>
                  part.type === 'text' ? <span key={i}>{part.text}</span> : null
                )}
              </div>
            ))}
          </div>
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
