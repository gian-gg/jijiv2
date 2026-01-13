'use client';

import { Transaction, useSettingsStore } from '@/stores';
import { useEffect, useRef, useState } from 'react';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import TransactionDialog from '@/components/wallet/home/transaction-dialog';
import { createTransaction } from '@/lib/db/transactions';
import { ChatHeader } from '@/components/wallet/home/ai-chat/header';
import { MessageList } from '@/components/wallet/home/ai-chat/message-list';
import { ChatInput } from '@/components/wallet/home/ai-chat/chat-input';

export function AiChat() {
  const apiKey = useSettingsStore((state) => state.apiKey);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const [input, setInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [pendingToolCall, setPendingToolCall] = useState<{
    toolCallId: string;
    transaction: Transaction;
  } | null>(null);

  // Refs for stable references
  const apiKeyRef = useRef(apiKey);
  const modelRef = useRef(selectedModel);

  const { messages, status, sendMessage, addToolOutput } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: () => ({
        apiKey: apiKeyRef.current,
        modelId: modelRef.current,
      }),
    }),
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === 'extractTransaction') {
        setPendingToolCall({
          toolCallId: toolCall.toolCallId,
          transaction: toolCall.input as Transaction,
        });
      }
    },
  });

  // Update refs on change
  useEffect(() => {
    apiKeyRef.current = apiKey;
    modelRef.current = selectedModel;
  }, [apiKey, selectedModel]);

  const isLoading = status === 'submitted' || status === 'streaming';
  const isConfigured = Boolean(apiKey && selectedModel);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !isConfigured || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleConfirm = async (transaction: Transaction) => {
    setIsSaving(true);
    const res = await createTransaction(transaction);
    if (!res.success) {
      addToolOutput({
        tool: 'extractTransaction',
        toolCallId: pendingToolCall!.toolCallId,
        state: 'output-error',
        errorText: 'Transaction failed to save',
      });
      setIsSaving(false);
      setPendingToolCall(null);
      return;
    }
    addToolOutput({
      tool: 'extractTransaction',
      toolCallId: pendingToolCall!.toolCallId,
      output: { success: true, message: 'Transaction added!' },
    });
    setIsSaving(false);
    setPendingToolCall(null);
  };

  const handleCancel = () => {
    addToolOutput({
      tool: 'extractTransaction',
      toolCallId: pendingToolCall!.toolCallId,
      output: { success: false, message: 'Transaction cancelled' },
    });
    setPendingToolCall(null);
  };

  return (
    <>
      <TransactionDialog
        transaction={pendingToolCall?.transaction ?? null}
        open={!!pendingToolCall}
        onOpenChange={(open) => {
          if (!open && !isSaving) setPendingToolCall(null);
        }}
        mode="new"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isSaving={isSaving}
      />

      <div className="bg-background/40 border-border flex flex-1 flex-col overflow-hidden border">
        <ChatHeader isConfigured={isConfigured} selectedModel={selectedModel} />

        <MessageList messages={messages} isLoading={status === 'submitted'} />

        <ChatInput
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          isConfigured={isConfigured}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
