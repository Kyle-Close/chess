import { createContext, useEffect, useState } from 'react';
import { UsePlayerReturn, usePlayer } from '../hooks/usePlayer';
import { PieceColor } from '../enums/PieceColor';
import { MoveHistory } from './types/MoveHistory';
import { UseMoveReturn, useMove } from '../hooks/useMove';

interface GameStateProps {
  children: React.ReactNode;
}

export interface GameState {
  whitePlayer: UsePlayerReturn;
  blackPlayer: UsePlayerReturn;
  winner: UsePlayerReturn | null;
  updateWinner: (player: UsePlayerReturn | null) => void;
  move: UseMoveReturn;
  moveHistory: MoveHistory[];
  getCurrentTurnPlayer: () => UsePlayerReturn;
  getCurrentTurnOpponent: () => UsePlayerReturn;
  pushToMoveHistory: (move: MoveHistory) => void;
  popMoveHistory: () => MoveHistory;
  moveHistoryRedo: MoveHistory[];
  pushToMoveHistoryRedo: (move: MoveHistory) => void;
  popMoveHistoryRedo: () => MoveHistory;
  enPassantSquare: null | number;
  updateEnPassantSquare: (val: number | null) => void;
}

export const GameState = createContext<GameState>({
  whitePlayer: {} as UsePlayerReturn,
  blackPlayer: {} as UsePlayerReturn,
  winner: null,
  updateWinner: () => {},
  move: {} as UseMoveReturn,
  moveHistory: {} as MoveHistory[],
  getCurrentTurnPlayer: () => ({} as UsePlayerReturn),
  getCurrentTurnOpponent: () => ({} as UsePlayerReturn),
  pushToMoveHistory: () => {},
  popMoveHistory: () => ({} as MoveHistory),
  moveHistoryRedo: [] as MoveHistory[],
  pushToMoveHistoryRedo: () => {},
  popMoveHistoryRedo: () => ({} as MoveHistory),
  enPassantSquare: null,
  updateEnPassantSquare: () => {},
});

export function GameStateProvider({ children }: GameStateProps) {
  // TO-DO: implement half turn & full turn logic properly
  const whitePlayer = usePlayer('Kyle', PieceColor.WHITE);
  const blackPlayer = usePlayer('CPU', PieceColor.BLACK);
  const [winner, setWinner] = useState<UsePlayerReturn | null>(null);
  const move = useMove();
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>([
    {
      chessNotation: '',
      fenString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    },
  ]);
  const [moveHistoryRedo, setMoveHistoryRedo] = useState<MoveHistory[]>([]);
  const [enPassantSquare, setEnpassantSquare] = useState<null | number>(null);

  const updateEnPassantSquare = (val: number | null) => {
    setEnpassantSquare(val);
  };

  const updateWinner = (player: UsePlayerReturn | null) => {
    setWinner(player);
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

  const getCurrentTurnPlayer = () => {
    if (move.totalMoves % 2 === 0) return whitePlayer;
    else return blackPlayer;
  };

  const getCurrentTurnOpponent = () => {
    if (move.totalMoves % 2 === 0) return blackPlayer;
    else return whitePlayer;
  };

  useEffect(() => {
    if (move.totalMoves % 2 !== 0) {
      whitePlayer.updatePlayerTurn(false);
      blackPlayer.updatePlayerTurn(true);
    } else {
      whitePlayer.updatePlayerTurn(true);
      blackPlayer.updatePlayerTurn(false);
    }
  }, [move.totalMoves]);

  useEffect(() => {
    if (winner !== null) {
      console.log(`Game over! ${winner.name} has won.`);
    }
  }, [winner]);

  return (
    <GameState.Provider
      value={{
        whitePlayer,
        blackPlayer,
        winner,
        updateWinner,
        move: move,
        moveHistory,
        pushToMoveHistory,
        popMoveHistory,
        getCurrentTurnPlayer,
        getCurrentTurnOpponent,
        moveHistoryRedo,
        pushToMoveHistoryRedo,
        popMoveHistoryRedo,
        enPassantSquare,
        updateEnPassantSquare,
      }}
    >
      {children}
    </GameState.Provider>
  );
}
