import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import { toast } from "sonner";

interface DeletePromptMutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useDeletePromptMutation = ({
  onSuccess,
  onError,
}: DeletePromptMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (promptId: string) => clientApi.deletePrompt(promptId)(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success("Промпт успешно удален", {
        position: "top-right",
        duration: 1000,
      });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Ошибка при удалении промпта", {
        position: "top-right",
        duration: 1000,
      });
      onError?.();
    },
  });
};
