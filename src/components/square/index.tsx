import { Piece } from '../../context/board/InitialState';
import { useSquare } from '../../hooks/useSquare';
import { Piece as PieceComponent } from '../piece';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
  isValidMove: boolean;
  isCapture: boolean;
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
  isValidMove,
  isCapture,
}: SquareProps) {
  const { handleClick, classes } = useSquare(index, currentPiece, isStartPos, handleSquareClicked);
  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      <div className='flex p-2 max-w-1/2 max-h-1/2 relative z-10'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}
        {isValidMove && !isCapture && (
          <div className='bg-green-500 rounded-full flex max-w-4 min-h-4 min-w-4 max-h-4 left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2'></div>
        )}
        {isValidMove && isCapture && (
          <div className='bg-red-500 rounded-full flex max-w-4 min-h-4 min-w-4 max-h-4 left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2'></div>
        )}
      </div>
    </div>
  );
}
