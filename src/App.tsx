import { MovePiece } from './components/MovePiece';
import { Board } from './components/board';

function App() {
  return (
    <div className='flex grow gap-8 justify-center'>
      <div className='flex grow h-96 max-w-96'>
        <Board />
      </div>
      <MovePiece />
    </div>
  );
}

export default App;
