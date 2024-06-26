import { Piece } from '../../context/board/InitialState';
import { useSquare } from '../../hooks/useSquare';

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
      <div className='absolute top-0 left-0 text-xs text-gray-400'>{index}</div>
      {isValidMove && !isCapture && <div className='bg-green-200 w-1/3 h-1/3 rounded-full'></div>}
      {isValidMove && isCapture && <div className='bg-red-400 w-1/3 h-1/3 rounded-full'></div>}
    </div>
  );
}
