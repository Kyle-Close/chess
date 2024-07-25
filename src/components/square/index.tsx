import { Piece } from '../../context/board/InitialState';
import { getSquareFile } from '../../helpers/analysis/board-mapping/getSquareFile';
import { getSquareRank } from '../../helpers/analysis/board-mapping/getSquareRank';
import { useSquare } from '../../hooks/useSquare';
import { Piece as PieceComponent } from '../piece';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
  isValidMove: boolean;
  isCapture: boolean;
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
  isValidMove,
  isCapture,
}: SquareProps) {
  const { handleClick, classes } = useSquare(index, currentPiece, isStartPos, handleSquareClicked);
  const rank = getSquareRank(index);
  const file = getSquareFile(index);
  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {rank === 1 && <div className='absolute text-orange-600 bottom-1 right-1'>{file}</div>}
      {file === 'a' && <div className='absolute text-orange-600 top-1 left-1'>{rank}</div>}
      {false && (
        <div className='absolute text-red-500 text-xs top-0 left-0 opacity-50'>{index}</div>
      )}
      <div className='flex p-2 max-w-1/2 max-h-1/2 relative z-10'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}
        {isValidMove && !isCapture && (
          <div className='bg-green-600 rounded-full flex max-w-4 min-h-4 min-w-4 max-h-4 left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2'></div>
        )}
        {isValidMove && isCapture && (
          <div className='bg-red-500 rounded-full flex max-w-4 min-h-4 min-w-4 max-h-4 left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2'></div>
        )}
      </div>
    </div>
  );
}
