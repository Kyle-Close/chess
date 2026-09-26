import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../baseUrl";

/**
 * Pings the API once per session. The host sleeps when idle, so this doubles as a wake-up call
 * that avoids a slow first request when creating a game. Any HTTP response means it's awake.
 */
export function useServerStatus() {
  const query = useQuery({
    queryKey: ['server-ping'],
    queryFn: async () => {
      await fetch(`${BASE_URL}/ping`, { cache: 'no-store' });
      return true;
    },
    staleTime: Infinity,
    retry: 4,
    retryDelay: 2500,
  });

  if (query.isSuccess) return 'online' as const;
  if (query.isError) return 'offline' as const;
  return 'waking' as const;
}
