import { useContext } from 'react';
import { GameState } from '../../context/GameState';

export function GameInfo() {
  const gameState = useContext(GameState);
  const isPlayerOneInCheck = gameState.playerOne.isInCheck;
  const isPlayerTwoInCheck = gameState.playerTwo.isInCheck;

  const playerOneClasses = [];
  if (isPlayerOneInCheck) playerOneClasses.push('text-red-700');
  if (gameState.turn % 2 !== 0) playerOneClasses.push('font-bold');

  const playerTwoClasses = [];
  if (isPlayerTwoInCheck) playerTwoClasses.push('text-red-700');
  if (gameState.turn % 2 === 0) playerTwoClasses.push('font-bold');

  return (
    <div className='flex gap-16'>
      <div>
        <h6 className={playerOneClasses.join(' ')}>{gameState.playerOne.name}</h6>
      </div>
      <div>
        <h6>{gameState.turn}</h6>
      </div>
      <div>
        <h6 className={playerTwoClasses.join(' ')}>{gameState.playerTwo.name}</h6>
      </div>
    </div>
  );
}
