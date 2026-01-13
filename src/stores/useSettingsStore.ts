import { type CurrencyCode, DEFAULT_CURRENCY } from '@/constants/SETTINGS';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Re-export for convenience
export {
  CURRENCIES,
  getCurrencySymbol,
  type CurrencyCode,
} from '@/constants/SETTINGS';

interface SettingsStore {
  selectedModel: string | null;
  apiKey: string;
  currency: CurrencyCode;
  setSelectedModel: (model: string | null) => void;
  setApiKey: (key: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  reset: () => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      selectedModel: null,
      apiKey: '',
      currency: DEFAULT_CURRENCY,
      setSelectedModel: (model) => set({ selectedModel: model }),
      setApiKey: (key) => set({ apiKey: key }),
      setCurrency: (currency) => set({ currency }),
      reset: () =>
        set({ selectedModel: null, apiKey: '', currency: DEFAULT_CURRENCY }),
    }),
    {
      name: 'jiji-settings',
    }
  )
);

export default useSettingsStore;
