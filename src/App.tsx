import { Board } from './components/board';
import { Pieces } from './enums/Pieces';
import { usePiece } from './hooks/Piece';
import { useGameBoard } from './hooks/game_board';

function App() {
  const { board, setBoard } = useGameBoard();
  const { move } = usePiece();

  return (
    <div className='flex grow h-96 max-w-96'>
      <Board gameBoard={board} />
    </div>
  );
}

export default App;
