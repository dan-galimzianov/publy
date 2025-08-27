import { clientApi } from "@/shared/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
