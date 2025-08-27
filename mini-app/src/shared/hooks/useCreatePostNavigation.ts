import { useRouter } from "next/navigation";
import { useCreatePostStore } from "@/shared/stores";
import type { CreatePostStep } from "@/shared/stores";

export const useCreatePostNavigation = () => {
  const router = useRouter();
  const { setCurrentStep, inputSource, reset } = useCreatePostStore();

  const navigateToStep = (step: CreatePostStep) => {
    setCurrentStep(step);

    switch (step) {
      case "select":
        router.push("/");
        break;
      case "voice":
        router.push("/create/voice");
        break;
      case "text":
        router.push("/create/text");
        break;
      case "format":
        router.push("/create/format");
        break;
      case "generate":
        router.push("/create/generate");
        break;
      case "preview":
        router.push("/create/preview");
        break;
    }
  };

  const goBack = (currentStep: CreatePostStep) => {
    switch (currentStep) {
      case "voice":
      case "text":
        navigateToStep("select");
        break;
      case "format":
        navigateToStep(inputSource === "voice" ? "voice" : "text");
        break;
      case "generate":
        navigateToStep("format");
        break;
      case "preview":
        navigateToStep("generate");
        break;
      default:
        navigateToStep("select");
    }
  };

  const goNext = (currentStep: CreatePostStep) => {
    switch (currentStep) {
      case "select":
        // Должен быть выбран конкретный способ ввода
        break;
      case "voice":
      case "text":
        navigateToStep("format");
        break;
      case "format":
        navigateToStep("generate");
        break;
      case "generate":
        navigateToStep("preview");
        break;
      case "preview":
        // Создание поста - выход из флоу
        break;
    }
  };

  const cancelAndExit = () => {
    reset();
    router.push("/posts");
  };

  return {
    navigateToStep,
    goBack,
    goNext,
    cancelAndExit,
  };
};
