'use client';

import { useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useAiGenerationStore, type SystemRole } from '@/shared/stores';
import { useGenerateSystemRolesMutation } from '@/repository/mutations';
import { toast } from 'sonner';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiRolePage({ onContinue, canContinue }: AiStepComponentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { 
    topic,
    availableRoles,
    selectedRole,
    setAvailableRoles,
    setSelectedRole
  } = useAiGenerationStore();

  const { mutate: generateRoles } = useGenerateSystemRolesMutation();

  const handleGenerateRoles = useCallback(() => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    generateRoles(
      { topic: topic.trim() },
      {
        onSuccess: (data) => {
          setAvailableRoles(data.roles);
          setIsGenerating(false);
          toast.success('Роли сгенерированы! AI подобрал подходящие роли автора для вашей темы');
        },
        onError: (error) => {
          console.error('Ошибка генерации ролей:', error);
          toast.error('Не удалось сгенерировать роли. Попробуйте еще раз.');
          setIsGenerating(false);
        }
      }
    );
  }, [topic, generateRoles, setAvailableRoles, setIsGenerating]);

  useEffect(() => {
    // Автоматически генерируем роли, если их нет
    if (availableRoles.length === 0 && topic.trim()) {
      handleGenerateRoles();
    }
  }, [availableRoles.length, topic, handleGenerateRoles]);

  const handleRoleSelect = (role: SystemRole) => {
    setSelectedRole(role);
  };

  if (isGenerating && availableRoles.length === 0) {
    return (
      <div className="py-8 px-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
            <Sparkles size={24} className="text-purple-600" />
          </div>
          
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Подбираем роли автора
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            AI анализирует вашу тему и предлагает подходящие роли
          </p>

          <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Генерируем роли...</p>
        </div>
      </div>
    );
  }

  return (
        <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {availableRoles.length > 0 ? (
          <div className="space-y-3 flex-1">
            {availableRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedRole?.id === role.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">
                  {role.name}
                </div>
                <div className="text-sm text-gray-600">
                  {role.description}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Роли не сгенерированы
              </p>
              <Button
                onClick={handleGenerateRoles}
                disabled={isGenerating}
                size="sm"
              >
                <Sparkles size={16} className="mr-2" />
                Сгенерировать роли
              </Button>
            </div>
          </div>
        )}      </div>

        <div className="flex gap-3">
                <Button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full"
        size="sm"
      >
        Продолжить
      </Button>
        </div>
      </div>
  );
}

export default withAiStep(AiRolePage, {
  step: 'role',
  title: 'Выбор роли автора'
});
