import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameSchema } from "base/zod/GameSchema";
import { PieceType } from "base/zod/emums/PieceType";
import { sendPost } from "../sendPost";
import { useExecuteStockfishMove } from "./useExecuteStockfishMove";
import { applyOptimisticMove, isGamePlaying } from "base/features/game-board/utils/gameState";
import { toaster } from "base/components/ui/toaster";

export function useExecuteMove() {
  const queryClient = useQueryClient();
  const gameId = localStorage.getItem("gameId");
  const executeStockfishMoveMutation = useExecuteStockfishMove();

  const executeMoveMutation = useMutation<Game, Error, ExecuteMovePayload, { previous?: Game }>({
    mutationKey: ["game", gameId],
    mutationFn: executeMove,
    // Show the move immediately; the server response replaces it (or we roll back on failure)
    onMutate: async (move) => {
      const key = ['game', move.gameId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Game>(key);
      if (previous) queryClient.setQueryData(key, applyOptimisticMove(previous, move));
      return { previous };
    },
    onError: (_err, move, context) => {
      if (context?.previous) queryClient.setQueryData(['game', move.gameId], context.previous);
      toaster.create({ type: 'error', title: "Move couldn't be played", description: 'The server rejected the move or could not be reached.' });
    },
    onSuccess: (game) => {
      queryClient.setQueryData(['game', game.id], game)
      if (!game.stockfishInfo || !isGamePlaying(game)) return;
      executeStockfishMoveMutation.mutate({ gameId: game.id, strength: game.stockfishInfo.strength })
    }
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
    console.error('Error executing move:', err);
    throw err;
  }
}
