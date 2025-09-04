import { Piece } from "../../../zod/PieceSchema";
import { Color } from "../../../zod/emums/Color";
import { getSquareRank } from "../utils/board-utility/getSquareRank";


export function useSquare(
  index: number,
  currentPiece: Piece | null,
  isStartPos: boolean,
  handleSquareClicked: (index: number) => void
) {
  const rankNumber = Number(getSquareRank(index));
  const remainderForBlueSquareFirst = rankNumber % 2 === 1 ? 0 : 1;
  let bgColor = index % 2 === remainderForBlueSquareFirst ? 'bg-sky-800' : 'bg-gray-200';
  if (isStartPos) bgColor = 'bg-green-600';

  const classes = ['flex', 'justify-center', 'items-center', 'relative', bgColor];

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
