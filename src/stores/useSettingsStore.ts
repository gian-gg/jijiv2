import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ModelId } from '@/constants/AI';

interface SettingsStore {
  selectedModel: ModelId | null;
  apiKey: string;
  setSelectedModel: (model: ModelId | null) => void;
  setApiKey: (key: string) => void;
  reset: () => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      selectedModel: null,
      apiKey: '',
      setSelectedModel: (model) => set({ selectedModel: model }),
      setApiKey: (key) => set({ apiKey: key }),
      reset: () => set({ selectedModel: null, apiKey: '' }),
    }),
    {
      name: 'jiji-settings',
    }
  )
);

export default useSettingsStore;
