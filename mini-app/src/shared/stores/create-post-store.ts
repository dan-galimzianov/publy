import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CreatePostStep =
  | "select"
  | "voice"
  | "text"
  | "format"
  | "generate"
  | "preview";

export interface PromptItem {
  id: string;
  type: "saved" | "custom";
  promptId?: string; // Только для saved
  content: string;
}

interface CreatePostState {
  // Основные данные
  userText: string;
  prompts: PromptItem[];
  finalPrompt: string;
  generatedContent: string;
  editableContent: string;

  // Метаданные
  inputSource: "voice" | "text" | null;
  currentStep: CreatePostStep;

  // Actions
  setUserText: (text: string) => void;
  setPrompts: (prompts: PromptItem[]) => void;
  addPrompt: (prompt: PromptItem) => void;
  removePrompt: (id: string) => void;
  updatePrompt: (id: string, content: string) => void;
  setFinalPrompt: (prompt: string) => void;
  setGeneratedContent: (content: string) => void;
  setEditableContent: (content: string) => void;
  setInputSource: (source: "voice" | "text" | null) => void;
  setCurrentStep: (step: CreatePostStep) => void;

  // Утилиты
  reset: () => void;
  canProceedFromStep: (step: CreatePostStep) => boolean;
  buildFinalPrompt: () => string;
}

const initialState = {
  userText: "",
  prompts: [],
  finalPrompt: "",
  generatedContent: "",
  editableContent: "",
  inputSource: null,
  currentStep: "select" as CreatePostStep,
};

export const useCreatePostStore = create<CreatePostState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUserText: (text: string) => set({ userText: text }),
      setPrompts: (prompts: PromptItem[]) => set({ prompts }),
      addPrompt: (prompt: PromptItem) =>
        set((state) => ({ prompts: [...state.prompts, prompt] })),
      removePrompt: (id: string) =>
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id),
        })),
      updatePrompt: (id: string, content: string) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, content } : p
          ),
        })),
      setFinalPrompt: (prompt: string) => set({ finalPrompt: prompt }),
      setGeneratedContent: (content: string) =>
        set({ generatedContent: content }),
      setEditableContent: (content: string) =>
        set({ editableContent: content }),
      setInputSource: (source: "voice" | "text" | null) =>
        set({ inputSource: source }),
      setCurrentStep: (step: CreatePostStep) => set({ currentStep: step }),

      reset: () => set(initialState),

      buildFinalPrompt: () => {
        const state = get();
        const promptParts: string[] = [];

        if (state.userText.trim()) {
          promptParts.push(`Пользовательский запрос: ${state.userText.trim()}`);
        }

        state.prompts.forEach((prompt, index) => {
          if (prompt.content.trim()) {
            promptParts.push(`Промпт ${index + 1}: ${prompt.content.trim()}`);
          }
        });

        return promptParts.join("\n\n");
      },

      canProceedFromStep: (step: CreatePostStep) => {
        const state = get();

        switch (step) {
          case "select":
            return true;
          case "voice":
          case "text":
            return state.userText.trim().length > 0;
          case "format":
            return (
              state.userText.trim().length > 0 ||
              state.prompts.some((p) => p.content.trim().length > 0)
            );
          case "generate":
            return (
              state.userText.trim().length > 0 ||
              state.prompts.some((p) => p.content.trim().length > 0)
            );
          case "preview":
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = state.editableContent;
            const textContent = tempDiv.textContent || tempDiv.innerText || "";
            return textContent.trim().length > 0;
          default:
            return false;
        }
      },
    }),
    {
      name: "create-post-store",
      // Исключаем временные данные из персистентности
      partialize: (state) => ({
        userText: state.userText,
        prompts: state.prompts,
        finalPrompt: state.finalPrompt,
        generatedContent: state.generatedContent,
        editableContent: state.editableContent,
        inputSource: state.inputSource,
        // currentStep не сохраняем - всегда начинаем с select
      }),
    }
  )
);
