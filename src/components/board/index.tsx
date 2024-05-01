import { useContext } from 'react';
import { Files } from './Files';
import { Ranks } from './Ranks';
import { BoardContext } from '../../context/board/BoardContext';
import { Square } from '../square';

export function Board() {
  const { board } = useContext(BoardContext);

  return (
    <div className='flex grow relative'>
      <Ranks />
      <div className='flex flex-col grow relative'>
        <div className='grid grid-cols-8 grid-rows-8 grow gap-1'>
          {board.map((currentPiece, key) => (
            <Square currentPiece={currentPiece} index={key} key={key} />
          ))}
        </div>
        <Files />
      </div>
    </div>
  );
}
