import { QueryClient, dehydrate, QueryKey } from "@tanstack/react-query";

/**
 * Prefetches data for React Query on the server.
 * 
 * @param queryKey - Unique key for the query.
 * @param queryFn - Function that fetches the data.
 * @param staleTime - Time before the query is considered stale (default: 5 minutes).
 * @returns A dehydrated state of the query.
 */
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

  try {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });

    return dehydrate(queryClient);
  } finally {
    // Adding this here to prevent memory leaks
    queryClient.clear(); 
  }
}
