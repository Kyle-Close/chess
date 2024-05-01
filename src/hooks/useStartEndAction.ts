import { useEffect, useState } from 'react';

export function useStartEndAction<T, U>(
  callbackFn: (startPos: number, endPos: number) => U
) {
  const [startPos, setStartPos] = useState<number | null>(null);
  const [endPos, setEndPos] = useState<number | null>(null);

  const clear = () => {
    setStartPos(null);
    setEndPos(null);
  };

  const setPosition = (index: number) => {
    if (startPos === null) setStartPos(index);
    else if (startPos === index) return;
    else setEndPos(index);
  };

  if (startPos !== null && endPos !== null) {
    callbackFn(startPos, endPos);
    clear();
  }

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
