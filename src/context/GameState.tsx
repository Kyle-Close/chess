import { createContext, useState } from 'react';
import { UsePlayerReturn, usePlayer } from '../hooks/usePlayer';

interface GameStateProps {
  children: React.ReactNode;
}

interface GameState {
  playerOne: UsePlayerReturn;
  playerTwo: UsePlayerReturn;
  turn: number;
  updateTurn: (turn: number) => void;
  moveHistory: string;
  updateMoveHistory: (newHistory: string) => void;
}

export const GameState = createContext<GameState>({
  playerOne: {} as UsePlayerReturn,
  playerTwo: {} as UsePlayerReturn,
  turn: 1,
  updateTurn: () => {},
  moveHistory: '',
  updateMoveHistory: () => {},
});

export function GameStateProvider({ children }: GameStateProps) {
  const playerOne = usePlayer('Kyle');
  const playerTwo = usePlayer('CPU');
  const [turn, setTurn] = useState(1);
  const [moveHistory, setMoveHistory] = useState('');

  const updateTurn = (turn: number) => {
    setTurn(turn);
  };

  const updateMoveHistory = (newHistory: string) => {
    setMoveHistory(newHistory);
  };

  return (
    <GameState.Provider
      value={{ playerOne, playerTwo, turn, updateTurn, moveHistory, updateMoveHistory }}
    >
      {children}
    </GameState.Provider>
  );
}
