import { useState } from 'react';

export interface UseMoveReturn {
  halfMoves: number;
  updateHalfMoves: (value: number | 'INCREMENT') => void;
  fullMoves: number;
  updateFullMoves: (value: number | 'INCREMENT') => void;
  reset: () => void;
}

export function useMove(): UseMoveReturn {
  // Handle game half moves & full moves & total moves
  const [halfMoves, setHalfMoves] = useState(0);
  const [fullMoves, setFullMoves] = useState(0);

  function updateHalfMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setHalfMoves((prevHalfMoves) => prevHalfMoves + 1);
    else setHalfMoves(value);
  }

  function updateFullMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setFullMoves((prevFullMoves) => prevFullMoves + 1);
    else setFullMoves(value);
  }

  function reset() {
    setHalfMoves(0);
    setFullMoves(0);
  }

  return {
    halfMoves,
    updateHalfMoves,
    fullMoves,
    updateFullMoves,
    reset,
  };
}
