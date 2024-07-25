import { useEffect } from 'react';
import { MatchResult } from './redux/slices/gameInfo';
import { useAppSelector } from './hooks/useBoard';

interface AppProps {
  children?: React.ReactNode;
}

function App({ children }: AppProps) {
  const gameInfo = useAppSelector((state) => state.gameInfo);

  useEffect(() => {
    if (gameInfo.matchResult !== null) {
      if (gameInfo.matchResult === MatchResult.ONGOING) return;
      if (gameInfo.matchResult === MatchResult.DRAW) console.log('Game over, draw.');
      else console.log(`Game over! ${gameInfo.matchResult} has won.`);
    }
  }, [gameInfo.matchResult]);

  return <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>{children}</div>;
}

export default App;
