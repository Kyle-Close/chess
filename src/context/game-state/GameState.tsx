import { createContext, useEffect, useState } from 'react';
import { UsePlayerReturn, usePlayer } from '../../hooks/usePlayer';
import { PieceColor } from '../../enums/PieceColor';
import { MoveHistory } from '../types/MoveHistory';
import { UseMoveReturn, useMove } from '../../hooks/useMove';
import { buildInitialMoveHistory } from './buildInitialMoveHistory';

interface GameStateProps {
  children: React.ReactNode;
}

export interface GameState {
  whitePlayer: UsePlayerReturn;
  blackPlayer: UsePlayerReturn;
  matchResult: UsePlayerReturn | 'DRAW' | null;
  updateMatchResult: (result: UsePlayerReturn | 'DRAW' | null) => void;
  move: UseMoveReturn;
  moveHistory: MoveHistory[];
  isWhiteTurn: boolean;
  toggleTurn: () => void;
  pushToMoveHistory: (move: MoveHistory) => void;
  popMoveHistory: () => MoveHistory;
  clearMoveHistoryRedo: () => void;
  moveHistoryRedo: MoveHistory[];
  pushToMoveHistoryRedo: (move: MoveHistory) => void;
  popMoveHistoryRedo: () => MoveHistory;
  enPassantSquare: null | number;
  updateEnPassantSquare: (val: number | null) => void;
  reset: () => void;
}

export const GameState = createContext<GameState>({
  whitePlayer: {} as UsePlayerReturn,
  blackPlayer: {} as UsePlayerReturn,
  matchResult: null,
  updateMatchResult: () => {},
  move: {} as UseMoveReturn,
  moveHistory: {} as MoveHistory[],
  isWhiteTurn: true,
  toggleTurn: () => {},
  pushToMoveHistory: () => {},
  popMoveHistory: () => ({} as MoveHistory),
  moveHistoryRedo: [] as MoveHistory[],
  pushToMoveHistoryRedo: () => {},
  clearMoveHistoryRedo: () => {},
  popMoveHistoryRedo: () => ({} as MoveHistory),
  enPassantSquare: null,
  updateEnPassantSquare: () => {},
  reset: () => {},
});

export function GameStateProvider({ children }: GameStateProps) {
  const whitePlayer = usePlayer('Kyle', PieceColor.WHITE);
  const blackPlayer = usePlayer('CPU', PieceColor.BLACK);
  const [matchResult, setMatchResult] = useState<UsePlayerReturn | 'DRAW' | null>(null);
  const move = useMove();
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>(
    buildInitialMoveHistory()
  );
  const [moveHistoryRedo, setMoveHistoryRedo] = useState<MoveHistory[]>([]);
  const [enPassantSquare, setEnpassantSquare] = useState<null | number>(null);

  const reset = () => {
    whitePlayer.reset();
    blackPlayer.reset();
    setMatchResult(null);
    move.reset();
    setIsWhiteTurn(true);
    setMoveHistory(buildInitialMoveHistory());
    setMoveHistoryRedo([]);
    setEnpassantSquare(null);
  };

  const updateEnPassantSquare = (val: number | null) => {
    setEnpassantSquare(val);
  };

  const updateMatchResult = (result: UsePlayerReturn | 'DRAW' | null) => {
    setMatchResult(result);
  };

  const pushToMoveHistory = (move: MoveHistory) => {
    setMoveHistory((prevMoveHistory) => [...prevMoveHistory, move]);
  };

  const pushToMoveHistoryRedo = (move: MoveHistory) => {
    setMoveHistoryRedo((prev) => [...prev, move]);
  };

  const popMoveHistory = () => {
    let poppedMove = moveHistory[moveHistory.length - 1];
    setMoveHistory((prevMoveHistory) => {
      const copy = [...prevMoveHistory];
      const pop = copy.pop();
      if (!pop) return [...prevMoveHistory];
      return copy;
    });
    return poppedMove;
  };

  const popMoveHistoryRedo = () => {
    const poppedMove = moveHistoryRedo[moveHistoryRedo.length - 1];
    setMoveHistoryRedo((prevMoveHistoryRedo) => {
      const copy = [...prevMoveHistoryRedo];
      const pop = copy.pop();
      if (!pop) return [...prevMoveHistoryRedo];
      return copy;
    });
    return poppedMove;
  };

  const clearMoveHistoryRedo = () => {
    setMoveHistoryRedo([]);
  };

  const toggleTurn = () => {
    if (isWhiteTurn) setIsWhiteTurn(false);
    else setIsWhiteTurn(true);
  };

  useEffect(() => {
    if (matchResult !== null) {
      if (matchResult === 'DRAW') console.log('Game over, draw.');
      else console.log(`Game over! ${matchResult.name} has won.`);
    }
  }, [matchResult]);

  return (
    <GameState.Provider
      value={{
        whitePlayer,
        blackPlayer,
        matchResult,
        updateMatchResult,
        move: move,
        moveHistory,
        pushToMoveHistory,
        popMoveHistory,
        isWhiteTurn,
        toggleTurn,
        moveHistoryRedo,
        pushToMoveHistoryRedo,
        popMoveHistoryRedo,
        enPassantSquare,
        updateEnPassantSquare,
        clearMoveHistoryRedo,
        reset,
      }}
    >
      {children}
    </GameState.Provider>
  );
}
