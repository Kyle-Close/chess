import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { sendPost } from "../sendPost";

export function useExecuteStockfishMove() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const executeStockfishMoveMutation = useMutation<Game, Error, ExecuteStockfishMovePayload>({
    mutationKey: ["game", gameId],
    mutationFn: executeMove,
    onSuccess: (game) => queryClient.setQueryData(['game', game.id], game)
  })

  return executeStockfishMoveMutation;
}

interface ExecuteStockfishMovePayload {
  gameId: string,
  strength: number
}

async function executeMove(body: ExecuteStockfishMovePayload): Promise<Game> {
  try {
    return await sendPost('stockfish-move', body, GameSchema);
  } catch (err) {
    console.error('Error starting new game:', err);
    throw err;
  }
}
