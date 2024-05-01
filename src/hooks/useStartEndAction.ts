import { useState } from 'react';

export function useStartEndAction<T, U>(
  callbackFn: (startPos: number, endPos: number) => U
) {
  const [startPos, setStartPos] = useState<number | null>();
  const [endPos, setEndPos] = useState<number | null>();

  const clear = () => {
    setStartPos(null);
    setEndPos(null);
  };

  const setPosition = (index: number) => {
    if (!startPos) setStartPos(index);
    else setEndPos(index);
  };

  if (startPos && endPos) callbackFn(startPos, endPos);

  return { clear, setPosition };
}
