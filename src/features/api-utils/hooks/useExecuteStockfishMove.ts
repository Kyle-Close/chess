import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { sendPost } from "../sendPost";
import { toaster } from "base/components/ui/toaster";

export function useExecuteStockfishMove() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");

  const executeStockfishMoveMutation = useMutation<Game, Error, ExecuteStockfishMovePayload>({
    mutationKey: ["game", gameId],
    mutationFn: executeMove,
    onSuccess: (game) => queryClient.setQueryData(['game', game.id], game),
    onError: (_err, payload) => {
      toaster.create({
        type: 'error',
        title: "Stockfish didn't respond",
        description: 'The engine request failed.',
        duration: 10000,
        action: { label: 'Retry', onClick: () => executeStockfishMoveMutation.mutate(payload) },
      });
    }
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
    console.error('Error requesting stockfish move:', err);
    throw err;
  }
}
