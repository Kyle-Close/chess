import { createContext, useState } from 'react';
import { UsePlayerReturn, usePlayer } from '../hooks/usePlayer';
import { PieceColor } from '../enums/PieceColor';

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
  getCurrentTurnPlayerColor: () => PieceColor;
  changeTurn: () => void;
}

export const GameState = createContext<GameState>({
  playerOne: {} as UsePlayerReturn,
  playerTwo: {} as UsePlayerReturn,
  turn: 1,
  updateTurn: () => {},
  moveHistory: '',
  updateMoveHistory: () => {},
  getCurrentTurnPlayerColor: () => PieceColor.WHITE,
  changeTurn: () => {},
});

export function GameStateProvider({ children }: GameStateProps) {
  const playerOne = usePlayer('Kyle', PieceColor.WHITE);
  const playerTwo = usePlayer('CPU', PieceColor.BLACK);
  const [turn, setTurn] = useState(1);
  const [moveHistory, setMoveHistory] = useState('');

  const updateTurn = (turn: number) => {
    setTurn(turn);
  };

  const updateMoveHistory = (newHistory: string) => {
    setMoveHistory(newHistory);
  };

  const getCurrentTurnPlayerColor = () => {
    if (turn === 1) return playerOne.color;
    else return playerTwo.color;
  };

  const changeTurn = () => {
    if (turn === 1) setTurn(2);
    else setTurn(1);
  };

  return (
    <GameState.Provider
      value={{
        playerOne,
        playerTwo,
        turn,
        updateTurn,
        moveHistory,
        updateMoveHistory,
        getCurrentTurnPlayerColor,
        changeTurn,
      }}
    >
      {children}
    </GameState.Provider>
  );
}
