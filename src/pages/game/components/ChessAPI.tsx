import { Board } from 'base/features/game-board/components/Board';
import { useStartGameQuery } from 'base/redux/slices/chess-api';
import { useEffect } from 'react';

export function ChessAPI() { // this should be under a pages directory.

  const { data, isLoading, error, refetch } = useStartGameQuery("rn1qk1nr/ppp2ppp/3p2b1/2b1p1B1/4P1P1/3P1N1P/PPP2P2/RN1QKB1R w KQkq - 0 1");

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) return;
  else if (error) return <div>{error.toString()}</div>
  if (!data) return;

  return (
    <div className={getGameClasses()}>
      <Board fen={data.fen} />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
