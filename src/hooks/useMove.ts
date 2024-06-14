import { useEffect, useState } from 'react';

export interface UseMoveReturn {
  halfMoves: number;
  updateHalfMoves: (value: number | 'INCREMENT') => void;
  fullMoves: number;
  updateFullMoves: (value: number | 'INCREMENT') => void;
  totalMoves: number;
  updateTotalMoves: (value: number | 'INCREMENT') => void;
}

export function useMove(): UseMoveReturn {
  // Handle game half moves & full moves & total moves
  const [halfMoves, setHalfMoves] = useState(0);
  const [fullMoves, setFullMoves] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);

  function updateHalfMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setHalfMoves((prevHalfMoves) => prevHalfMoves + 1);
    else setHalfMoves(value);
  }

  function updateFullMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setFullMoves((prevFullMoves) => prevFullMoves + 1);
    else setFullMoves(value);
  }

  function updateTotalMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setTotalMoves((prevTotalMoves) => prevTotalMoves + 1);
    else setTotalMoves(value);
  }

  return {
    halfMoves,
    updateHalfMoves,
    fullMoves,
    updateFullMoves,
    totalMoves,
    updateTotalMoves,
  };
}
