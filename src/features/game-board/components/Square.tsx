import { Piece as PieceComponent } from './Piece';
import { useSquare } from '../hooks/useSquare';
import { getFileLetter, getSquareFile } from '../utils/board-utility/getSquareFile';
import { getSquareRank } from '../utils/board-utility/getSquareRank';
import { Piece } from 'base/zod/PieceSchema';
import { BoardFile } from 'base/zod/emums/BoardFile';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
  isCaptureSquare: boolean,
  isValidSquare: boolean,
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
  isCaptureSquare,
  isValidSquare
}: SquareProps) {
  const { handleClick, classes } = useSquare(
    index,
    currentPiece,
    isStartPos,
    handleSquareClicked
  );

  const showIndexes = true;

  const rank = getSquareRank(index);
  const file = getSquareFile(index);

  const buildCircleClasses = () => {
    const circleClasses = [
      'rounded-full',
      'flex',
      'max-w-4',
      'min-h-4',
      'min-w-4',
      'max-h-4',
      'left-1/2',
      'top-1/2',
      'absolute',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
    ];

    if (isValidSquare) circleClasses.push('bg-green-600');
    else if (isCaptureSquare) circleClasses.push('bg-red-500');

    return circleClasses.join(' ');
  };

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {rank === 1 && (
        <div className='absolute text-orange-600 bottom-0 right-0.5 text-xs'>{getFileLetter(file).toLowerCase()}</div>
      )}
      {file === BoardFile.A && (
        <div className='absolute text-orange-600 top-0 left-0.5 text-xs'>{rank}</div>
      )}
      {
        showIndexes && (<div className='absolute text-black top-1 right-1.5 text-[10px]'>{index}</div>)
      }
      <div className='flex p-2 max-w-1/2 max-h-1/2 relative z-10'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}

        {isCaptureSquare && <div className={buildCircleClasses()}></div>}
        {isValidSquare && <div className={buildCircleClasses()}></div>}
      </div>
    </div>
  );
}


