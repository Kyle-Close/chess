import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Board as BoardComponent } from 'base/features/game-board/components/Board';
import { Game, GameSchema } from 'base/zod/GameSchema';
import { useEffect } from 'react';

const startNewGame = async (): Promise<Game> => {
  try {
    console.log("Starting new game. Sending request to server")

    const response = await fetch("http://localhost:5165/chess-api/start-game", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Could not start new game.");
    }

    const jsonData = await response.json();
    console.log(jsonData)
    const res = GameSchema.parse(jsonData);
    console.log(res)

    return res
  } catch (err) {
    console.log('in catch block: ', err)
    throw err;
  }
};

export function ChessApi() { // this should be under a pages directory.
  const queryClient = useQueryClient()
  const gameMutation = useMutation({
    mutationFn: startNewGame,
    mutationKey: ["game"]
  });

  useEffect(() => {
    gameMutation.mutate();
  }, [])

  if (gameMutation.isSuccess) {
    queryClient.setQueryData(["game"], gameMutation.data)
    console.log(gameMutation.data)
  }

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
