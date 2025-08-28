'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useAiGenerationStore } from '@/shared/stores';
import { useGenerateFinalPostMutation } from '@/repository/mutations';
import { toast } from 'sonner';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiGeneratePage({ }: AiStepComponentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  
  const { 
    topic, selectedPlatform, selectedFormat, selectedRole, selectedAudience, 
    selectedStructure, selectedTone, selectedModel, setGeneratedPost, 
    setEditablePost, setCurrentStep
  } = useAiGenerationStore();
  
  const { mutate: generateFinalPost } = useGenerateFinalPostMutation();

  const handleGeneratePost = () => {
    if (!topic.trim() || !selectedPlatform || !selectedFormat || !selectedRole || 
        !selectedAudience || !selectedStructure || !selectedTone || !selectedModel) {
      return;
    }

    setIsGenerating(true);
    generateFinalPost({
      topic: topic.trim(),
      platform: selectedPlatform.name,
      format: selectedFormat.name + '\n' + selectedFormat.description,
      role: selectedRole.name + '\n' + selectedRole.description,
      audience: selectedAudience.name + '\n' + selectedAudience.description,
      structure: selectedStructure.name + '\n' + selectedStructure.description,
      tone: selectedTone.name + '\n' + selectedTone.description,
      model: selectedModel.id,
    }, {
      onSuccess: (data) => {
        setGeneratedPost(data.post);
        setEditablePost(data.post);
        setCurrentStep('preview');
        router.push('/create/ai/preview');
        toast.success('Пост создан! AI сгенерировал уникальный контент на основе ваших параметров');
      },
      onError: (error) => {
        console.error('Ошибка генерации:', error);
        toast.error('Не удалось сгенерировать пост. Попробуйте еще раз.');
        setIsGenerating(false);
      }
    });
  };

  return (
      <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           <div className="text-center">    
        {/* Сводка параметров */}
        <div className="text-left bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">Параметры генерации:</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Площадка:</span>
              <div className="font-medium text-gray-900">{selectedPlatform?.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Формат:</span>
              <div className="font-medium text-gray-900">{selectedFormat?.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Роль автора:</span>
              <div className="font-medium text-gray-900">{selectedRole?.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Аудитория:</span>
              <div className="font-medium text-gray-900">{selectedAudience?.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Структура:</span>
              <div className="font-medium text-gray-900">{selectedStructure?.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Тон:</span>
              <div className="font-medium text-gray-900">{selectedTone?.name}</div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <span className="text-gray-600 text-sm">Тема:</span>
            <div className="text-sm text-gray-900 mt-1 line-clamp-3">
              {topic}
            </div>
          </div>
          
          <div className="pt-2">
            <span className="text-gray-600 text-sm">AI модель:</span>
            <div className="text-sm font-medium text-gray-900">{selectedModel?.name}</div>
          </div>
        </div>
      </div></div>

        <div className="flex gap-3">
          <Button onClick={handleGeneratePost} disabled={isGenerating} className="w-full" size="sm">
            {isGenerating ? 'Генерируем пост...' : 'Создать пост'}
          </Button>
        </div>
        </div>
  );
}

export default withAiStep(AiGeneratePage, {
  step: 'generate',
  title: 'Генерация поста'
});