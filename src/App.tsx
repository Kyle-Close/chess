import { Game } from './components/game';
import { GameSetup } from './components/game-setup';

function App() {
  return (
    <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>
      <GameSetup />
    </div>
  );
}

export default App;
