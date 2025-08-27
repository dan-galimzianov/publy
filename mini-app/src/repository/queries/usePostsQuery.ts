import { clientApi } from "@/shared/api/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: clientApi.getPosts,
  });
};

export const useSuspensePostsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: clientApi.getPosts,
  });
};
