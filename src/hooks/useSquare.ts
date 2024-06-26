import { Piece } from '../context/board/InitialState';
import { PieceColor } from '../enums/PieceColor';
import { getSquareRank } from '../helpers/analysis/board-mapping/getSquareRank';

export function useSquare(
  index: number,
  currentPiece: Piece | null,
  isStartPos: boolean,
  handleSquareClicked: (index: number) => void
) {
  const rankNumber = Number(getSquareRank(index));
  const remainderForBlueSquareFirst = rankNumber % 2 === 1 ? 0 : 1;
  const bgColor = index % 2 === remainderForBlueSquareFirst ? 'bg-sky-800' : 'bg-gray-200';
  const classes = ['flex', 'justify-center', 'items-center', 'relative', bgColor, 'bg-opacity-80'];

  if (currentPiece && currentPiece.color === PieceColor.BLACK) classes.push('text-black');

  const handleClick = () => {
    handleSquareClicked(index);
  };

  return {
    handleClick,
    classes,
  };
}
