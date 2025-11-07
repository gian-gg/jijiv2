'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { parseFinancePrompt } from '@/lib/gemini/wallet';
import type { Transaction } from '@/types/transactions';

export function AiInput(props: {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await parseFinancePrompt(query);
    if (res && res.description && res.amount) {
      props.setTransactions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          description: res.description,
          amount: res.amount,
          date: new Date().toISOString().split('T')[0],
          type: res.type ?? 'expense',
          category: res.category ?? 'Other',
          payment_method: res.payment_method ?? 'Unknown',
        },
      ]);
    }
    console.log(res);
    setQuery('');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {['coffee $5', 'uber $15'].map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => setQuery(suggestion)}
            className="text-muted-foreground hover:text-foreground hover:border-primary/30 h-7 text-xs transition-all"
          >
            {suggestion}
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-background/40 border-border hover:border-primary/30 focus-within:glow-purple focus-within:border-primary/50 group flex items-center gap-2 border p-3 shadow-sm transition-all duration-300">
          <div className="bg-primary/10 border-primary/20 group-focus-within:border-primary/40 flex h-8 w-8 flex-shrink-0 items-center justify-center border transition-colors">
            <Sparkles className="text-primary h-4 w-4" />
          </div>

          <Input
            type="text"
            placeholder='e.g. "coffee for $5"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Button type="submit" size="sm" className="flex-shrink-0">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
