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
import { AVAILABLE_MODELS, type ModelId } from '@/constants/AI';
import { Eye, EyeOff, Key, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const apiKey = useSettingsStore((state) => state.apiKey);
  const setSelectedModel = useSettingsStore((state) => state.setSelectedModel);
  const setApiKey = useSettingsStore((state) => state.setApiKey);
  const reset = useSettingsStore((state) => state.reset);

  const [localModel, setLocalModel] = useState<ModelId | null>(selectedModel);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);

  // Sync local state with store when dialog opens or store changes
  useEffect(() => {
    if (open) {
      setLocalModel(selectedModel);
      setLocalApiKey(apiKey);
    }
  }, [open, selectedModel, apiKey]);

  const canSave = localApiKey.trim().length > 0 && localModel !== null;

  const handleSave = () => {
    if (!localApiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }
    if (!localModel) {
      toast.error('Please select a model');
      return;
    }
    setSelectedModel(localModel);
    setApiKey(localApiKey.trim());
    toast.success('Settings saved');
    onOpenChange(false);
  };

  const handleReset = () => {
    reset();
    setLocalModel(null);
    setLocalApiKey('');
    toast.success('Settings reset');
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Reset local state when opening
      setLocalModel(selectedModel);
      setLocalApiKey(apiKey);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your AI model and API key for OpenRouter.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">
              AI Model <span className="text-destructive">*</span>
            </Label>
            <Select
              value={localModel ?? ''}
              onValueChange={(value) => setLocalModel(value as ModelId)}
            >
              <SelectTrigger id="model" className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center gap-2">
                      <span>{model.name}</span>
                      <span className="text-muted-foreground text-xs">
                        ({model.provider})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">
              OpenRouter API Key <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="sk-or-..."
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
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openrouter.ai/keys
              </a>
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
