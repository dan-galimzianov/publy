'use client';

import { Button, PageLoader, ErrorState } from '@/shared/ui';
import { useAiGenerationStore, type Platform } from '@/shared/stores';
import { usePlatformsQuery } from '@/repository/queries';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiPlatformPage({ onContinue, canContinue }: AiStepComponentProps) {
  const { 
    selectedPlatform,
    setSelectedPlatform
  } = useAiGenerationStore();

  const { data: platformsData, isLoading, error } = usePlatformsQuery();

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorState
        title="Ошибка загрузки"
        description="Не удалось загрузить список площадок"
        className="min-h-[60vh]"
      />
    );
  }

  const platforms = platformsData?.platforms || [];

  return (
      <div className="py-6 px-6 max-w-4xl mx-auto flex flex-col gap-6 h-px flex-1 w-full">
        <div className="overflow-auto flex-1 flex flex-col gap-3">
           {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformSelect(platform)}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                selectedPlatform?.id === platform.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900 mb-1">
                {platform.name}
              </div>
              <div className="text-sm text-gray-600">
                {platform.description}
              </div>
            </button>
          ))}        </div>

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

export default withAiStep(AiPlatformPage, {
  step: 'platform',
  title: 'Выбор площадки'
});
