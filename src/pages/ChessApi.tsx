import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Board as BoardComponent } from 'base/features/game-board/components/Board';
import { Game, GameSchema } from 'base/zod/GameSchema';
import { useEffect } from 'react';

const startNewGame = async (fen?: string): Promise<Game> => {
  try {
    const response = await fetch("http://localhost:5165/chess-api/start-game", {
      method: "POST",
      body: fen ? JSON.stringify({ fen }) : undefined,
      headers: fen ? { "Content-Type": "application/json" } : undefined,
    });

    if (!response.ok) {
      throw new Error("Could not start new game.");
    }

    const jsonData = await response.json();
    const res = GameSchema.parse(jsonData);

    return res;
  } catch (err) {
    console.error('Error starting new game:', err);
    throw err;
  }
};

export function ChessApi() {
  const queryClient = useQueryClient()
  const gameMutation = useMutation({
    mutationFn: startNewGame,
    mutationKey: ["game"],
    onSuccess: (gameData) => {
      queryClient.setQueryData(["game"], gameData)
    }
  });

  useEffect(() => {
    gameMutation.mutate("rn1qk1n1/ppp3pp/3pbp2/8/1bBQP3/2N1rN2/PP3PPP/R1B1K2R w KQq - 0 1");
  }, [])

  if (gameMutation.isError) {
    console.log("Some error happened.")
  }

  if (!gameMutation.data) return;

  return (
    <div className={getGameClasses()}>
      <BoardComponent board={gameMutation.data.board} />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
