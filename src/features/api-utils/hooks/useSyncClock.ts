import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { sendPost } from "../sendPost";

export function useSyncClock() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const syncClockMutation = useMutation<Game, Error, SyncClockPayload>({
    mutationKey: ["game", gameId],
    mutationFn: syncClock,
    onSuccess: (game) => queryClient.setQueryData(['game', game.id], game)
  })

  return syncClockMutation;
}

interface SyncClockPayload {
  gameId: string,
}

async function syncClock(body: SyncClockPayload): Promise<Game> {
  console.log('attempting to sync clock')
  try {
    return await sendPost('update-clock', body, GameSchema);
  } catch (err) {
    console.error('Error syncing clock with server', err);
    throw err;
  }
}
