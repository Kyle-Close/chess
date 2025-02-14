import { useAppSelector, useBoard } from '../hooks/useBoard';
import { Square } from './Square';

export function Board() {
  const board = useAppSelector((state) => state.board);
  const { startPos, handleSquareClicked, handleRightClickOnBoard, checkIndex } = useBoard();

  return (
    <div onAuxClick={handleRightClickOnBoard} className={getBoardClasses()}>
      <div className='grid grid-cols-8 grid-rows-8 grow'>
        {board.map((square, key) => {
          const isStart = startPos === key;
          const isCheck = checkIndex === key;
          return (
            <Square
              currentPiece={square.piece}
              isCheck={isCheck}
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
  );
}

function getBoardClasses() {
  const core = ['flex', 'flex-grow'];
  const responsive = [
    'min-w-80',
    'xs:min-w-96',
    'sm:min-w-128',
    'lg:min-w-160',
    'max-w-80',
    'xs:max-w-96',
    'sm:max-w-128',
    'lg:max-w-160',
    'min-h-80',
    'xs:min-h-96',
    'sm:min-h-128',
    'lg:min-h-160',
    'max-h-80',
    'xs:max-h-96',
    'sm:max-h-128',
    'lg:max-h-160',
  ];

  return [...core, ...responsive].join(' ');
}
