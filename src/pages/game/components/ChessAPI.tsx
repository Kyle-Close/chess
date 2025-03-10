import { Board } from 'base/features/game-board/components/Board';
import { useBuildBoardFromFenQuery } from 'base/redux/slices/chess-api';
import { useEffect } from 'react';

export function ChessAPI() { // this should be under a pages directory.

  const { data, isLoading, error, refetch } = useBuildBoardFromFenQuery("rnbqkbnr/ppp2ppp/8/3Pp3/8/8/PPPP1PPP/RNBQKBNR");

  useEffect(() => {
    refetch()
  }, [])

  if (isLoading) return;
  else if (error) return <div>{error.toString()}</div>
  if (!data) return;

  return (
    <div className={getGameClasses()}>
      <Board board={data} />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
