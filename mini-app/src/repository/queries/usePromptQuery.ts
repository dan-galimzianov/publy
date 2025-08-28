import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import { Prompt } from "@/types/prompt";

export const usePromptQuery = (id: string, options?: UseQueryOptions<Prompt, Error>) => {
  return useQuery({
    queryKey: ["prompt", id],
    queryFn: () => clientApi.getPrompt(id)(),
    enabled: !!id,
    ...options,
  });
};
