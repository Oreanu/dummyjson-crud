import { QueryClient, dehydrate, QueryKey } from "@tanstack/react-query";

export async function prefetchQueryData<T>({
  queryKey,
  queryFn,
  staleTime = 1000 * 60 * 5, // Default to 5 minutes
}: {
  queryKey: QueryKey; 
  queryFn: () => Promise<T>; 
  staleTime?: number;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<T>({
    queryKey,
    queryFn,
    staleTime,
  });

  return dehydrate(queryClient);
}
