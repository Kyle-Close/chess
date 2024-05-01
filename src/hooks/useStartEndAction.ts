import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { Pieces } from '../enums/Pieces';

export function useStartEndAction<T, U>(
  callbackFn: (startPos: number, endPos: number) => U
) {
  const { getPieceAtPosition } = useContext(BoardContext);
  const [startPos, setStartPos] = useState<number | null>(null);
  const [endPos, setEndPos] = useState<number | null>(null);

  const clear = () => {
    setStartPos(null);
    setEndPos(null);
  };

  const setPosition = (index: number) => {
    const piece = getPieceAtPosition(index);
    if (startPos === null && piece === Pieces.EMPTY) return;

    if (startPos === null) setStartPos(index);
    else if (startPos === index) return;
    else setEndPos(index);
  };

  useEffect(() => {
    if (startPos !== null && endPos !== null) {
      callbackFn(startPos, endPos);
      clear();
    }
  }, [startPos, endPos, callbackFn]);

  useEffect(() => {
    const handleScreenClick = (e: MouseEvent) => {
      e.preventDefault();
      clear();
    };

    document.addEventListener('contextmenu', (e) => handleScreenClick(e));
    return () => {
      document.removeEventListener('contextmenu', handleScreenClick);
    };
  }, []);

  return { clear, setPosition, startPos };
}
