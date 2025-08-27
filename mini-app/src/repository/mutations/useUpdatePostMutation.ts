import { clientApi } from "@/shared/api/client";
import { Post, PostStatus } from "@/types";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdatePostMutation = (
  options: UseMutationOptions<
    Post,
    Error,
    { id: string; data: { content?: string; status?: PostStatus } }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { content?: string; status?: PostStatus };
    }) => await clientApi.updatePost(id, data),
    ...options,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
        refetchType: "all",
      });
      await queryClient.setQueryData(["post", data.id], data);
      options.onSuccess?.(data, variables, context);
    },
  });
};
