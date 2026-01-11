import type { Message } from '@/types/home';
import { AI_MESSAGES } from '@/constants/AI';
import { create } from 'zustand';

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatStore>()((set) => ({
  messages: [AI_MESSAGES.FIRST_MESSAGE()],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [AI_MESSAGES.FIRST_MESSAGE()] }),
}));

export default useChatStore;
