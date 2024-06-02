import { createContext, useEffect, useState } from 'react';
import { UsePlayerReturn, usePlayer } from '../hooks/usePlayer';
import { PieceColor } from '../enums/PieceColor';
import { MoveHistory } from './types/MoveHistory';

interface GameStateProps {
  children: React.ReactNode;
}

export interface GameState {
  playerOne: UsePlayerReturn;
  playerTwo: UsePlayerReturn;
  winner: UsePlayerReturn | null;
  updateWinner: (player: UsePlayerReturn | null) => void;
  turn: number;
  updateTurn: (turn: number) => void;
  moveHistory: MoveHistory[];
  getCurrentTurnPlayer: () => UsePlayerReturn;
  getCurrentTurnOpponent: () => UsePlayerReturn;
  changeTurn: () => void;
  pushToMoveHistory: (move: MoveHistory) => void;
  popMoveHistory: () => MoveHistory;
  moveHistoryRedo: MoveHistory[];
  pushToMoveHistoryRedo: (move: MoveHistory) => void;
  popMoveHistoryRedo: () => MoveHistory;
}

export const GameState = createContext<GameState>({
  playerOne: {} as UsePlayerReturn,
  playerTwo: {} as UsePlayerReturn,
  winner: null,
  updateWinner: () => {},
  turn: 0,
  updateTurn: () => {},
  moveHistory: {} as MoveHistory[],
  getCurrentTurnPlayer: () => ({} as UsePlayerReturn),
  getCurrentTurnOpponent: () => ({} as UsePlayerReturn),
  changeTurn: () => {},
  pushToMoveHistory: () => {},
  popMoveHistory: () => ({} as MoveHistory),
  moveHistoryRedo: [] as MoveHistory[],
  pushToMoveHistoryRedo: () => {},
  popMoveHistoryRedo: () => ({} as MoveHistory),
});

export function GameStateProvider({ children }: GameStateProps) {
  const playerOne = usePlayer('Kyle', PieceColor.WHITE);
  const playerTwo = usePlayer('CPU', PieceColor.BLACK);
  const [winner, setWinner] = useState<UsePlayerReturn | null>(null);
  const [turn, setTurn] = useState(0);
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>([]);
  const [moveHistoryRedo, setMoveHistoryRedo] = useState<MoveHistory[]>([]);

  const updateWinner = (player: UsePlayerReturn | null) => {
    setWinner(player);
  };

  const updateTurn = (turn: number) => {
    setTurn(turn);
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
    if (turn % 2 === 0) return playerOne;
    else return playerTwo;
  };

  const getCurrentTurnOpponent = () => {
    if (turn % 2 === 0) return playerTwo;
    else return playerOne;
  };

  const changeTurn = () => {
    setTurn((prevTurn) => prevTurn + 1);
  };

  useEffect(() => {
    if (turn % 2 !== 0) {
      playerOne.updatePlayerTurn(false);
      playerTwo.updatePlayerTurn(true);
    } else {
      playerOne.updatePlayerTurn(true);
      playerTwo.updatePlayerTurn(false);
    }
  }, [turn]);

  useEffect(() => {
    if (winner !== null) {
      console.log(`Game over! ${winner.name} has won.`);
    }
  });

  return (
    <GameState.Provider
      value={{
        playerOne,
        playerTwo,
        winner,
        updateWinner,
        turn,
        updateTurn,
        moveHistory,
        pushToMoveHistory,
        popMoveHistory,
        getCurrentTurnPlayer,
        getCurrentTurnOpponent,
        changeTurn,
        moveHistoryRedo,
        pushToMoveHistoryRedo,
        popMoveHistoryRedo,
      }}
    >
      {children}
    </GameState.Provider>
  );
}
