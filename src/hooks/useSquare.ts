import { Piece } from '../context/board/InitialState';
import { PieceColor } from '../enums/PieceColor';

export function useSquare(
  index: number,
  currentPiece: Piece | null,
  isStartPos: boolean,
  handleSquareClicked: (index: number) => void
) {
  const classes = ['flex', 'justify-center', 'items-center'];

  if (currentPiece && currentPiece.color === PieceColor.BLACK)
    classes.push('text-black');

  if (isStartPos) classes.push('bg-green-300');
  else classes.push('bg-zinc-500');

  const handleClick = () => {
    handleSquareClicked(index);
  };

  return {
    handleClick,
    classes,
  };
}
