import { Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { usePiece } from '../../hooks/Piece';
import { getPieceAbbreviation } from '../board/helpers';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
}: SquareProps) {
  const classes = ['flex', 'justify-center', 'items-center', 'bg-zinc-500'];

  if (currentPiece && currentPiece.color === PieceColor.BLACK)
    classes.push('text-black');

  if (isStartPos) classes.push('bg-green-200');
  else if (currentPiece === null) classes.push('text-amber-100');

  const handleClick = () => {
    handleSquareClicked(index);
  };

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {getPieceAbbreviation(currentPiece)}
    </div>
  );
}
