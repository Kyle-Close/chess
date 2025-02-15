import { Piece } from "base/data/getInitialBoardState";
import { getSquareRank } from "../utils/board-utility/getSquareRank";
import { PieceColor } from "./usePiece";

export function useSquare(
  index: number,
  checkSquare: boolean,
  currentPiece: Piece | null,
  isStartPos: boolean,
  handleSquareClicked: (index: number) => void
) {
  const rankNumber = Number(getSquareRank(index));
  const remainderForBlueSquareFirst = rankNumber % 2 === 1 ? 0 : 1;
  const bgColor = index % 2 === remainderForBlueSquareFirst ? 'bg-sky-800' : 'bg-gray-200';
  const classes = ['flex', 'justify-center', 'items-center', 'relative', bgColor];

  if (currentPiece && currentPiece.color === PieceColor.BLACK) classes.push('text-black');
  if (isStartPos) classes.push('bg-green-500');
  if (checkSquare) classes.push('bg-red-400');

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
