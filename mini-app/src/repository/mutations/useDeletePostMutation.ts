import { clientApi } from "@/shared/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientApi.deletePost(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
