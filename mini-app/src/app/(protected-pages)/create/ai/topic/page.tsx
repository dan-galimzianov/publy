'use client';

import { Button } from '@/shared/ui';
import { useAiGenerationStore } from '@/shared/stores';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

function AiTopicPage({ onContinue, canContinue }: AiStepComponentProps) {
  const { topic, setTopic } = useAiGenerationStore();

  return (
    <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
      <div className="mb-6 flex flex-col flex-1 h-px">
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm"
          placeholder="Например: Как эффективно управлять временем для предпринимателей. Включить практические советы, инструменты и личный опыт..."
          autoFocus
        />
      </div>

      <Button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full"
        size="sm"
      >
        Продолжить
      </Button>
    </div>
  );
}

export default withAiStep(AiTopicPage, {
  step: 'topic',
  title: 'AI Генерация поста'
});
