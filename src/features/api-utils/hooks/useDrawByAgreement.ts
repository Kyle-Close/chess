import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { sendPost } from "../sendPost";

export function useDrawByAgreement() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const resignMutation = useMutation<Game, Error, DrawByAgreementPayload>({
    mutationKey: ["game", gameId],
    mutationFn: drawByAgreement,
    onSuccess: (game) => queryClient.setQueryData(['game', game.id], game)
  })

  return resignMutation;
}

interface DrawByAgreementPayload {
  gameId: string
}

async function drawByAgreement(body: DrawByAgreementPayload): Promise<Game> {
  try {
    return await sendPost('draw-by-agreement', body, GameSchema);
  } catch (err) {
    console.error('Error attempting to draw by agreement', err);
    throw err;
  }
}
