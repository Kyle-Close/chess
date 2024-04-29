import { Pieces } from '../../enums/Pieces';
import { usePiece } from '../../hooks/Piece';
import { getPieceAbbreviation } from './helpers';

interface BoardProps {
  gameBoard: Pieces[];
}

export function Board({ gameBoard }: BoardProps) {
  const { isWhite, isEmpty } = usePiece();
  return (
    <div className='grid grid-cols-8 grid-rows-8 grow gap-1 p-2'>
      {gameBoard.map((square, key) => {
        const classes = [
          'flex',
          'justify-center',
          'items-center',
          'bg-zinc-500',
        ];
        if (!isWhite(square)) classes.push('text-black');
        else if (isEmpty(square)) classes.push('text-amber-100');

        return (
          <div key={key} className={classes.join(' ')}>
            {getPieceAbbreviation(square)}
          </div>
        );
      })}
    </div>
  );
}
