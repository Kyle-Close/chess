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
});

export function GameStateProvider({ children }: GameStateProps) {
  const playerOne = usePlayer('Kyle', PieceColor.WHITE);
  const playerTwo = usePlayer('CPU', PieceColor.BLACK);
  const [winner, setWinner] = useState<UsePlayerReturn | null>(null);
  const [turn, setTurn] = useState(0);
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>([]);

  const updateWinner = (player: UsePlayerReturn | null) => {
    setWinner(player);
  };

  const updateTurn = (turn: number) => {
    setTurn(turn);
  };

  const pushToMoveHistory = (move: MoveHistory) => {
    setMoveHistory((prevMoveHistory) => [...prevMoveHistory, move]);
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
        getCurrentTurnPlayer,
        getCurrentTurnOpponent,
        changeTurn,
      }}
    >
      {children}
    </GameState.Provider>
  );
}
