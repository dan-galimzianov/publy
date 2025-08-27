'use client';

import { useEffect, useState, useCallback } from 'react';
import { Layout } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useAiGenerationStore } from '@/shared/stores';
import { useGeneratePostStructuresMutation } from '@/repository/mutations';
import { toast } from 'sonner';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiStructurePage({ onContinue, canContinue }: AiStepComponentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { 
    topic, selectedRole, selectedAudience, availableStructures, selectedStructure, 
    setAvailableStructures, setSelectedStructure 
  } = useAiGenerationStore();
  const { mutate: generateStructures } = useGeneratePostStructuresMutation();

  const handleGenerateStructures = useCallback(() => {
    if (!topic.trim() || !selectedRole || !selectedAudience) return;
    setIsGenerating(true);
    generateStructures({ 
      topic: topic.trim(), 
      role: selectedRole.name, 
      audience: selectedAudience.name 
    }, {
      onSuccess: (data) => {
        setAvailableStructures(data.structures);
        setIsGenerating(false);
        toast.success('Структуры сгенерированы! AI предложил структуры поста для максимального раскрытия темы');
      },
      onError: () => {
        toast.error('Не удалось сгенерировать структуры. Попробуйте еще раз.');
        setIsGenerating(false);
      }
    });
  }, [topic, selectedRole, selectedAudience, generateStructures, setAvailableStructures]);

    useEffect(() => {
    if (availableStructures.length === 0 && topic.trim() && selectedRole && selectedAudience) {
      handleGenerateStructures();
    }
  }, [availableStructures.length, topic, selectedRole, selectedAudience, handleGenerateStructures]);

  if (isGenerating && availableStructures.length === 0) {
    return (
      <div className="py-8 px-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Layout size={24} className="text-green-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Создаем структуры поста</h2>
          <p className="text-gray-600 text-sm mb-8">AI анализирует тему, роль и аудиторию для создания эффективных структур</p>
          <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Генерируем структуры...</p>
        </div>
      </div>
    );
  }

  return (

        <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {availableStructures.length > 0 ? (
          <div className="space-y-4 flex-1">
            {availableStructures.map((structure) => (
              <button
                key={structure.id}
                onClick={() => setSelectedStructure(structure)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedStructure?.id === structure.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900 mb-2">{structure.name}</div>
                <div className="text-sm text-gray-600 mb-3">{structure.description}</div>
                
                {structure.template && (
                  <div className="text-xs text-gray-500 mb-3 p-2 bg-gray-50 rounded border-l-2 border-gray-200">
                    <div className="font-medium mb-1">Структура:</div>
                    <div className="whitespace-pre-line">{structure.template}</div>
                  </div>
                )}
                
                {structure.benefits && structure.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {structure.benefits.slice(0, 2).map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{benefit}</span>
                    ))}
                    {structure.benefits.length > 2 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">+{structure.benefits.length - 2}</span>
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
                <Layout size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Структуры не сгенерированы</p>
              <Button onClick={handleGenerateStructures} disabled={isGenerating} size="sm">
                <Layout size={16} className="mr-2" />Сгенерировать структуры
              </Button>
            </div>
          </div>
        )} </div>

        <Button onClick={onContinue} disabled={!canContinue} className="w-full" size="sm">
        Продолжить
      </Button>
        </div>
  );
}

export default withAiStep(AiStructurePage, {
  step: 'structure',
  title: 'Выбор структуры поста'
});