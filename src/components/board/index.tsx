import { Square } from '../square';
import { useBoard } from '../../hooks/useBoard';

export function Board() {
  const { board, startPos, handleSquareClicked, handleRightClickOnBoard } = useBoard();
  return (
    <div onAuxClick={handleRightClickOnBoard} className='flex grow'>
      <div className='flex flex-grow max-w-96 min-h-96 max-h-96'>
        <div className='grid grid-cols-8 grid-rows-8 grow'>
          {board.map((square, key) => {
            const isStart = startPos === key;
            return (
              <Square
                currentPiece={square.piece}
                index={key}
                key={key}
                handleSquareClicked={handleSquareClicked}
                isStartPos={isStart}
                isValidMove={square.isValidMove}
                isCapture={square.isCapture}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
