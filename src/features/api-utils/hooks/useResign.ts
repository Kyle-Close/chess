import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { sendPost } from "../sendPost";
import { Color } from "base/zod/emums/Color";

export function useResign() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const resignMutation = useMutation<Game, Error, ResignPayload>({
    mutationKey: ["game", gameId],
    mutationFn: resign,
    onSuccess: (game) => queryClient.setQueryData(['game', game.id], game)
  })

  return resignMutation;
}

interface ResignPayload {
  gameId: string,
  resigningColor: Color
}

async function resign(body: ResignPayload): Promise<Game> {
  try {
    return await sendPost('resign', body, GameSchema);
  } catch (err) {
    console.error('Error resigning game', err);
    throw err;
  }
}
