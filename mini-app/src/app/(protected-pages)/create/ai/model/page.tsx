'use client';

import { Button, PageLoader, ErrorState } from '@/shared/ui';
import { useAiGenerationStore } from '@/shared/stores';
import { useModelsQuery } from '@/repository/queries';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiModelPage({ onContinue, canContinue }: AiStepComponentProps) {
  const { selectedModel, setSelectedModel } = useAiGenerationStore();
  const { data: modelsData, isLoading, error } = useModelsQuery();

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorState title="Ошибка загрузки" description="Не удалось загрузить список моделей" className="min-h-[60vh]" />;

  const models = modelsData?.models || [];

  return (
      <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                selectedModel?.id === model.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900 mb-1">{model.name}</div>
              <div className="text-sm text-gray-600">{model.description}</div>
            </button>
          ))}</div>

        <Button onClick={onContinue} disabled={!canContinue} className="w-full" size="sm">
        Продолжить
      </Button>
        </div>
  );
}

export default withAiStep(AiModelPage, {
  step: 'model',
  title: 'Выбор AI модели'
});