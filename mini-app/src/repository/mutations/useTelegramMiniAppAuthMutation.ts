import { clientApi } from "@/shared/api/client";
import { User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useMiniAppAuthMutation = (
  options?: UseMutationOptions<User, Error, { initData: string }>
) => {
  return useMutation({
    ...options,
    mutationFn: clientApi.telegramAuth,
  });
};
