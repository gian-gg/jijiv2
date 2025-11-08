'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewTransactionDialog } from '@/components/wallet/home';
import {
  AI_CONSTANT_MESSAGES,
  DEFAULT_TRANSACTION,
  QUICK_ACTIONS,
} from '@/constants/TRANSACTIONS';
import { parseFinancePrompt } from '@/lib/gemini/wallet';
import type { Message } from '@/types/home';
import type { Transaction } from '@/types/transactions';
import { Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AiChatProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export function AiChat({ transactions, setTransactions }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    AI_CONSTANT_MESSAGES['FIRST_MESSAGE'],
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await parseFinancePrompt(input);

      if (res && res.description && res.amount) {
        setCurrentTransaction({
          id: transactions.length + 1,
          description: res.description,
          amount: res.amount,
          date: new Date().toISOString().split('T')[0],
          type: res.type ?? DEFAULT_TRANSACTION.type,
          category: res.category ?? DEFAULT_TRANSACTION.category,
          payment_method:
            res.payment_method ?? DEFAULT_TRANSACTION.payment_method,
        });
      } else {
        // Generic response if can't parse
        setMessages((prev) => [...prev, AI_CONSTANT_MESSAGES['CANNOT_PARSE']]);
      }
    } catch (error) {
      // Generic error message
      setMessages((prev) => [...prev, AI_CONSTANT_MESSAGES['ERROR_MESSAGE']]);
    } finally {
      setIsLoading(false);
      setDialogOpen(true);
    }
  };

  return (
    <>
      <NewTransactionDialog
        transaction={currentTransaction}
        setTransactions={setTransactions}
        setMessages={setMessages}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <div className="bg-background/40 border-border flex flex-1 flex-col overflow-hidden border">
        {/* Chat Header */}
        <div className="border-border flex items-center gap-3 border-b p-3">
          <div className="bg-primary/10 border-primary/20 flex size-8 items-center justify-center border">
            <Sparkles className="text-primary size-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium">jiji</h3>
            <p className="text-muted-foreground text-xs">
              Add transactions or ask questions
            </p>
          </div>
        </div>

        {/* Messages */}
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
                    className={`border p-3 text-sm ${
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
            {isLoading && (
              <div className="flex gap-3">
                <div className="bg-primary/10 border-primary/20 flex size-8 flex-shrink-0 items-center justify-center border">
                  <Sparkles className="text-primary size-3 animate-pulse" />
                </div>
                <div className="bg-card border-border border p-3">
                  <div className="flex gap-1">
                    <div className="bg-muted-foreground size-2 animate-bounce rounded-full" />
                    <div
                      className="bg-muted-foreground size-2 animate-bounce rounded-full"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="bg-muted-foreground size-2 animate-bounce rounded-full"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-border border-t p-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((action) => (
              <Button
                key={action}
                variant="outline"
                size="sm"
                onClick={() => setInput(action)}
                className="text-muted-foreground hover:text-foreground hover:border-primary/30 h-7 text-xs transition-all"
              >
                {action}
              </Button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder='e.g. "coffee for $5"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !input.trim()}
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
