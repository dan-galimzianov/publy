import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AiGenerationStep =
  | "topic" // Ввод темы поста
  | "platform" // Выбор площадки
  | "format" // Выбор формата поста
  | "role" // Выбор системной роли (AI генерация)
  | "audience" // Выбор целевой аудитории (AI генерация)
  | "structure" // Выбор структуры поста (AI генерация)
  | "tone" // Выбор тона
  | "model" // Выбор AI модели
  | "generate" // Финальная генерация поста
  | "preview"; // Предварительный просмотр

export interface Platform {
  id: string;
  name: string;
  description: string;
}

export interface Format {
  id: string;
  name: string;
  description: string;
}

export interface SystemRole {
  id: string;
  name: string;
  description: string;
}

export interface TargetAudience {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
}

export interface PostStructure {
  id: string;
  name: string;
  description: string;
  template: string;
  benefits: string[];
}

export interface Tone {
  id: string;
  name: string;
  description: string;
}

export interface AiModel {
  id: string;
  name: string;
  description: string;
}

export interface GeneratedPost {
  content: string;
}

interface AiGenerationState {
  // Основные данные пользователя
  topic: string;
  selectedPlatform: Platform | null;
  selectedFormat: Format | null;
  selectedRole: SystemRole | null;
  selectedAudience: TargetAudience | null;
  selectedStructure: PostStructure | null;
  selectedTone: Tone | null;
  selectedModel: AiModel | null;

  // AI сгенерированные данные
  availableRoles: SystemRole[];
  availableAudiences: TargetAudience[];
  availableStructures: PostStructure[];
  generatedPost: GeneratedPost | null;
  editablePost: GeneratedPost | null;

  // Метаданные
  currentStep: AiGenerationStep;
  isLoading: boolean;
  error: string | null;

  // Actions - базовые
  setTopic: (topic: string) => void;
  setSelectedPlatform: (platform: Platform | null) => void;
  setSelectedFormat: (format: Format | null) => void;
  setSelectedRole: (role: SystemRole | null) => void;
  setSelectedAudience: (audience: TargetAudience | null) => void;
  setSelectedStructure: (structure: PostStructure | null) => void;
  setSelectedTone: (tone: Tone | null) => void;
  setSelectedModel: (model: AiModel | null) => void;
  setCurrentStep: (step: AiGenerationStep) => void;

  // Actions - AI данные
  setAvailableRoles: (roles: SystemRole[]) => void;
  setAvailableAudiences: (audiences: TargetAudience[]) => void;
  setAvailableStructures: (structures: PostStructure[]) => void;
  setGeneratedPost: (post: GeneratedPost | null) => void;
  setEditablePost: (post: GeneratedPost | null) => void;

  // Actions - состояние
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Утилиты
  reset: () => void;
  canProceedFromStep: (step: AiGenerationStep) => boolean;
  getNextStep: (currentStep: AiGenerationStep) => AiGenerationStep | null;
  getPreviousStep: (currentStep: AiGenerationStep) => AiGenerationStep | null;
}

const initialState = {
  topic: "",
  selectedPlatform: null,
  selectedFormat: null,
  selectedRole: null,
  selectedAudience: null,
  selectedStructure: null,
  selectedTone: null,
  selectedModel: null,
  availableRoles: [],
  availableAudiences: [],
  availableStructures: [],
  generatedPost: null,
  editablePost: null,
  currentStep: "topic" as AiGenerationStep,
  isLoading: false,
  error: null,
};

export const useAiGenerationStore = create<AiGenerationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Базовые setters
      setTopic: (topic: string) => set({ topic }),
      setSelectedPlatform: (platform: Platform | null) =>
        set({ selectedPlatform: platform }),
      setSelectedFormat: (format: Format | null) =>
        set({ selectedFormat: format }),
      setSelectedRole: (role: SystemRole | null) => set({ selectedRole: role }),
      setSelectedAudience: (audience: TargetAudience | null) =>
        set({ selectedAudience: audience }),
      setSelectedStructure: (structure: PostStructure | null) =>
        set({ selectedStructure: structure }),
      setSelectedTone: (tone: Tone | null) => set({ selectedTone: tone }),
      setSelectedModel: (model: AiModel | null) =>
        set({ selectedModel: model }),
      setCurrentStep: (step: AiGenerationStep) => set({ currentStep: step }),

      // AI данные
      setAvailableRoles: (roles: SystemRole[]) =>
        set({ availableRoles: roles }),
      setAvailableAudiences: (audiences: TargetAudience[]) =>
        set({ availableAudiences: audiences }),
      setAvailableStructures: (structures: PostStructure[]) =>
        set({ availableStructures: structures }),
      setGeneratedPost: (post: GeneratedPost | null) =>
        set({ generatedPost: post }),
      setEditablePost: (post: GeneratedPost | null) =>
        set({ editablePost: post }),

      // Состояние
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      reset: () => set(initialState),

      canProceedFromStep: (step: AiGenerationStep) => {
        const state = get();

        switch (step) {
          case "topic":
            return state.topic.trim().length > 0;
          case "platform":
            return state.selectedPlatform !== null;
          case "format":
            return state.selectedFormat !== null;
          case "role":
            return state.selectedRole !== null;
          case "audience":
            return state.selectedAudience !== null;
          case "structure":
            return state.selectedStructure !== null;
          case "tone":
            return state.selectedTone !== null;
          case "model":
            return state.selectedModel !== null;
          case "generate":
            return (
              state.topic.trim().length > 0 &&
              state.selectedPlatform !== null &&
              state.selectedFormat !== null &&
              state.selectedRole !== null &&
              state.selectedAudience !== null &&
              state.selectedStructure !== null &&
              state.selectedTone !== null &&
              state.selectedModel !== null
            );
          case "preview":
            return (
              state.editablePost !== null &&
              state.editablePost.content.trim().length > 0
            );
          default:
            return false;
        }
      },

      getNextStep: (currentStep: AiGenerationStep) => {
        const stepOrder: AiGenerationStep[] = [
          "topic",
          "platform",
          "format",
          "role",
          "audience",
          "structure",
          "tone",
          "model",
          "generate",
          "preview",
        ];

        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
          return stepOrder[currentIndex + 1];
        }
        return null;
      },

      getPreviousStep: (currentStep: AiGenerationStep) => {
        const stepOrder: AiGenerationStep[] = [
          "topic",
          "platform",
          "format",
          "role",
          "audience",
          "structure",
          "tone",
          "model",
          "generate",
          "preview",
        ];

        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
          return stepOrder[currentIndex - 1];
        }
        return null;
      },
    }),
    {
      name: "ai-generation-store",
      // Исключаем временные данные из персистентности
      partialize: (state) => ({
        topic: state.topic,
        selectedPlatform: state.selectedPlatform,
        selectedFormat: state.selectedFormat,
        selectedRole: state.selectedRole,
        selectedAudience: state.selectedAudience,
        selectedStructure: state.selectedStructure,
        selectedTone: state.selectedTone,
        selectedModel: state.selectedModel,
        availableRoles: state.availableRoles,
        availableAudiences: state.availableAudiences,
        availableStructures: state.availableStructures,
        generatedPost: state.generatedPost,
        editablePost: state.editablePost,
        // currentStep, isLoading, error не сохраняем - всегда начинаем с topic
      }),
    }
  )
);
