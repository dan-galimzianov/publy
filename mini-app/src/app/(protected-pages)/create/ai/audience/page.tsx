'use client';

import { useEffect, useState, useCallback } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useAiGenerationStore } from '@/shared/stores';
import { useGenerateTargetAudiencesMutation } from '@/repository/mutations';
import { toast } from 'sonner';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiAudiencePage({ onContinue, canContinue }: AiStepComponentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { topic, selectedRole, availableAudiences, selectedAudience, setAvailableAudiences, setSelectedAudience } = useAiGenerationStore();
  const { mutate: generateAudiences } = useGenerateTargetAudiencesMutation();

  const handleGenerateAudiences = useCallback(() => {
    if (!topic.trim() || !selectedRole) return;
    setIsGenerating(true);
    generateAudiences({ topic: topic.trim(), role: selectedRole.name }, {
      onSuccess: (data) => {
        setAvailableAudiences(data.audiences);
        setIsGenerating(false);
        toast.success('Аудитории сгенерированы! AI подобрал целевые аудитории для вашего контента');
      },
      onError: () => {
        toast.error('Не удалось сгенерировать аудитории. Попробуйте еще раз.');
        setIsGenerating(false);
      }
    });
  }, [topic, selectedRole, generateAudiences, setAvailableAudiences]);

  useEffect(() => {
    if (availableAudiences.length === 0 && topic.trim() && selectedRole) {
      handleGenerateAudiences();
    }
  }, [availableAudiences.length, topic, selectedRole, handleGenerateAudiences]);

  if (isGenerating && availableAudiences.length === 0) {
    return (
      <div className="py-8 px-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Users size={24} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Определяем целевую аудиторию</h2>
          <p className="text-gray-600 text-sm mb-8">AI анализирует тему и роль автора для подбора подходящих аудиторий</p>
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Генерируем аудитории...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {availableAudiences.length > 0 ? (
          <div className="space-y-3 flex-1">
            {availableAudiences.map((audience) => (
              <button
                key={audience.id}
                onClick={() => setSelectedAudience(audience)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedAudience?.id === audience.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900 mb-2">{audience.name}</div>
                <div className="text-sm text-gray-600 mb-3">{audience.description}</div>
                {audience.characteristics && audience.characteristics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {audience.characteristics.slice(0, 3).map((char, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{char}</span>
                    ))}
                    {audience.characteristics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+{audience.characteristics.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Аудитории не сгенерированы</p>
              <Button onClick={handleGenerateAudiences} disabled={isGenerating} size="sm">
                <Users size={16} className="mr-2" />Сгенерировать аудитории
              </Button>
            </div>
          </div>
        )}    </div>

        <div className="flex gap-3">
                <Button onClick={onContinue} disabled={!canContinue} className="w-full" size="sm">
        Продолжить
      </Button>
        </div>
      </div>
  );
}

export default withAiStep(AiAudiencePage, {
  step: 'audience',
  title: 'Выбор целевой аудитории'
});