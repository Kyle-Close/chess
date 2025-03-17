import { Board } from 'base/features/game-board/components/Board';
import { useStartGameMutation } from 'base/redux/slices/chess-api';
import { useEffect } from 'react';

export function ChessAPI() { // this should be under a pages directory.
  const [startGame, { data, isLoading, error }] = useStartGameMutation(); // ✅ Correct way

  useEffect(() => {
    startGame("rnb3nr/p1p1k1pp/3PB3/1pq2p2/1Pbpp2Q/2K1P2P/P2P1PP1/RN3BNR b Kk - 0 20");
  }, [startGame])

  if (isLoading) return;
  else if (error) return <div>{error.toString()}</div>
  if (!data) return;

  return (
    <div className={getGameClasses()}>
      <Board fen={data.fen} gameId={data.gameId} />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
