import { useQuery } from '@tanstack/react-query';
import { Board as BoardComponent } from 'base/features/game-board/components/Board';
import { Board, BoardSchema } from 'base/zod/BoardSchema';

const startNewGame = async (): Promise<Board> => {
  try {
    const response = await fetch("http://localhost:5165/chess-api/start-game", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Could not start new game.");
    }
    const jsonData = await response.json();
    return BoardSchema.parse(jsonData)
  } catch (err) {
    throw err;
  }
};

export function ChessApi() { // this should be under a pages directory.
  const game = useQuery({ queryKey: ["game"], queryFn: startNewGame });

  if (game.isError) {
    return;
  } else if (game.isLoading) {
    return;
  }

  console.log(game.data);

  return (
    <div className={getGameClasses()}>
      <BoardComponent />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
