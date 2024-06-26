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
      <div className='flex p-2 max-w-1/2 max-h-1/2 relative'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}
      </div>
    </div>
  );
}
