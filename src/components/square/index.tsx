import { Pieces } from '../../enums/Pieces';
import { usePiece } from '../../hooks/Piece';
import { getPieceAbbreviation } from '../board/helpers';

interface SquareProps {
  currentPiece: Pieces;
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
  const { isWhite, isEmpty } = usePiece();
  const classes = ['flex', 'justify-center', 'items-center', 'bg-zinc-500'];

  if (!isWhite(currentPiece)) classes.push('text-black');
  if (isStartPos) classes.push('bg-green-200');
  else if (isEmpty(currentPiece)) classes.push('text-amber-100');

  const handleClick = () => {
    handleSquareClicked(index);
  };

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {getPieceAbbreviation(currentPiece)}
    </div>
  );
}
