'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useSettingsStore from '@/stores/useSettingsStore';
import { CURRENCIES, type CurrencyCode } from '@/constants/SETTINGS';
import { AVAILABLE_MODELS, GEMINI_MODELS } from '@/constants/AI';
import { Eye, EyeOff, Key, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ROUTES from '@/constants/ROUTES';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const apiKey = useSettingsStore((state) => state.apiKey);
  const apiProvider = useSettingsStore((state) => state.apiProvider);
  const currency = useSettingsStore((state) => state.currency);
  const setSelectedModel = useSettingsStore((state) => state.setSelectedModel);
  const setApiKey = useSettingsStore((state) => state.setApiKey);
  const setApiProvider = useSettingsStore((state) => state.setApiProvider);
  const setCurrency = useSettingsStore((state) => state.setCurrency);
  const reset = useSettingsStore((state) => state.reset);

  const [localModel, setLocalModel] = useState<string | null>(selectedModel);
  const [isCustomModel, setIsCustomModel] = useState(false);
  const [localProvider, setLocalProvider] = useState(apiProvider);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localCurrency, setLocalCurrency] = useState<CurrencyCode>(currency);
  const [showApiKey, setShowApiKey] = useState(false);

  const isModelCustom = (model: string | null) => {
    if (!model) return false;
    return !AVAILABLE_MODELS.some((m) => m.id === model);
  };

  useEffect(() => {
    if (open) {
      setLocalModel(selectedModel);
      setIsCustomModel(isModelCustom(selectedModel));
      setLocalProvider(apiProvider);
      setLocalApiKey(apiKey);
      setLocalCurrency(currency);
    }
  }, [open, selectedModel, apiKey, apiProvider, currency]);

  const canSave =
    localApiKey.trim().length > 0 &&
    localModel !== null &&
    localModel.trim().length > 0;

  const handleSave = () => {
    if (!localApiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }
    if (!localModel || !localModel.trim()) {
      toast.error('Please select or enter a model');
      return;
    }
    setSelectedModel(localModel.trim());
    setApiKey(localApiKey.trim());
    setApiProvider(localProvider);
    setCurrency(localCurrency);
    toast.success('Settings saved');
    onOpenChange(false);
  };

  const handleReset = () => {
    reset();
    setLocalModel(null);
    setIsCustomModel(false);
    setLocalProvider('openrouter');
    setLocalApiKey('');
    setLocalCurrency('USD');
    toast.success('Settings reset');
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Reset local state when opening
      setLocalModel(selectedModel);
      setIsCustomModel(isModelCustom(selectedModel));
      setLocalProvider(apiProvider);
      setLocalApiKey(apiKey);
      setLocalCurrency(currency);
    }
    onOpenChange(isOpen);
  };

  const handleModelSelect = (value: string) => {
    if (value === '__custom__') {
      setIsCustomModel(true);
      setLocalModel('');
    } else {
      setIsCustomModel(false);
      setLocalModel(value);
    }
  };

  const handleProviderChange = (provider: 'openrouter' | 'gemini') => {
    setLocalProvider(provider);
    setLocalModel(null);
    setIsCustomModel(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            All configurations are stored client-side only.{' '}
            <a
              href={ROUTES.PRIVACY}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Learn more
            </a>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* API Provider Selection */}
          <div className="space-y-2">
            <Label>API Provider</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={localProvider === 'openrouter' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleProviderChange('openrouter')}
              >
                OpenRouter
              </Button>
              <Button
                type="button"
                variant={localProvider === 'gemini' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleProviderChange('gemini')}
              >
                Gemini
              </Button>
            </div>
          </div>
          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">
              AI Model <span className="text-destructive">*</span>
            </Label>
            {isCustomModel ? (
              <div className="flex gap-2">
                <Input
                  id="model"
                  placeholder="e.g. openai/gpt-4o-mini"
                  value={localModel ?? ''}
                  onChange={(e) => setLocalModel(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCustomModel(false);
                    setLocalModel(null);
                  }}
                >
                  Presets
                </Button>
              </div>
            ) : (
              <Select
                value={localModel ?? ''}
                onValueChange={handleModelSelect}
              >
                <SelectTrigger id="model" className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {(localProvider === 'gemini'
                    ? GEMINI_MODELS
                    : AVAILABLE_MODELS
                  ).map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <span>{model.name}</span>
                        <span className="text-muted-foreground text-xs">
                          ({model.provider})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                  <SelectItem value="__custom__">
                    <span className="text-primary">+ Use custom model...</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            <p className="text-muted-foreground text-xs">
              Browse models at{' '}
              <a
                href={
                  localProvider === 'gemini'
                    ? 'https://ai.google.dev/gemini-api/docs/models/gemini'
                    : 'https://openrouter.ai/models'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {localProvider === 'gemini'
                  ? 'ai.google.dev'
                  : 'openrouter.ai/models'}
              </a>
            </p>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">
              {localProvider === 'gemini' ? 'Gemini' : 'OpenRouter'} API Key{' '}
              <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder={
                    localProvider === 'gemini' ? 'AIza...' : 'sk-or-...'
                  }
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  className="pr-10 pl-9"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
              {(localApiKey || apiKey) && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="text-destructive hover:text-destructive"
                  title="Reset all settings"
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Get your API key from{' '}
              <a
                href={
                  localProvider === 'gemini'
                    ? 'https://aistudio.google.com/apikey'
                    : 'https://openrouter.ai/keys'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {localProvider === 'gemini'
                  ? 'aistudio.google.com'
                  : 'openrouter.ai/keys'}
              </a>
            </p>
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={localCurrency}
              onValueChange={(value) => setLocalCurrency(value as CurrencyCode)}
            >
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{curr.symbol}</span>
                      <span>{curr.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">
              This is for display only – no conversion is applied.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
