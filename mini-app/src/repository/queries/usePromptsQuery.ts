import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import type { Prompt } from "@/types/prompt";

export const usePromptsQuery = () => {
  return useQuery<Prompt[], Error>({
    queryKey: ["prompts"],
    queryFn: async () => {
      return clientApi.getPrompts();
    },
  });
};
