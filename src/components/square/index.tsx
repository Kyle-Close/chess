import { Piece } from '../../context/board/InitialState';
import { getSquareFile } from '../../helpers/analysis/board-mapping/getSquareFile';
import { getSquareRank } from '../../helpers/analysis/board-mapping/getSquareRank';
import { getKingIndex } from '../../helpers/analysis/game-checks/getKingIndex';
import { useAppSelector } from '../../hooks/useBoard';
import { useSquare } from '../../hooks/useSquare';
import { selectPlayerById } from '../../redux/slices/player';
import { Piece as PieceComponent } from '../piece';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
  isValidMove: boolean;
  isCapture: boolean;
  isCheck: boolean;
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
  isValidMove,
  isCapture,
  isCheck,
}: SquareProps) {
  const { handleClick, classes } = useSquare(
    index,
    isCheck,
    currentPiece,
    isStartPos,
    handleSquareClicked
  );

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

    if (isValidMove && !isCapture) circleClasses.push('bg-green-600');
    else if (isValidMove && isCapture) circleClasses.push('bg-red-500');

    return circleClasses.join(' ');
  };

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {rank === 1 && (
        <div className='absolute text-orange-600 bottom-0 right-0.5 text-xs'>{file}</div>
      )}
      {file === 'a' && (
        <div className='absolute text-orange-600 top-0 left-0.5 text-xs'>{rank}</div>
      )}
      <div className='flex p-2 max-w-1/2 max-h-1/2 relative z-10'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}
        {isValidMove && <div className={buildCircleClasses()}></div>}
      </div>
    </div>
  );
}
