import { Files } from './Files';
import { Ranks } from './Ranks';
import { Square } from '../square';
import { useBoard } from '../../hooks/useBoard';

export function Board() {
  const { board, startPos, handleSquareClicked, handleRightClickOnBoard } =
    useBoard();
  return (
    <div onAuxClick={handleRightClickOnBoard} className='flex grow relative'>
      <Ranks />
      <div className='flex flex-col grow relative'>
        <div className='grid grid-cols-8 grid-rows-8 grow gap-1'>
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
              />
            );
          })}
        </div>
        <Files />
      </div>
    </div>
  );
}
