'use client';

import { Transaction, useSettingsStore, useChatStore } from '@/stores';
import { useEffect, useRef, useState, useCallback } from 'react';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import TransactionDialog from '@/components/wallet/home/transaction-dialog';
import { createTransaction } from '@/lib/db/transactions';
import { ChatHeader } from '@/components/wallet/home/ai-chat/header';
import { MessageList } from '@/components/wallet/home/ai-chat/message-list';
import { ChatInput } from '@/components/wallet/home/ai-chat/chat-input';
import { AI_FEEDBACK } from '@/constants/AI';
import { getAIErrorMessage } from '@/lib/helpers/ai-error';

export function AiChat() {
  const apiKey = useSettingsStore((state) => state.apiKey);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const storedMessages = useChatStore((state) => state.messages);
  const setStoredMessages = useChatStore((state) => state.setMessages);
  const [input, setInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [pendingToolCall, setPendingToolCall] = useState<{
    toolCallId: string;
    transaction: Transaction;
  } | null>(null);

  // Refs for stable references
  const apiKeyRef = useRef(apiKey);
  const modelRef = useRef(selectedModel);
  const hasRestoredMessages = useRef(false);
  const setMessagesRef =
    useRef<
      (messages: UIMessage[] | ((messages: UIMessage[]) => UIMessage[])) => void
    >(undefined);

  const { messages, status, sendMessage, addToolOutput, stop, setMessages } =
    useChat({
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
      onError: (error) => {
        const errorContent = getAIErrorMessage(error);
        setMessagesRef.current?.((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            parts: [{ type: 'text', text: errorContent }],
          },
        ]);
      },
    });

  // Keep setMessages ref up to date
  useEffect(() => {
    setMessagesRef.current = setMessages;
  }, [setMessages]);

  // Restore messages from store on mount
  useEffect(() => {
    if (!hasRestoredMessages.current && storedMessages.length > 0) {
      setMessages(storedMessages);
      hasRestoredMessages.current = true;
    }
  }, [storedMessages, setMessages]);

  // Sync messages to Zustand store for persistence
  useEffect(() => {
    if (messages.length > 0) {
      setStoredMessages(messages);
    }
  }, [messages, setStoredMessages]);

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

  const handleStop = () => {
    stop();
    const stoppedMsg =
      AI_FEEDBACK.STOPPED[
        Math.floor(Math.random() * AI_FEEDBACK.STOPPED.length)
      ];
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: stoppedMsg,
        parts: [{ type: 'text', text: stoppedMsg }],
      },
    ]);
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
          onStop={handleStop}
        />
      </div>
    </>
  );
}
