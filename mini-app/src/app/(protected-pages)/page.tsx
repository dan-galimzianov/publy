'use client';

import { useEffect } from 'react';
import { Mic, Type } from 'lucide-react';
import { Header, useToast } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useCreatePostStore, useAiGenerationStore } from '@/shared/stores';

export default function CreateSelectPage() {
  const router = useRouter();
  const { ToastContainer } = useToast();
  
  const { reset, setCurrentStep } = useCreatePostStore();
  const { reset: resetAiGeneration } = useAiGenerationStore();

  // Сбрасываем состояние при входе на главную страницу
  useEffect(() => {
    reset();
    resetAiGeneration();
    setCurrentStep('select');
  }, [reset, resetAiGeneration, setCurrentStep]);

  const handleVoiceMode = () => {
    router.push('/create/ai/voice-topic');
  };

  const handleAiMode = () => {
    router.push('/create/ai/topic');
  };

  return (
    <div>
      <Header title="Создать пост" />
      <div className="px-6">
        <div className="flex flex-col justify-center min-h-[60vh] py-8">
          <div className="max-w-sm mx-auto w-full space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Как создать пост?
              </h2>
              <p className="text-gray-600 text-sm">
                Выберите удобный способ
              </p>
            </div>

            <button
              onClick={handleVoiceMode}
              className="w-full p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all text-left group"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Mic size={20} className="text-gray-700" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Голосовое сообщение</h3>
                  <p className="text-sm text-gray-600 mt-1">Произнесите текст вслух</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleAiMode}
              className="w-full p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all text-left group"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Type size={20} className="text-gray-700" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Текст</h3>
                  <p className="text-sm text-gray-600 mt-1">Введите текст вручную</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}