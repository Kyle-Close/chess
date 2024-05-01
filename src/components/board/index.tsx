import { useContext } from 'react';
import { Files } from './Files';
import { Ranks } from './Ranks';
import { BoardContext } from '../../context/board/BoardContext';
import { Square } from '../square';
import { useStartEndAction } from '../../hooks/useStartEndAction';

export function Board() {
  const { board } = useContext(BoardContext);
  const { setPosition, startPos } = useStartEndAction((start, end) => {
    console.log(start, end);
  });

  const handleSquareClicked = (index: number) => {
    setPosition(index);
  };

  return (
    <div className='flex grow relative'>
      <Ranks />
      <div className='flex flex-col grow relative'>
        <div className='grid grid-cols-8 grid-rows-8 grow gap-1'>
          {board.map((currentPiece, key) => {
            const isStart = startPos === key;
            return (
              <Square
                currentPiece={currentPiece}
                index={key}
                key={key}
                handleSquareClicked={handleSquareClicked}
                isStartPos={isStart}
              />
            );
          })}
        </div>
        <Files />
      </div>
    </div>
  );
}
