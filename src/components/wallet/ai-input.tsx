'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { parseFinancePrompt } from '@/lib/gemini/wallet';
import type { Transaction } from '@/type';

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
      <form onSubmit={handleSubmit}>
        <div className="bg-card flex items-center gap-3 rounded-lg border p-3">
          <Sparkles className="text-muted-foreground h-5 w-5 flex-shrink-0" />

          <Input
            type="text"
            placeholder='Add transaction or ask a question... e.g. "coffee for $5"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Button type="submit" size="sm">
            Submit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {[
          'coffee for $5',
          'uber ride for $15',
          'Show spending trends',
          'Monthly budget analysis',
        ].map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => setQuery(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
