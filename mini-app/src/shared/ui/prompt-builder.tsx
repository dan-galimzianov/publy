'use client';

import { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { Button, Input } from '@/shared/ui';
import { cn } from '@/shared/tailwind';
import type { PromptItem } from '@/shared/stores';
import type { Prompt } from '@/shared/api/endpoints/prompt';

interface PromptBuilderProps {
  prompts: PromptItem[];
  availablePrompts: Prompt[];
  onPromptsChange: (prompts: PromptItem[]) => void;
  onSavePrompt?: (name: string, content: string) => void;
  className?: string;
}

export function PromptBuilder({
  prompts,
  availablePrompts,
  onPromptsChange,
  onSavePrompt,
  className,
}: PromptBuilderProps) {
  const [showSaveDialog, setShowSaveDialog] = useState<string | null>(null);
  const [saveName, setSaveName] = useState('');

  const addPrompt = () => {
    const newPrompt: PromptItem = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'saved',
      content: '',
    };
    onPromptsChange([...prompts, newPrompt]);
  };

  const removePrompt = (id: string) => {
    onPromptsChange(prompts.filter(p => p.id !== id));
  };

  const updatePrompt = (id: string, updates: Partial<PromptItem>) => {
    onPromptsChange(
      prompts.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  };

  const selectSavedPrompt = (promptId: string, promptContent: string, itemId: string) => {
    updatePrompt(itemId, {
      type: 'saved',
      promptId,
      content: promptContent,
    });
  };

  const switchToCustom = (itemId: string) => {
    updatePrompt(itemId, {
      type: 'custom',
      promptId: undefined,
    });
  };

  const handleSavePrompt = (content: string) => {
    if (onSavePrompt && saveName.trim()) {
      onSavePrompt(saveName.trim(), content);
      setShowSaveDialog(null);
      setSaveName('');
    }
  };

  return (
      <div>

        

      </div>
  );
}
