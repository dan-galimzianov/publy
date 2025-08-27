'use client';

import { Button } from '@/shared/ui';
import { useAiGenerationStore } from '@/shared/stores';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';
import { VoiceWaveAnimation, SpeechTranscript } from '@/components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function AiTopicPage({ onContinue, canContinue }: AiStepComponentProps) {
  const { topic, setTopic } = useAiGenerationStore();
  const { 
    listening, 
    browserSupportsSpeechRecognition, 
    resetTranscript, 
    transcript,
    interimTranscript 
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2zm6 6c0 3.31-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8h-2z"/>
              <path d="M12 16v4h-2v-2H8v-2h8v2h-2z"/>
              <path d="M18 8l-2-2M8 6L6 8"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Голосовой ввод недоступен</h3>
          <p className="text-sm text-gray-500">Голосовой ввод не поддерживается в этом браузере</p>
        </div>
      </div>
    );
  }

  const onStopListening = () => {
    const finalText = transcript || interimTranscript;
    if (finalText) {
      setTopic(topic ? `${topic} ${finalText}` : finalText);
    }
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const onStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const onContinueRecording = () => {
    const finalText = transcript || interimTranscript;
    if (finalText) {
      setTopic(topic ? `${topic} ${finalText}` : finalText);
    }
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const onReplaceRecording = () => {
    setTopic('');
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ru-RU',
    });
  };

  // Состояние записи
  if (listening) {
    return (
      <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Анимация записи */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
          <VoiceWaveAnimation isRecording={listening} size={140} />
          <div className="mt-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Слушаю...</h3>
            <p className="text-sm text-gray-500">Говорите о теме вашего поста</p>
          </div>
        </div>

        {/* Транскрипция */}
        <div className="mb-6">
          <SpeechTranscript
            transcript={transcript}
            interimTranscript={interimTranscript}
            isRecording={listening}
          />
        </div>

        {/* Кнопка остановки */}
        <Button
          onClick={onStopListening}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          size="sm"
        >
          Остановить запись
        </Button>
      </div>
    );
  }

  // Начальное состояние без темы
  if (topic.length === 0) {
    return (
      <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Центральная область с иконкой и описанием */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
          <div className="mb-6">
            <VoiceWaveAnimation isRecording={false} size={120} />
          </div>
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Расскажите о теме поста</h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Опишите голосом тему, о которой хотите написать пост. Например: &ldquo;Как эффективно управлять временем&rdquo;
            </p>
          </div>
        </div>

        {/* Кнопка начала записи */}
        <Button
          onClick={onStartListening}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          size="sm"
        >
          🎤 Начать запись
        </Button>
      </div>
    );
  }

  // Состояние с готовой темой
  return (
    <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col">
      {/* Текстовое поле с темой */}
      <div className="mb-6 flex flex-col flex-1 h-px">
        <label className="text-sm font-medium text-gray-700 mb-2">Тема поста</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 w-full min-h-[120px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm"
          placeholder="Например: Как эффективно управлять временем для предпринимателей. Включить практические советы, инструменты и личный опыт..."
          autoFocus
        />
      </div>

      {/* Кнопки действий */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onReplaceRecording}
            variant="outline"
            className="w-full"
            size="sm"
          >
            🎤 Перезаписать
          </Button>
          <Button
            onClick={onContinueRecording}
            variant="outline"
            className="w-full"
            size="sm"
          >
            ➕ Дополнить
          </Button>
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
    </div>
  );
}

export default withAiStep(AiTopicPage, {
  step: 'topic',
  title: 'AI Генерация поста'
});
