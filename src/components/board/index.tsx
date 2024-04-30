import { useContext } from 'react';
import { usePiece } from '../../hooks/Piece';
import { Files } from './Files';
import { Ranks } from './Ranks';
import { getPieceAbbreviation } from './helpers';
import { BoardContext } from '../../context/board/BoardContext';

export function Board() {
  const { board } = useContext(BoardContext);
  const { isWhite, isEmpty } = usePiece();

  return (
    <div className='flex grow relative'>
      <Ranks />
      <div className='flex flex-col grow relative'>
        <div className='grid grid-cols-8 grid-rows-8 grow gap-1'>
          {board.map((square, key) => {
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
        <Files />
      </div>
    </div>
  );
}
