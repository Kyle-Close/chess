import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { PieceType } from "base/zod/emums/PieceType";
import { sendPost } from "../sendPost";

export function useExecuteMove() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const executeMoveMutation = useMutation<Game, Error, ExecuteMovePayload>({
    mutationKey: ["game", gameId],
    mutationFn: executeMove,
    onSuccess: (game) => queryClient.setQueryData(['game', game.id], game)
  })

  return executeMoveMutation;
}

interface ExecuteMovePayload {
  gameId: string,
  start: number,
  promotionPiece?: PieceType
  end: number,
}

async function executeMove(body: ExecuteMovePayload): Promise<Game> {
  try {
    return await sendPost('execute-move', body, GameSchema);
  } catch (err) {
    console.error('Error starting new game:', err);
    throw err;
  }
}
