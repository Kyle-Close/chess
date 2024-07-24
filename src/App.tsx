import { useGameInfo } from './hooks/useGameInfo';

interface AppProps {
  children?: React.ReactNode;
}

function App({ children }: AppProps) {
  const gameInfoHook = useGameInfo();
  return <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>{children}</div>;
}

export default App;
