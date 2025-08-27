'use client';

import { Button, PageLoader, ErrorState } from '@/shared/ui';
import { useAiGenerationStore } from '@/shared/stores';
import { useTonesQuery } from '@/repository/queries';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiTonePage({ onContinue, canContinue }: AiStepComponentProps) {
  const { selectedTone, setSelectedTone } = useAiGenerationStore();
  const { data: tonesData, isLoading, error } = useTonesQuery();

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorState title="Ошибка загрузки" description="Не удалось загрузить список тонов" className="min-h-[60vh]" />;

  const tones = tonesData?.tones || [];

  return (

            <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {tones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone)}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                selectedTone?.id === tone.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900 mb-1">{tone.name}</div>
              <div className="text-sm text-gray-600">{tone.description}</div>
            </button>
          ))}</div>

        <Button onClick={onContinue} disabled={!canContinue} className="w-full" size="sm">
        Продолжить
      </Button>
        </div>
  );
}

export default withAiStep(AiTonePage, {
  step: 'tone',
  title: 'Выбор тона'
});