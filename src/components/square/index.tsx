import { Pieces } from '../../enums/Pieces';
import { usePiece } from '../../hooks/Piece';
import { useStartEndAction } from '../../hooks/useStartEndAction';
import { getPieceAbbreviation } from '../board/helpers';

interface SquareProps {
  currentPiece: Pieces;
  index: number;
}

export function Square({ currentPiece, index }: SquareProps) {
  const { setPosition, clear } = useStartEndAction((s, e) => console.log(s, e));
  const { isWhite, isEmpty } = usePiece();
  const classes = ['flex', 'justify-center', 'items-center', 'bg-zinc-500'];
  if (!isWhite(currentPiece)) classes.push('text-black');
  else if (isEmpty(currentPiece)) classes.push('text-amber-100');

  const handleClick = () => {
    setPosition(index);
  };

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {getPieceAbbreviation(currentPiece)}
    </div>
  );
}
