import { getQueryClient } from "@/shared/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { serverApi } from "@/shared/api/server";

export async function PrefetchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-profile"],
    queryFn: serverApi.getMyProfile,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}