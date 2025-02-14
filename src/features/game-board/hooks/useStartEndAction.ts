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

    // Clicked an empty square as starting pos. Return
    if (startPos === null && !piece) return;

    // Clicked a piece square. Set the start position (if not set)
    if (startPos === null) setStartPos(index);

    // Clicked the square you are already selecting. Return
    else if (startPos === index) return;

    // Otherwise, set the end pos (triggering an attempt to execute a move)
    // reference useBoard to see what it triggers when both are set.
    else setEndPos(index);
  };

  useEffect(() => {
    const handleScreenClick = () => {
      clear();
    };

    document.addEventListener('contextmenu', handleScreenClick);
    return () => {
      document.removeEventListener('contextmenu', handleScreenClick);
    };
  }, []);

  return { clear, setPosition, startPos, endPos, setStartPos };
}
