'use client';

import { Button, PageLoader, ErrorState } from '@/shared/ui';
import { useAiGenerationStore, type Format } from '@/shared/stores';
import { useFormatsQuery } from '@/repository/queries';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiFormatPage({ onContinue, canContinue }: AiStepComponentProps) {
  const { selectedFormat, setSelectedFormat } = useAiGenerationStore();
  const { data: formatsData, isLoading, error } = useFormatsQuery();

  const handleFormatSelect = (format: Format) => {
    setSelectedFormat(format);
  };

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorState title="Ошибка загрузки" description="Не удалось загрузить список форматов" className="min-h-[60vh]" />;

  const formats = formatsData?.formats || [];

  return (
   
    <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => handleFormatSelect(format)}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                selectedFormat?.id === format.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900 mb-1">{format.name}</div>
              <div className="text-sm text-gray-600">{format.description}</div>
            </button>
          ))}        </div>

        <div className="flex gap-3">
          <Button onClick={onContinue} disabled={!canContinue} className="w-full" size="sm">
        Продолжить
      </Button>
        </div>
      </div>
  );
}

export default withAiStep(AiFormatPage, {
  step: 'format',
  title: 'Выбор формата'
});