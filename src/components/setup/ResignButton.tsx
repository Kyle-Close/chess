import { useContext } from 'react';
import { GameState } from '../../context/GameState';
import { PieceColor } from '../../enums/PieceColor';

export function ResignButton() {
  const gameState = useContext(GameState);
  const currentPlayer = gameState.isWhiteTurn
    ? gameState.whitePlayer
    : gameState.blackPlayer;
  const waitingPlayer = gameState.isWhiteTurn
    ? gameState.blackPlayer
    : gameState.whitePlayer;

  const handleClick = () => {
    gameState.updateMatchResult(waitingPlayer);
  };

  return <button onClick={handleClick}>{`Resign as ${currentPlayer.color}`}</button>;
}
