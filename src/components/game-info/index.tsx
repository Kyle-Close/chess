import { useContext } from 'react';
import { GameState } from '../../context/GameState';

export function GameInfo() {
  const gameState = useContext(GameState);

  return (
    <div className='flex gap-16'>
      <div>
        <h6 className={gameState.turn % 2 !== 0 ? 'font-bold' : ''}>
          {gameState.playerOne.name}
        </h6>
      </div>
      <div>
        <h6>{gameState.turn}</h6>
      </div>
      <div>
        <h6 className={gameState.turn % 2 === 0 ? 'font-bold' : ''}>
          {gameState.playerTwo.name}
        </h6>
      </div>
    </div>
  );
}
