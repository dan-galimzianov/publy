import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import type { CreatePromptDto } from "@/shared/api/endpoints/prompt";
import type { Prompt } from "@/types/prompt";

export const useCreatePromptMutation = (
  options?: MutationOptions<Prompt, Error, CreatePromptDto>
) => {
  const queryClient = useQueryClient();

  return useMutation<Prompt, Error, CreatePromptDto>({
    mutationFn: async (data: CreatePromptDto) => {
      return clientApi.createPrompt(data);
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["prompts"] });
      options?.onSuccess?.(...args);
    },
  });
};
