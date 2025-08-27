import { clientApi } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";

export const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => clientApi.getPost(id),
    enabled: !!id,
  });
};
