import { Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
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
  const classes = ['flex', 'justify-center', 'items-center'];

  if (currentPiece && currentPiece.color === PieceColor.BLACK)
    classes.push('text-black');

  if (isStartPos) classes.push('bg-green-300');
  else classes.push('bg-zinc-500');

  const handleClick = () => {
    handleSquareClicked(index);
  };

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {getPieceAbbreviation(currentPiece)}
      {isValidMove && (
        <div className='bg-green-200 w-1/3 h-1/3 rounded-full'></div>
      )}
    </div>
  );
}
