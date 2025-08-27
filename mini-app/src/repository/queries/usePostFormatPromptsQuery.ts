import { clientApi } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";

export const usePostFormatPromptsQuery = () => {
  return useQuery({
    queryKey: ["postFormatPrompts"],
    queryFn: clientApi.getPostFormatPrompts,
  });
};
