import { createContext, useEffect, useState } from 'react';
import { UsePlayerReturn, usePlayer } from '../hooks/usePlayer';
import { PieceColor } from '../enums/PieceColor';

interface GameStateProps {
  children: React.ReactNode;
}

interface GameState {
  playerOne: UsePlayerReturn;
  playerTwo: UsePlayerReturn;
  winner: UsePlayerReturn | null;
  updateWinner: (player: UsePlayerReturn | null) => void;
  turn: number;
  updateTurn: (turn: number) => void;
  moveHistory: string;
  updateMoveHistory: (newHistory: string) => void;
  getCurrentTurnPlayer: () => UsePlayerReturn;
  getCurrentTurnOpponent: () => UsePlayerReturn;
  changeTurn: () => void;
}

export const GameState = createContext<GameState>({
  playerOne: {} as UsePlayerReturn,
  playerTwo: {} as UsePlayerReturn,
  winner: null,
  updateWinner: () => {},
  turn: 0,
  updateTurn: () => {},
  moveHistory: '',
  updateMoveHistory: () => {},
  getCurrentTurnPlayer: () => ({} as UsePlayerReturn),
  getCurrentTurnOpponent: () => ({} as UsePlayerReturn),
  changeTurn: () => {},
});

export function GameStateProvider({ children }: GameStateProps) {
  const playerOne = usePlayer('Kyle', PieceColor.WHITE);
  const playerTwo = usePlayer('CPU', PieceColor.BLACK);
  const [winner, setWinner] = useState<UsePlayerReturn | null>(null);
  const [turn, setTurn] = useState(0);
  const [moveHistory, setMoveHistory] = useState('');

  const updateWinner = (player: UsePlayerReturn | null) => {
    setWinner(player);
  };

  const updateTurn = (turn: number) => {
    setTurn(turn);
  };

  const updateMoveHistory = (newHistory: string) => {
    setMoveHistory(newHistory);
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
  }, [winner]);

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
        updateMoveHistory,
        getCurrentTurnPlayer,
        getCurrentTurnOpponent,
        changeTurn,
      }}
    >
      {children}
    </GameState.Provider>
  );
}
