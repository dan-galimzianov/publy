import { clientApi } from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";

export const useGenerateTextMutation = () => {
  return useMutation({
    mutationFn: clientApi.generateText,
  });
};
