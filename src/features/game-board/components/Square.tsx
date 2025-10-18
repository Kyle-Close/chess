import { Piece as PieceComponent } from './Piece';
import { useSquare } from '../hooks/useSquare';
import { getFileLetter, getSquareFile } from '../utils/board-utility/getSquareFile';
import { getSquareRank } from '../utils/board-utility/getSquareRank';
import { Piece } from '../../../zod/PieceSchema';
import { BoardFile } from '../../../zod/emums/BoardFile';
import { Box, Text } from '@chakra-ui/react';

interface SquareProps {
  currentPiece: Piece | null;
  index: number;
  handleSquareClicked: (index: number) => void;
  isStartPos: boolean;
  isCaptureSquare: boolean,
  isValidSquare: boolean,
  rotate: boolean
  bgColor: string
}

export function Square({
  currentPiece,
  index,
  handleSquareClicked,
  isStartPos,
  isCaptureSquare,
  isValidSquare,
  rotate,
  bgColor
}: SquareProps) {
  const { handleClick, classes } = useSquare(
    index,
    currentPiece,
    isStartPos,
    handleSquareClicked,
    rotate,
    bgColor
  );

  const showIndexes = false;

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
    <Box onClick={handleClick} className={classes.join(' ')}>
      {rank === 1 && (
        <Text position='absolute' textStyle='md' bottom='0' right='1' color='purple.400' fontWeight='bold'>{getFileLetter(file).toLowerCase()}</Text>
      )}
      {file === BoardFile.A && (
        <Text position='absolute' textStyle='md' top='1' left='1' color='purple.400' fontWeight='bold'>{rank}</Text>
      )}
      {
        showIndexes && (<Text className='absolute text-black top-1 right-1.5 text-[10px]'>{index}</Text>)
      }
      <Box className='flex p-2 max-w-1/2 max-h-1/2 relative z-10'>
        {currentPiece !== null && <PieceComponent piece={currentPiece} />}

        {isCaptureSquare && <Box className={buildCircleClasses()}></Box>}
        {isValidSquare && <Box className={buildCircleClasses()}></Box>}
      </Box>
    </Box>
  );
}


