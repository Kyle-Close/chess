import { Piece } from "../../../zod/PieceSchema";
import { Color } from "../../../zod/emums/Color";


export function useSquare(
  index: number,
  currentPiece: Piece | null,
  isStartPos: boolean,
  handleSquareClicked: (index: number) => void,
  rotate: boolean,
  bgColor: string
) {
  if (isStartPos) bgColor = 'bg-green-600';

  const classes = ['flex', 'justify-center', 'items-center', 'relative', bgColor];
  if (rotate) classes.push('rotate-180')

  if (currentPiece && currentPiece.color === Color.BLACK) classes.push('text-black');


  const handleClick = () => {
    handleSquareClicked(index);
  };

  return {
    handleClick,
    classes,
  };
}

export type SquareFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type SquareRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
