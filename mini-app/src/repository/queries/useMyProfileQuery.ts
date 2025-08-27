import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ["my-profile"],
    staleTime: Infinity,
    queryFn: clientApi.getMyProfile,
  });
};
