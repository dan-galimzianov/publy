'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAiGenerationStore, type AiGenerationStep } from '@/shared/stores';
import { Header } from '@/shared/ui';

interface WithAiStepProps {
  step: AiGenerationStep;
  title: string;
}

export function withAiStep<T extends AiStepComponentProps>(
  WrappedComponent: React.ComponentType<T>,
  { step, title }: WithAiStepProps
) {
  return function AiStepWrapper(props: Omit<T, keyof AiStepComponentProps>) {
    const router = useRouter();
    const { 
      currentStep,
      setCurrentStep, 
      canProceedFromStep,
      getNextStep,
      getPreviousStep
    } = useAiGenerationStore();

    useEffect(() => {
      // Устанавливаем текущий шаг
      if (currentStep !== step) {
        setCurrentStep(step);
      }

      // Проверяем, можем ли мы находиться на этом шаге
      // Если нет - перенаправляем на первый доступный шаг
      if (!canProceedFromCurrentPosition()) {
        redirectToValidStep();
      }
    }, [currentStep, step, setCurrentStep]);

    const canProceedFromCurrentPosition = (): boolean => {
      const stepOrder: AiGenerationStep[] = [
        'topic', 'platform', 'format', 'role', 'audience', 'structure', 'tone', 'model', 'generate', 'preview'
      ];
      
      const currentIndex = stepOrder.indexOf(step);
      
      // Проверяем все предыдущие шаги
      for (let i = 0; i < currentIndex; i++) {
        if (!canProceedFromStep(stepOrder[i])) {
          return false;
        }
      }
      
      return true;
    };

    const redirectToValidStep = () => {
      const stepOrder: AiGenerationStep[] = [
        'topic', 'platform', 'format', 'role', 'audience', 'structure', 'tone', 'model', 'generate', 'preview'
      ];
      
      // Находим первый шаг, который не пройден
      for (const stepToCheck of stepOrder) {
        if (!canProceedFromStep(stepToCheck)) {
          setCurrentStep(stepToCheck);
          router.replace(`/create/ai/${stepToCheck}`);
          return;
        }
      }
    };

    const handleBack = () => {
      const prevStep = getPreviousStep(step);
      if (prevStep) {
        setCurrentStep(prevStep);
        router.push(`/create/ai/${prevStep}`);
      } else {
        router.push('/');
      }
    };

    const handleContinue = () => {
      if (!canProceedFromStep(step)) return;
      
      const nextStep = getNextStep(step);
      if (nextStep) {
        setCurrentStep(nextStep);
        router.push(`/create/ai/${nextStep}`);
      }
    };

    return (
      <>
        <Header 
          title={title} 
          showBackButton 
          onBackClick={handleBack}
        />
        <WrappedComponent 
          {...(props as T)} 
          onContinue={handleContinue}
          canContinue={canProceedFromStep(step)}
        />
      </>
    );
  };
}

// Типы для компонентов, использующих HOC
export interface AiStepComponentProps {
  onContinue: () => void;
  canContinue: boolean;
}
