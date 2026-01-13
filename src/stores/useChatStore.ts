import type { UIMessage } from 'ai';
import { create } from 'zustand';
import { AI_MESSAGES } from '@/constants/AI';

// Create welcome message in UIMessage format
const createWelcomeMessage = (): UIMessage => {
  const template = AI_MESSAGES.FIRST_MESSAGE();
  return {
    id: 'welcome',
    role: 'assistant',
    parts: [{ type: 'text', text: template.content }],
  };
};

interface ChatStore {
  messages: UIMessage[];
  setMessages: (messages: UIMessage[]) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatStore>()((set) => ({
  messages: [createWelcomeMessage()],
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [createWelcomeMessage()] }),
}));

export default useChatStore;
