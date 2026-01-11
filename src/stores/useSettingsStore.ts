import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AVAILABLE_MODELS = [
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
  },
] as const;

export type ModelId = (typeof AVAILABLE_MODELS)[number]['id'];

interface SettingsStore {
  selectedModel: ModelId;
  apiKey: string;
  setSelectedModel: (model: ModelId) => void;
  setApiKey: (key: string) => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      selectedModel: 'openai/gpt-4o-mini',
      apiKey: '',
      setSelectedModel: (model) => set({ selectedModel: model }),
      setApiKey: (key) => set({ apiKey: key }),
    }),
    {
      name: 'jiji-settings',
    }
  )
);

export default useSettingsStore;
