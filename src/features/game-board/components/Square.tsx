import { Piece as PieceComponent } from './Piece';
import { useSquare } from '../hooks/useSquare';
import { getSquareFile } from '../utils/board-utility/getSquareFile';
import { getSquareRank } from '../utils/board-utility/getSquareRank';
import { Piece } from 'base/zod/PieceSchema';
import { BoardFile } from 'base/zod/emums/BoardFile';

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
  const { handleClick, classes } = useSquare(
    index,
    currentPiece,
    isStartPos,
    handleSquareClicked
  );

  const rank = getSquareRank(index);
  const file = getSquareFile(index);

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {rank === 1 && (
        <div className='absolute text-orange-600 bottom-0 right-0.5 text-xs'>{file}</div>
      )}
      {file === BoardFile.A && (
        <div className='absolute text-orange-600 top-0 left-0.5 text-xs'>{rank}</div>
      )}
      <div className='flex p-2 max-w-1/2 max-h-1/2 relative z-10'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}
      </div>
    </div>
  );
}
