import { useEffect } from 'react';
import { MatchResult } from './redux/slices/gameInfo';
import { useAppSelector } from './hooks/useBoard';

interface AppProps {
  children?: React.ReactNode;
}

function App({ children }: AppProps) {
  return <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>{children}</div>;
}

export default App;
