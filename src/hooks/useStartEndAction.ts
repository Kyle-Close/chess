import { useEffect, useState } from 'react';
import { useAppSelector } from './useBoard';

export function useStartEndAction() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const board = useAppSelector((state) => state.board);
  const [startPos, setStartPos] = useState<number | null>(null);
  const [endPos, setEndPos] = useState<number | null>(null);

  const clear = () => {
    setStartPos(null);
    setEndPos(null);
  };

  const setPosition = (index: number) => {
    if (!gameInfo.isPlaying) return;
    const piece = board[index].piece;
    if (startPos === null && !piece) return; // Clicked an empty square as starting pos. Return

    if (startPos === null) setStartPos(index);
    else if (startPos === index) return;
    else setEndPos(index);
  };

  useEffect(() => {
    const handleScreenClick = (e: MouseEvent) => {
      clear();
    };

    document.addEventListener('contextmenu', (e) => handleScreenClick(e));
    return () => {
      document.removeEventListener('contextmenu', handleScreenClick);
    };
  }, []);

  return { clear, setPosition, startPos, endPos, setStartPos };
}
