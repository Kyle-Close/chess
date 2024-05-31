import { Board } from './components/board';
import { GameInfo } from './components/game-info';
import { SetupGame } from './components/setup';

function App() {
  return (
    <div className='flex flex-col grow gap-8 justify-center items-center'>
      <GameInfo />
      <div className='flex grow min-h-96 min-w-96 h-96 max-w-96 '>
        <Board />
      </div>
      <SetupGame />
    </div>
  );
}

export default App;
