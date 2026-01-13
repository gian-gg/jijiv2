import { UIMessage } from 'ai';
import { useEffect, useRef } from 'react';
import { ChatMessage } from './chat-message';
import { LoadingIndicator } from './loading-indicator';

interface MessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}

        {/* Loading indicator - only before streaming starts */}
        {isLoading && <LoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
