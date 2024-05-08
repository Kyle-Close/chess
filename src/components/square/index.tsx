import { Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { useSquare } from '../../hooks/useSquare';
import { getPieceAbbreviation } from '../board/helpers';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
  isValidMove: boolean;
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
  isValidMove,
}: SquareProps) {
  const { handleClick, classes } = useSquare(
    index,
    currentPiece,
    isStartPos,
    handleSquareClicked
  );
  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {getPieceAbbreviation(currentPiece)}
      {isValidMove && (
        <div className='bg-green-200 w-1/3 h-1/3 rounded-full'></div>
      )}
    </div>
  );
}
