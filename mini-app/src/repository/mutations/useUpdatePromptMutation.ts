import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import type { UpdatePromptDto } from "@/shared/api/endpoints/prompt";
import type { Prompt } from "@/types/prompt";

type UpdatePromptParams = {
  id: string;
  data: UpdatePromptDto;
};

export const useUpdatePromptMutation = (
  options?: MutationOptions<Prompt, Error, UpdatePromptParams>
) => {
  const queryClient = useQueryClient();

  return useMutation<Prompt, Error, UpdatePromptParams>({
    mutationFn: async ({ id, data }: UpdatePromptParams) => {
      return clientApi.updatePrompt(id, data);
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["prompts"] });
      await queryClient.invalidateQueries({ queryKey: ["prompt", args[0].id] });
      options?.onSuccess?.(...args);
    },
  });
};
