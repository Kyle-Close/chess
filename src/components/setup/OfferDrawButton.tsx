import { useContext } from 'react';
import { GameState } from '../../context/GameState';

export function OfferDraw() {
  const gameState = useContext(GameState);
  const handleClick = () => {
    gameState.updateMatchResult('DRAW');
  };
  return <button onClick={handleClick}>Offer Draw</button>;
}
