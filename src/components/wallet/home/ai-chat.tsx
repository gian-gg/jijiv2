'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ACTIONS } from '@/constants/TRANSACTIONS';
import { AI_ERROR_TYPES, AI_MESSAGES, type AIErrorType } from '@/constants/AI';
import type { Message } from '@/types/home';
import { Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { generateText } from '@/lib/ai';
import { useSettingsStore } from '@/stores';
import { readStreamableValue } from '@ai-sdk/rsc';

export function AiChat() {
  const apiKey = useSettingsStore((state) => state.apiKey);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const [messages, setMessages] = useState<Message[]>([
    AI_MESSAGES.FIRST_MESSAGE(),
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isConfigured = Boolean(apiKey && selectedModel);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getErrorMessage = (errorType: AIErrorType): Message => {
    switch (errorType) {
      case AI_ERROR_TYPES.RATE_LIMITED:
        return AI_MESSAGES.RATE_LIMITED();
      case AI_ERROR_TYPES.INVALID_API_KEY:
        return AI_MESSAGES.INVALID_API_KEY();
      case AI_ERROR_TYPES.INSUFFICIENT_CREDITS:
        return AI_MESSAGES.INSUFFICIENT_CREDITS();
      case AI_ERROR_TYPES.MODEL_UNAVAILABLE:
        return AI_MESSAGES.MODEL_UNAVAILABLE();
      default:
        return AI_MESSAGES.ERROR();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isConfigured) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create a placeholder for the assistant's message
    const assistantId = Date.now() + 1;
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    try {
      const { output } = await generateText(selectedModel!, apiKey, input);

      // Add the empty assistant message to the state
      setMessages((prev) => [...prev, assistantMessage]);

      // Read the streamable value chunk by chunk
      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: msg.content + delta }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);

      // Parse error type from the error
      const errorType =
        error instanceof Error && 'type' in error
          ? (error as { type: AIErrorType }).type
          : AI_ERROR_TYPES.UNKNOWN;

      setMessages((prev) => [...prev, getErrorMessage(errorType)]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                  {/* Show cursor while loading the last message */}
                  {isLoading &&
                    message.id === messages[messages.length - 1].id && (
                      <span className="bg-primary ml-1 inline-block h-4 w-1 animate-pulse align-middle" />
                    )}
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
  );
}
