import { useContext, useState } from 'react';
import { usePiece } from '../hooks/Piece';
import { BoardContext } from '../context/board/BoardContext';

export function MovePiece() {
  const { getPieceAtPosition } = useContext(BoardContext);
  const { move } = usePiece();

  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startIndex || !endIndex) return;
    move(getPieceAtPosition(startIndex), startIndex, endIndex);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>
      <input
        className='border-2 border-cyan-700 px-4'
        type='number'
        min={0}
        max={63}
        onChange={(e) => setStartIndex(Number(e.target.value))}
        placeholder='Start'
      />
      <input
        className='border-2 border-orange-700 px-4'
        type='number'
        min={0}
        max={63}
        onChange={(e) => setEndIndex(Number(e.target.value))}
        placeholder='End'
      />
      <button className='bg-cyan-700 rounded-md font-semibold'>Move</button>
    </form>
  );
}
