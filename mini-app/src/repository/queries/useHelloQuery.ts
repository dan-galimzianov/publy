import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";

export const useHelloQuery = () => {
  return useQuery({
    queryKey: ["hello"],
    staleTime: 1000 * 60 * 5,
    queryFn: clientApi.getHello,
  });
};
